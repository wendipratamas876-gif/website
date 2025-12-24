const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API Routes
app.get('/api/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'user.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read users' });
    res.json(JSON.parse(data));
  });
});

app.get('/api/vps', (req, res) => {
  fs.readFile(path.join(__dirname, 'db', 'vps.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read VPS' });
    res.json(JSON.parse(data));
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile(path.join(__dirname, 'db', 'user.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate' });
    
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
