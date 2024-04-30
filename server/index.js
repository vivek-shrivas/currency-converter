const express = require("express");
const app = express();
const port = 5000;
const fetch = require("node-fetch"); // Import the fetch module if you're running this code in Node.js

app.get("/api", async (req, res) => {
  try {
    const response = await fetch(
      "https://latest.currency-api.pages.dev/v1/currencies/inr.json"
    );
    const currencyData = await response.json();
    res.setHeader("Content-Type", "application/json");
    res.json(currencyData.inr);
    console.log("API called successfully", currencyData.inr);
  } catch (error) {
    console.error("Error fetching currency data:", error);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

app.get("/api/convert", async (req, res) => {
  res.setHeader("Content-type", "application/json");
  if (req.query.to && req.query.from && req.query.amount) {
    const to = req.query.to;
    const from = req.query.from;
    const amount = req.query.amount;
    try {
      const response = await fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${from}.json`
      );
      const currencyData = await response.json();
      const convertedAmount = amount * currencyData[from][to];
      res.json({ convertedAmt: convertedAmount });
      console.log(convertedAmount);
      return;
    } catch (error) {
      console.error("error while fetching data :", error);
    }
  }
});

app.listen(port, () => {
  console.log("server started on port : ", port);
});
