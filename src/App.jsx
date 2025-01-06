import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import RegisterPage from "./Pages/Register"
import Login from "./Pages/Login"
import { Home } from "./Pages/Home"
import { useContext } from "react"
import { AuthContext } from "./servieces/context/AuthContext"
import { Page404 } from "./Pages/Page404"
import Product from "./Pages/Product"
import { Cart } from "./Pages/cart"

function App() {


  const {user} = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={"/login"} />;
    }
    return children;
  }
  
  return (

<BrowserRouter>
    <Routes>
        <Route path="/"
        index
        element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route path="/cart" element={<ProtectedRoute><Cart /> </ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={ <Login/>} />
        <Route path="*" element={<Page404 />} />
    </Routes>
</BrowserRouter>

    
  )
}

export default App
