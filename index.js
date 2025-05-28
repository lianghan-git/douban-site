const express = require('express');
const path = require('path');
const pool = require('./config');

const app = express();
const port = process.env.PORT || 3000;

// 设置 EJS 视图
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 根路由：渲染 Top250 列表
app.get('/', async (req, res) => {
  try {
    const [movies] = await pool.query('SELECT * FROM top250');
    res.render('index', { movies });
  } catch (err) {
    console.error(err);
    res.status(500).send('服务器内部错误');
  }
});

// API 路由：返回 JSON
app.get('/api/movies', async (req, res) => {
  try {
    const [movies] = await pool.query('SELECT * FROM top250');
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '查询失败' });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 