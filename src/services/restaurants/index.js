const apiKey = "830982bf99ca4c80be7947da903fa654";
const getAllRestaurants = async (isOpen, cuisine) => {
  const restaurants = localStorage.getItem("restaurants");
  if (restaurants) {
    return JSON.parse(restaurants);
  } else {
    try {
      let url;
      if (cuisine) {
        url = `https://api.spoonacular.com/food/restaurants/search?cuisine=${cuisine}&apiKey=${apiKey}&page=0&is-open=${isOpen}`;
      } else {
        url = `https://api.spoonacular.com/food/restaurants/search?apiKey=${apiKey}&page=0&is-open=${isOpen}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      localStorage.setItem("restaurants", JSON.stringify(result.restaurants));
      return result.restaurants;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

const getRestaurantById = (id) => {
  const restaurants = localStorage.getItem("restaurants");
  const detailResto = JSON.parse(restaurants).filter((e) => e._id == id);
  return detailResto[0];
};

export { getAllRestaurants, getRestaurantById };
