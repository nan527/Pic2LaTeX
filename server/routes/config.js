const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

router.post('/test', async (req, res, next) => {
  try {
    const { endpoint, apiKey, model } = req.body;

    if (!endpoint || !apiKey) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_CONFIG',
          message: '请提供 API 端点和密钥'
        }
      });
    }

    const result = await apiService.testConnection(endpoint, apiKey, model);

    res.json({
      success: true,
      message: 'API 连接成功',
      testResult: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
