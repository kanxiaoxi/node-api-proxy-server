const express = require('express');
const router = express.Router();
const needle = require('needle');
const url = require('url');
const apicache = require('apicache');

// 使用环境变量
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// 使用缓存中间件 https://www.npmjs.com/package/apicache
let cache = apicache.middleware;

router.get('/', async (req, res) => {
  try {
    // console.log(url.parse(req.url, true).query)
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      units: "metric",
      ...url.parse(req.url, true).query
    });
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    if (process.env.NODE_ENV === 'development') {
      console.log(`Request: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;