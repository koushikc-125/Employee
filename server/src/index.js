import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { setServers } from "node:dns/promises";
setServers(["0.0.0.0", "8.8.8.8"]);

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection error ", err);
  });
