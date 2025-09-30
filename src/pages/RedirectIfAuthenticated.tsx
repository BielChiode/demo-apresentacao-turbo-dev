import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAuth } from '../context/AuthContext'

export default function RedirectIfAuthenticated({ children }: { children: ReactElement }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}


