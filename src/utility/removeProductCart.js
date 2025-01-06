import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../servieces/firebase/firebase";

const removeProductCart = async (userId, productId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!productId) {
    throw new Error("Product ID is required"); 
  }

  try {
    const userCartRef = doc(db, "users", userId);
    const userCartDoc = await getDoc(userCartRef);

    if (!userCartDoc.exists()) {
      throw new Error("Cart not found");
    }

    const cartData = userCartDoc.data().cart || {};
    
    if (!cartData[productId]) {
      throw new Error("Product not found in cart");
    }

    // Remove the product from cart
    delete cartData[productId];

    // Update the cart document
    await updateDoc(userCartRef, {
      cart: cartData
    });

    return { success: true };

  } catch (error) {
    throw new Error(`Failed to remove product from cart: ${error.message}`);
  }
};

export default removeProductCart;
