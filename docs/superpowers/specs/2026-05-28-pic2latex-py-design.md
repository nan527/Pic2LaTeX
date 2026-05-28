# Pic2LaTeX-py 设计文档

## 项目概述

Pic2LaTeX-py 是一个 Web 端应用，用于将图片中的数学公式和文本内容提取并转换为 LaTeX 格式。用户可以自行接入 AI API，实现高精度的图片到 LaTeX 转换。

### 核心功能
- 支持数学公式、文本、混合内容的提取
- 用户可自定义 API 配置（端点、密钥、模型）
- 实时 LaTeX 预览和编辑
- 玻璃拟态风格的精美界面
- 本地运行，数据隐私安全

## 技术栈

### 前端
- **框架**：React 18
- **UI 库**：Ant Design 5.x
- **构建工具**：Vite
- **样式**：CSS3 + 玻璃拟态效果
- **状态管理**：React Context + useReducer

### 后端
- **运行时**：Node.js 18+
- **框架**：Express 4.x
- **中间件**：cors, multer, helmet
- **日志**：morgan

### 开发工具
- **包管理**：npm
- **代码规范**：ESLint + Prettier
- **版本控制**：Git

## 系统架构

### 项目结构
```
Pic2LaTeX-py/
├── client/                     # React 前端应用
│   ├── public/                 # 静态资源
│   ├── src/
│   │   ├── components/         # React 组件
│   │   │   ├── common/         # 通用组件
│   │   │   ├── upload/         # 上传组件
│   │   │   ├── preview/        # 预览组件
│   │   │   └── settings/       # 设置组件
│   │   ├── pages/              # 页面组件
│   │   │   ├── Home.jsx        # 主页面
│   │   │   ├── Settings.jsx    # 设置页面
│   │   │   └── History.jsx     # 历史记录页面
│   │   ├── services/           # API 调用服务
│   │   ├── utils/              # 工具函数
│   │   ├── hooks/              # 自定义 Hook
│   │   ├── context/            # Context 状态管理
│   │   ├── styles/             # 样式文件
│   │   ├── App.jsx             # 主应用组件
│   │   └── main.jsx            # 入口文件
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js 后端
│   ├── routes/                 # API 路由
│   │   ├── upload.js           # 上传路由
│   │   ├── convert.js          # 转换路由
│   │   ├── config.js           # 配置路由
│   │   └── history.js          # 历史记录路由
│   ├── controllers/            # 控制器
│   ├── services/               # 业务逻辑
│   │   ├── imageService.js     # 图片处理服务
│   │   ├── apiService.js       # API 调用服务
│   │   └── storageService.js   # 存储服务
│   ├── middleware/              # 中间件
│   │   ├── errorHandler.js     # 错误处理
│   │   ├── validator.js        # 输入验证
│   │   └── rateLimiter.js      # 频率限制
│   ├── config/                 # 配置文件
│   │   └── default.js          # 默认配置
│   ├── app.js                  # Express 应用
│   └── package.json
├── docs/                       # 文档
│   └── superpowers/
│       └── specs/              # 设计文档
├── .gitignore
└── README.md
```

## 功能模块设计

### 1. 图片上传模块

**功能**：
- 支持拖拽上传、点击选择、粘贴上传
- 图片预览和编辑（裁剪、旋转）
- 支持常见图片格式（PNG、JPG、JPEG、GIF、BMP）

**技术实现**：
- 使用 HTML5 File API 处理文件选择
- 使用 Canvas API 进行图片预处理
- 使用 multer 中间件处理文件上传

**组件**：
- `UploadArea.jsx`：拖拽上传区域
- `ImagePreview.jsx`：图片预览组件
- `ImageEditor.jsx`：图片编辑组件

### 2. API 配置模块

**功能**：
- 用户 API 密钥管理（本地存储）
- API 端点配置（支持自定义端点）
- API 测试和验证功能
- 支持多种 AI 服务提供商

**技术实现**：
- 使用 localStorage 存储配置（简单加密）
- 支持环境变量配置
- 提供 API 测试接口

**组件**：
- `ApiConfig.jsx`：API 配置表单
- `ApiTest.jsx`：API 测试组件

### 3. 图片处理模块

**功能**：
- 图片预处理（优化大小、调整格式）
- 调用 AI API 进行 OCR 识别
- 结果解析和格式化

**技术实现**：
- 使用 Sharp 进行图片处理
- 支持多种 AI API 格式
- 结果解析和 LaTeX 格式化

**服务**：
- `imageService.js`：图片预处理
- `apiService.js`：API 调用封装

### 4. LaTeX 编辑模块

**功能**：
- 实时预览 LaTeX 渲染效果
- 语法高亮和自动补全
- 导出功能（复制到剪贴板、下载 .tex 文件）

**技术实现**：
- 使用 KaTeX 进行 LaTeX 渲染
- 使用 CodeMirror 进行代码编辑
- 使用 Clipboard API 实现复制功能

**组件**：
- `LatexEditor.jsx`：LaTeX 编辑器
- `LatexPreview.jsx`：LaTeX 预览
- `ExportButtons.jsx`：导出按钮组

### 5. 历史记录模块

**功能**：
- 保存转换历史
- 支持搜索和筛选
- 批量导出功能

**技术实现**：
- 使用 localStorage 存储历史记录
- 支持分页加载
- 提供导出功能

**组件**：
- `HistoryList.jsx`：历史记录列表
- `HistorySearch.jsx`：搜索组件
- `HistoryExport.jsx`：导出组件

## 数据流设计

### 主要数据流

1. **图片上传流程**：
   ```
   用户选择图片 → 前端预处理 → 上传到后端 → 后端保存临时文件 → 返回图片 ID
   ```

2. **API 调用流程**：
   ```
   用户点击转换 → 前端发送图片 ID → 后端读取图片 → 调用 AI API → 返回 LaTeX 结果
   ```

3. **结果处理流程**：
   ```
   后端返回 LaTeX → 前端解析渲染 → 用户编辑调整 → 导出/保存
   ```

### API 端点设计

```
POST /api/upload          # 上传图片
POST /api/convert         # 转换图片为 LaTeX
GET  /api/config          # 获取 API 配置
POST /api/config          # 保存 API 配置
GET  /api/history         # 获取历史记录
DELETE /api/history/:id   # 删除历史记录
```

### 数据格式

```json
// 图片上传请求
{
  "image": "base64 编码的图片数据",
  "filename": "example.png"
}

// 图片上传响应
{
  "success": true,
  "imageId": "img_123456",
  "filename": "example.png",
  "size": 1024000
}

// 转换请求
{
  "imageId": "img_123456",
  "options": {
    "format": "mixed",  // math, text, mixed
    "language": "auto"  // auto, en, zh
  }
}

// 转换响应
{
  "success": true,
  "latex": "\\frac{x^2}{2} + \\text{Hello World}",
  "confidence": 0.95,
  "processingTime": 1200
}

// API 配置请求
{
  "endpoint": "https://api.example.com/v1",
  "apiKey": "sk-xxxxxxxx",
  "model": "gpt-4-vision-preview"
}

// API 配置响应
{
  "success": true,
  "message": "API 配置保存成功",
  "testResult": {
    "status": "connected",
    "model": "gpt-4-vision-preview"
  }
}
```

## 用户界面设计

### 设计风格：玻璃拟态（Glassmorphism）

**设计特点**：
- 毛玻璃效果（backdrop-filter: blur）
- 半透明背景，多层叠加
- 渐变色彩，光影流动
- 科技感强，现代简洁

**色彩方案**：
- 主色调：渐变蓝紫色（#667eea → #764ba2）
- 背景：深色渐变（#0f0c29 → #302b63 → #24243e）
- 强调色：霓虹蓝（#00d2ff）
- 文字：白色半透明层次

**动画效果**：
- 页面加载：渐入动画（fadeIn）
- 组件交互：悬停发光、点击波纹
- 背景：流动渐变动画
- 状态切换：平滑过渡（transition）

### 页面布局

#### 1. 主页面（Home）
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Pic2LaTeX    [设置] [历史] [帮助]          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │                     │  │                     │  │
│  │   拖拽图片到此处    │  │   LaTeX 预览区域    │  │
│  │   或点击选择文件    │  │                     │  │
│  │                     │  │   \frac{x^2}{2}     │  │
│  │   [上传按钮]        │  │   + \text{Hello}    │  │
│  │                     │  │                     │  │
│  └─────────────────────┘  └─────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [转换] [复制] [导出] [保存]                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 2. 设置页面（Settings）
```
┌─────────────────────────────────────────────────────┐
│  [返回] API 设置                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  API 端点                                   │   │
│  │  [_______________________________________]  │   │
│  │                                             │   │
│  │  API 密钥                                   │   │
│  │  [_______________________________________]  │   │
│  │                                             │   │
│  │  模型选择                                   │   │
│  │  [▼ gpt-4-vision-preview_________________]  │   │
│  │                                             │   │
│  │  [测试连接] [保存配置] [重置]               │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 3. 历史记录页面（History）
```
┌─────────────────────────────────────────────────────┐
│  [返回] 历史记录    [搜索...] [筛选▼] [导出]       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [缩略图] 2026-05-28 14:30                  │   │
│  │  \frac{x^2}{2} + \text{Hello}              │   │
│  │  [查看] [复制] [删除]                       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  [缩略图] 2026-05-28 14:25                  │   │
│  │  \int_{0}^{1} x dx = \frac{1}{2}           │   │
│  │  [查看] [复制] [删除]                       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [上一页] 1 2 3 [下一页]                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### UI 组件设计

**卡片组件**：
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 24px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 8px 32px rgba(0, 210, 255, 0.3);
  border-color: rgba(0, 210, 255, 0.5);
}
```

**按钮组件**：
```css
.glass-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}
```

**输入框组件**：
```css
.glass-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  transition: all 0.3s ease;
}

.glass-input:focus {
  outline: none;
  border-color: #00d2ff;
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);
}
```

## 错误处理设计

### 前端错误处理

1. **图片上传失败**：
   - 文件过大：显示"文件大小超过限制（最大 10MB）"
   - 格式不支持：显示"不支持的文件格式，请上传 PNG/JPG/JPEG/GIF/BMP"
   - 网络错误：显示"网络连接失败，请检查网络后重试"

2. **API 调用失败**：
   - API 密钥无效：显示"API 密钥无效，请检查配置"
   - API 端点错误：显示"API 端点无法访问，请检查配置"
   - 请求超时：显示"请求超时，请稍后重试"

3. **用户提示**：
   - 成功操作：绿色提示 + 自动消失（3 秒）
   - 警告信息：黄色提示 + 需要用户确认
   - 错误信息：红色提示 + 详细说明

### 后端错误处理

1. **统一错误响应格式**：
   ```json
   {
     "success": false,
     "error": {
       "code": "INVALID_API_KEY",
       "message": "API 密钥无效",
       "details": "请检查您的 API 密钥是否正确"
     }
   }
   ```

2. **日志记录**：
   - 错误详情：错误类型、错误消息、堆栈跟踪
   - 请求信息：请求方法、请求路径、请求参数
   - 用户信息：用户 ID（如有）、IP 地址

3. **优雅降级**：
   - API 不可用时：显示"服务暂时不可用，请稍后重试"
   - 网络不稳定时：自动重试机制（最多 3 次）

## 安全性设计

### API 密钥安全

1. **本地存储加密**：
   - 使用 localStorage 存储配置
   - 简单加密（Base64 编码 + 混淆）
   - 支持环境变量配置

2. **API 密钥传输安全**：
   - 测试连接时，前端将 API 密钥临时发送到后端进行验证
   - 后端仅用于测试连接，不持久化存储用户 API 密钥
   - 转换请求时，后端从本地存储读取配置（前端传递配置ID）
   - 用户配置保存在本地 localStorage

3. **支持环境变量配置**：
   - 开发环境：`.env` 文件
   - 生产环境：系统环境变量

### 文件上传安全

1. **文件类型验证**：
   - 仅允许图片格式（PNG、JPG、JPEG、GIF、BMP）
   - 检查文件 MIME 类型
   - 检查文件扩展名

2. **文件大小限制**：
   - 最大 10MB
   - 前端和后端双重验证

3. **文件内容检查**：
   - 检查文件头（Magic Number）
   - 防止恶意文件上传

### 请求安全

1. **CORS 配置**：
   - 仅允许本地访问（localhost）
   - 支持配置允许的域名

2. **请求频率限制**：
   - 每分钟最多 60 次请求
   - 超过限制返回 429 状态码

3. **输入验证和清理**：
   - 验证请求参数
   - 清理特殊字符
   - 防止 SQL 注入和 XSS

### 数据隐私

1. **图片仅在内存中处理**：
   - 不永久存储用户图片
   - 处理完成后自动删除临时文件

2. **用户可清除所有本地数据**：
   - 提供"清除数据"功能
   - 删除所有本地存储的配置和历史

3. **不收集用户个人信息**：
   - 不需要用户注册/登录
   - 不收集用户行为数据

## 环境配置要求

### 开发环境

1. **Node.js**：版本 18+
   - 下载地址：https://nodejs.org/
   - 验证安装：`node --version`

2. **npm**：版本 9+（随 Node.js 安装）
   - 验证安装：`npm --version`

3. **Git**：版本控制工具
   - 下载地址：https://git-scm.com/
   - 验证安装：`git --version`

4. **现代浏览器**：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+

### 依赖包

#### 前端依赖（client/package.json）
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "antd": "^5.12.0",
    "axios": "^1.6.0",
    "katex": "^0.16.0",
    "codemirror": "^6.0.0",
    "react-dropzone": "^14.2.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0"
  }
}
```

#### 后端依赖（server/package.json）
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.0",
    "multer": "^1.4.0",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "sharp": "^0.33.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "eslint": "^8.50.0"
  }
}
```

## 测试策略

### 单元测试

1. **前端组件测试**：
   - 使用 React Testing Library
   - 测试组件渲染、用户交互、状态变化

2. **后端服务测试**：
   - 使用 Jest + Supertest
   - 测试 API 端点、业务逻辑、错误处理

### 集成测试

1. **API 集成测试**：
   - 测试前后端数据流
   - 测试图片上传和转换流程

2. **端到端测试**：
   - 使用 Cypress 或 Playwright
   - 测试完整用户流程

### 测试覆盖率

- 目标：80% 以上代码覆盖率
- 工具：Istanbul/nyc

## 部署和运行

### 本地开发

1. **克隆项目**：
   ```bash
   git clone <repository-url>
   cd Pic2LaTeX-py
   ```

2. **安装依赖**：
   ```bash
   # 安装后端依赖
   cd server
   npm install
   
   # 安装前端依赖
   cd ../client
   npm install
   ```

3. **配置环境变量**：
   ```bash
   # 在 server 目录创建 .env 文件
   PORT=3001
   NODE_ENV=development
   ```

4. **启动开发服务器**：
   ```bash
   # 启动后端（在 server 目录）
   npm run dev
   
   # 启动前端（在 client 目录）
   npm run dev
   ```

5. **访问应用**：
   - 前端：http://localhost:5173
   - 后端：http://localhost:3001

### 生产构建

1. **构建前端**：
   ```bash
   cd client
   npm run build
   ```

2. **启动生产服务器**：
   ```bash
   cd server
   npm start
   ```

3. **访问应用**：
   - http://localhost:3001

## 未来扩展

### 功能扩展

1. **多语言支持**：
   - 中文、英文界面切换
   - 多语言 OCR 支持

2. **批量处理**：
   - 支持多张图片同时上传
   - 批量转换和导出

3. **云端同步**：
   - 用户账号系统
   - 配置和历史云端同步

4. **更多 AI 模型**：
   - 支持更多 AI 服务提供商
   - 模型性能对比

### 性能优化

1. **图片优化**：
   - 图片压缩
   - 懒加载

2. **缓存策略**：
   - 浏览器缓存
   - 服务端缓存

3. **代码分割**：
   - 路由懒加载
   - 组件动态导入

## 总结

Pic2LaTeX-py 是一个功能完整、设计精美的 Web 应用，采用现代化的技术栈和玻璃拟态设计风格。通过合理的架构设计和安全性考虑，为用户提供高质量的图片到 LaTeX 转换服务。

### 主要特点

1. **用户友好**：简洁直观的界面设计，支持多种上传方式
2. **灵活配置**：用户可自定义 API 配置，支持多种 AI 服务
3. **精美界面**：玻璃拟态设计风格，动画效果流畅
4. **安全可靠**：本地运行，数据隐私安全，错误处理完善
5. **易于扩展**：模块化设计，便于未来功能扩展

### 技术亮点

1. **前后端分离**：清晰的架构，易于维护和扩展
2. **组件化开发**：React 组件化，代码复用性高
3. **现代化工具**：Vite 构建，开发体验优秀
4. **响应式设计**：支持桌面和移动端
5. **类型安全**：可选 TypeScript 支持

---

**文档版本**：1.0  
**最后更新**：2026-05-28  
**作者**：Pic2LaTeX-py 设计团队