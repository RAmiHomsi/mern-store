import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import { clearFavorites } from "../../redux/features/favorites/favoriteSlice";
import { clearFavoritesFromLocalStorage } from "../../Utils/localStorage";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites); //accesses the all data from favorites property from the Redux store state.
  const dispatch = useDispatch();

  function clearAll() {
    dispatch(clearFavorites());
    clearFavoritesFromLocalStorage();
  }
  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        YOUR FAVORITE PRODUCTS
      </h1>
      <div className="ml-[3rem] mt-2">
        <button onClick={clearAll} className="border p-2">
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
