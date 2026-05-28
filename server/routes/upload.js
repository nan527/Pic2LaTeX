const express = require('express');
const multer = require('multer');
const router = express.Router();
const imageService = require('../services/imageService');
const config = require('../config/default');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.upload.maxSize
  },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'), false);
    }
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILE',
          message: '请选择要上传的图片',
          details: '请拖拽或点击选择图片文件'
        }
      });
    }

    const result = await imageService.processImage(
      req.file.buffer,
      req.file.originalname
    );

    res.json({
      success: true,
      imageId: result.id,
      filename: result.filename,
      size: result.size
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
