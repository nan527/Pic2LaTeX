const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const config = require('../config/default');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: { message: '用户名和密码不能为空' } });
  }

  if (username.length < 2 || username.length > 20) {
    return res.status(400).json({ error: { message: '用户名长度应为 2-20 个字符' } });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: { message: '密码长度至少 6 个字符' } });
  }

  // Check if username exists
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ error: { message: '用户名已存在' } });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash);

  const token = jwt.sign(
    { id: result.lastInsertRowid, username },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: { id: result.lastInsertRowid, username }
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: { message: '用户名和密码不能为空' } });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    return res.status(401).json({ error: { message: '用户名或密码错误' } });
  }

  if (!bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: { message: '用户名或密码错误' } });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: { id: user.id, username: user.username }
  });
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: { message: '用户不存在' } });
  }

  res.json({ success: true, user });
});

module.exports = router;
