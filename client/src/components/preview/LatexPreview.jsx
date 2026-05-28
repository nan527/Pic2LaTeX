import React, { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function LatexPreview({ latex }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: true,
          fleqn: false,
          leqno: false,
          strict: false,
          trust: true,
          macros: {
            '\\R': '\\mathbb{R}',
            '\\N': '\\mathbb{N}',
            '\\Z': '\\mathbb{Z}',
            '\\Q': '\\mathbb{Q}',
            '\\C': '\\mathbb{C}'
          }
        })
      } catch (error) {
        containerRef.current.innerHTML = `<span style="color: #ff6b6b;">渲染错误: ${error.message}</span>`
      }
    }
  }, [latex])

  if (!latex) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', opacity: 0.6 }}>
        <p>LaTeX 预览将显示在这里</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        overflowX: 'auto'
      }}
    />
  )
}

export default LatexPreview
