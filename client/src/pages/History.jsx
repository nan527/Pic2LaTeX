import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getHistory, deleteFromHistory } from '../utils/storage'
import LatexPreview from '../components/preview/LatexPreview'

function History() {
  const [history, setHistory] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const items = getHistory()
    setHistory(items)
  }

  const handleDelete = (id) => {
    deleteFromHistory(id)
    loadHistory()
    toast.success('已删除')
    if (selectedItem?.id === id) {
      setSelectedItem(null)
    }
  }

  const handleCopy = (latex) => {
    navigator.clipboard.writeText(latex)
    toast.success('已复制到剪贴板')
  }

  const handleExport = (latex) => {
    const blob = new Blob([latex], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formula.tex'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('已导出 .tex 文件')
  }

  const filteredHistory = history.filter(item =>
    item.latex?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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

        <div style={{ marginBottom: '24px' }}>
          <input
            className="glass-input"
            type="text"
            placeholder="搜索 LaTeX 内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredHistory.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
            <p style={{ opacity: 0.6 }}>
              {searchTerm ? '没有找到匹配的记录' : '暂无历史记录'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="glass-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '8px' }}>
                      {formatDate(item.timestamp)}
                    </p>
                    <p style={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.latex}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    <button
                      className="glass-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(item.latex)
                      }}
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      复制
                    </button>
                    <button
                      className="glass-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleExport(item.latex)
                      }}
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      导出
                    </button>
                    <button
                      className="glass-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                      style={{
                        padding: '8px 12px',
                        fontSize: '12px',
                        background: 'rgba(255, 0, 0, 0.3)'
                      }}
                    >
                      删除
                    </button>
                  </div>
                </div>

                {selectedItem?.id === item.id && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                    <LatexPreview latex={item.latex} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default History
