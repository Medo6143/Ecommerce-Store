import { useDispatch } from "react-redux";
import { setCategory } from "../store/Category";

export const SideCategory = () => {

  const dispatch = useDispatch();

  const handleCategory = (category) => {    
      dispatch(setCategory(category));
  }

  return (
 
    
        <aside aria-label='sidebar for catgories' className= 'sm:top-[4.6rem] bottom-0  z-50 w-full sm:h-screen bg-gray-500 lg:w-[12%] sm:w-[18%] md:w-[20%]   fixed  bg-gradient-to-tl  md:block to-[#FDD5DB] from-[#DFEDFE]'>

          <h2 className='text-xl font-bold text-gray-800 p-3 text-center hidden sm:block' >Categories</h2>

          <ul className="flex sm:flex-col flex-row justify-start ">

            <li className='p-3 w-full  hover:bg-white cursor-pointer m-auto font-bold' onClick={() => handleCategory('')}>All</li>
            <li className='p-3 w-full  hover:bg-white cursor-pointer m-auto font-bold' onClick={() => handleCategory('tv')}>Tv</li>
            <li className='p-3 w-full  hover:bg-white cursor-pointer m-auto font-bold' onClick={() => handleCategory('audio')}>Audio</li>
            <li className='p-3 w-full  hover:bg-white cursor-pointer m-auto font-bold'   onClick={() => handleCategory('mobile')}>Mobile</li>
            <li className='p-3 w-full  hover:bg-white cursor-pointer m-auto font-bold' onClick={() => handleCategory('gaming')}>Gaming</li>

          </ul>

            
        </aside>
  )
}
