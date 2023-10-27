/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../services/restaurants";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Detail() {
  const { id } = useParams();
  const [detailRestaurant, setDetailRestaurant] = useState({});

  const handleDetailRestaurant = (id) => {
    const dataDetailRestaurant = getRestaurantById(id);
    console.log(dataDetailRestaurant.cuisines);
    setDetailRestaurant(dataDetailRestaurant);
  };

  const handleRenderRating = () => {
    let starRating = [];
    const rating = Math.floor(detailRestaurant.weighted_rating_value, 10);
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

  useEffect(() => {
    handleDetailRestaurant(id);
  }, []);
  return (
    <div className="w-full px-4">
      <div className="border-b-2 pb-6">
        <div className="mt-3 md:w-1/2">
          <h1 className="text-4xl">Restaurants</h1>
          <p className="mt-5 text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            vero autem repudiandae voluptas aliquid Lorem ipsum dolor sit amet..
          </p>
        </div>
      </div>
      <div className="md:flex mt-5 gap-5">
        <img
          className="w-[400px] rounded-xl"
          src={detailRestaurant.logo_photos}
          alt=""
        />
        <div className="text-left">
          <h1 className="text-slate-500 text-2xl font-semibold">
            {detailRestaurant.name}
          </h1>
          <div className="flex">{handleRenderRating()}</div>
          <p className="mt-3 mb-3 text-slate-500">
            {detailRestaurant.description}
          </p>
          {detailRestaurant.is_open ? (
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
    </div>
  );
}

export default Detail;
