import React, { useState, useEffect } from 'react'

function LatexEditor({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const handleChange = (e) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div>
      <textarea
        className="glass-input"
        value={localValue}
        onChange={handleChange}
        placeholder="在此编辑 LaTeX 代码..."
        style={{
          minHeight: '200px',
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          fontSize: '14px',
          lineHeight: '1.6',
          resize: 'vertical'
        }}
      />
    </div>
  )
}

export default LatexEditor
