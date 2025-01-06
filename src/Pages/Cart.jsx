import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { OrderSummery } from "../components/OrderSummery";
import { ProductsCart } from "../components/ProductsCart";
import { getProductsCart } from "../utility/getProductsCart";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../servieces/context/AuthContext";
import { doc } from "firebase/firestore";

export const Cart = () => {
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
  console.log(cartItems);


  

  return (
    <>
      <Header />
      <main className="mx-auto px-4 py-8 sm:mt-20 w-full">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <section className="bg-white rounded-lg shadow-lg items-start p-6 flex sm:justify-between flex-col sm:flex-row">
          <section className="md:w-[70%] sm:w-[80%] w-full">
            {cartItems.length ? (
              cartItems.map((item) => (
                <ProductsCart key={item.id} product={item} onclick={() => {}} />
              ))
            ) : (
              <p>Your cart is empty. Start adding some items!</p>
            )}
          </section>
          <OrderSummery  />
        </section>
      </main>
    </>
  );
};
