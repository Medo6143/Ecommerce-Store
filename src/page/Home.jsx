import { Header } from "../components/Header";
import { SideCategory } from "../components/SideCatgory";
import { About } from "../components/About";
import { Products } from "../components/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AuthContext } from "../servieces/context/AuthContext";
import { getProductsCart } from "../utility/getProductsCart";

export const Home = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const userId = user?.uid || null;
  const { items: cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (userId) {
          await getProductsCart(userId, dispatch);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();
  }, [userId, dispatch]);

  return (
    <>
      <div className=" flex flex-col">
        <Header />

        <div className="flex flex-1">
          {/* Sidebar */}
          <SideCategory />

          {/* Main Content */}
          <main className="flex-1 sm:ml-40  lg:ml-56 px-4 py-8 mt-20">
            <div className="max-w-7xl mx-auto">
              <About />
              <Products />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
};
