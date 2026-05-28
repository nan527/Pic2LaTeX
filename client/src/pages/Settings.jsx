import React from 'react'
import { Link } from 'react-router-dom'
import ApiConfig from '../components/settings/ApiConfig'
import { useAuth } from '../contexts/AuthContext'

function Settings() {
  const { user, logout } = useAuth()
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">Pic2LaTeX</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/docs" className="nav-link">文档</Link>
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
