const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const db = require('./db');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'megaplex-prime-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'test@test.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234';

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
}

// ========================
// AUTH ROUTES
// ========================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    return res.json({ success: true, message: 'Logged in successfully' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/auth/check', (req, res) => {
  res.json({ isAdmin: !!(req.session && req.session.isAdmin) });
});

// ========================
// CONTENT ROUTES
// ========================

// Get all sections
app.get('/api/content', (req, res) => {
  try {
    const rows = db.prepare('SELECT section_key, content FROM sections').all();
    const data = {};
    rows.forEach(row => {
      data[row.section_key] = JSON.parse(row.content);
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Get single section
app.get('/api/content/:key', (req, res) => {
  try {
    const row = db.prepare('SELECT content FROM sections WHERE section_key = ?').get(req.params.key);
    if (!row) return res.status(404).json({ error: 'Section not found' });
    res.json(JSON.parse(row.content));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Update section (auth required)
app.put('/api/content/:key', requireAuth, (req, res) => {
  try {
    const { content } = req.body;
    const result = db.prepare(
      'UPDATE sections SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE section_key = ?'
    ).run(JSON.stringify(content), req.params.key);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ success: true, message: 'Section updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// ========================
// START SERVER
// ========================

app.listen(PORT, () => {
  console.log(`🏢 Megaplex Prime backend running on http://localhost:${PORT}`);
});
