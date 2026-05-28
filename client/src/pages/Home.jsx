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
