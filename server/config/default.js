module.exports = {
  port: process.env.PORT || 3002,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  },
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp']
  },
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60
  }
};
