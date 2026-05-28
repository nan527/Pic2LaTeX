import React, { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function LatexPreview({ latex, maxHeight = '300px' }) {
  const containerRef = useRef(null)

  const processLatexEnvironments = (text) => {
    // Process common LaTeX environments into HTML
    let processed = text

    // Handle \begin{itemize}...\end{itemize}
    processed = processed.replace(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g, (match, content) => {
      const items = content.split(/\\item/).filter(item => item.trim())
      const listItems = items.map(item => `<li style="margin-bottom: 8px;">${item.trim()}</li>`).join('')
      return `<ul style="padding-left: 20px; margin: 8px 0;">${listItems}</ul>`
    })

    // Handle \begin{enumerate}...\end{enumerate}
    processed = processed.replace(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/g, (match, content) => {
      const items = content.split(/\\item/).filter(item => item.trim())
      const listItems = items.map(item => `<li style="margin-bottom: 8px;">${item.trim()}</li>`).join('')
      return `<ol style="padding-left: 20px; margin: 8px 0;">${listItems}</ol>`
    })

    // Handle \begin{aligned}...\end{aligned} (for multi-line equations)
    processed = processed.replace(/\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}/g, (match, content) => {
      return content
    })

    return processed
  }

  const renderInlineMath = (text) => {
    // Handle inline math: $...$
    const parts = []
    const regex = /(\$[^$]+?\$)/g
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
      }
      parts.push({ type: 'inline-math', content: match[1].slice(1, -1) })
      lastIndex = match.index + match[1].length
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) })
    }

    if (parts.length === 0) return text

    return parts.map(part => {
      if (part.type === 'text') return part.content
      try {
        return katex.renderToString(part.content, {
          throwOnError: false,
          displayMode: false,
          strict: false,
          trust: true
        })
      } catch (e) {
        return `<span style="color: #ff6b6b;">${part.content}</span>`
      }
    }).join('')
  }

  const renderLatex = (text) => {
    if (!text) return ''

    // First, process LaTeX environments
    let processed = processLatexEnvironments(text)

    // Split by display math: \[...\] or $$...$$
    const parts = []
    const displayRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g
    let lastIndex = 0
    let match

    while ((match = displayRegex.exec(processed)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: processed.slice(lastIndex, match.index) })
      }
      let mathContent = match[1]
      if (mathContent.startsWith('$$') && mathContent.endsWith('$$')) {
        mathContent = mathContent.slice(2, -2)
      } else if (mathContent.startsWith('\\[') && mathContent.endsWith('\\]')) {
        mathContent = mathContent.slice(2, -2)
      }
      parts.push({ type: 'display-math', content: mathContent })
      lastIndex = match.index + match[1].length
    }

    if (lastIndex < processed.length) {
      parts.push({ type: 'text', content: processed.slice(lastIndex) })
    }

    if (parts.length === 0) {
      return renderInlineMath(processed)
    }

    return parts.map(part => {
      if (part.type === 'text') {
        return renderInlineMath(part.content)
      }
      // Display math
      try {
        return katex.renderToString(part.content, {
          throwOnError: false,
          displayMode: true,
          strict: false,
          trust: true
        })
      } catch (e) {
        return `<span style="color: #ff6b6b;">${part.content}</span>`
      }
    }).join('')
  }

  useEffect(() => {
    if (containerRef.current && latex) {
      try {
        const html = renderLatex(latex)
        containerRef.current.innerHTML = html
      } catch (error) {
        containerRef.current.innerHTML = `<span style="color: #ff6b6b;">渲染错误: ${error.message}</span>`
      }
    }
  }, [latex])

  if (!latex) {
    return (
      <div style={{ textAlign: 'center', padding: '24px', opacity: 0.6 }}>
        <p>LaTeX 预览将显示在这里</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        minHeight: '60px',
        maxHeight: maxHeight,
        overflowY: 'auto',
        fontSize: '16px',
        lineHeight: '1.6'
      }}
    />
  )
}

export default LatexPreview
