import { useEffect, useState } from 'react'
import { BlackFriday } from './BlackFriday'
import { ProductAbout } from './ProductAbout'

export const About = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
            
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.in/api/products?limit=4');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [])
  return (
    <section className=' flex gap-6 flex-col md:flex-row    '>
        <BlackFriday/>
        {/* {some products} */}
        <div className='grid grid-cols-2 gap-5 mx-auto  '>
            {products.map((product) => (
                <ProductAbout key={product.id} {...product} />
            ))}
        </div>
        
    </section>
  )
}