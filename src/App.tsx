import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './styles/app.css'

// 懒加载页面组件
const MarkdownEditor = React.lazy(() => import('./pages/MarkdownEditor'))

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div>
        <React.Suspense fallback={<div className="loading-container">加载中...</div>}>
          <Routes>
            <Route path="/" element={<MarkdownEditor />} />
          </Routes>
        </React.Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App