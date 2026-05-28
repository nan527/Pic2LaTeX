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
            <button className="back-button">&larr;</button>
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
