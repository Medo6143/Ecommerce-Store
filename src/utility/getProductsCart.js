import { doc, getDoc } from "firebase/firestore";
import { db } from "../servieces/firebase/firebase";
import { setCartItems } from "../store/Cart";

export const getProductsCart = async (userId, dispatch) => {
  try {
    const userCartRef = doc(db, "users", userId);
    const userCartDoc = await getDoc(userCartRef);

    if (!userCartDoc.exists()) {
      dispatch(setCartItems([]));
      return [];
    }

    const cartData = userCartDoc.data().cart || {};
    const cartItems = Object.entries(cartData).map(([id, item]) => ({
      id,
      ...item,
    }));

    dispatch(setCartItems(cartItems));
    return cartItems;
  } catch (error) {
    console.error("Error getting cart products:", error);
    throw error;
  }
};
