import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import { useAuth } from './providers/AuthProvider'
import { PrivateRoutes } from './PrivateRoutes'
import { Loading } from './pages/Loading'
import { Secret } from './pages/Secret'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

export function AppRoutes() {
    const { isVerifyingOnLoading } = useAuth()

    return (
        <Router>
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/secret" element={ isVerifyingOnLoading ? <Loading /> : <PrivateRoutes><Secret /></PrivateRoutes> } />
                    <Route path="*" element={<h1>Not Found</h1>}/>
            </Routes>
        </Router>
    )
}