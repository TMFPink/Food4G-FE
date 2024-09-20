import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MealList.css';
import proteinIcon from '../../Asset/meallist/protein.png';
import carbIcon from '../../Asset/meallist/carb.png';
import fatIcon from '../../Asset/meallist/fat.png';
import caloriesIcon from '../../Asset/meallist/calories.png';
import { useNavigate } from 'react-router-dom';
import arrowdownIcon from '../../Asset/meallist/arrowdown.png'
import filterIcon from '../../Asset/meallist/filter.png'

function Food() {
  const [listoffood, setListoffood] = useState([]);
  const [foodingredient, setfoodingredient] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
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
      const foodResponse = await axios.get('https://food4g-api.onrender.com/food');
      setListoffood(foodResponse.data);
      console.log("Food Data:", foodResponse.data);
      
      const ingredientResponse = await axios.get('https://food4g-api.onrender.com/foodingre');
      setfoodingredient(ingredientResponse.data);
      console.log("Ingredient Data:", ingredientResponse.data);
    } catch (error) {
      console.error('Error fetching food and ingredient data:', error);
    }
  }
  fetchData();
}, []);


  //image part
  const supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp'];
  const getImageUrl = (id) => {
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      return imageUrl;
    }
    return '/foodpicture/default.jpg';
  };

  // Sort food list based on calories
  const sortFoodByCalories = () => {
    const sortedFood = [...listoffood].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.Calories - b.Calories;
      } else {
        return b.Calories - a.Calories;
      }
    });
    setListoffood(sortedFood);
  };
  // Function to handle sorting in ascending order
  const sortAscending = () => {
    setSortOrder('asc');
    sortFoodByCalories();
  };

  // Function to handle sorting in descending order
  const sortDescending = () => {
    setSortOrder('desc');
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
    const linkedFood = listoffood.map(food => {
      const ingredients = foodingredient.filter(ingredient => ingredient.FoodID === food.id);
      return { ...food, ingredients };
    });
    return linkedFood;
  };
  const getFilteredFood = () => {
    let linkedFood = linkFoodWithIngredients();
    if (filteredFood.MeatAndProtein) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Beef', 'Chicken', 'Shrimp', 'Salmon Fillets', 'Seafood Mix (shrimp, mussels, squid)'].includes(ingredient.Ingredient)
      ));
    }
    if(filteredFood.Vegetables){
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Bell Peppers', 'Tomatoes', 'Onions', 'Spinach', 'Zucchini', 'Portobello Mushrooms', 'Roasted Vegetables (e.g., bell peppers, zucchini, eggplant)', 'Lettuce', 'Cucumbers', 'Jalapeno', 'Asparagus Spears', 'Artichoke Hearts', 'Cabbage', 'Carrots', 'Celery'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.Fruits) {
    linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
      ['Avocado', 'Apple slices', 'Apples', 'Strawberries', 'Blueberries', 'Raspberries', 'Bananas'].includes(ingredient.Ingredient)
    ));
    }
    if (filteredFood.DairyAndCheese) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Cheese', 'Fresh Mozzarella Cheese', 'Parmesan Cheese', 'Ricotta Cheese', 'Whipped Cream', 'Greek Yogurt', 'Butter', 'Heavy Cream'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.GrainAndCarbs) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Pasta', 'Rice', 'Tortillas', 'Bread', 'Burger Bun', 'Oats', 'Waffles', 'Pancakes', 'Toast', 'Angel Food Cake'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.SaucesOilCondiments) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Soy Sauce', 'Oyster Sauce', 'Taco Seasoning', 'Balsamic Vinegar', 'Olive Oil', 'Lemon Juice', 'Cinnamon', 'Sugar', 'Salt', 'Pepper', 'Mustard', 'Mayonnaise', 'Jam or Jelly', 'Honey', 'Maple Syrup', 'Alfredo Sauce', 'Agave Syrup'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.HerbAndSpices) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Basil leaves', 'Thyme', 'Parsley', 'Cilantro', 'Garlic', 'Cinnamon', 'Herbs'].includes(ingredient.Ingredient)
      ));
    }
    if (filteredFood.Miscellaneous) {
      linkedFood = linkedFood.filter(food => food.ingredients.some(ingredient =>
        ['Pine Nuts', 'Pineapple', 'Pickles', 'Ice cream', 'Chocolate Sauce', 'Chocolate', 'Coconut', 'Peanut Butter', 'Almond Butter', 'Chocolate Chips', 'Raisins', 'Seeds', 'Nuts', 'Flaxseed', 'Chia Seeds', 'Protein Powder'].includes(ingredient.Ingredient)
      ));
    }
    return linkedFood;
  };

  const toggleFilter = (filter) => {
    setFilteredFood(prevFilters => ({
        ...prevFilters,
        [filter]: !prevFilters[filter] // Toggle the state of the filter
    }));
  }; 
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Function to handle search
  const handleSearch = (query) => {
      const filteredResults = listoffood.filter((food) =>
          food.FoodName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
  };
  const navigation = useNavigate();



  return (
    <div className="meal-list-container">

      <div className="SearchBox">
        <div className="SearchInput">

            <input
                type="text"
                className="SearchContainer"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                }}
            />
        </div>
    
        
        {/* Search results dropdown */}
        {searchQuery && (
            <div className="SearchResults">
                {searchResults.map((result) => (
                    <div
                        key={result.ID}
                        className="SearchResultItem"
                        onClick={() => {
                            navigation(`/FoodDetail/${result.id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <img src={getImageUrl(result.id)} alt="food" className="FoodThumbnail" />
                        <div className="FoodTitle_Search">{result.FoodName.length > 20 ? result.FoodName.substring(0, 20) + '...' : result.FoodName}</div>
                    </div>
                ))}
            </div>
        )}
    </div>


      <h2 className="section-title">Meal List</h2>
      <span style={{fontSize:'15px',color:'white',textAlign:'center'}}>Welcome to our Meal List! Just like choosing the perfect outfit to match your style, here you can select from a variety of nutritious meals tailored to your preferences. Whether you're looking for a hearty protein-packed dish or a light and refreshing salad, we've got you covered. Explore our selection of meals, each crafted with high-quality ingredients to fuel your body and support your fitness goals. From savory main courses to delicious snacks, our meal options cater to every taste and dietary need. Dive in and discover a world of culinary delights that will keep you energized and satisfied throughout your fitness journey. Bon appétit!</span>
      <div className='button-container'>

      <button onClick={toggleSortDropdown}>
        <span>Sort</span>
        <img src={arrowdownIcon} alt="Arrow down" className="arrow-icon" />
      </button>
        
      {showSortDropdown && (
          <div className="sort-dropdown">
              <button onClick={() => { setSortOrder('asc'); setShowSortDropdown(false); }}>Sort by Calories (Ascending)</button>
              <button onClick={() => { setSortOrder('desc'); setShowSortDropdown(false); }}>Sort by Calories (Descending)</button>
          </div>
      )}

      <div style={{ marginRight: '20px' }}></div>
      {/* Filter button */}
      <button onClick={toggleFilterDropdown}>
          <img src={filterIcon} alt="Filter" className="filter-icon" />
          <span>Filter</span>
        </button>
        {/* Filter dropdown */}
        {showFilterDropdown && (
        <div className="filter-dropdown">
            <div className="filterlist">
                <div className='filtercontent'>
                    <span className={filteredFood.MeatAndProtein ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('MeatAndProtein')}}>MeatAndProtein</span>
                    <span className="divider"></span>
                    <span className={filteredFood.Vegetables ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('Vegetables')}}>Vegetables</span>
                    <span className="divider"></span>
                    <span className={filteredFood.Fruits ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('Fruits')}}>Fruits</span>
                    <span className="divider"></span>
                    <span className={filteredFood.DairyAndCheese ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('DairyAndCheese')}}>DairyAndCheese</span>
                    <span className="divider"></span>
                    <span className={filteredFood.GrainAndCarbs ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('GrainAndCarbs')}}>GrainsAndCarbs</span>
                    <span className="divider"></span>
                    <span className={filteredFood.SaucesOilCondiments ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('SaucesOilCondiments'); setShowFilterDropdown(false); }}>SaucesOilCondiments</span>
                    <span className="divider"></span>
                    <span className={filteredFood.HerbAndSpices ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('HerbAndSpices')}}>HerbsAndSpices</span>
                    <span className="divider"></span>
                    <span className={filteredFood.Miscellaneous ? 'filter-button active' : 'filter-button'} onClick={() => { toggleFilter('Miscellaneous')}}>Miscellaneous</span>
                </div>
            </div>
        </div>
    )}   
    </div>

      <div className="card-container">
        {getFilteredFood().map((value, key) => (
          <div className="food-card" key={key}>
            <Link to={`/FoodDetail/${value.id}`} className="food-card-link">
              <div className="food-image-container">
                <img className="food-image" src={getImageUrl(value.id)} alt="Food" />
              </div>
              <div className="food-details">
                <div className="food-name">{value.FoodName}</div>
                <div className="nutrition-info">
                  <div className="info-item">
                    <img className="nutrition-icon" src={caloriesIcon} alt="Calories" />
                    Calories: {value.Calories}
                  </div>
                  <div className="info-item">
                    <img className="nutrition-icon" src={proteinIcon} alt="Protein" />
                    Protein: {value.Protein}
                  </div>
                  <div className="info-item">
                    <img className="nutrition-icon" src={carbIcon} alt="Carb" />
                    Carb: {value.Carb}
                  </div>
                  <div className="info-item">
                    <img className="nutrition-icon" src={fatIcon} alt="Fat" />
                    Fat: {value.Fat}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer className="footer-section">
        <div className="footer-content">
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><div style={{color:'#FFFFFF'}}> Terms of Service </div></li>
            <li><div style={{color:'#FFFFFF'}}> Privacy Policy </div></li>
            <li><a href="mailto:food4g@gmail.com">Contact Us</a></li>
          </ul>
          <p style={{color:'#FFFFFF'}}>&copy; 2024 Fitness Journey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Food;
