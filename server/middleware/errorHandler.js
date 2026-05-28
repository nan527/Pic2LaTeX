const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: {
        code: 'FILE_TOO_LARGE',
        message: '文件大小超过限制',
        details: '最大文件大小为 10MB'
      }
    });
  }

  if (err.message === '只允许上传图片文件') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: '不支持的文件格式',
        details: '请上传 PNG、JPG、JPEG、GIF 或 BMP 格式的图片'
      }
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || '服务器内部错误',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};

module.exports = errorHandler;
