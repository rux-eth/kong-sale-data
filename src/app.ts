import { config } from "dotenv";
import { OpenSeaAPI } from "opensea-js";
import osClient from "./osClient";
import { MongoClient } from "mongodb";
import { updateMongo } from "./utils";
config();
const os = osClient(
  new OpenSeaAPI({
    apiKey: process.env.OS_KEY!,
  })
);
(async () => {
  let isLoading = false;
  setTimeout(async () => {
    if (!isLoading) {
      isLoading = true;
      console.time("sales");
      const client = await new MongoClient(process.env.MONGO_URL!).connect();
      try {
        const data = await os.updateSales();
        await updateMongo(client, data);
      } catch (e) {
        console.error(e);
      } finally {
        await client.close();
      }
      console.log("\n");
      console.timeEnd("sales");
      isLoading = false;
    }
  }, 600_000);
  /*   console.time("sales");
  const client = await new MongoClient(process.env.MONGO_URL!).connect();
  try {
    const data = await os.updateSales();
    await updateMongo(client, data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  console.log("\n");
  console.timeEnd("sales"); */
})();
/* import express from "express";
import routes from "./routes";

const PORT = process.env.PORT ?? 8080;
const app = express();

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
}); */
