


const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded w-[90%] sm:w-full overflow-hidden shadow-lg bg-white mx-auto">
      <img
        className="sm:w-full w-[100%] h-48 object-cover object-center"
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
      <div className="sm:px-6 sm:py-4 p-2">
        <h2 className="font-bold text-sm sm:text-xl mb-2 line-clamp-2">{product.title}</h2>
      </div>
      <div className="sm:px-6 sm:pt-4 pb-2 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-800">{`$${product.price}`}</span>
        

      </div>
    </div>
  );
};

export default ProductCard;
