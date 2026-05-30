<div align="center">

<img src="https://img.shields.io/badge/Pic2LaTeX-v1.0-blueviolet?style=for-the-badge&labelColor=0f0c29" alt="Pic2LaTeX" />
<br />
<br />

# Pic2LaTeX

### AI-Powered Image to LaTeX Converter

<img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/KaTeX-0.16-CD3278?style=for-the-badge&logo=katex&logoColor=white" alt="KaTeX" />
<img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />

<br />

> Upload an image. Get perfect LaTeX code.
> Math formulas, text, mixed content — powered by AI vision models.

<br />

<img src="https://img.shields.io/badge/拖拽上传-Drag_&_Drop-667eea?style=flat-square&labelColor=302b63" alt="Drag" />
<img src="https://img.shields.io/badge/粘贴截图-Ctrl+V-764ba2?style=flat-square&labelColor=302b63" alt="Paste" />
<img src="https://img.shields.io/badge/实时预览-KaTeX-CD3278?style=flat-square&labelColor=302b63" alt="Preview" />
<img src="https://img.shields.io/badge/WPS兼容-One_Click_Copy-00d2ff?style=flat-square&labelColor=302b63" alt="WPS" />

</div>

---

## Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [API Configuration](#-api-configuration)
- [Supported AI Models](#-supported-ai-models)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [WPS/Word Compatibility](#-wpsword-compatibility)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Environment Variables](#-environment-variables)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## Features

| Feature | Description |
|:--------|:------------|
| **Multi-Upload** | Drag-and-drop, click to browse, or `Ctrl+V` paste screenshots directly |
| **AI Recognition** | Powered by OpenAI-compatible vision models (MIMO, GPT-4V, Claude) |
| **LaTeX Preview** | Real-time rendering with KaTeX — inline math `$...$` and display math `$$...$$` |
| **Symbol Panel** | 7 categories: Greek letters, operators, relations, arrows, sets, structures, templates |
| **WPS/Word Copy** | Auto-strips delimiters, converts `\text{}` to `\mathrm{}`, wraps multi-line in `aligned` |
| **Export .tex** | Download recognized formulas as standard `.tex` files |
| **History** | Auto-saves records with search, expandable preview, copy, export, delete |
| **Account System** | Register to sync history to cloud (SQLite + JWT); works offline with localStorage |
| **Glassmorphism UI** | Frosted glass cards, gradient backgrounds, hover glow, smooth animations |
| **Responsive** | Desktop-first with mobile breakpoints at 768px and 480px |
| **Privacy First** | API keys stored only in browser; images processed in memory, never persisted |
| **Docs Page** | Built-in documentation accessible from the nav bar |

---

## Demo

### Workflow

```
 +-----------+       +--------------+       +---------------+       +----------------+
 |  Upload   | ----> | AI Vision    | ----> | KaTeX Preview | ----> | Copy / Export  |
 |  Image    |       | Model API    |       | (Real-time)   |       | WPS / .tex     |
 +-----------+       +--------------+       +---------------+       +----------------+
   PNG/JPG              MIMO/GPT              Rendered Math           One Click
```

### UI Layout

```
+--------------------------------------------------------------------+
|  [Logo] Pic2LaTeX         [Docs] [Settings] [History] [Login]      |
+--------------------------------------------------------------------+
|                                                                      |
|  +------------------------------+  +------------------------------+  |
|  |                              |  |                              |  |
|  |   Drag & drop image here     |  |   LaTeX Preview              |  |
|  |   or click to select         |  |                              |  |
|  |                              |  |         x^2                  |  |
|  |   [Upload Button]            |  |    --------- + Hello World   |  |
|  |                              |  |         2                    |  |
|  |   Supports Ctrl+V paste      |  |                              |  |
|  +------------------------------+  +------------------------------+  |
|                                                                      |
|  +--------------------------------------------------------------+   |
|  |  [Convert]  [Copy LaTeX]  [Export]  [Edit]                    |   |
|  +--------------------------------------------------------------+   |
|                                                                      |
+--------------------------------------------------------------------+
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| React | 18.2 | UI framework with hooks and context |
| React Router | 6.x | Client-side SPA routing |
| Ant Design | 5.x | UI component library |
| KaTeX | 0.16 | LaTeX math rendering engine |
| Vite | 5.x | Build tool and dev server with HMR |
| Axios | 1.6 | Promise-based HTTP client |
| react-dropzone | 14.x | Drag-and-drop file upload |
| react-hot-toast | 2.4 | Toast notifications |

### Backend

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| Node.js | 18+ | JavaScript runtime |
| Express | 4.x | Web application framework |
| SQLite | 3 | Embedded database (better-sqlite3) |
| JWT | - | Token-based authentication (jsonwebtoken) |
| bcryptjs | - | Password hashing |
| Multer | 1.4 | Multipart form data handling |
| Sharp | 0.33 | Image processing and optimization |
| Helmet | 7.x | Security HTTP headers |
| Morgan | 1.10 | HTTP request logger |
| CORS | 2.8 | Cross-origin resource sharing |
| dotenv | 16.x | Environment variable management |

### Design System

| Element | Value |
|:--------|:------|
| Style | Glassmorphism (frosted glass effect) |
| Primary Gradient | `#667eea` → `#764ba2` |
| Background | `#0f0c29` → `#302b63` → `#24243e` |
| Accent | `#00d2ff` (Neon Blue) |
| Animations | fadeIn, slideIn, scaleIn, pulse, hover glow |

---

## Architecture

```
                           +-----------------+
                           |   User Browser  |
                           +--------+--------+
                                    |
                      +-------------+-------------+
                      |                           |
                Upload Image              Convert Request
                (multipart)               (JSON + config)
                      |                           |
                      v                           v
              +-------+--------+         +--------+---------+
              |  POST /upload   |         |  POST /convert    |
              +-------+--------+         +--------+---------+
                      |                           |
                      v                           v
              +-------+--------+         +--------+---------+
              |  Sharp Resize   |         |  AI Vision API    |
              |  & Optimize     |         |  (OpenAI format)  |
              +-------+--------+         +--------+---------+
                      |                           |
                      v                           v
              +-------+--------+         +--------+---------+
              |  SQLite Store   |         |  Parse & Return   |
              |  (if logged in) |         |  LaTeX String     |
              +----------------+         +------------------+
                                                    |
                                                    v
                                           +--------+---------+
                                           |  KaTeX Render     |
                                           |  (Browser-side)   |
                                           +------------------+
```

---

## Getting Started

### Prerequisites

| Requirement | Version | Check |
|:------------|:--------|:------|
| Node.js | >= 18.0.0 | `node --version` |
| npm | >= 9.0.0 | `npm --version` |
| Git | any | `git --version` |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Pic2LaTeX-py.git
cd Pic2LaTeX-py

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
```

### Configuration

Create `.env` in the `server/` directory:

```env
PORT=3002
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
```

### Start Development

```bash
# Terminal 1 — Backend (port 3002)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
# Access at http://localhost:3002
```

---

## Usage Guide

### Step 1: Configure API

1. Click **Settings** in the navigation bar
2. Enter your API endpoint (e.g. `https://token-plan-cn.xiaomimimo.com/v1`)
3. Enter your API key
4. Select a model from the dropdown
5. Click **Test Connection** to verify
6. Click **Save Config**

### Step 2: Upload an Image

Three ways to upload:

| Method | How |
|:-------|:----|
| **Drag & Drop** | Drag an image file onto the upload area |
| **Click** | Click the upload area to open file picker |
| **Paste** | Press `Ctrl+V` anywhere on the page |

Supported: `PNG` `JPG` `JPEG` `GIF` `BMP` — Max 10MB

### Step 3: Convert

Click the **Convert** button. The AI analyzes the image and generates LaTeX code.

### Step 4: Edit & Refine

- **Preview**: Rendered formula updates in real-time
- **Edit**: Click the Edit button to open the code editor
- **Symbol Panel**: Click math symbols to insert them at the cursor
- **Copy LaTeX**: One-click copy with WPS/Word compatibility
- **Export**: Download as a `.tex` file

### Account System (Optional)

| Mode | Storage | Sync |
|:-----|:--------|:-----|
| Guest | Browser localStorage | None |
| Logged In | Server SQLite | Cross-device |

Register: Nav bar > **Login** > **Go to Register**

---

## API Configuration

| Field | Description | Example |
|:------|:------------|:--------|
| **API Endpoint** | OpenAI-compatible base URL | `https://token-plan-cn.xiaomimimo.com/v1` |
| **API Key** | Your API key (stored in browser only) | `sk-xxxxxxxxxxxxxxxx` |
| **Model** | Vision model identifier | `mimo-v2.5` |

> **Security**: Your API key is stored in `localStorage` and never sent to our servers. It is only used to communicate directly with your chosen AI provider.

---

## Supported AI Models

| Provider | Models | Recommended |
|:---------|:-------|:------------|
| **Xiaomi MIMO** | `mimo-v2.5` | Best for China mainland |
| **OpenAI** | `gpt-4-vision-preview`, `gpt-4o`, `gpt-4o-mini` | High accuracy |
| **Anthropic** | `claude-3-opus-20240229`, `claude-3-sonnet-20240229`, `claude-3-haiku-20240307` | Strong reasoning |
| **Other** | Any OpenAI Chat Completions API compatible service | Just set endpoint + model |

---

## Project Structure

<details>
<summary><strong>Click to expand full structure</strong></summary>

```
Pic2LaTeX-py/
|
+-- client/                          # Frontend (React + Vite)
|   +-- src/
|   |   +-- components/
|   |   |   +-- upload/
|   |   |   |   +-- UploadArea.jsx   # Drag-drop + paste upload
|   |   |   +-- preview/
|   |   |   |   +-- LatexPreview.jsx # KaTeX rendering
|   |   |   |   +-- LatexEditor.jsx  # Code editor
|   |   |   |   +-- SymbolPanel.jsx  # Math symbol grid
|   |   |   +-- settings/
|   |   |       +-- ApiConfig.jsx    # API endpoint/key/model form
|   |   +-- pages/
|   |   |   +-- Home.jsx             # Main page
|   |   |   +-- Settings.jsx         # API settings
|   |   |   +-- History.jsx          # Conversion history
|   |   |   +-- Login.jsx            # Auth page
|   |   |   +-- Docs.jsx             # Built-in docs
|   |   +-- services/
|   |   |   +-- api.js               # Axios client
|   |   +-- contexts/
|   |   |   +-- AuthContext.jsx       # Auth state (JWT)
|   |   +-- utils/
|   |   |   +-- storage.js           # localStorage helpers
|   |   +-- styles/
|   |   |   +-- glassmorphism.css    # Global styles
|   |   +-- App.jsx                  # Root + routing
|   |   +-- main.jsx                 # Entry point
|   +-- index.html
|   +-- package.json
|   +-- vite.config.js
|
+-- server/                          # Backend (Express)
|   +-- routes/                      # API handlers
|   +-- middleware/
|   |   +-- errorHandler.js          # Error handling
|   +-- db/                          # SQLite init
|   +-- services/                    # Business logic
|   +-- config/                      # Server config
|   +-- app.js                       # Express app
|   +-- package.json
|
+-- uploads/                         # Temp image storage
+-- docs/
+-- .gitignore
+-- README.md
```

</details>

---

## API Endpoints

### Authentication

| Method | Endpoint | Body | Auth | Description |
|:-------|:---------|:-----|:-----|:------------|
| `POST` | `/api/auth/register` | `{ username, password }` | No | Register new account |
| `POST` | `/api/auth/login` | `{ username, password }` | No | Login, returns JWT |
| `GET` | `/api/auth/me` | — | Bearer | Get current user |

### History

| Method | Endpoint | Body | Auth | Description |
|:-------|:---------|:-----|:-----|:------------|
| `GET` | `/api/history` | — | Bearer | Get history list |
| `POST` | `/api/history` | `{ imageId, latex, confidence }` | Bearer | Save record |
| `DELETE` | `/api/history/:id` | — | Bearer | Delete record |

### Image Processing

| Method | Endpoint | Body | Auth | Description |
|:-------|:---------|:-----|:-----|:------------|
| `POST` | `/api/upload` | `multipart/form-data` | No | Upload image |
| `POST` | `/api/convert` | `{ imageId, options }` | No | Convert to LaTeX |
| `POST` | `/api/config/test` | `{ endpoint, apiKey, model }` | No | Test API connection |

### Request Examples

```bash
# Upload
curl -X POST http://localhost:3002/api/upload \
  -F "image=@formula.png"

# Convert
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

## WPS/Word Compatibility

When you click **Copy LaTeX**, the app automatically:

| Transform | Before | After |
|:----------|:-------|:------|
| Strip delimiters | `\[...\]`, `$...$` | Pure LaTeX |
| Text command | `\text{Hello}` | `\mathrm{Hello}` |
| Multi-line wrap | Raw `\\` lines | `\begin{aligned}...\end{aligned}` |
| Spacing clean | `\\[1.5ex]` | `\\` |

**To use in WPS**: Insert > Equation > LaTeX > Paste > Convert

---

## Keyboard Shortcuts

| Shortcut | Action |
|:---------|:-------|
| `Ctrl + V` | Paste screenshot from clipboard |
| Drag & Drop | Drop image onto upload area |

---

## Environment Variables

Create `server/.env`:

```env
PORT=3002                    # Server port
NODE_ENV=development         # development | production
CORS_ORIGIN=http://localhost:5173   # Allowed origin
JWT_SECRET=your-secret-key   # JWT signing secret
```

---

## FAQ

<details>
<summary><strong>Q: Conversion fails?</strong></summary>

Check your API endpoint and key in Settings. Click **Test Connection** to verify. Ensure the image is clear and contains math formulas.
</details>

<details>
<summary><strong>Q: WPS shows squares instead of formulas?</strong></summary>

Use **Insert > Equation > LaTeX** mode in WPS, not direct text paste.
</details>

<details>
<summary><strong>Q: Image upload fails?</strong></summary>

Check format (PNG/JPG/GIF/BMP only) and size (max 10MB).
</details>

<details>
<summary><strong>Q: History records disappeared?</strong></summary>

Guest mode stores records in browser localStorage. Clearing browser data removes them. Register an account to sync to cloud.
</details>

<details>
<summary><strong>Q: Which AI model should I use?</strong></summary>

For users in China: Xiaomi MIMO (`mimo-v2.5`) — fast and affordable.
For best accuracy: GPT-4o or Claude 3 Opus.
</details>

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">

**Pic2LaTeX** — Image to LaTeX, powered by AI.

Made with React, Node.js, and KaTeX.

</div>
