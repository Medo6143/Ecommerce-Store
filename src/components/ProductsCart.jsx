
export const ProductsCart = ({product}) => {
  return (

    <section className="cart-items-container sm:w-[80%] w-[100%] md:W-[70%] mt-2">
        <ul className="flex flex-col space-y-4">
            {/* Cart items will be mapped here */}
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
                        <h3 className="text-sm  mb-2 w-16 line-clamp-2 font-semibold">{product.name}</h3>
                        <p className="text-gray-700 text-xl font-medium">${product.price}</p>
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
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        aria-label="Remove item"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </section>
  )
}
