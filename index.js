const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/blog2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog2.html'));
});

app.get('/quiz2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz2.html'));
});
app.get('/quiz3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz3.html'));
});
app.get('/quiz4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz4.html'));
});
app.get('/quiz5', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz5.html'));
});
app.get('/quiz6', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz6.html'));
});
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
