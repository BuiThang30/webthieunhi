const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/home');
});

// Route động cho tất cả các trang
app.get('/:page', (req, res) => {
  const page = req.params.page; // lấy tên trang từ URL
  const filePath = path.join(__dirname, 'public', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Trang không tồn tại');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server đang chạy tại http://172.19.233.236:${PORT}`);
});