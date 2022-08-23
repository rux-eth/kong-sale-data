import express from "express";
import routes from "./routes";
import { config } from "dotenv";
import bodyParser from "body-parser";
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
  /*   setTimeout(async () => {
    const client = await new MongoClient(process.env.MONGO_URL!).connect();

    try {
      const data = await os.updateSales();
      await updateMongo(client, data);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }, 600_000); */
  const client = await new MongoClient(process.env.MONGO_URL!).connect();

  try {
    const data = await os.updateSales();
    await updateMongo(client, data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
})();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use("/axios", routes);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:3000`);
});
