import React, { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

function LatexPreview({ latex }) {
  const containerRef = useRef(null)

  const renderLatex = (text) => {
    if (!text) return ''

    // Split by display math first ($$...$$ or \[...\])
    const parts = []
    let remaining = text

    // Handle display math: $$...$$ or \[...\]
    const displayRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g
    let lastIndex = 0
    let match

    while ((match = displayRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
      }
      // Add display math
      let mathContent = match[1]
      if (mathContent.startsWith('$$') && mathContent.endsWith('$$')) {
        mathContent = mathContent.slice(2, -2)
      } else if (mathContent.startsWith('\\[') && mathContent.endsWith('\\]')) {
        mathContent = mathContent.slice(2, -2)
      }
      parts.push({ type: 'display-math', content: mathContent })
      lastIndex = match.index + match[1].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) })
    }

    // If no display math found, treat entire text as potentially containing inline math
    if (parts.length === 0 || (parts.length === 1 && parts[0].type === 'text')) {
      const textContent = parts.length > 0 ? parts[0].content : text
      // Handle inline math: $...$
      const inlineParts = []
      const inlineRegex = /(\$[^$]+?\$)/g
      let inlineLastIndex = 0
      let inlineMatch

      while ((inlineMatch = inlineRegex.exec(textContent)) !== null) {
        if (inlineMatch.index > inlineLastIndex) {
          inlineParts.push({ type: 'text', content: textContent.slice(inlineLastIndex, inlineMatch.index) })
        }
        inlineParts.push({ type: 'inline-math', content: inlineMatch[1].slice(1, -1) })
        inlineLastIndex = inlineMatch.index + inlineMatch[1].length
      }

      if (inlineLastIndex < textContent.length) {
        inlineParts.push({ type: 'text', content: textContent.slice(inlineLastIndex) })
      }

      return inlineParts.map((part, i) => {
        if (part.type === 'text') {
          return part.content
        }
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

    // Render mixed content
    return parts.map((part) => {
      if (part.type === 'text') {
        // Process inline math within text
        const inlineParts = []
        const inlineRegex = /(\$[^$]+?\$)/g
        let inlineLastIndex = 0
        let inlineMatch
        const textContent = part.content

        while ((inlineMatch = inlineRegex.exec(textContent)) !== null) {
          if (inlineMatch.index > inlineLastIndex) {
            inlineParts.push({ type: 'text', content: textContent.slice(inlineLastIndex, inlineMatch.index) })
          }
          inlineParts.push({ type: 'inline-math', content: inlineMatch[1].slice(1, -1) })
          inlineLastIndex = inlineMatch.index + inlineMatch[1].length
        }

        if (inlineLastIndex < textContent.length) {
          inlineParts.push({ type: 'text', content: textContent.slice(inlineLastIndex) })
        }

        if (inlineParts.length === 0) {
          return textContent
        }

        return inlineParts.map((p, i) => {
          if (p.type === 'text') {
            return p.content
          }
          try {
            return katex.renderToString(p.content, {
              throwOnError: false,
              displayMode: false,
              strict: false,
              trust: true
            })
          } catch (e) {
            return `<span style="color: #ff6b6b;">${p.content}</span>`
          }
        }).join('')
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
