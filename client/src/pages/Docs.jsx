import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const sections = [
  {
    id: 'intro',
    title: '项目简介',
    content: `Pic2LaTeX 是一款基于 AI 视觉模型的数学公式识别工具。用户只需上传包含数学公式的图片，系统会自动识别并转换为标准的 LaTeX 代码。支持拖拽上传、Ctrl+V 粘贴截图、实时预览、一键复制到 WPS/Word 等办公软件。`
  },
  {
    id: 'features',
    title: '核心功能',
    items: [
      { title: '图片上传', desc: '支持拖拽上传、点击选择文件、Ctrl+V 粘贴截图三种方式。支持 PNG、JPG、JPEG、GIF、BMP 格式，最大 10MB。' },
      { title: 'AI 识别转换', desc: '调用 OpenAI 兼容的视觉模型 API（如小米 MIMO、GPT-4 Vision、Claude 等）将图片中的数学公式转换为 LaTeX 代码。' },
      { title: 'LaTeX 实时预览', desc: '使用 KaTeX 渲染引擎实时预览 LaTeX 公式效果，所见即所得。' },
      { title: '数学符号面板', desc: '内置 7 大类常用数学符号（希腊字母、运算符、关系符、箭头、集合、结构模板等），点击即可插入到编辑器。' },
      { title: '一键复制', desc: '复制时自动处理 LaTeX 格式，兼容 WPS/Word 的公式编辑器。自动将 \\text{} 转为 \\mathrm{}，多行公式自动包裹 \\begin{aligned} 环境。' },
      { title: '导出 .tex 文件', desc: '将识别结果导出为标准 .tex 文件，可直接在 LaTeX 编辑器中使用。' },
      { title: '历史记录', desc: '自动保存识别记录，支持搜索、展开预览、复制、导出、删除操作。' },
      { title: '账号系统', desc: '注册账号后，历史记录保存到服务端数据库，跨设备同步。未登录时使用本地 localStorage 存储。' }
    ]
  },
  {
    id: 'quickstart',
    title: '快速开始',
    steps: [
      { step: '1', title: '配置 API', desc: '进入「设置」页面，填写 API 端点和密钥。推荐使用小米 MIMO（https://token-plan-cn.xiaomimimo.com/v1），也支持 OpenAI、Claude 等兼容接口。填写后点击「测试连接」验证是否正常。' },
      { step: '2', title: '上传图片', desc: '在首页拖拽图片到上传区域，或点击选择文件，或直接 Ctrl+V 粘贴截图。' },
      { step: '3', title: '点击转换', desc: '上传成功后点击「转换」按钮，等待 AI 识别完成。' },
      { step: '4', title: '编辑与调整', desc: '识别结果会显示在右侧预览区。点击「编辑」按钮可手动修改 LaTeX 代码，使用符号面板快速插入特殊符号。' },
      { step: '5', title: '复制使用', desc: '点击「复制 LaTeX」按钮，然后在 WPS 中选择「插入 → 公式 → LaTeX」，粘贴后即可转换为公式。' }
    ]
  },
  {
    id: 'wps',
    title: 'WPS/Word 兼容说明',
    content: `复制的 LaTeX 代码已针对 WPS 进行了优化处理：`,
    items: [
      { title: '自动转换', desc: '\\text{} 自动转为 \\mathrm{}（WPS 不支持 \\text 命令）' },
      { title: '自动包裹', desc: '多行公式自动包裹 \\begin{aligned}...\\end{aligned} 环境' },
      { title: '清理分隔符', desc: '自动去除 \\[...\\] 和 $...$ 等数学分隔符' },
      { title: '间距处理', desc: '自动清理 \\\\[1.5ex] 等间距命令为普通换行' }
    ]
  },
  {
    id: 'account',
    title: '账号系统',
    items: [
      { title: '注册', desc: '点击导航栏「登录」→「去注册」，填写用户名（2-20字符）和密码（至少6字符）。' },
      { title: '登录', desc: '注册后自动登录，登录状态保持 7 天。' },
      { title: '数据同步', desc: '登录后识别记录自动保存到服务端，历史记录页面显示云端数据。' },
      { title: '未登录模式', desc: '不注册也可以正常使用所有功能，历史记录保存在浏览器本地（localStorage）。' }
    ]
  },
  {
    id: 'models',
    title: '支持的 AI 模型',
    content: `本工具兼容所有 OpenAI 格式的视觉模型 API：`,
    items: [
      { title: '小米 MIMO', desc: 'mimo-v2.5 — 推荐，国内访问速度快' },
      { title: 'OpenAI', desc: 'GPT-4 Vision Preview、GPT-4o、GPT-4o Mini' },
      { title: 'Anthropic', desc: 'Claude 3 Opus、Claude 3 Sonnet、Claude 3 Haiku' },
      { title: '其他', desc: '任何兼容 OpenAI Chat Completions API 格式的服务' }
    ]
  },
  {
    id: 'keyboard',
    title: '快捷操作',
    items: [
      { title: 'Ctrl + V', desc: '在页面任意位置粘贴剪贴板中的截图，自动上传' },
      { title: '拖拽上传', desc: '将图片文件直接拖到上传区域' },
      { title: '符号面板', desc: '点击「编辑」按钮后显示，点击符号直接插入' }
    ]
  },
  {
    id: 'faq',
    title: '常见问题',
    items: [
      { q: '转换失败怎么办？', a: '检查 API 端点和密钥是否正确，在设置页面点击「测试连接」验证。确认图片清晰且包含数学公式。' },
      { q: 'WPS 中公式显示为方块？', a: '确保在 WPS 中选择「插入 → 公式 → LaTeX」模式粘贴，而不是直接粘贴文本。' },
      { q: '图片上传失败？', a: '检查文件格式（仅支持 PNG/JPG/GIF/BMP）和大小（不超过 10MB）。' },
      { q: '历史记录丢失？', a: '未登录时记录保存在浏览器本地，清除浏览器数据会丢失。建议注册账号将记录保存到云端。' },
      { q: '支持哪些图片格式？', a: 'PNG、JPG、JPEG、GIF、BMP，最大 10MB。' }
    ]
  }
]

function Docs() {
  const { user, logout } = useAuth()

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/settings" className="nav-link">设置</Link>
            <Link to="/history" className="nav-link">历史记录</Link>
            {user ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent-color)', fontSize: '14px' }}>{user.username}</span>
                <button
                  onClick={logout}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}
                >
                  退出
                </button>
              </span>
            ) : (
              <Link to="/login" className="nav-link">登录</Link>
            )}
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in">
        <div className="page-header">
          <Link to="/">
            <button className="back-button">&larr;</button>
          </Link>
          <h1 className="page-title">使用文档</h1>
        </div>

        {/* Table of Contents */}
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '12px' }}>目录</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  color: 'var(--accent-color)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 210, 255, 0.1)',
                  transition: 'background 0.2s'
                }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {sections.map(section => (
          <div
            key={section.id}
            id={section.id}
            className="glass-card"
            style={{ marginBottom: '20px', scrollMarginTop: '80px' }}
          >
            <h2 style={{
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--glass-border)',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {section.title}
            </h2>

            {section.content && (
              <p style={{ lineHeight: 1.8, opacity: 0.9, marginBottom: section.items ? '16px' : 0 }}>
                {section.content}
              </p>
            )}

            {section.steps && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {section.steps.map(item => (
                  <div
                    key={item.step}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--primary-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '13px',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.items && !section.steps && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {item.title && (
                      <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--accent-color)' }}>
                        {item.title}
                      </div>
                    )}
                    {item.q && (
                      <div style={{ fontWeight: 600, marginBottom: '4px', color: 'var(--accent-color)' }}>
                        Q: {item.q}
                      </div>
                    )}
                    <div style={{ fontSize: '14px', opacity: 0.8, lineHeight: 1.6 }}>
                      {item.desc || item.a}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '24px 0', opacity: 0.5, fontSize: '13px' }}>
          Pic2LaTeX — 图片转 LaTeX 公式识别工具
        </div>
      </div>
    </div>
  )
}

export default Docs
