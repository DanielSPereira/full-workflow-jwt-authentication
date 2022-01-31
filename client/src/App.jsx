import { AuthProvider } from './providers/AuthProvider'
import { AppRoutes } from './Routes'

function App() {
  return (
    <AuthProvider> 
      <AppRoutes />
    </AuthProvider> 
  )
}

export default App
