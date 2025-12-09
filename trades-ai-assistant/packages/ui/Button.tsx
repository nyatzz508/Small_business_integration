import React from 'react'

export default function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded bg-slate-800 text-white hover:opacity-95">
      {children}
    </button>
  )
}
