import express from "express";

import connectToDatabase from "./config/db";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4040, async () => {
  console.log("Server is running on port 4040");
  await connectToDatabase();
});
