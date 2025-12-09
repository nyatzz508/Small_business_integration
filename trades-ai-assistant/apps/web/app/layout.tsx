import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Local Trades AI - Dashboard'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold">Local Trades AI</h1>
              <nav>
                <span className="text-sm text-slate-600">Owner dashboard</span>
              </nav>
            </div>
          </header>

          <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
            {children}
          </main>

          <footer className="bg-white border-t">
            <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500">
              © {new Date().getFullYear()} Local Trades AI
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
