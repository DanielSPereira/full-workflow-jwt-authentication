import { Navigate } from 'react-router-dom'
import { useAuth } from './providers/AuthProvider'


export function PrivateRoutes({ children }) {
    const { isAuthenticated } = useAuth()

    console.log('isAuthenticated', isAuthenticated)

    return isAuthenticated ? children : <Navigate to="/login" />
}