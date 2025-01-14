import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Product';
import { useProducts } from '../hooks/useProducts';

export const Products = () => {
  const { products = [] } = useSelector((state) => state.products.products);
  const { category } = useSelector((state) => state.category);
  const { fetchProducts } = useProducts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await fetchProducts();
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts, setIsLoading]);

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products.filter((product) => product.category === category);
  }, [products, category]);


  if (!products?.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-16 px-4 max-w-7xl mx-auto">
      {filteredProducts.map((product) => (
        <Link 
          to={`/product/${product.id}`} 
          key={product.id}
          className="transform transition-transform hover:scale-105"
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </section>
  );
};

export default Products;