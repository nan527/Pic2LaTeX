const express = require('express');
const router = express.Router();
const imageService = require('../services/imageService');
const apiService = require('../services/apiService');

router.post('/', async (req, res, next) => {
  try {
    const { imageId, options } = req.body;

    if (!imageId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_IMAGE_ID',
          message: '请提供图片 ID',
          details: '请先上传图片'
        }
      });
    }

    if (!options?.endpoint || !options?.apiKey) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_API_CONFIG',
          message: '请配置 API',
          details: '请在设置中配置 API 端点和密钥'
        }
      });
    }

    const startTime = Date.now();
    const imageBuffer = await imageService.getImageBuffer(imageId);
    const result = await apiService.convertImageToLatex(imageBuffer, options);
    const processingTime = Date.now() - startTime;

    res.json({
      success: true,
      latex: result.latex,
      confidence: result.confidence,
      processingTime
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
