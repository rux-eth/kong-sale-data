import { OpenSeaAPI } from "opensea-js";
import { OrderV2 } from "opensea-js/lib/orders/types";
import { rklAddress } from "./constants";
import { sleep } from "./utils";
// import cliProgress from "cli-progress";

async function updateSales(os: OpenSeaAPI): Promise<OrderV2[]> {
  let prom: Promise<OrderV2[]> = new Promise(async (res, rej) => {
    // let bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let curr = 0;
    let orders: OrderV2[] = [];
    let consecFails = 0;
    // bar.start(10_000, 0);
    while (curr < 10_000) {
      try {
        const ids = Array(Math.min(10_000 - curr, 30))
          .fill(0)
          .map((_, index) => `${index + curr}`);
        const res = await os.getOrders({
          assetContractAddress: rklAddress,
          tokenIds: ids,
          side: "ask",
          orderBy: "created_date",
          orderDirection: "desc",
        });
        consecFails = 0;
        curr += 30;
        // bar.update(curr);
        orders = orders.concat(...res.orders);
        await sleep(250);
      } catch (e) {
        // console.warn(e);
        consecFails++;
        let toWait = consecFails * 1000;
        console.log(`\nWaiting for ${Math.round(toWait / 1000)} Secs`);
        await sleep(toWait);
      }
    }
    // bar.stop();
    res(orders);
  });
  let data = await prom;

  return data;
}

export default updateSales;
