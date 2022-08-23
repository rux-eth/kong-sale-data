import { OpenSeaAPI } from "opensea-js";
import getTraits from "./getTraits";
import updateSales from "./updateSales";
function osClient(os: OpenSeaAPI) {
  const client = {
    updateSales: async () => updateSales(os),
    getTraits: async () => getTraits(os),
  };
  return client;
}
export default osClient;
