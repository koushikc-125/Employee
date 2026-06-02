import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import dns from "node:dns";

dns.setServers([
  "1.1.1.1", // Cloudflare
  "8.8.8.8"  // Google
]);

dotenv.config({
  path: "../.env",
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
