import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import addToCart from '../utility/addToCart';
import { AuthContext } from '../servieces/context/AuthContext';

const Product = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.products.products);
  const { user } = useContext(AuthContext);
  const userId = user?.uid;
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const product = products?.find((p) => p.id === parseInt(id));

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!userId) {
      // Handle unauthenticated user case
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(userId, {
        id: product.id,
        image: product.image,
        name: product.title,
        price: product.price,
        quantity: quantity
      });
      // You could add a success toast/notification here
    } catch (error) {
      // Handle error case - maybe show an error toast
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <main className="mt-16 text-center">
        <p>Product not found</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <>
      <Header className="w-full sm:top-0 z-50 bg-white shadow-xl fixed" />
      <section className="sm:mt-24 container mx-auto px-4">
        <article className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header section remains the same */}
          <header className="p-6 border-b border-gray-200">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </Link>
          </header>
          
          <div className="flex flex-col md:flex-row">
            {/* Image section remains the same */}
            <figure className="md:w-1/2 p-8 bg-gray-50">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                />
                <figcaption className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </figcaption>
              </div>
            </figure>
            
            <div className="md:w-1/2 p-8">
              {/* Product details section */}
              <div className="mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wider">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full text-sm">
                    In Stock
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Category</h2>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center border rounded-lg">
                    <button 
                      className="px-4 py-2 border-r hover:bg-gray-100 disabled:opacity-50" 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      className="w-20 px-2 py-1 text-center focus:outline-none"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      aria-label="Product quantity"
                    />
                    <button 
                      className="px-4 py-2 border-l hover:bg-gray-100 disabled:opacity-50" 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= 99}
                      aria-label="Increase quantity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handleAddToCart}
                  disabled={isLoading || !userId}
                  aria-label="Add to cart"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {isLoading ? 'Adding...' : 'Add to Cart'}
                </button>
                
                <button 
                  className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center" 
                  aria-label="Add to wishlist"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Product;