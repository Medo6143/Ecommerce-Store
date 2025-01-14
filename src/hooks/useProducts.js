import { useDispatch } from "react-redux";
import { setProducts, setIsLoading, setError } from "../store/ProductSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const URL_API = "https://fakestoreapi.in/api/products";

  const fetchProducts = async () => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setError(null));
      const response = await fetch(URL_API);
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { fetchProducts };
};
