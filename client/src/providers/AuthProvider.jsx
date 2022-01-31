import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isVerifyingOnLoading, setIsVerifyingOnLoading] = useState(true)

    const signIn = async (userName, password) => {
        if (!userName || !password) return alert('Campos necessários!')
    
        const response = await fetch(
            'http://localhost:3333/login',
            {
                method: 'post',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            }
        )
        const resp = await response.json()
    
        console.log(resp)
    
        if (!resp.success) return alert('Usuário ou senha inválidos!')
    
        localStorage.setItem('user', JSON.stringify(resp.user))
    
        verifyUserAuthentication()
    }
    
    const signOut = async (callback) => {
        localStorage.removeItem('user');

        
        await verifyUserAuthentication()

        if (callback) callback()
    }
    
    const verifyUserAuthentication = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token
    
            if (!token) throw new Error('Usuário não autenticado!')
    
            const response = await fetch(
                'http://localhost:3333/isAuthenticated',
                {
                    headers: { 'Authorization': 'Bearer ' + token },
                }
            )
            const auth = await response.json()
            console.log('auth', auth)
    
            setIsAuthenticated(auth?.authenticated)
    
        } catch (e) {
            console.log(e.message)
    
            setIsAuthenticated(false)
        }
    }
    
    return <AuthContext.Provider value={{ isAuthenticated, isVerifyingOnLoading, setIsVerifyingOnLoading, signIn, signOut, verifyUserAuthentication }} >{ children }</AuthContext.Provider>;
}
