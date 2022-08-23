import { MongoClient } from "mongodb";
import { OrderV2 } from "opensea-js/lib/orders/types";
import { OpenSeaAsset } from "opensea-js/lib/types";
import { COLLECTION, DATABASE } from "./constants";
import { KongData, KongTraits, SaleData } from "./types";
import { readFileSync } from "fs";
import kongTraits from "./traits";
export const parseSales = (sales: OrderV2[]) /* : KongData[] */ => {
  let data: { [key: number]: SaleData } = {};
  const addSales = (
    ids: number[],
    price: string,
    currency: string | undefined
  ) => {
    let denom;

    switch (currency) {
      case undefined:
        console.log(ids);
        denom = 1;
        break;
      case "USD Coin":
        denom = Math.pow(10, 6);
        break;
      default:
        denom = Math.pow(10, 18);
        break;
    }
    const formatPrice = parseInt(price, 10) / denom;
    ids.forEach((id) => {
      data[id] = {
        current_price: formatPrice,
        currency: currency ?? "unknown",
      };
    });
  };
  for (let i = 0; i < sales.length; i++) {
    const { takerAssetBundle, makerAssetBundle, currentPrice } = sales[i];
    const currency = takerAssetBundle.assetContract?.name;
    addSales(
      makerAssetBundle.assets.map((asset) => parseInt(asset.tokenId!, 10)),
      currentPrice,
      currency
    );
  }
  return data;
};
export const parseTraits = (
  assets: OpenSeaAsset[]
): { [key: number]: KongTraits } => {
  let traits: { [key: number]: KongTraits } = {};
  assets.forEach(({ tokenId, traits: t }) => {
    let temp: any = {};
    t.forEach((trait) => {
      const temp2 = trait as { trait_type: string; value: number | string };
      const cat = temp2.trait_type
        .toLowerCase()
        .replace(" ", "_") as keyof KongTraits;
      temp[cat] = temp2.value;
    });
    traits[parseInt(tokenId!, 10)] = temp;
  });
  return traits;
};
export const updateMongo = async (
  mongo: MongoClient,
  data: OrderV2[]
): Promise<void> => {
  const parsedSales = parseSales(data);
  let allKongData: KongData[] = [];
  for (let i = 0; i < 10_000; i++) {
    const temp: SaleData =
      i in parsedSales
        ? parsedSales[i]
        : {
            currency: null,
            current_price: null,
          };
    allKongData.push({
      token_id: i,
      name: `Kong #${i}`,
      bio: null,
      ...temp,
      // @ts-ignore
      ...kongTraits[i],
    });
  }

  const collection = mongo.db(DATABASE).collection(COLLECTION);
  await collection.drop();
  await collection.insertMany(allKongData);
  return;
};
