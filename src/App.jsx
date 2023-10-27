/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getAllRestaurants, getRestaurantById } from "./services/restaurants";
import Card from "./components/card/index";
import spinner from "./assets/spinner.svg";
function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [detailRestaurant, setDetailRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(null);
  const [cuisine, setCuisine] = useState(null);

  const handleGetRestaurants = async () => {
    try {
      const restaurantData = await getAllRestaurants(isOpen, cuisine);
      setRestaurants(restaurantData);
      setIsLoading(false);
    } catch (error) {
      setRestaurants([]);
    }
  };

  const handleGetRestaurantById = (id) => {
    const dataDetailRestaurant = getRestaurantById(id);
    setDetailRestaurant(dataDetailRestaurant);
  }

  const handleChangeIsOpen = (event) => {
    if (event.target.checked) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleChangeCuisine = (event) => {
    setCuisine(event.target.value);
  };

  const handleClearAll = () => {
    setIsOpen(null);
    setCuisine(null);
  };

  useEffect(() => {
    handleGetRestaurants();
  }, []);

  return (
    <>
      <div className="w-full px-2 md:px-10 mx-auto">
        <header className="container text-slate-600 relative">
          <div className="mt-3 md:w-1/2">
            <h1 className="text-4xl">Restaurants</h1>
            <p className="mt-5 text-slate-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              vero autem repudiandae voluptas aliquid Lorem ipsum dolor sit
              amet..
            </p>
          </div>
          <nav className="border-b-2 border-t-2 py-5 md:mt-5 flex">
            <p className="md:mr-5 text-sm">Filter By : </p>
            <ul className="flex items-center">
              <li className="border-b-2">
                <input
                  className="rounded-full"
                  type="checkbox"
                  checked={isOpen}
                  onChange={handleChangeIsOpen}
                  name=""
                  id="check"
                />
                <label className="text-sm ml-2" htmlFor="check">
                  Open Now
                </label>
              </li>
              <li className="ml-4 border-b-2">
                <select
                  className="bg-transparent focus:border-none"
                  name="categories"
                  id=""
                  onChange={handleChangeCuisine}
                >
                  <option value="">All</option>
                  <option value="Chicken">Chicken</option>
                  <option value="American">American</option>
                  <option value="CONVENIENCE">CONVENIENCE</option>
                </select>
              </li>
            </ul>
            <button
              onClick={handleClearAll}
              className=" absolute right-0 uppercase text-sm border px-4 py-2 text-slate-500"
            >
              clear all
            </button>
          </nav>
        </header>
        <main>
          <section className="mt-5">
            <h1 className="text-2xl text-slate-500">All Restaurants</h1>
          </section>
          <section className="mt-10 pb-36 flex flex-wrap gap-1 justify-between">
            {isLoading ? (
              <img src={spinner} alt="loading" className="mx-auto" />
            ) : (
              ""
            )}
            {restaurants.map((restaurant) => {
              if (cuisine && isOpen) {
                if (
                  restaurant.cuisines[0].toLowerCase() ==
                    cuisine.toLowerCase() &&
                  restaurant.is_open
                ) {
                  return <Card restaurant={restaurant} key={restaurant._id} />;
                }
              } else if (isOpen) {
                if (restaurant.is_open) {
                  return <Card restaurant={restaurant} key={restaurant.id} />;
                }
              } else if (cuisine) {
                if (
                  restaurant.cuisines[0].toLowerCase() == cuisine.toLowerCase()
                ) {
                  return <Card restaurant={restaurant} key={restaurant.id} />;
                }
              } else {
                return <Card restaurant={restaurant} key={restaurant.id} />;
              }
            })}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
