import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:3000`);
});
