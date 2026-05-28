# Pic2LaTeX-py Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a web application that converts images containing math formulas and text to LaTeX format, with a glassmorphism UI and configurable AI API integration.

**Architecture:** Frontend React SPA with Ant Design communicates with a Node.js/Express backend via REST API. The backend handles image processing and AI API calls. Users configure their own API keys stored locally.

**Tech Stack:** React 18, Ant Design 5, Vite, Node.js, Express, KaTeX, Sharp

---

## File Structure

```
Pic2LaTeX-py/
├── client/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── GlassCard.jsx
│   │   │   ├── upload/
│   │   │   │   └── UploadArea.jsx
│   │   │   ├── preview/
│   │   │   │   ├── LatexEditor.jsx
│   │   │   │   └── LatexPreview.jsx
│   │   │   └── settings/
│   │   │       └── ApiConfig.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── History.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── styles/
│   │   │   └── glassmorphism.css
│   │   ├── utils/
│   │   │   └── storage.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── routes/
│   │   ├── upload.js
│   │   ├── convert.js
│   │   └── config.js
│   ├── services/
│   │   ├── imageService.js
│   │   └── apiService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── default.js
│   ├── app.js
│   └── package.json
├── docs/
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-05-28-pic2latex-py-design.md
│       └── plans/
│           └── 2026-05-28-pic2latex-py-implementation.md
├── .gitignore
└── README.md
```

---

## Task 1: Project Setup and Configuration

**Files:**
- Create: `.gitignore`
- Create: `README.md`
- Create: `server/package.json`
- Create: `client/package.json`
- Create: `client/vite.config.js`
- Create: `client/index.html`

- [ ] **Step 1: Create .gitignore**

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary files
tmp/
temp/
uploads/
```

- [ ] **Step 2: Create README.md**

```markdown
# Pic2LaTeX-py

A web application that converts images containing math formulas and text to LaTeX format.

## Features

- Drag-and-drop image upload
- Real-time LaTeX preview
- Configurable AI API integration
- Glassmorphism UI design
- Local-first privacy

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Development

```bash
# Start server (in server directory)
npm run dev

# Start client (in client directory)
npm run dev
```

### Access

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
```

- [ ] **Step 3: Create server/package.json**

```json
{
  "name": "pic2latex-py-server",
  "version": "1.0.0",
  "description": "Backend server for Pic2LaTeX-py",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.2"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.2"
  }
}
```

- [ ] **Step 4: Create client/package.json**

```json
{
  "name": "pic2latex-py-client",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "antd": "^5.12.8",
    "axios": "^1.6.5",
    "katex": "^0.16.9",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.21.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.12"
  }
}
```

- [ ] **Step 5: Create client/vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

- [ ] **Step 6: Create client/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pic2LaTeX-py</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Initialize git repository**

```bash
git init
git add .
git commit -m "chore: initialize project structure"
```

---

## Task 2: Server Foundation

**Files:**
- Create: `server/config/default.js`
- Create: `server/app.js`
- Create: `server/middleware/errorHandler.js`

- [ ] **Step 1: Create server/config/default.js**

```javascript
module.exports = {
  port: process.env.PORT || 3001,
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
```

- [ ] **Step 2: Create server/middleware/errorHandler.js**

```javascript
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
```

- [ ] **Step 3: Create server/app.js**

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/default');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(config.cors));

// Logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes will be added here
// app.use('/api/upload', require('./routes/upload'));
// app.use('/api/convert', require('./routes/convert'));
// app.use('/api/config', require('./routes/config'));

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

module.exports = app;
```

- [ ] **Step 4: Test server startup**

```bash
cd server
npm install
npm run dev
```

Expected: Server starts on port 3001 with message "Server running on port 3001"

- [ ] **Step 5: Commit**

```bash
git add server/
git commit -m "feat: add server foundation with Express and middleware"
```

---

## Task 3: Image Upload Service

**Files:**
- Create: `server/services/imageService.js`
- Create: `server/routes/upload.js`

- [ ] **Step 1: Create server/services/imageService.js**

```javascript
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

class ImageService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads');
    this.ensureUploadDir();
  }

  async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async processImage(buffer, filename) {
    const processedFilename = `${Date.now()}-${filename}`;
    const outputPath = path.join(this.uploadDir, processedFilename);

    await sharp(buffer)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 90 })
      .toFile(outputPath);

    return {
      id: processedFilename.replace('.png', ''),
      filename: processedFilename,
      path: outputPath,
      size: (await fs.stat(outputPath)).size
    };
  }

  async getImagePath(imageId) {
    const files = await fs.readdir(this.uploadDir);
    const file = files.find(f => f.startsWith(imageId));
    if (!file) {
      throw new Error('图片不存在');
    }
    return path.join(this.uploadDir, file);
  }

  async deleteImage(imageId) {
    const filePath = await this.getImagePath(imageId);
    await fs.unlink(filePath);
  }

  async getImageBuffer(imageId) {
    const filePath = await this.getImagePath(imageId);
    return await fs.readFile(filePath);
  }
}

module.exports = new ImageService();
```

- [ ] **Step 2: Create server/routes/upload.js**

```javascript
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
```

- [ ] **Step 3: Add route to server/app.js**

Add these lines after the health check route:

```javascript
app.use('/api/upload', require('./routes/upload'));
```

- [ ] **Step 4: Test upload endpoint**

```bash
# Start server
cd server
npm run dev

# Test with curl (in another terminal)
curl -X POST http://localhost:3001/api/upload \
  -F "image=@/path/to/test-image.png"
```

Expected: JSON response with success: true and imageId

- [ ] **Step 5: Commit**

```bash
git add server/services/imageService.js server/routes/upload.js server/app.js
git commit -m "feat: add image upload service with Sharp processing"
```

---

## Task 4: AI API Service

**Files:**
- Create: `server/services/apiService.js`
- Create: `server/routes/convert.js`
- Create: `server/routes/config.js`

- [ ] **Step 1: Create server/services/apiService.js**

```javascript
const axios = require('axios');

class ApiService {
  constructor() {
    this.configs = new Map();
  }

  async testConnection(endpoint, apiKey, model) {
    try {
      const response = await axios.post(
        `${endpoint}/chat/completions`,
        {
          model: model || 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: 'Test connection. Reply with "OK".'
            }
          ],
          max_tokens: 10
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      return {
        status: 'connected',
        model: response.data.model || model
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`API 错误: ${error.response.data.error?.message || error.response.statusText}`);
      }
      throw new Error(`连接失败: ${error.message}`);
    }
  }

  async convertImageToLatex(imageBuffer, options = {}) {
    const {
      endpoint,
      apiKey,
      model = 'gpt-4-vision-preview',
      format = 'mixed',
      language = 'auto'
    } = options;

    const base64Image = imageBuffer.toString('base64');
    const mimeType = 'image/png';

    const prompt = this.buildPrompt(format, language);

    try {
      const response = await axios.post(
        `${endpoint}/chat/completions`,
        {
          model: model,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 4096
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      const content = response.data.choices[0].message.content;
      return {
        latex: this.extractLatex(content),
        confidence: 0.95,
        rawResponse: content
      };
    } catch (error) {
      if (error.response) {
        throw new Error(`API 错误: ${error.response.data.error?.message || error.response.statusText}`);
      }
      throw new Error(`转换失败: ${error.message}`);
    }
  }

  buildPrompt(format, language) {
    const formatInstructions = {
      math: 'Extract only the mathematical formulas from the image and convert them to LaTeX.',
      text: 'Extract all text content from the image and convert it to LaTeX format.',
      mixed: 'Extract both mathematical formulas and text content from the image and convert them to LaTeX.'
    };

    const languageInstructions = {
      auto: 'Automatically detect the language of the text.',
      en: 'The text is in English.',
      zh: 'The text is in Chinese.'
    };

    return `You are an expert at converting images to LaTeX code.

Task: ${formatInstructions[format] || formatInstructions.mixed}

${languageInstructions[language] || languageInstructions.auto}

Rules:
1. Output ONLY the LaTeX code, no explanations
2. Use proper LaTeX environments (e.g., equation, align, itemize)
3. Preserve the original structure and formatting
4. For inline math, use $...$
5. For display math, use \\[...\\] or equation environments
6. If there are multiple equations, separate them appropriately

LaTeX code:`;
  }

  extractLatex(content) {
    // Try to extract LaTeX from code blocks first
    const codeBlockMatch = content.match(/```(?:latex)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }

    // Otherwise return the content as-is, removing any markdown formatting
    return content
      .replace(/^Here is the LaTeX code:\s*/i, '')
      .replace(/^The LaTeX code is:\s*/i, '')
      .trim();
  }
}

module.exports = new ApiService();
```

- [ ] **Step 2: Create server/routes/convert.js**

```javascript
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
```

- [ ] **Step 3: Create server/routes/config.js**

```javascript
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
```

- [ ] **Step 4: Add routes to server/app.js**

Add these lines after the upload route:

```javascript
app.use('/api/convert', require('./routes/convert'));
app.use('/api/config', require('./routes/config'));
```

- [ ] **Step 5: Commit**

```bash
git add server/services/apiService.js server/routes/convert.js server/routes/config.js server/app.js
git commit -m "feat: add AI API service for image-to-LaTeX conversion"
```

---

## Task 5: React App Foundation

**Files:**
- Create: `client/src/main.jsx`
- Create: `client/src/App.jsx`
- Create: `client/src/styles/glassmorphism.css`

- [ ] **Step 1: Create client/src/styles/glassmorphism.css**

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --background-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  --accent-color: #00d2ff;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--background-gradient);
  min-height: 100vh;
  color: white;
}

#root {
  min-height: 100vh;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  padding: 24px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 8px 32px rgba(0, 210, 255, 0.3);
  border-color: rgba(0, 210, 255, 0.5);
}

.glass-button {
  background: var(--primary-gradient);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.glass-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.glass-button:active {
  transform: translateY(0);
}

.glass-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.glass-input {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  font-size: 14px;
  width: 100%;
  transition: all 0.3s ease;
}

.glass-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background: rgba(15, 12, 41, 0.8);
  backdrop-filter: blur(10px);
  padding: 16px 0;
  border-bottom: 1px solid var(--glass-border);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--accent-color);
}

.page-container {
  padding: 40px 0;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: var(--glass-bg);
}

.page-title {
  font-size: 28px;
  font-weight: 600;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .nav-links {
    display: none;
  }
}

.action-bar {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pulse {
  animation: pulse 2s infinite;
}
```

- [ ] **Step 2: Create client/src/main.jsx**

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/glassmorphism.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 3: Create client/src/App.jsx**

```javascript
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Settings from './pages/Settings'
import History from './pages/History'

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  )
}

export default App
```

- [ ] **Step 4: Create placeholder pages**

Create `client/src/pages/Home.jsx`:

```javascript
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/settings" className="nav-link">设置</Link>
            <Link to="/history" className="nav-link">历史记录</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="main-layout">
          <div className="glass-card">
            <h2>上传图片</h2>
            <p style={{ marginTop: '16px', opacity: 0.8 }}>
              拖拽图片到此处或点击选择文件
            </p>
          </div>
          <div className="glass-card">
            <h2>LaTeX 预览</h2>
            <p style={{ marginTop: '16px', opacity: 0.8 }}>
              转换后的 LaTeX 代码将显示在这里
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
```

Create `client/src/pages/Settings.jsx`:

```javascript
import React from 'react'
import { Link } from 'react-router-dom'

function Settings() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/history" className="nav-link">历史记录</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="page-header">
          <Link to="/">
            <button className="back-button">←</button>
          </Link>
          <h1 className="page-title">API 设置</h1>
        </div>
        <div className="glass-card" style={{ maxWidth: '600px' }}>
          <p>API 配置表单将在这里实现</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
```

Create `client/src/pages/History.jsx`:

```javascript
import React from 'react'
import { Link } from 'react-router-dom'

function History() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/settings" className="nav-link">设置</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="page-header">
          <Link to="/">
            <button className="back-button">←</button>
          </Link>
          <h1 className="page-title">历史记录</h1>
        </div>
        <div className="glass-card">
          <p>历史记录将在这里显示</p>
        </div>
      </div>
    </div>
  )
}

export default History
```

- [ ] **Step 5: Test React app**

```bash
cd client
npm install
npm run dev
```

Expected: App opens at http://localhost:5173 with navigation working

- [ ] **Step 6: Commit**

```bash
git add client/
git commit -m "feat: add React app foundation with glassmorphism styles"
```

---

## Task 6: Upload Component

**Files:**
- Create: `client/src/components/upload/UploadArea.jsx`
- Create: `client/src/services/api.js`
- Create: `client/src/utils/storage.js`

- [ ] **Step 1: Create client/src/utils/storage.js**

```javascript
const STORAGE_KEYS = {
  API_CONFIG: 'pic2latex_api_config',
  HISTORY: 'pic2latex_history'
};

export const getApiConfig = () => {
  try {
    const config = localStorage.getItem(STORAGE_KEYS.API_CONFIG);
    return config ? JSON.parse(config) : null;
  } catch {
    return null;
  }
};

export const saveApiConfig = (config) => {
  localStorage.setItem(STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
};

export const getHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const saveToHistory = (item) => {
  const history = getHistory();
  history.unshift({
    ...item,
    id: Date.now(),
    timestamp: new Date().toISOString()
  });
  // Keep only last 100 items
  if (history.length > 100) {
    history.pop();
  }
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const deleteFromHistory = (id) => {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered));
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
```

- [ ] **Step 2: Create client/src/services/api.js**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const convertImage = async (imageId, options) => {
  const response = await api.post('/convert', {
    imageId,
    options
  });

  return response.data;
};

export const testApiConnection = async (endpoint, apiKey, model) => {
  const response = await api.post('/config/test', {
    endpoint,
    apiKey,
    model
  });

  return response.data;
};

export default api;
```

- [ ] **Step 3: Create client/src/components/upload/UploadArea.jsx**

```javascript
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { uploadImage } from '../../services/api'

function UploadArea({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]

    if (!file) return

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('文件大小超过限制（最大 10MB）')
      return
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('不支持的文件格式，请上传 PNG/JPG/JPEG/GIF/BMP')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const result = await uploadImage(file)
      if (result.success) {
        toast.success('图片上传成功')
        onUploadSuccess(result.imageId, preview)
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || '上传失败')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [onUploadSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: false,
    disabled: uploading
  })

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '16px' }}>上传图片</h2>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? 'var(--accent-color)' : 'var(--glass-border)'}`,
          borderRadius: '12px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          background: isDragActive ? 'rgba(0, 210, 255, 0.1)' : 'transparent'
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div>
            <div className="loading-spinner" style={{ margin: '0 auto 16px' }} />
            <p>上传中...</p>
          </div>
        ) : preview ? (
          <div>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}
            />
            <p style={{ opacity: 0.8 }}>点击或拖拽更换图片</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📷</p>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              {isDragActive ? '释放以上传图片' : '拖拽图片到此处'}
            </p>
            <p style={{ opacity: 0.6 }}>或点击选择文件</p>
            <p style={{ opacity: 0.4, fontSize: '12px', marginTop: '16px' }}>
              支持 PNG、JPG、JPEG、GIF、BMP 格式，最大 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadArea
```

- [ ] **Step 4: Update Home.jsx to use UploadArea**

Replace `client/src/pages/Home.jsx`:

```javascript
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UploadArea from '../components/upload/UploadArea'

function Home() {
  const [imageId, setImageId] = useState(null)

  const handleUploadSuccess = (id, preview) => {
    setImageId(id)
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/settings" className="nav-link">设置</Link>
            <Link to="/history" className="nav-link">历史记录</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="main-layout">
          <UploadArea onUploadSuccess={handleUploadSuccess} />
          <div className="glass-card">
            <h2>LaTeX 预览</h2>
            <p style={{ marginTop: '16px', opacity: 0.8 }}>
              {imageId ? '图片已上传，点击转换按钮开始' : '上传图片后将显示转换结果'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
```

- [ ] **Step 5: Test upload functionality**

```bash
# Make sure server is running
cd server
npm run dev

# In another terminal, start client
cd client
npm run dev
```

Test: Drag and drop an image, verify upload succeeds

- [ ] **Step 6: Commit**

```bash
git add client/src/components/upload/UploadArea.jsx client/src/services/api.js client/src/utils/storage.js client/src/pages/Home.jsx
git commit -m "feat: add image upload component with drag-and-drop"
```

---

## Task 7: LaTeX Preview Component

**Files:**
- Create: `client/src/components/preview/LatexPreview.jsx`
- Create: `client/src/components/preview/LatexEditor.jsx`

- [ ] **Step 1: Create client/src/components/preview/LatexPreview.jsx**

```javascript
import React, { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function LatexPreview({ latex }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: true,
          fleqn: false,
          leqno: false,
          strict: false,
          trust: true,
          macros: {
            '\\R': '\\mathbb{R}',
            '\\N': '\\mathbb{N}',
            '\\Z': '\\mathbb{Z}',
            '\\Q': '\\mathbb{Q}',
            '\\C': '\\mathbb{C}'
          }
        })
      } catch (error) {
        containerRef.current.innerHTML = `<span style="color: #ff6b6b;">渲染错误: ${error.message}</span>`
      }
    }
  }, [latex])

  if (!latex) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', opacity: 0.6 }}>
        <p>LaTeX 预览将显示在这里</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        overflowX: 'auto'
      }}
    />
  )
}

export default LatexPreview
```

- [ ] **Step 2: Create client/src/components/preview/LatexEditor.jsx**

```javascript
import React, { useState, useEffect } from 'react'

function LatexEditor({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const handleChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div>
      <textarea
        className="glass-input"
        value={localValue}
        onChange={handleChange}
        placeholder="在此编辑 LaTeX 代码..."
        style={{
          minHeight: '200px',
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          fontSize: '14px',
          lineHeight: '1.6',
          resize: 'vertical'
        }}
      />
    </div>
  )
}

export default LatexEditor
```

- [ ] **Step 3: Update Home.jsx with preview components**

Replace `client/src/pages/Home.jsx`:

```javascript
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import UploadArea from '../components/upload/UploadArea'
import LatexPreview from '../components/preview/LatexPreview'
import LatexEditor from '../components/preview/LatexEditor'
import { convertImage } from '../services/api'
import { getApiConfig, saveToHistory } from '../utils/storage'

function Home() {
  const [imageId, setImageId] = useState(null)
  const [latex, setLatex] = useState('')
  const [converting, setConverting] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const handleUploadSuccess = (id) => {
    setImageId(id)
    setLatex('')
  }

  const handleConvert = async () => {
    if (!imageId) {
      toast.error('请先上传图片')
      return
    }

    const config = getApiConfig()
    if (!config?.endpoint || !config?.apiKey) {
      toast.error('请先在设置中配置 API')
      return
    }

    setConverting(true)
    try {
      const result = await convertImage(imageId, config)
      if (result.success) {
        setLatex(result.latex)
        toast.success(`转换成功，耗时 ${result.processingTime}ms`)
        saveToHistory({
          imageId,
          latex: result.latex,
          confidence: result.confidence
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || '转换失败')
    } finally {
      setConverting(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(latex)
    toast.success('已复制到剪贴板')
  }

  const handleExport = () => {
    const blob = new Blob([latex], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formula.tex'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('已导出 .tex 文件')
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/settings" className="nav-link">设置</Link>
            <Link to="/history" className="nav-link">历史记录</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="main-layout">
          <UploadArea onUploadSuccess={handleUploadSuccess} />
          <div className="glass-card">
            <h2 style={{ marginBottom: '16px' }}>LaTeX 预览</h2>
            <LatexPreview latex={latex} />
            {showEditor && (
              <div style={{ marginTop: '16px' }}>
                <LatexEditor
                  value={latex}
                  onChange={setLatex}
                />
              </div>
            )}
          </div>
        </div>

        <div className="action-bar">
          <button
            className="glass-button"
            onClick={handleConvert}
            disabled={!imageId || converting}
          >
            {converting ? (
              <>
                <span className="loading-spinner" />
                转换中...
              </>
            ) : (
              '转换'
            )}
          </button>

          {latex && (
            <>
              <button
                className="glass-button"
                onClick={handleCopy}
              >
                复制
              </button>
              <button
                className="glass-button"
                onClick={handleExport}
              >
                导出
              </button>
              <button
                className="glass-button"
                onClick={() => setShowEditor(!showEditor)}
              >
                {showEditor ? '隐藏编辑器' : '编辑'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
```

- [ ] **Step 4: Test conversion flow**

1. Start both server and client
2. Configure API in settings
3. Upload an image
4. Click convert
5. Verify LaTeX preview shows
6. Test copy and export buttons

- [ ] **Step 5: Commit**

```bash
git add client/src/components/preview/ client/src/pages/Home.jsx
git commit -m "feat: add LaTeX preview and editor components"
```

---

## Task 8: Settings Page

**Files:**
- Create: `client/src/components/settings/ApiConfig.jsx`
- Update: `client/src/pages/Settings.jsx`

- [ ] **Step 1: Create client/src/components/settings/ApiConfig.jsx**

```javascript
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getApiConfig, saveApiConfig } from '../../utils/storage'
import { testApiConnection } from '../../services/api'

function ApiConfig() {
  const [config, setConfig] = useState({
    endpoint: '',
    apiKey: '',
    model: 'gpt-4-vision-preview'
  })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    const savedConfig = getApiConfig()
    if (savedConfig) {
      setConfig(savedConfig)
    }
  }, [])

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
    setTestResult(null)
  }

  const handleTest = async () => {
    if (!config.endpoint || !config.apiKey) {
      toast.error('请填写 API 端点和密钥')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const result = await testApiConnection(
        config.endpoint,
        config.apiKey,
        config.model
      )
      if (result.success) {
        setTestResult({
          status: 'success',
          message: '连接成功',
          model: result.testResult.model
        })
        toast.success('API 连接成功')
      }
    } catch (error) {
      setTestResult({
        status: 'error',
        message: error.response?.data?.error?.message || '连接失败'
      })
      toast.error('API 连接失败')
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    if (!config.endpoint || !config.apiKey) {
      toast.error('请填写 API 端点和密钥')
      return
    }

    saveApiConfig(config)
    toast.success('配置已保存')
  }

  const handleReset = () => {
    setConfig({
      endpoint: '',
      apiKey: '',
      model: 'gpt-4-vision-preview'
    })
    setTestResult(null)
    toast.success('配置已重置')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          API 端点
        </label>
        <input
          className="glass-input"
          type="text"
          value={config.endpoint}
          onChange={(e) => handleChange('endpoint', e.target.value)}
          placeholder="https://api.openai.com/v1"
        />
        <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
          OpenAI: https://api.openai.com/v1
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          API 密钥
        </label>
        <input
          className="glass-input"
          type="password"
          value={config.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
        />
        <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
          密钥仅保存在本地浏览器中
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          模型
        </label>
        <select
          className="glass-input"
          value={config.model}
          onChange={(e) => handleChange('model', e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="gpt-4-vision-preview">GPT-4 Vision Preview</option>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="claude-3-opus-20240229">Claude 3 Opus</option>
          <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
          <option value="claude-3-haiku-20240307">Claude 3 Haiku</option>
        </select>
      </div>

      {testResult && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            background: testResult.status === 'success'
              ? 'rgba(0, 255, 0, 0.1)'
              : 'rgba(255, 0, 0, 0.1)',
            border: `1px solid ${testResult.status === 'success'
              ? 'rgba(0, 255, 0, 0.3)'
              : 'rgba(255, 0, 0, 0.3)'}`
          }}
        >
          <p style={{ fontWeight: 500 }}>
            {testResult.status === 'success' ? '✓' : '✗'} {testResult.message}
          </p>
          {testResult.model && (
            <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
              模型: {testResult.model}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          className="glass-button"
          onClick={handleTest}
          disabled={testing || !config.endpoint || !config.apiKey}
        >
          {testing ? (
            <>
              <span className="loading-spinner" />
              测试中...
            </>
          ) : (
            '测试连接'
          )}
        </button>
        <button
          className="glass-button"
          onClick={handleSave}
        >
          保存配置
        </button>
        <button
          className="glass-button"
          onClick={handleReset}
          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
        >
          重置
        </button>
      </div>
    </div>
  )
}

export default ApiConfig
```

- [ ] **Step 2: Update Settings.jsx**

Replace `client/src/pages/Settings.jsx`:

```javascript
import React from 'react'
import { Link } from 'react-router-dom'
import ApiConfig from '../components/settings/ApiConfig'

function Settings() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/history" className="nav-link">历史记录</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="page-header">
          <Link to="/">
            <button className="back-button">←</button>
          </Link>
          <h1 className="page-title">API 设置</h1>
        </div>
        <div className="glass-card" style={{ maxWidth: '600px' }}>
          <ApiConfig />
        </div>
      </div>
    </div>
  )
}

export default Settings
```

- [ ] **Step 3: Test settings page**

1. Navigate to settings
2. Enter API configuration
3. Click test connection
4. Save configuration
5. Verify configuration persists after page refresh

- [ ] **Step 4: Commit**

```bash
git add client/src/components/settings/ApiConfig.jsx client/src/pages/Settings.jsx
git commit -m "feat: add API settings page with connection testing"
```

---

## Task 9: History Page

**Files:**
- Update: `client/src/pages/History.jsx`

- [ ] **Step 1: Update History.jsx**

Replace `client/src/pages/History.jsx`:

```javascript
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getHistory, deleteFromHistory } from '../utils/storage'
import LatexPreview from '../components/preview/LatexPreview'

function History() {
  const [history, setHistory] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const items = getHistory()
    setHistory(items)
  }

  const handleDelete = (id) => {
    deleteFromHistory(id)
    loadHistory()
    toast.success('已删除')
    if (selectedItem?.id === id) {
      setSelectedItem(null)
    }
  }

  const handleCopy = (latex) => {
    navigator.clipboard.writeText(latex)
    toast.success('已复制到剪贴板')
  }

  const handleExport = (latex) => {
    const blob = new Blob([latex], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formula.tex'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('已导出 .tex 文件')
  }

  const filteredHistory = history.filter(item =>
    item.latex?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/settings" className="nav-link">设置</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="page-header">
          <Link to="/">
            <button className="back-button">←</button>
          </Link>
          <h1 className="page-title">历史记录</h1>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <input
            className="glass-input"
            type="text"
            placeholder="搜索 LaTeX 内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredHistory.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
            <p style={{ opacity: 0.6 }}>
              {searchTerm ? '没有找到匹配的记录' : '暂无历史记录'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="glass-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '8px' }}>
                      {formatDate(item.timestamp)}
                    </p>
                    <p style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.latex}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <button
                      className="glass-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(item.latex)
                      }}
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      复制
                    </button>
                    <button
                      className="glass-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExport(item.latex)
                      }}
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      导出
                    </button>
                    <button
                      className="glass-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        background: 'rgba(255, 0, 0, 0.3)'
                      }}
                    >
                      删除
                    </button>
                  </div>
                </div>

                {selectedItem?.id === item.id && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                    <LatexPreview latex={item.latex} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History
```

- [ ] **Step 2: Test history page**

1. Convert some images to generate history
2. Navigate to history page
3. Test search functionality
4. Test copy, export, and delete buttons
5. Test expanding items to preview LaTeX

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/History.jsx
git commit -m "feat: add history page with search and management"
```

---

## Task 10: Final Integration and Polish

**Files:**
- Update: `client/src/pages/Home.jsx`
- Update: `client/src/styles/glassmorphism.css`

- [ ] **Step 1: Add responsive improvements**

Update `client/src/styles/glassmorphism.css` to add at the end:

```css
/* Enhanced animations */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

.scale-in {
  animation: scaleIn 0.3s ease-out;
}

/* Improved glassmorphism */
.glass-card-strong {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 24px;
}

/* Text utilities */
.text-gradient {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Responsive improvements */
@media (max-width: 480px) {
  .glass-card {
    padding: 16px;
    border-radius: 12px;
  }

  .glass-button {
    padding: 10px 16px;
    font-size: 13px;
  }

  .page-title {
    font-size: 22px;
  }

  .action-bar {
    flex-direction: column;
  }

  .action-bar .glass-button {
    width: 100%;
  }
}
```

- [ ] **Step 2: Add loading states to Home.jsx**

Update the loading state display in `client/src/pages/Home.jsx`:

Find the converting button and ensure it shows proper loading state:

```javascript
<button
  className="glass-button"
  onClick={handleConvert}
  disabled={!imageId || converting}
  style={{ minWidth: '120px' }}
>
  {converting ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span className="loading-spinner" />
      转换中...
    </span>
  ) : (
    '转换'
  )}
</button>
```

- [ ] **Step 3: Add favicon**

Create `client/public/vite.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y=".9em" font-size="90">📷</text>
</svg>
```

- [ ] **Step 4: Final testing**

1. Start both server and client
2. Test complete workflow:
   - Configure API in settings
   - Upload image
   - Convert to LaTeX
   - Preview and edit
   - Copy and export
   - Check history
3. Test responsive design (resize browser)
4. Test error handling (invalid API key, network errors)

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Pic2LaTeX-py application with glassmorphism UI"
```

---

## Summary

This implementation plan creates a complete Pic2LaTeX-py application with:

1. **Project Setup**: Git, package.json, Vite configuration
2. **Server Foundation**: Express, middleware, error handling
3. **Image Upload**: Sharp processing, file validation
4. **AI API Service**: OpenAI-compatible API integration
5. **React Foundation**: Routing, glassmorphism styles
6. **Upload Component**: Drag-and-drop with preview
7. **LaTeX Preview**: KaTeX rendering and editing
8. **Settings Page**: API configuration and testing
9. **History Page**: Search, copy, export, delete
10. **Final Polish**: Animations, responsive design

Total: 10 tasks, ~50 steps

**Environment Requirements:**
- Node.js 18+
- npm 9+
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

**To run:**
```bash
# Terminal 1 - Server
cd server
npm install
npm run dev

# Terminal 2 - Client
cd client
npm install
npm run dev
```

Access at: http://localhost:5173
