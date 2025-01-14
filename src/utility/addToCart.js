import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../servieces/firebase/firebase";

const addToCart = async (userId, product) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (
    !product ||
    !product.id ||
    !product.name ||
    !product.price ||
    !product.quantity
  ) {
    throw new Error("Invalid product details");
  }

  try {
    const userCartRef = doc(db, "users", userId);
    const userCartDoc = await getDoc(userCartRef);

    if (userCartDoc.exists()) {
      const cartData = userCartDoc.data().cart || {};
      const existingProduct = cartData[product.id];

      await updateDoc(userCartRef, {
        [`cart.${product.id}`]: {
          Image: product.image,
          name: product.name,
          price: product.price,
          quantity: existingProduct
            ? existingProduct.quantity + product.quantity
            : product.quantity,
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      // Create a new cart for the user
      await setDoc(userCartRef, {
        cart: {
          [product.id]: {
            Image: product.image,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            updatedAt: new Date().toISOString(),
          },
        },
        createdAt: new Date().toISOString(),
      });
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update cart: ${error.message}`);
  }
};

export default addToCart;
