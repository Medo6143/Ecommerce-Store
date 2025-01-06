import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './servieces/context/AuthContext.jsx'
import { store } from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
      <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
      </StrictMode>
  </AuthContextProvider>
)
