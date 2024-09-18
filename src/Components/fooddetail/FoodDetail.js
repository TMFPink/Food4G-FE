import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FoodDetail.css';
import { Link } from 'react-router-dom';
import proteinIcon from '../../Asset/meallist/protein.png';
import carbIcon from '../../Asset/meallist/carb.png';
import fatIcon from '../../Asset/meallist/fat.png';
import caloriesIcon from '../../Asset/meallist/calories.png';


function FoodDetail() {
  let { id } = useParams();
  const [food, setFood] = useState([]);
  const [foodDetail, setFoodDetail] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/food/${id}`).then((response) => {
      setFood(response.data);
    });
    axios.get(`http://localhost:3001/fooddetail/${id}`).then((response) => {
      setFoodDetail(response.data);
    });
  }, [id]);

  if (!foodDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className='food-detail-container1'>
      <div className='maincontainer'>
        <img src={`/foodpicture/${food.id}.jpeg`} className='fooddetail_img' ></img>
        <div className="food-detail-container">
            <h2>{food.FoodName}</h2>
            <div className="info-item">
            <div className="info-item">
              <img className="nutrition-icon2" src={caloriesIcon} alt="Calories" />
              <p>Calories: {food.Calories}</p>
            </div>
            <div className="info-item">
              <img className="nutrition-icon2" src={proteinIcon} alt="Protein" />
              <p>Protein: {food.Protein}</p>
            </div>
            <div className="info-item">
              <img className="nutrition-icon2" src={carbIcon} alt="Carb" />
              <p>Carb: {food.Carb}</p>
            </div>
            <div className="info-item">
              <img className="nutrition-icon2" src={fatIcon} alt="Fat" />
              <p>Fat: {food.Fat}</p>
            </div>
          </div>
          <div className='ing-info'>
            <span style={{fontWeight:'bold'}}> Instruction:</span> <span>{food.Instruction}</span>
          </div>
          <h3>Ingredients:</h3>
          <ul>
            {foodDetail.map((value, index) => 
              <li key={index}>
                <span>{value.Ingredient}: {value.IngreAmount}</span>
              </li>
            )}
          </ul>
        </div>

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

export default FoodDetail;
