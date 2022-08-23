import { OpenSeaAPI } from "opensea-js";
import { rklAddress } from "./constants";
import { writeFileSync } from "fs";
import { sleep } from "./utils";
import cliProgress, { Bar } from "cli-progress";
import { OpenSeaAsset } from "opensea-js/lib/types";

async function getTraits(os: OpenSeaAPI) {
  let prom = new Promise(async (res, rej) => {
    const incr = 20;
    let bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let curr = 0;
    let orders: OpenSeaAsset[] = [];
    let consecFails = 0;

    bar.start(10_000, 0);
    while (curr < 10_000) {
      try {
        const ids = Array(Math.min(10_000 - curr, incr))
          .fill(0)
          .map((_, index) => `${index + curr}`);
        const res = await os.getAssets({
          asset_contract_address: rklAddress,
          token_ids: ids,
        });
        consecFails = 0;
        curr += incr;
        bar.update(curr);
        orders = orders.concat(...res.assets);
        await sleep(250);
        /* const res = await os.getOrders({
          assetContractAddress: rklAddress,
          tokenIds: ids,
          side: "ask",
        }); */
        // writeFileSync("data.json", JSON.stringify(res, null, 3));
        // console.log(JSON.stringify(res.orders[0], null, 3));
      } catch (e) {
        // console.warn(e);
        consecFails++;
        let toWait = Math.min(consecFails * 1000, 20_000);
        console.log(`\nWaiting for ${Math.round(toWait / 1000)} Secs`);
        await sleep(toWait);
      }
    }
    bar.stop();
    res(orders);
  });
  let data = await prom;

  writeFileSync("traits.json", JSON.stringify(data, null, 3));

  return data;
}

export default getTraits;
