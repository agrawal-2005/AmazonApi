const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5001;


const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

// Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
});

// Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get Product Reviews
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

//Get Product Offers
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
})

//Get Search Results
app.get('/search/:searchQueries', async(req, res) => {
    const { searchQueries } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQueries}`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));