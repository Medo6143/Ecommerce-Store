import { useContext, useState } from "react";
import { AuthContext } from "../servieces/context/AuthContext";
import removeProductCart from "../utility/removeProductCart";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setCartItems } from "../store/Cart";

export const ProductsCart = ({ product }) => {
    const { user } = useContext(AuthContext);
    const userId = user?.uid || null;
    const [isRemoving, setIsRemoving] = useState(false);
    const [error, setError] = useState(null);
    const {items: cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveProduct = async () => {
        if (!userId) {
            setError("Please log in to remove items");
            return;
        }

        try {
            setIsRemoving(true);
            setError(null);
            await removeProductCart(userId, product.id);
            const updatedCart = cartItems.filter((item) => item.id !== product.id);
            dispatch(setCartItems(updatedCart));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <section className="cart-items-container sm:w-[80%] w-[100%] md:W-[70%] mt-2">
            {error && (
                <div className="text-red-500 p-2 mb-2 text-sm bg-red-50 rounded">
                    {error}
                </div>
            )}
            <ul className="flex flex-col space-y-4">
                <li className="cart-item flex justify-between items-center p-6 border flex-wrap rounded-lg shadow-sm bg-white">
                    <article className="flex items-center space-x-6">
                        <figure className="relative w-24 h-24">
                            <img 
                                src={product.Image} 
                                alt="Product" 
                                className="w-full h-full object-cover rounded-md"
                                loading="lazy"
                            />
                        </figure>
                        <div className="product-details">
                            <h3 className="text-sm mb-2 w-16 line-clamp-2 font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-gray-700 text-xl font-medium">
                                ${product.price}
                            </p>
                        </div>
                    </article>
                    <div className="flex items-center space-x-6">
                        <div className="quantity-controls flex items-center border-2 rounded-lg overflow-hidden">
                            <button 
                                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span className="px-4 py-2 border-x">{product.quantity}</span>
                            <button 
                                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                        <button 
                            className={`text-red-500 hover:text-red-700 transition-colors p-2 ${
                                isRemoving ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            aria-label="Remove item"
                            onClick={handleRemoveProduct}
                            disabled={isRemoving}
                        >
                            <svg 
                                className={`w-6 h-6 ${isRemoving ? 'animate-spin' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                />
                            </svg>
                        </button>
                    </div>
                </li>
            </ul>
        </section>
    );
};

ProductsCart.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired
};