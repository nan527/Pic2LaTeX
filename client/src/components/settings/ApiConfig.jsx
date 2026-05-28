import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { getApiConfig, saveApiConfig } from '../../utils/storage'
import { testApiConnection } from '../../services/api'

function ApiConfig() {
  const [config, setConfig] = useState({
    endpoint: '',
    apiKey: '',
    model: 'gpt-4-vision-preview'
  })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    const savedConfig = getApiConfig()
    if (savedConfig) {
      setConfig(savedConfig)
    }
  }, [])

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
    setTestResult(null)
  }

  const handleTest = async () => {
    if (!config.endpoint || !config.apiKey) {
      toast.error('请填写 API 端点和密钥')
      return
    }

    setTesting(true)
    setTestResult(null)

    try {
      const result = await testApiConnection(
        config.endpoint,
        config.apiKey,
        config.model
      )
      if (result.success) {
        setTestResult({
          status: 'success',
          message: '连接成功',
          model: result.testResult.model
        })
        toast.success('API 连接成功')
      }
    } catch (error) {
      setTestResult({
        status: 'error',
        message: error.response?.data?.error?.message || '连接失败'
      })
      toast.error('API 连接失败')
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    if (!config.endpoint || !config.apiKey) {
      toast.error('请填写 API 端点和密钥')
      return
    }

    saveApiConfig(config)
    toast.success('配置已保存')
  }

  const handleReset = () => {
    setConfig({
      endpoint: '',
      apiKey: '',
      model: 'gpt-4-vision-preview'
    })
    setTestResult(null)
    toast.success('配置已重置')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          API 端点
        </label>
        <input
          className="glass-input"
          type="text"
          value={config.endpoint}
          onChange={(e) => handleChange('endpoint', e.target.value)}
          placeholder="https://api.openai.com/v1"
        />
        <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
          OpenAI: https://api.openai.com/v1
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          API 密钥
        </label>
        <input
          className="glass-input"
          type="password"
          value={config.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
        />
        <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
          密钥仅保存在本地浏览器中
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
          模型
        </label>
        <select
          className="glass-input"
          value={config.model}
          onChange={(e) => handleChange('model', e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="gpt-4-vision-preview">GPT-4 Vision Preview</option>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="claude-3-opus-20240229">Claude 3 Opus</option>
          <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
          <option value="claude-3-haiku-20240307">Claude 3 Haiku</option>
        </select>
      </div>

      {testResult && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            background: testResult.status === 'success'
              ? 'rgba(0, 255, 0, 0.1)'
              : 'rgba(255, 0, 0, 0.1)',
            border: `1px solid ${testResult.status === 'success'
              ? 'rgba(0, 255, 0, 0.3)'
              : 'rgba(255, 0, 0, 0.3)'}`
          }}
        >
          <p style={{ fontWeight: 500 }}>
            {testResult.status === 'success' ? '✓' : '✗'} {testResult.message}
          </p>
          {testResult.model && (
            <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
              模型: {testResult.model}
            </p>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          className="glass-button"
          onClick={handleTest}
          disabled={testing || !config.endpoint || !config.apiKey}
        >
          {testing ? (
            <>
              <span className="loading-spinner" />
              测试中...
            </>
          ) : (
            '测试连接'
          )}
        </button>
        <button
          className="glass-button"
          onClick={handleSave}
        >
          保存配置
        </button>
        <button
          className="glass-button"
          onClick={handleReset}
          style={{ background: 'rgba(255, 255, 255, 0.2)' }}
        >
          重置
        </button>
      </div>
    </div>
  )
}

export default ApiConfig
