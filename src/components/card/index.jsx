/* eslint-disable react/prop-types */
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
function Index({ restaurant }) {
  const handleRenderRating = () => {
    let starRating = [];
    const rating = Math.floor(restaurant.weighted_rating_value, 10);
    for (let i = 1; i <= 5; i++) {
      if (i < rating) {
        starRating.push(
          <p className="mx-[1px">
            <AiFillStar />
          </p>
        );
      } else {
        starRating.push(
          <p className="mx-[1px">
            <AiOutlineStar />
          </p>
        );
      }
    }
    return starRating;
  };
  return (
    <div className="shadow-lg md:w-[23%] md:h-[400px] w-full p-5 mt-4">
      <img className="w-full h-[200px]" src={restaurant.logo_photos[0]} />
      <div className="text-left">
        <h3 className="mt-4 font-semibold text-slate-600">{restaurant.name}</h3>
        <div className="flex w-1/2 mt-4">{handleRenderRating()}</div>
        <div className="flex mt-2 justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase">
              {restaurant.cuisines[0]}
            </p>
          </div>

          {restaurant.is_open ? (
            <p className="text-xs text-slate-400 uppercase">
              <span className="inline-block p-1 w-[1px] h-[1px] rounded-full bg-green-500"></span>{" "}
              open now
            </p>
          ) : (
            <p className="text-xs text-slate-400 uppercase">
              <span className="inline-block p-1 w-[1px] h-[1px] rounded-full bg-red-500"></span>{" "}
              closed
            </p>
          )}
        </div>
      </div>
      <NavLink to={`/detail/${restaurant._id}`}>
        <button className="bg-slate-900 w-full p-2 mt-4 text-white text-sm text-center">
          LEARN MORE
        </button>
      </NavLink>
    </div>
  );
}

export default Index;
