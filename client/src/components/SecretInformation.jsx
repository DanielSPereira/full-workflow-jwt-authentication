import { useEffect, useState } from "react"
import { useAuth } from '../providers/AuthProvider'

export function SecretInformation() {
    const [secret, setSecret] = useState('')
    const { isAuthenticated, signOut } = useAuth()

    useEffect(() => {
        (async () => {
            const token = JSON.parse(localStorage.getItem('user')).token || '';

            const response = await fetch('http://localhost:3333/secret-information', { method: 'get', headers: { 'Authorization': `Bearer ${token}` } });
            const secretResponse = await response.json()

            setSecret(secretResponse.secret)
        })()
    })

    return <><h1>{secret}</h1>{ isAuthenticated && <input onClick={() => signOut()} type="submit" value="Sair" /> }</>
}