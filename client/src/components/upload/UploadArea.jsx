import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { uploadImage } from '../../services/api'

function UploadArea({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]

    if (!file) return

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('文件大小超过限制（最大 10MB）')
      return
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('不支持的文件格式，请上传 PNG/JPG/JPEG/GIF/BMP')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const result = await uploadImage(file)
      if (result.success) {
        toast.success('图片上传成功')
        onUploadSuccess(result.imageId, preview)
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || '上传失败')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [onUploadSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
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
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}
            />
            <p style={{ opacity: 0.8 }}>点击或拖拽更换图片</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📷</p>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              {isDragActive ? '释放以上传图片' : '拖拽图片到此处'}
            </p>
            <p style={{ opacity: 0.6 }}>或点击选择文件</p>
            <p style={{ opacity: 0.4, fontSize: '12px', marginTop: '16px' }}>
              支持 PNG、JPG、JPEG、GIF、BMP 格式，最大 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadArea
