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
            <button className="back-button">&larr;</button>
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
