import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import proteinIcon from "../../Asset/meallist/protein.png";
import carbIcon from "../../Asset/meallist/carb.png";
import fatIcon from "../../Asset/meallist/fat.png";
import caloriesIcon from "../../Asset/meallist/calories.png";

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
    <div className="bg-[#1D1D1D]">
      <div className="max-w-5xl mx-auto p-5 mb-10 bg-gray-200 rounded-lg shadow-lg flex ">
        <div className="w-1/2 p-5">
          <img
            src={`/foodpicture/${food.id}.jpeg`}
            className="w-[500px] h-[600px] rounded-[50px] object-fill"
          />
        </div>
        <div className="w-1/2 p-5">
        <h2 className="text-2xl mb-2 text-center font-bold">{food.FoodName}</h2>
          <div className="text-left">
            <div className="flex justify-evenly mt-4  text-lg">
              <div className="flex items-center">
                <img className="w-5 h-auto mr-1 mt-2" src={caloriesIcon} alt="Calories" />
                <p>Calories: {food.Calories}</p>
              </div>
              <div className="flex items-center">
                <img className="w-5 h-auto mr-1 mt-2" src={proteinIcon} alt="Protein" />
                <p>Protein: {food.Protein}</p>
              </div>
              <div className="flex items-center">
                <img className="w-5 h-auto mr-1 mt-2" src={carbIcon} alt="Carb" />
                <p>Carb: {food.Carb}</p>
              </div>
              <div className="flex items-center">
                <img className="w-5 h-auto mr-1 mt-2" src={fatIcon} alt="Fat" />
                <p>Fat: {food.Fat}</p>
              </div>
            </div>
            <div className="mt-4  text-lg">
              <span className="font-bold">Instruction:</span>{" "}
              <span>{food.Instruction}</span>
            </div>
            <h3 className="mt-4 font-bold text-xl">Ingredients:</h3>
            <ul className="mt-2 text-lg space-y-3">
              {foodDetail.map((value, index) => (
                <li key={index} className="mb-1">
                  <span>• {value.Ingredient}: {value.IngreAmount}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-20">
              <button className="bg-black text-white py-2 px-4 w-20 rounded-lg hover:bg-[#D3A231]">
                Add
              </button>
            </div>
          </div>
        </div>
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

export default FoodDetail;
