import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider';


export function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth()

    console.log(isAuthenticated)
    return (
        <div>
            <button style={{ marginRight: '10px' }} onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/secret')}>Secret</button>
        </div>
    )
}