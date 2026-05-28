# Pic2LaTeX — 图片转 LaTeX 公式识别工具

基于 AI 视觉模型的数学公式识别工具。上传包含数学公式的图片，自动转换为标准 LaTeX 代码，支持一键复制到 WPS/Word 公式编辑器。

## 功能特性

- **多种上传方式** — 拖拽上传、点击选择文件、Ctrl+V 粘贴截图
- **AI 识别转换** — 支持小米 MIMO、GPT-4 Vision、Claude 等 OpenAI 兼容视觉模型
- **LaTeX 实时预览** — KaTeX 渲染引擎，所见即所得
- **数学符号面板** — 7 大类常用符号（希腊字母、运算符、关系符、箭头、集合、结构模板等），点击插入
- **WPS 兼容复制** — 自动处理格式，复制后可直接在 WPS/Word 中粘贴为公式
- **导出 .tex 文件** — 标准 LaTeX 文件，可在 TeX 编辑器中直接使用
- **历史记录** — 自动保存识别记录，支持搜索、预览、复制、删除
- **账号系统** — 注册登录后历史记录保存到云端，支持跨设备同步

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 18 + Vite + KaTeX + react-dropzone |
| 后端 | Node.js + Express + sharp |
| 数据库 | SQLite (better-sqlite3) |
| 认证 | JWT (jsonwebtoken + bcryptjs) |
| UI | 玻璃拟态 (Glassmorphism) 设计风格 |

## 项目结构

```
Pic2LaTeX-py/
├── client/                    # 前端 React 应用
│   └── src/
│       ├── components/
│       │   ├── preview/       # LaTeX 预览、编辑器、符号面板
│       │   ├── settings/      # API 配置组件
│       │   └── upload/        # 图片上传组件
│       ├── contexts/          # React Context (认证状态)
│       ├── pages/             # 页面组件 (首页/设置/历史/登录/文档)
│       ├── services/          # API 客户端 (axios)
│       ├── styles/            # 全局 CSS (玻璃拟态)
│       └── utils/             # 工具函数 (localStorage)
├── server/                    # 后端 Express 服务
│   ├── config/                # 配置文件
│   ├── db/                    # SQLite 数据库初始化
│   ├── middleware/             # 中间件 (JWT 认证)
│   ├── routes/                # API 路由 (auth/history/upload/convert)
│   └── services/              # 业务逻辑 (图片处理/AI 调用)
└── uploads/                   # 上传的图片存储目录
```

## 环境要求

- Node.js 18+
- npm 9+
- 支持 OpenAI Chat Completions API 格式的视觉模型服务

## 安装与启动

### 1. 安装依赖

```bash
# 后端依赖
cd server
npm install

# 前端依赖
cd ../client
npm install
```

### 2. 启动服务

```bash
# 启动后端 (默认端口 3002)
cd server
npm run dev

# 新开终端，启动前端 (默认端口 5173)
cd client
npm run dev
```

### 3. 访问应用

- 前端页面: http://localhost:5173
- 后端接口: http://localhost:3002
- 健康检查: http://localhost:3002/api/health

## 使用指南

### 第一步：配置 AI API

1. 点击导航栏「设置」
2. 填写 API 端点和密钥
3. 选择模型（推荐小米 MIMO v2.5）
4. 点击「测试连接」验证配置
5. 点击「保存配置」

**推荐 API 服务：**

| 服务 | 端点 | 模型 |
|---|---|---|
| 小米 MIMO | `https://token-plan-cn.xiaomimimo.com/v1` | `mimo-v2.5` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o` |
| Anthropic | 兼容端点 | `claude-3-sonnet-20240229` |

### 第二步：上传图片

三种方式上传包含公式的图片：

- **拖拽上传** — 将图片文件拖到上传区域
- **点击选择** — 点击上传区域选择文件
- **Ctrl+V 粘贴** — 复制截图后直接粘贴

支持格式：PNG、JPG、JPEG、GIF、BMP（最大 10MB）

### 第三步：转换与编辑

1. 上传成功后点击「转换」按钮
2. 等待 AI 识别完成，结果显示在右侧预览区
3. 如需修改，点击「编辑」按钮打开编辑器
4. 使用符号面板快速插入特殊符号

### 第四步：复制使用

点击「复制 LaTeX」按钮，然后：

**在 WPS 中使用：**
1. 选择「插入 → 公式 → LaTeX」
2. 粘贴复制的内容
3. 点击转换即可生成公式

**导出 .tex 文件：**
点击「导出」按钮下载 .tex 文件，可在 TeX 编辑器中编译使用。

### 账号系统（可选）

- 点击「登录」→「去注册」创建账号
- 登录后历史记录自动保存到云端
- 未登录时记录保存在浏览器本地

## API 接口说明

### 认证相关

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/api/auth/register` | 注册（username, password） |
| POST | `/api/auth/login` | 登录（username, password） |
| GET | `/api/auth/me` | 获取当前用户信息（需 Bearer token） |

### 历史记录

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/history` | 获取历史列表（需认证） |
| POST | `/api/history` | 保存记录（imageId, latex, confidence） |
| DELETE | `/api/history/:id` | 删除记录（需认证） |

### 图片处理

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/api/upload` | 上传图片（multipart/form-data） |
| POST | `/api/convert` | 转换图片为 LaTeX（imageId, options） |
| POST | `/api/config/test` | 测试 API 连接（endpoint, apiKey, model） |

## 环境变量

在 `server/` 目录下创建 `.env` 文件（可选）：

```env
PORT=3002
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
```

## 常见问题

**Q: 转换失败？**
检查 API 端点和密钥是否正确，在设置页面点击「测试连接」验证。

**Q: WPS 中公式显示为方块？**
确保在 WPS 中选择「插入 → 公式 → LaTeX」模式粘贴，不要直接粘贴文本。

**Q: 图片上传失败？**
检查文件格式（仅支持 PNG/JPG/GIF/BMP）和大小（不超过 10MB）。

**Q: 历史记录丢失？**
未登录时记录保存在浏览器本地，清除浏览器数据会丢失。建议注册账号将记录保存到云端。

## 许可证

MIT
