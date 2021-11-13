const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// 请求速率限制
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10分钟
  max: 20  // 客户端响应标头 X-RateLimit-Limit
});

app.use(limiter);

// https://expressjs.com/zh-cn/guide/behind-proxies.html
app.set('trust proxy', true);

// 设置静态资源目录
app.use(express.static('public'));

// 使用路由
app.use('/api', require('./routes'));

// 允许CORS
app.use(cors());

// 错误处理 中间件
app.use(errorHandler);

app.listen(PORT, console.log(`服务器运行在${PORT}端口`));