import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'


export function LoginForm() {
    const [form, setForm] = useState({ userName: "", password: "" })
    const { isAuthenticated, signIn } = useAuth()
    const navigate = useNavigate()

    console.log('isAuthenticated', isAuthenticated)

    const handleSubmit = async () => {
        await signIn(form.userName, form.password)
    }

    return (
        <div>
            <input onInput={e => setForm({...form, userName: e.target.value})} type="text" placeholder="User Name" />
            <input onInput={e => setForm({...form, password: e.target.value})} type="password" placeholder="Password" style={{margin: '0 10px'}} />
            <input onClick={handleSubmit} type="submit" value="Enviar" style={{margin: '0 10px'}} />
            <button onClick={() => navigate('/secret')}>Secret</button>
        </div>
    )
}