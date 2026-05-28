import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim() || !password) {
      toast.error('请填写用户名和密码')
      return
    }

    setSubmitting(true)
    try {
      const fn = isRegister ? register : login
      const data = await fn(username.trim(), password)
      if (data.success) {
        toast.success(isRegister ? '注册成功' : '登录成功')
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data?.error?.message || '操作失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>Pic2LaTeX</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/docs" className="nav-link">文档</Link>
          </div>
        </div>
      </nav>
      <div className="container page-container fade-in" style={{ maxWidth: '420px' }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
            {isRegister ? '注册账号' : '登录'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', opacity: 0.8 }}>
                用户名
              </label>
              <input
                className="glass-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                autoComplete="username"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', opacity: 0.8 }}>
                密码
              </label>
              <input
                className="glass-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isRegister ? '至少 6 个字符' : '请输入密码'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
            </div>

            <button
              className="glass-button"
              type="submit"
              disabled={submitting}
              style={{ width: '100%', marginBottom: '16px' }}
            >
              {submitting ? (
                <>
                  <span className="loading-spinner" />
                  {isRegister ? '注册中...' : '登录中...'}
                </>
              ) : (
                isRegister ? '注册' : '登录'
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '14px' }}>
            <span style={{ opacity: 0.6 }}>
              {isRegister ? '已有账号？' : '没有账号？'}
            </span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-color)',
                cursor: 'pointer',
                marginLeft: '4px',
                fontSize: '14px'
              }}
            >
              {isRegister ? '去登录' : '去注册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
