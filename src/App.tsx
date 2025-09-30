import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import RedirectIfAuthenticated from './pages/RedirectIfAuthenticated'

function App() {
  return (
    <Box style={{ width: '100%', height: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
