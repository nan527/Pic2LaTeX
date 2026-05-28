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
