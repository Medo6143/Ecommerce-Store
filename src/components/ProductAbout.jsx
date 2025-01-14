export const ProductAbout = (product) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mx-auto  p-2 border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 md:w-[80%] w-[90%] max-w-[500px] cursor-pointer bg-white">
      {/* Product Image */}
      <div className="flex-shrink-0 w-full md:w-1/3 relative  rounded-lg shadow-sm">
        <img
          className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
          src={product.image}
          alt="Product"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between md:w-2/3 space-y-2">
        {/* Product Name */}
        <h2 className="text-lg font-medium text-gray-800 line-clamp-2">
          {product.title}
        </h2>

        {/* Price Section */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 line-through text-sm">
            {product.oldPrice}
          </span>
          <span className="text-2xl font-bold text-green-600">
            {product.newPrice}
          </span>
        </div>

        {/* Discount Info */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
            5% OFF
          </span>
          <span className="text-gray-500">Limited Offer</span>
        </div>
      </div>
    </div>
  );
};
