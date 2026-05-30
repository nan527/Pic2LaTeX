<div align="center">

<img src="https://img.shields.io/badge/Pic2LaTeX-v1.0-blueviolet?style=for-the-badge&labelColor=0f0c29" alt="Pic2LaTeX" />
<br />
<br />

# Pic2LaTeX

### AI 驱动的图片转 LaTeX 公式识别工具

<img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/KaTeX-0.16-CD3278?style=for-the-badge&logo=katex&logoColor=white" alt="KaTeX" />
<img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />

<br />

> 上传一张图片，获得完美的 LaTeX 代码。
> 数学公式、文本、混合内容 —— 由 AI 视觉模型驱动。

<br />

<img src="https://img.shields.io/badge/拖拽上传-Drag_&_Drop-667eea?style=flat-square&labelColor=302b63" alt="Drag" />
<img src="https://img.shields.io/badge/粘贴截图-Ctrl+V-764ba2?style=flat-square&labelColor=302b63" alt="Paste" />
<img src="https://img.shields.io/badge/实时预览-KaTeX-CD3278?style=flat-square&labelColor=302b63" alt="Preview" />
<img src="https://img.shields.io/badge/WPS兼容-一键复制-00d2ff?style=flat-square&labelColor=302b63" alt="WPS" />

</div>

---

## 目录

- [功能特性](#-功能特性)
- [效果展示](#-效果展示)
- [技术栈](#-技术栈)
- [系统架构](#-系统架构)
- [快速开始](#-快速开始)
- [使用指南](#-使用指南)
- [API 配置](#-api-配置)
- [支持的 AI 模型](#-支持的-ai-模型)
- [项目结构](#-项目结构)
- [接口文档](#-接口文档)
- [WPS/Word 兼容说明](#-wpsword-兼容说明)
- [快捷操作](#-快捷操作)
- [环境变量](#-环境变量)
- [常见问题](#-常见问题)
- [参与贡献](#-参与贡献)
- [开源许可](#-开源许可)

---

## 功能特性

| 功能 | 说明 |
|:-----|:-----|
| **多种上传方式** | 拖拽上传、点击选择文件、`Ctrl+V` 粘贴截图 |
| **AI 识别转换** | 支持小米 MIMO、GPT-4 Vision、Claude 等 OpenAI 兼容视觉模型 |
| **LaTeX 实时预览** | KaTeX 渲染引擎，支持行内公式 `$...$` 和行间公式 `$$...$$` |
| **数学符号面板** | 7 大类常用符号：希腊字母、运算符、关系符、箭头、集合、结构模板 |
| **WPS 兼容复制** | 自动去除分隔符、转换 `\text{}` 为 `\mathrm{}`、多行公式自动包裹 `aligned` |
| **导出 .tex 文件** | 下载标准 LaTeX 文件，可在 TeX 编辑器中直接使用 |
| **历史记录** | 自动保存识别记录，支持搜索、展开预览、复制、导出、删除 |
| **账号系统** | 注册后历史记录保存到云端（SQLite + JWT），未登录使用 localStorage |
| **玻璃拟态 UI** | 毛玻璃卡片、渐变背景、悬停发光、流畅动画 |
| **响应式布局** | 桌面优先，移动端适配（768px / 480px 断点） |
| **隐私安全** | API 密钥仅存浏览器；图片内存处理，不持久化存储 |
| **内置文档** | 导航栏可直接访问使用文档 |

---

## 效果展示

### 工作流程

```
 +-----------+       +--------------+       +---------------+       +----------------+
 |  上传图片  | ----> |  AI 视觉模型  | ----> | KaTeX 实时预览 | ----> | 复制 / 导出    |
 |  PNG/JPG   |       |  MIMO/GPT    |       |  渲染数学公式  |       | WPS / .tex     |
 +-----------+       +--------------+       +---------------+       +----------------+
```

### 界面布局

```
+--------------------------------------------------------------------+
|  [Logo] Pic2LaTeX         [文档] [设置] [历史记录] [登录]           |
+--------------------------------------------------------------------+
|                                                                      |
|  +------------------------------+  +------------------------------+  |
|  |                              |  |                              |  |
|  |   拖拽图片到此处             |  |   LaTeX 预览                 |  |
|  |   或点击选择文件             |  |                              |  |
|  |                              |  |         x^2                  |  |
|  |   [上传按钮]                 |  |    --------- + Hello World   |  |
|  |                              |  |         2                    |  |
|  |   支持 Ctrl+V 粘贴截图       |  |                              |  |
|  +------------------------------+  +------------------------------+  |
|                                                                      |
|  +--------------------------------------------------------------+   |
|  |  [转换]  [复制 LaTeX]  [导出]  [编辑]                          |   |
|  +--------------------------------------------------------------+   |
|                                                                      |
+--------------------------------------------------------------------+
```

---

## 技术栈

### 前端

| 技术 | 版本 | 用途 |
|:-----|:-----|:-----|
| React | 18.2 | UI 框架，Hooks + Context |
| React Router | 6.x | 客户端 SPA 路由 |
| Ant Design | 5.x | UI 组件库 |
| KaTeX | 0.16 | LaTeX 数学公式渲染引擎 |
| Vite | 5.x | 构建工具，支持 HMR 热更新 |
| Axios | 1.6 | Promise 风格 HTTP 客户端 |
| react-dropzone | 14.x | 拖拽上传组件 |
| react-hot-toast | 2.4 | Toast 通知 |

### 后端

| 技术 | 版本 | 用途 |
|:-----|:-----|:-----|
| Node.js | 18+ | JavaScript 运行时 |
| Express | 4.x | Web 应用框架 |
| SQLite | 3 | 嵌入式数据库（better-sqlite3） |
| JWT | - | Token 认证（jsonwebtoken） |
| bcryptjs | - | 密码哈希 |
| Multer | 1.4 | 文件上传中间件 |
| Sharp | 0.33 | 图片处理与优化 |
| Helmet | 7.x | 安全 HTTP 头 |
| Morgan | 1.10 | HTTP 请求日志 |
| CORS | 2.8 | 跨域资源共享 |
| dotenv | 16.x | 环境变量管理 |

### 设计系统

| 元素 | 值 |
|:-----|:---|
| 风格 | 玻璃拟态（Glassmorphism） |
| 主渐变色 | `#667eea` → `#764ba2` |
| 背景渐变 | `#0f0c29` → `#302b63` → `#24243e` |
| 强调色 | `#00d2ff`（霓虹蓝） |
| 动画效果 | fadeIn、slideIn、scaleIn、pulse、hover glow |

---

## 系统架构

```
                           +-----------------+
                           |    用户浏览器    |
                           +--------+--------+
                                    |
                      +-------------+-------------+
                      |                           |
                上传图片                      转换请求
               (multipart)                (JSON + 配置)
                      |                           |
                      v                           v
              +-------+--------+         +--------+---------+
              |  POST /upload   |         |  POST /convert    |
              +-------+--------+         +--------+---------+
                      |                           |
                      v                           v
              +-------+--------+         +--------+---------+
              |  Sharp 图片处理  |         |  AI 视觉模型 API  |
              |  缩放 & 优化     |         |  (OpenAI 格式)    |
              +-------+--------+         +--------+---------+
                      |                           |
                      v                           v
              +-------+--------+         +--------+---------+
              |  SQLite 存储     |         |  解析并返回       |
              | （登录用户）      |         |  LaTeX 字符串     |
              +----------------+         +------------------+
                                                    |
                                                    v
                                           +--------+---------+
                                           |  KaTeX 渲染       |
                                           | （浏览器端）       |
                                           +------------------+
```

---

## 快速开始

### 环境要求

| 依赖 | 版本 | 检查命令 |
|:-----|:-----|:---------|
| Node.js | >= 18.0.0 | `node --version` |
| npm | >= 9.0.0 | `npm --version` |
| Git | 任意 | `git --version` |

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/Pic2LaTeX-py.git
cd Pic2LaTeX-py

# 2. 安装后端依赖
cd server
npm install

# 3. 安装前端依赖
cd ../client
npm install
```

### 环境配置

在 `server/` 目录下创建 `.env` 文件：

```env
PORT=3002
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
```

### 启动开发环境

```bash
# 终端 1 — 启动后端（端口 3002）
cd server
npm run dev

# 终端 2 — 启动前端（端口 5173）
cd client
npm run dev
```

浏览器打开 `http://localhost:5173`。

### 生产构建

```bash
# 构建前端
cd client
npm run build

# 启动生产服务器
cd ../server
npm start
# 访问 http://localhost:3002
```

---

## 使用指南

### 第一步：配置 AI API

1. 点击导航栏「**设置**」
2. 填写 API 端点（如 `https://token-plan-cn.xiaomimimo.com/v1`）
3. 填写 API 密钥
4. 选择模型
5. 点击「**测试连接**」验证配置
6. 点击「**保存配置**」

### 第二步：上传图片

三种上传方式：

| 方式 | 操作 |
|:-----|:-----|
| **拖拽上传** | 将图片文件拖到上传区域 |
| **点击选择** | 点击上传区域打开文件选择器 |
| **粘贴截图** | 按 `Ctrl+V` 粘贴剪贴板中的截图 |

支持格式：`PNG` `JPG` `JPEG` `GIF` `BMP` —— 最大 10MB

### 第三步：转换

点击「**转换**」按钮，AI 分析图片并生成 LaTeX 代码。

### 第四步：编辑与导出

- **预览**：公式实时渲染更新
- **编辑**：点击「编辑」按钮打开代码编辑器
- **符号面板**：点击数学符号插入到光标位置
- **复制 LaTeX**：一键复制，自动兼容 WPS/Word
- **导出**：下载 `.tex` 文件

### 账号系统（可选）

| 模式 | 存储位置 | 同步 |
|:-----|:---------|:-----|
| 游客模式 | 浏览器 localStorage | 无 |
| 登录模式 | 服务端 SQLite | 跨设备同步 |

注册方式：导航栏 > **登录** > **去注册**

---

## API 配置

| 字段 | 说明 | 示例 |
|:-----|:-----|:-----|
| **API 端点** | OpenAI 兼容的 API 地址 | `https://token-plan-cn.xiaomimimo.com/v1` |
| **API 密钥** | 你的 API 密钥（仅存浏览器） | `sk-xxxxxxxxxxxxxxxx` |
| **模型** | 视觉模型标识符 | `mimo-v2.5` |

> **安全说明**：API 密钥存储在浏览器 `localStorage` 中，不会发送到本项目服务器。密钥仅用于直接与你选择的 AI 服务商通信。

---

## 支持的 AI 模型

| 服务商 | 模型 | 推荐场景 |
|:-------|:-----|:---------|
| **小米 MIMO** | `mimo-v2.5` | 国内用户首选，速度快、价格低 |
| **OpenAI** | `gpt-4-vision-preview`、`gpt-4o`、`gpt-4o-mini` | 高精度识别 |
| **Anthropic** | `claude-3-opus-20240229`、`claude-3-sonnet-20240229`、`claude-3-haiku-20240307` | 强推理能力 |
| **其他** | 任何兼容 OpenAI Chat Completions API 的服务 | 只需设置端点和模型名 |

---

## 项目结构

<details>
<summary><strong>点击展开完整目录结构</strong></summary>

```
Pic2LaTeX-py/
|
+-- client/                          # 前端（React + Vite）
|   +-- src/
|   |   +-- components/
|   |   |   +-- upload/
|   |   |   |   +-- UploadArea.jsx   # 拖拽 + 粘贴上传组件
|   |   |   +-- preview/
|   |   |   |   +-- LatexPreview.jsx # KaTeX 渲染组件
|   |   |   |   +-- LatexEditor.jsx  # LaTeX 代码编辑器
|   |   |   |   +-- SymbolPanel.jsx  # 数学符号面板
|   |   |   +-- settings/
|   |   |       +-- ApiConfig.jsx    # API 配置表单
|   |   +-- pages/
|   |   |   +-- Home.jsx             # 首页
|   |   |   +-- Settings.jsx         # 设置页
|   |   |   +-- History.jsx          # 历史记录页
|   |   |   +-- Login.jsx            # 登录/注册页
|   |   |   +-- Docs.jsx             # 内置文档页
|   |   +-- services/
|   |   |   +-- api.js               # Axios API 客户端
|   |   +-- contexts/
|   |   |   +-- AuthContext.jsx       # 认证状态管理（JWT）
|   |   +-- utils/
|   |   |   +-- storage.js           # localStorage 工具函数
|   |   +-- styles/
|   |   |   +-- glassmorphism.css    # 全局玻璃拟态样式
|   |   +-- App.jsx                  # 根组件 + 路由
|   |   +-- main.jsx                 # 入口文件
|   +-- index.html
|   +-- package.json
|   +-- vite.config.js
|
+-- server/                          # 后端（Express）
|   +-- routes/                      # API 路由处理
|   +-- middleware/
|   |   +-- errorHandler.js          # 错误处理中间件
|   +-- db/                          # SQLite 数据库初始化
|   +-- services/                    # 业务逻辑层
|   +-- config/                      # 服务器配置
|   +-- app.js                       # Express 应用
|   +-- package.json
|
+-- uploads/                         # 临时图片存储
+-- docs/                            # 项目文档
+-- .gitignore
+-- README.md
```

</details>

---

## 接口文档

### 认证相关

| 方法 | 路径 | 请求体 | 认证 | 说明 |
|:-----|:-----|:-------|:-----|:-----|
| `POST` | `/api/auth/register` | `{ username, password }` | 无 | 注册新账号 |
| `POST` | `/api/auth/login` | `{ username, password }` | 无 | 登录，返回 JWT |
| `GET` | `/api/auth/me` | — | Bearer | 获取当前用户信息 |

### 历史记录

| 方法 | 路径 | 请求体 | 认证 | 说明 |
|:-----|:-----|:-------|:-----|:-----|
| `GET` | `/api/history` | — | Bearer | 获取历史列表 |
| `POST` | `/api/history` | `{ imageId, latex, confidence }` | Bearer | 保存记录 |
| `DELETE` | `/api/history/:id` | — | Bearer | 删除记录 |

### 图片处理

| 方法 | 路径 | 请求体 | 认证 | 说明 |
|:-----|:-----|:-------|:-----|:-----|
| `POST` | `/api/upload` | `multipart/form-data` | 无 | 上传图片 |
| `POST` | `/api/convert` | `{ imageId, options }` | 无 | 转换为 LaTeX |
| `POST` | `/api/config/test` | `{ endpoint, apiKey, model }` | 无 | 测试 API 连接 |

### 请求示例

```bash
# 上传图片
curl -X POST http://localhost:3002/api/upload \
  -F "image=@formula.png"

# 转换图片
curl -X POST http://localhost:3002/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "imageId": "img_123456",
    "options": {
      "endpoint": "https://api.example.com/v1",
      "apiKey": "sk-xxx",
      "model": "gpt-4o"
    }
  }'
```

---

## WPS/Word 兼容说明

点击「**复制 LaTeX**」时，应用自动执行以下转换：

| 转换操作 | 转换前 | 转换后 |
|:---------|:-------|:-------|
| 去除分隔符 | `\[...\]`、`$...$` | 纯 LaTeX 代码 |
| 文本命令 | `\text{Hello}` | `\mathrm{Hello}` |
| 多行包裹 | 原始 `\\` 换行 | `\begin{aligned}...\end{aligned}` |
| 间距清理 | `\\[1.5ex]` | `\\` |

**在 WPS 中使用**：插入 > 公式 > LaTeX > 粘贴 > 转换

---

## 快捷操作

| 快捷键 | 功能 |
|:-------|:-----|
| `Ctrl + V` | 粘贴剪贴板中的截图 |
| 拖拽上传 | 将图片文件拖到上传区域 |

---

## 环境变量

在 `server/.env` 中配置：

```env
PORT=3002                    # 服务端口
NODE_ENV=development         # development | production
CORS_ORIGIN=http://localhost:5173   # 允许的跨域来源
JWT_SECRET=your-secret-key   # JWT 签名密钥
```

---

## 常见问题

<details>
<summary><strong>Q: 转换失败怎么办？</strong></summary>

检查 API 端点和密钥是否正确，在设置页面点击「测试连接」验证。确认图片清晰且包含数学公式。
</details>

<details>
<summary><strong>Q: WPS 中公式显示为方块？</strong></summary>

确保在 WPS 中选择「插入 > 公式 > LaTeX」模式粘贴，不要直接粘贴文本。
</details>

<details>
<summary><strong>Q: 图片上传失败？</strong></summary>

检查文件格式（仅支持 PNG/JPG/GIF/BMP）和大小（不超过 10MB）。
</details>

<details>
<summary><strong>Q: 历史记录丢失？</strong></summary>

未登录时记录保存在浏览器本地，清除浏览器数据会丢失。建议注册账号将记录保存到云端。
</details>

<details>
<summary><strong>Q: 推荐使用哪个 AI 模型？</strong></summary>

国内用户推荐小米 MIMO（`mimo-v2.5`），速度快、价格低。追求高精度推荐 GPT-4o 或 Claude 3 Opus。
</details>

---

## 参与贡献

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'feat: 添加某功能'`）
4. 推送到远程（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

---

## 开源许可

本项目基于 **MIT License** 开源。

---

<div align="center">

**Pic2LaTeX** —— 图片转 LaTeX，AI 驱动。

使用 React + Node.js + KaTeX 构建。

</div>
