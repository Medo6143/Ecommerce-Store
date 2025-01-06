import { useSelector } from 'react-redux';
import ProductCard from './Product'
import { useProducts } from '../hooks/useProducts';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Products = () => {

  const {products} = useSelector((state) => state.products.products); 


  const {fetchProducts} = useProducts();
    
  useEffect(() => {
      fetchProducts();
  }, [fetchProducts]);

  

  return (
    <section className='grid grid-cols-2 sm:grid-cols-3 mx-auto md:grid-cols-5 gap-5 mt-16'>
   {products?.map((product) => (
    <Link to={`/product/${product.id}`} key={product.id}>
      <ProductCard product={product} />
    </Link>
   ))}
    </section>
  )
}