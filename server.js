const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// CoinGecko API URL
const COINGECKO_URL = "https://api.coingecko.com/api/v3";

// Get current prices for specific cryptocurrencies
app.get("/prices", async (req, res) => {
    try {
        const { data } = await axios.get(`${COINGECKO_URL}/simple/price`, {
            params: {
                ids: "bitcoin,ethereum,solana", // Add more coins here
                vs_currencies: "usd",
                include_24hr_change: true,
            },
        });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error fetching prices");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
