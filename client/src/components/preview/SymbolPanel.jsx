import React, { useState } from 'react'

const symbolCategories = [
  {
    name: '希腊字母',
    symbols: [
      { latex: '\\alpha', display: 'α' },
      { latex: '\\beta', display: 'β' },
      { latex: '\\gamma', display: 'γ' },
      { latex: '\\delta', display: 'δ' },
      { latex: '\\epsilon', display: 'ε' },
      { latex: '\\varepsilon', display: 'ε' },
      { latex: '\\zeta', display: 'ζ' },
      { latex: '\\eta', display: 'η' },
      { latex: '\\theta', display: 'θ' },
      { latex: '\\lambda', display: 'λ' },
      { latex: '\\mu', display: 'μ' },
      { latex: '\\pi', display: 'π' },
      { latex: '\\rho', display: 'ρ' },
      { latex: '\\sigma', display: 'σ' },
      { latex: '\\tau', display: 'τ' },
      { latex: '\\phi', display: 'φ' },
      { latex: '\\psi', display: 'ψ' },
      { latex: '\\omega', display: 'ω' },
      { latex: '\\Gamma', display: 'Γ' },
      { latex: '\\Delta', display: 'Δ' },
      { latex: '\\Theta', display: 'Θ' },
      { latex: '\\Lambda', display: 'Λ' },
      { latex: '\\Sigma', display: 'Σ' },
      { latex: '\\Omega', display: 'Ω' },
    ]
  },
  {
    name: '运算符',
    symbols: [
      { latex: '+', display: '+' },
      { latex: '-', display: '−' },
      { latex: '\\times', display: '×' },
      { latex: '\\div', display: '÷' },
      { latex: '\\cdot', display: '⋅' },
      { latex: '\\pm', display: '±' },
      { latex: '\\mp', display: '∓' },
      { latex: '\\ast', display: '∗' },
      { latex: '\\circ', display: '∘' },
      { latex: '\\oplus', display: '⊕' },
      { latex: '\\otimes', display: '⊗' },
      { latex: '\\sum', display: '∑' },
      { latex: '\\prod', display: '∏' },
      { latex: '\\int', display: '∫' },
      { latex: '\\oint', display: '∮' },
      { latex: '\\nabla', display: '∇' },
      { latex: '\\partial', display: '∂' },
      { latex: '\\infty', display: '∞' },
    ]
  },
  {
    name: '关系符',
    symbols: [
      { latex: '\\leq', display: '≤' },
      { latex: '\\geq', display: '≥' },
      { latex: '\\neq', display: '≠' },
      { latex: '\\approx', display: '≈' },
      { latex: '\\equiv', display: '≡' },
      { latex: '\\sim', display: '∼' },
      { latex: '\\simeq', display: '≃' },
      { latex: '\\cong', display: '≅' },
      { latex: '\\propto', display: '∝' },
      { latex: '\\ll', display: '≪' },
      { latex: '\\gg', display: '≫' },
      { latex: '\\prec', display: '≺' },
      { latex: '\\succ', display: '≻' },
    ]
  },
  {
    name: '箭头',
    symbols: [
      { latex: '\\rightarrow', display: '→' },
      { latex: '\\leftarrow', display: '←' },
      { latex: '\\leftrightarrow', display: '↔' },
      { latex: '\\Rightarrow', display: '⇒' },
      { latex: '\\Leftarrow', display: '⇐' },
      { latex: '\\Leftrightarrow', display: '⇔' },
      { latex: '\\to', display: '→' },
      { latex: '\\mapsto', display: '↦' },
      { latex: '\\uparrow', display: '↑' },
      { latex: '\\downarrow', display: '↓' },
    ]
  },
  {
    name: '集合',
    symbols: [
      { latex: '\\emptyset', display: '∅' },
      { latex: '\\in', display: '∈' },
      { latex: '\\notin', display: '∉' },
      { latex: '\\subset', display: '⊂' },
      { latex: '\\supset', display: '⊃' },
      { latex: '\\subseteq', display: '⊆' },
      { latex: '\\supseteq', display: '⊇' },
      { latex: '\\cup', display: '∪' },
      { latex: '\\cap', display: '∩' },
      { latex: '\\setminus', display: '∖' },
      { latex: '\\forall', display: '∀' },
      { latex: '\\exists', display: '∃' },
      { latex: '\\neg', display: '¬' },
      { latex: '\\land', display: '∧' },
      { latex: '\\lor', display: '∨' },
    ]
  },
  {
    name: '结构',
    symbols: [
      { latex: '\\frac{}{}', display: 'a/b' },
      { latex: '\\sqrt{}', display: '√' },
      { latex: '\\sqrt[n]{}', display: 'ⁿ√' },
      { latex: '{}^{ }', display: 'x²' },
      { latex: '{}_{ }', display: 'x₂' },
      { latex: '\\lim_{x \\to }', display: 'lim' },
      { latex: '\\sum_{i=0}^{n}', display: 'Σⁿ' },
      { latex: '\\int_{a}^{b}', display: '∫ᵇ' },
      { latex: '\\left( \\right)', display: '( )' },
      { latex: '\\left[ \\right]', display: '[ ]' },
      { latex: '\\left\\{ \\right\\}', display: '{ }' },
      { latex: '\\left| \\right|', display: '| |' },
      { latex: '\\begin{pmatrix} & \\\\ & \\end{pmatrix}', display: '(矩阵)' },
      { latex: '\\begin{bmatrix} & \\\\ & \\end{bmatrix}', display: '[矩阵]' },
      { latex: '\\begin{cases} & \\\\ & \\end{cases}', display: '{分段}' },
    ]
  },
  {
    name: '其他',
    symbols: [
      { latex: '\\ldots', display: '…' },
      { latex: '\\cdots', display: '⋯' },
      { latex: '\\vdots', display: '⋮' },
      { latex: '\\ddots', display: '⋱' },
      { latex: '\\prime', display: '′' },
      { latex: '\\mid', display: '∣' },
      { latex: '\\parallel', display: '∥' },
      { latex: '\\perp', display: '⊥' },
      { latex: '\\angle', display: '∠' },
      { latex: '\\triangle', display: '△' },
      { latex: '\\star', display: '⋆' },
      { latex: '\\bullet', display: '•' },
      { latex: '\\dagger', display: '†' },
      { latex: '\\langle', display: '⟨' },
      { latex: '\\rangle', display: '⟩' },
    ]
  },
]

function SymbolPanel({ onInsert }) {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="symbol-panel">
      <div className="symbol-tabs">
        {symbolCategories.map((cat, i) => (
          <button
            key={cat.name}
            className={`symbol-tab ${i === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(i)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="symbol-grid">
        {symbolCategories[activeCategory].symbols.map((sym) => (
          <button
            key={sym.latex}
            className="symbol-btn"
            onClick={() => onInsert(sym.latex)}
            title={sym.latex}
          >
            {sym.display}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SymbolPanel
