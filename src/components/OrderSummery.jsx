import { use, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";


export const OrderSummery = () => {

    const [subTotal, setSubTotal] = useState(0);

    const { items: cartItems } = useSelector((state) => state.cart);


 const handleSubtotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setSubTotal(subtotal);
  };


  useEffect(() => {
    handleSubtotal();
  }, [cartItems]);  
  return (
    <aside className="mt-8 border rounded-lg p-4 sm:w-[30%] md:w-[25%] w-full  sm:fixed md:right-7 sm:right-7 bg-slate-100">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      <table className="w-full mb-6">
        <thead className="sr-only">
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 text-gray-600">Subtotal</td>
            <td className="py-2 text-right font-medium">${subTotal}</td>
          </tr>
          <tr>
            <td className="py-2 text-gray-600">Delivery</td>
            <td className="py-2 text-right font-medium text-blue-700">Free</td>
          </tr>
        
          <tr className="border-t">
            <td className="py-4 font-semibold">Total</td>
            <td className="py-4 text-right font-bold">${subTotal}</td>
          </tr>
        </tbody>
      </table>

      <button 
        type="button"
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Proceed to checkout"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Proceed to Checkout
      </button>
    </aside>  )
}
