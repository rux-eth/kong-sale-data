import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { OpenSeaAPI } from "opensea-js";
import osClient from "../osClient";
import { MongoClient } from "mongodb";
import { updateMongo } from "../utils";
config();
const os = osClient(
  new OpenSeaAPI({
    apiKey: process.env.OS_KEY!,
  })
);
(async () => {
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
  /*   const client = await new MongoClient(process.env.MONGO_URL!).connect();

  try {
    const data = await os.updateSales();
    await updateMongo(client, data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  } */
})();
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("hello world");
});

export default router;
