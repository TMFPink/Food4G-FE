import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import proteinIcon from "../../Asset/meallist/protein.png";
import carbIcon from "../../Asset/meallist/carb.png";
import fatIcon from "../../Asset/meallist/fat.png";
import caloriesIcon from "../../Asset/meallist/calories.png";
import { useNavigate } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

function Food() {
  const [listoffood, setListoffood] = useState([]);
  const [foodingredient, setfoodingredient] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredFood, setFilteredFood] = useState({
    MeatAndProtein: false,
    Vegetables: false,
    Fruits: false,
    DairyAndCheese: false,
    GrainAndCarbs: false,
    SaucesOilCondiments: false,
    HerbAndSpices: false,
    Miscellaneous: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodResponse = await axios.get("http://localhost:3001/food");
        setListoffood(foodResponse.data);
        console.log("Food Data:", foodResponse.data);

        const ingredientResponse = await axios.get(
          "http://localhost:3001/foodingre"
        );
        setfoodingredient(ingredientResponse.data);
        console.log("Ingredient Data:", ingredientResponse.data);
      } catch (error) {
        console.error("Error fetching food and ingredient data:", error);
      }
    };
    fetchData();
  }, []);

  //image part
  const supportedImageFormats = ["jpeg", "jpg", "png", "webp"];
  const getImageUrl = (id) => {
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      return imageUrl;
    }
    return "/foodpicture/default.jpg";
  };

  // Sort food list based on calories
  const sortFoodByCalories = () => {
    const sortedFood = [...listoffood].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Calories - b.Calories;
      } else {
        return b.Calories - a.Calories;
      }
    });
    setListoffood(sortedFood);
  };
  // Function to handle sorting in ascending order
  const sortAscending = () => {
    setSortOrder("asc");
    sortFoodByCalories();
  };

  // Function to handle sorting in descending order
  const sortDescending = () => {
    setSortOrder("desc");
    sortFoodByCalories();
  };
  useEffect(() => {
    sortFoodByCalories();
  }, [sortOrder]);

  //DROP DOWN PART
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };
  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const linkFoodWithIngredients = () => {
    const linkedFood = listoffood.map((food) => {
      const ingredients = foodingredient.filter(
        (ingredient) => ingredient.FoodID === food.id
      );
      return { ...food, ingredients };
    });
    return linkedFood;
  };
  const getFilteredFood = () => {
    let linkedFood = linkFoodWithIngredients();
    if (filteredFood.MeatAndProtein) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Beef",
            "Chicken",
            "Shrimp",
            "Salmon Fillets",
            "Seafood Mix (shrimp, mussels, squid)",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.Vegetables) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Bell Peppers",
            "Tomatoes",
            "Onions",
            "Spinach",
            "Zucchini",
            "Portobello Mushrooms",
            "Roasted Vegetables (e.g., bell peppers, zucchini, eggplant)",
            "Lettuce",
            "Cucumbers",
            "Jalapeno",
            "Asparagus Spears",
            "Artichoke Hearts",
            "Cabbage",
            "Carrots",
            "Celery",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.Fruits) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Avocado",
            "Apple slices",
            "Apples",
            "Strawberries",
            "Blueberries",
            "Raspberries",
            "Bananas",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.DairyAndCheese) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Cheese",
            "Fresh Mozzarella Cheese",
            "Parmesan Cheese",
            "Ricotta Cheese",
            "Whipped Cream",
            "Greek Yogurt",
            "Butter",
            "Heavy Cream",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.GrainAndCarbs) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Pasta",
            "Rice",
            "Tortillas",
            "Bread",
            "Burger Bun",
            "Oats",
            "Waffles",
            "Pancakes",
            "Toast",
            "Angel Food Cake",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.SaucesOilCondiments) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Soy Sauce",
            "Oyster Sauce",
            "Taco Seasoning",
            "Balsamic Vinegar",
            "Olive Oil",
            "Lemon Juice",
            "Cinnamon",
            "Sugar",
            "Salt",
            "Pepper",
            "Mustard",
            "Mayonnaise",
            "Jam or Jelly",
            "Honey",
            "Maple Syrup",
            "Alfredo Sauce",
            "Agave Syrup",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.HerbAndSpices) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Basil leaves",
            "Thyme",
            "Parsley",
            "Cilantro",
            "Garlic",
            "Cinnamon",
            "Herbs",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    if (filteredFood.Miscellaneous) {
      linkedFood = linkedFood.filter((food) =>
        food.ingredients.some((ingredient) =>
          [
            "Pine Nuts",
            "Pineapple",
            "Pickles",
            "Ice cream",
            "Chocolate Sauce",
            "Chocolate",
            "Coconut",
            "Peanut Butter",
            "Almond Butter",
            "Chocolate Chips",
            "Raisins",
            "Seeds",
            "Nuts",
            "Flaxseed",
            "Chia Seeds",
            "Protein Powder",
          ].includes(ingredient.Ingredient)
        )
      );
    }
    return linkedFood;
  };

  const toggleFilter = (filter) => {
    setFilteredFood((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter], // Toggle the state of the filter
    }));
  };

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Update search results whenever the search query changes
  useEffect(() => {
    handleSearch(searchQuery); // Call search function whenever searchQuery changes
  }, [searchQuery]);

  // Function to handle search
  const handleSearch = (query) => {
    const filteredResults = listoffood.filter((food) =>
      food.FoodName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const navigation = useNavigate();

  return (
    <div className="bg-[#1D1D1D] flex flex-col pt-2  ">
      <div className="flex justify-between items-center my-5">
        
        {/* Updated search form */}
        <form className="max-w-md mx-auto" onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleSearch(searchQuery); // Call search function
        }}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-96  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
              placeholder="Search Foods"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-[#D3A121]  hover:text-black font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
          </div>
        </form>
      </div>

      {/* Search results dropdown */}
      {searchQuery && (
        <div className="absolute left-[36.5%] top-[25%] w-96 h-96 z-10 bg-white shadow-lg rounded-lg p-4  overflow-y-auto">
          {searchResults.map((result) => (
            <div
              key={result.ID}
              className="SearchResultItem flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigation(`/FoodDetail/${result.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={getImageUrl(result.id)}
                alt="food"
                className="FoodThumbnail w-16 h-16 rounded-md mr-2"
              />
              <div className="FoodTitle_Search text-gray-800">
                {result.FoodName.length > 20
                  ? result.FoodName.substring(0, 20) + "..."
                  : result.FoodName}
              </div>
            </div>
          ))}
        </div>
      )}

      
      <div className="flex  align-center mb-5 px-10 pt-5">
        <button
          onClick={toggleSortDropdown}
          className="flex items-center text-white"
        >
          <FaArrowDown className="arrow-icon w-5 h-auto mr-1 text-white" />
          <span>Sort</span>
        </button>

        {/* Updated dropdown for sorting options */}
        {showSortDropdown && (
          <div className="absolute top-[15rem] bg-white rounded-lg border border-1 box-shadow-lg z-10 pt-2 p-2">
            <div className="flex flex-col">
              <button
                onClick={() => {
                  setSortOrder("asc");
                  setShowSortDropdown(false);
                }}
                className="py-2 px-4 hover:bg-gray-200 text-left font-normal"
              >
                Sort by Calories (Ascending)
              </button>
              <button
                onClick={() => {
                  setSortOrder("desc");
                  setShowSortDropdown(false);
                }}
                className="py-2 px-4 hover:bg-gray-200 text-left font-normal"
              >
                Sort by Calories (Descending)
              </button>
            </div>
          </div>
        )}

        <div style={{ marginRight: "20px" }}></div>
        {/* Filter button */}
        <button
          onClick={toggleFilterDropdown}
          className="flex items-center text-white"
        >
          <IoFilter className="mr-2 w-5 h-auto text-white" />
          <span>Filter</span>
        </button>
        {/* Filter dropdown */}
        {showFilterDropdown && (
          <div className="absolute top-[15rem] left-[6rem]  bg-white rounded-lg border border-1 box-shadow-lg z-10 pt-2 p-2">
            <div>
              <div>
                <span
                  className={
                    filteredFood.MeatAndProtein
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("MeatAndProtein");
                  }}
                >
                  MeatAndProtein
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.Vegetables
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("Vegetables");
                  }}
                >
                  Vegetables
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.Fruits
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("Fruits");
                  }}
                >
                  Fruits
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.DairyAndCheese
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("DairyAndCheese");
                  }}
                >
                  DairyAndCheese
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.GrainAndCarbs
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("GrainAndCarbs");
                  }}
                >
                  GrainsAndCarbs
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.SaucesOilCondiments
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("SaucesOilCondiments");
                    setShowFilterDropdown(false);
                  }}
                >
                  SaucesOilCondiments
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.HerbAndSpices
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("HerbAndSpices");
                  }}
                >
                  HerbsAndSpices
                </span>
                <span className="m-2 border-l-2 border-gray-300"></span>
                <span
                  className={
                    filteredFood.Miscellaneous
                      ? "active bg-[#D3A121] rounded-sm p-1 font-semibold "
                      : ""
                  }
                  onClick={() => {
                    toggleFilter("Miscellaneous");
                  }}
                >
                  Miscellaneous
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5 px-10 pb-10">
        {getFilteredFood().map((value, key) => (
          <div
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:translate-y-1 hover:shadow-lg"
            key={key}
          >
            <Link
              to={`/FoodDetail/${value.id}`}
              className="text-inherit no-underline"
            >
              <div className="h-52 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl(value.id)}
                  alt="Food"
                />
              </div>
              <div className="p-4 bg-white">
                <div className="text-lg font-bold mb-2 text-center text-black">
                  {value.FoodName}
                </div>
                <div className="flex flex-wrap justify-center ml-28 text-center text-yellow-600">
                  <div className="flex items-center mt-2 w-1/2">
                    <img
                      className="w-5 h-auto mr-1"
                      src={caloriesIcon}
                      alt="Calories"
                    />
                    Calories: {value.Calories}
                  </div>
                  <div className="flex items-center mt-2 w-1/2">
                    <img
                      className="w-5 h-auto mr-1"
                      src={proteinIcon}
                      alt="Protein"
                    />
                    Protein: {value.Protein}
                  </div>
                  <div className="flex items-center mt-2 w-1/2">
                    <img
                      className="w-5 h-auto mr-1"
                      src={carbIcon}
                      alt="Carb"
                    />
                    Carb: {value.Carb}
                  </div>
                  <div className="flex items-center mt-2 w-1/2">
                    <img className="w-5 h-auto mr-1" src={fatIcon} alt="Fat" />
                    Fat: {value.Fat}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer className="bg-[#272728] py-10 text-center">
        <div className="max-w-5xl mx-auto">
          <ul className="list-none p-0">
            <li className="inline-block mr-5">
              <Link to="/posts" className="text-white">
                Blog
              </Link>
            </li>
            <li className="inline-block mr-5 text-white">Terms of Service</li>
            <li className="inline-block mr-5 text-white">Privacy Policy</li>
            <li className="inline-block">
              <a href="mailto:food4g@gmail.com" className="text-white">
                Contact Us
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-white">
            &copy; 2024 Fitness Journey. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Food;
