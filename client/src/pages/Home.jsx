import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import UploadArea from '../components/upload/UploadArea'
import LatexPreview from '../components/preview/LatexPreview'
import LatexEditor from '../components/preview/LatexEditor'
import { convertImage } from '../services/api'
import { getApiConfig, saveToHistory } from '../utils/storage'

function Home() {
  const [imageId, setImageId] = useState(null)
  const [latex, setLatex] = useState('')
  const [converting, setConverting] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const handleUploadSuccess = (id) => {
    setImageId(id)
    setLatex('')
  }

  const handleConvert = async () => {
    if (!imageId) {
      toast.error('请先上传图片')
      return
    }

    const config = getApiConfig()
    if (!config?.endpoint || !config?.apiKey) {
      toast.error('请先在设置中配置 API')
      return
    }

    setConverting(true)
    try {
      const result = await convertImage(imageId, config)
      if (result.success) {
        setLatex(result.latex)
        toast.success(`转换成功，耗时 ${result.processingTime}ms`)
        saveToHistory({
          imageId,
          latex: result.latex,
          confidence: result.confidence
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || '转换失败')
    } finally {
      setConverting(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(latex)
    toast.success('已复制到剪贴板')
  }

  const handleExport = () => {
    const blob = new Blob([latex], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formula.tex'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('已导出 .tex 文件')
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
            <h2 style={{ marginBottom: '16px' }}>LaTeX 预览</h2>
            <LatexPreview latex={latex} />
            {showEditor && (
              <div style={{ marginTop: '16px' }}>
                <LatexEditor
                  value={latex}
                  onChange={setLatex}
                />
              </div>
            )}
          </div>
        </div>

        <div className="action-bar">
          <button
            className="glass-button"
            onClick={handleConvert}
            disabled={!imageId || converting}
          >
            {converting ? (
              <>
                <span className="loading-spinner" />
                转换中...
              </>
            ) : (
              '转换'
            )}
          </button>

          {latex && (
            <>
              <button
                className="glass-button"
                onClick={handleCopy}
              >
                复制
              </button>
              <button
                className="glass-button"
                onClick={handleExport}
              >
                导出
              </button>
              <button
                className="glass-button"
                onClick={() => setShowEditor(!showEditor)}
              >
                {showEditor ? '隐藏编辑器' : '编辑'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
