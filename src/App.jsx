import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import RegisterPage from "./page/Register";
import Login from "./page/Login";
import { Home } from "./page/Home";
import { useContext } from "react";
import { AuthContext } from "./servieces/context/AuthContext";
import { Page404 } from "./page/Page404";
import Product from "./page/Product";
import { Cart } from "./page/cart";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
