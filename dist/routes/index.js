"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
/* config();
const os = osClient(
  new OpenSeaAPI({
    apiKey: process.env.OS_KEY!,
  })
); */
/* (async () => {
  setTimeout(async () => {
    const client = await new MongoClient(process.env.MONGO_URL!).connect();

    try {
      const data = await os.updateSales();
      await updateMongo(client, data);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }, 600_000);
    const client = await new MongoClient(process.env.MONGO_URL!).connect();

  try {
    const data = await os.updateSales();
    await updateMongo(client, data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
})(); */
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.status(200).send("hello world");
});
exports.default = router;
