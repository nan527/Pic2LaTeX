const express = require('express');
const db = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All history routes require authentication
router.use(authMiddleware);

// GET /api/history
router.get('/', (req, res) => {
  const items = db.prepare(
    'SELECT id, image_id, latex, confidence, created_at FROM history WHERE user_id = ? ORDER BY created_at DESC'
  ).all(req.user.id);

  res.json({ success: true, items });
});

// POST /api/history
router.post('/', (req, res) => {
  const { imageId, latex, confidence } = req.body;

  if (!latex) {
    return res.status(400).json({ error: { message: 'LaTeX 内容不能为空' } });
  }

  const result = db.prepare(
    'INSERT INTO history (user_id, image_id, latex, confidence) VALUES (?, ?, ?, ?)'
  ).run(req.user.id, imageId || null, latex, confidence || null);

  res.json({
    success: true,
    item: {
      id: result.lastInsertRowid,
      image_id: imageId,
      latex,
      confidence
    }
  });
});

// DELETE /api/history/:id
router.delete('/:id', (req, res) => {
  const item = db.prepare(
    'SELECT id FROM history WHERE id = ? AND user_id = ?'
  ).get(req.params.id, req.user.id);

  if (!item) {
    return res.status(404).json({ error: { message: '记录不存在' } });
  }

  db.prepare('DELETE FROM history WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);

  res.json({ success: true });
});

module.exports = router;
