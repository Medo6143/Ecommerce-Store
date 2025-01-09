import { FiLogOut, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { Logout } from "../servieces/firebase/auth";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Header = () => {
  const [cart, setCart] = useState(0);
  const {items: cartItems} = useSelector((state) => state.cart);

  useEffect(() => {
    setCart(cartItems.length);
  }, [cartItems]);
  return (
    <>
      <header className="w-full  sm:top-0 z-50  bg-white shadow-xl fixed">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto ">
          
          <Link to="/"> 
          <div className="flex items-center cursor-pointer">
            <FaShopify size={40} className=" text-[#FFD700] cursor-pointer" />
          </div>
          </Link>
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-10">
          
            <div className="relative">
            <Link to={"/cart"}>
              <FiShoppingCart className="text-2xl cursor-pointer hover:text-blue-500" />
              <span className={`absolute  -top-2 ${cart === 0 && "hidden"} -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                {cart}
              </span>
            </Link>
            </div>

            <div className="cursor-pointer hover:text-blue-500">
              <FiUser className="text-2xl" />
            </div>

          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => Logout() } >
          <FiLogOut className="text-2xl" />
          </button>
          </div>
        </nav>
      </header>
    </>
  );
};
