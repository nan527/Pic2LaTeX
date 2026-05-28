import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import UploadArea from '../components/upload/UploadArea'
import LatexPreview from '../components/preview/LatexPreview'
import LatexEditor from '../components/preview/LatexEditor'
import SymbolPanel from '../components/preview/SymbolPanel'
import { convertImage, apiSaveHistory } from '../services/api'
import { getApiConfig, saveToHistory } from '../utils/storage'
import { useAuth } from '../contexts/AuthContext'

function Home() {
  const [imageId, setImageId] = useState(null)
  const [latex, setLatex] = useState('')
  const [converting, setConverting] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const { user, logout } = useAuth()

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
        if (user) {
          apiSaveHistory({
            imageId,
            latex: result.latex,
            confidence: result.confidence
          }).catch(() => {})
        } else {
          saveToHistory({
            imageId,
            latex: result.latex,
            confidence: result.confidence
          })
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || '转换失败')
    } finally {
      setConverting(false)
    }
  }

  const handleCopy = () => {
    let s = latex.trim()

    // Remove \[...\] display math wrappers
    s = s.replace(/\\\[\s*/g, '')
    s = s.replace(/\s*\\\]/g, '')

    // Unwrap $...$ inline math delimiters
    s = s.replace(/\$([^$]+?)\$/g, '$1')

    // Convert \text{} to \mathrm{} (WPS supports \mathrm but not \text)
    s = s.replace(/\\text\{([^}]*)\}/g, '\\mathrm{$1}')

    // Remove \\[1.5ex] spacing commands, keep plain \\
    s = s.replace(/\\\\\[[^\]]*\]/g, '\\\\')

    // Clean up whitespace
    s = s.replace(/[ \t]+/g, ' ')
    s = s.replace(/\n\s*\n/g, '\n')
    s = s.trim()

    // If no aligned/array environment, wrap multi-line content in \begin{aligned}
    if (!/\\begin\{(aligned|array|matrix|cases)\}/.test(s)) {
      const lines = s.split(/\\\\|\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0)
      if (lines.length > 1) {
        s = '\\begin{aligned}\n' +
          lines.map((line, i) => {
            const sep = i < lines.length - 1 ? ' \\\\' : ''
            return '& ' + line + sep
          }).join('\n') +
          '\n\\end{aligned}'
      }
    }

    navigator.clipboard.writeText(s)
    toast.success('已复制！在 WPS 中：插入 → 公式 → LaTeX，粘贴后转换')
  }

  const handleInsertSymbol = (symbolLatex) => {
    setLatex(prev => prev + symbolLatex)
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
            <Link to="/docs" className="nav-link">文档</Link>
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
        <div className="main-layout">
          <UploadArea onUploadSuccess={handleUploadSuccess} />
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '12px', flexShrink: 0 }}>LaTeX 预览</h2>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <LatexPreview latex={latex} maxHeight="250px" />
            </div>
            {showEditor && (
              <div style={{ marginTop: '12px', flexShrink: 0 }}>
                <LatexEditor
                  value={latex}
                  onChange={setLatex}
                />
                <SymbolPanel onInsert={handleInsertSymbol} />
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
                style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}
              >
                复制 LaTeX
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
