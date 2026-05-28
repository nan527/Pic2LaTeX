import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { uploadImage } from '../../services/api'

function UploadArea({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const processFile = useCallback(async (file) => {
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error('文件大小超过限制（最大 10MB）')
      return
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('不支持的文件格式，请上传 PNG/JPG/JPEG/GIF/BMP')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)

    setUploading(true)
    try {
      const result = await uploadImage(file)
      if (result.success) {
        toast.success('图片上传成功')
        onUploadSuccess(result.imageId)
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || '上传失败')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [onUploadSuccess])

  const onDrop = useCallback((acceptedFiles) => {
    processFile(acceptedFiles[0])
  }, [processFile])

  // Ctrl+V paste support
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          const file = item.getAsFile()
          if (file) processFile(file)
          return
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [processFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'] },
    multiple: false,
    disabled: uploading
  })

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '16px' }}>上传图片</h2>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? 'var(--accent-color)' : 'var(--glass-border)'}`,
          borderRadius: '12px',
          padding: '48px 24px',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          background: isDragActive ? 'rgba(0, 210, 255, 0.1)' : 'transparent'
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div>
            <div className="loading-spinner" style={{ margin: '0 auto 16px' }} />
            <p>上传中...</p>
          </div>
        ) : preview ? (
          <div>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '16px' }}
            />
            <p style={{ opacity: 0.8 }}>点击或拖拽更换图片</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📷</p>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              {isDragActive ? '释放以上传图片' : '拖拽图片到此处'}
            </p>
            <p style={{ opacity: 0.6, marginBottom: '4px' }}>或点击选择文件</p>
            <p style={{ opacity: 0.5, fontSize: '13px' }}>支持 Ctrl+V 粘贴截图</p>
            <p style={{ opacity: 0.4, fontSize: '12px', marginTop: '12px' }}>
              PNG、JPG、GIF、BMP 格式，最大 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadArea
