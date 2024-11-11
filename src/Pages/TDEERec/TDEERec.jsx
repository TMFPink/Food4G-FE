import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TDEERec.css";
import caloriesIcon from "../../Asset/meallist/calories.png";
import tdeebg from "../../Asset/tdee/tdee-background.jpg";
function TDEERec() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("1");
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [listoffood, setListoffood] = useState([]);
  const [tdee, setTdee] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3001/food/`).then((response) => {
      setListoffood(response.data);
    });
  }, []);

  const supportedImageFormats = ["jpeg", "jpg", "png", "webp"];
  const getImageUrl = (id) => {
    for (const format of supportedImageFormats) {
      const imageUrl = `/foodpicture/${id}.${format}`;
      return imageUrl;
    }
    return "/foodpicture/default.jpg";
  };

  const calculateTDEE = () => {
    if (
      parseFloat(height) <= 0 ||
      parseFloat(weight) <= 0 ||
      parseInt(age) <= 0
    ) {
      setError("Please enter valid values for height, weight, and age.");
      setShowError(true);
      return;
    }

    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);
    const parsedAge = parseInt(age);

    let bmr;
    if (gender === "male") {
      bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5;
    } else if (gender === "female") {
      bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;
    }

    let tdee;
    switch (parseInt(activityLevel)) {
      case 1:
        tdee = bmr * 1.2;
        break;
      case 2:
        tdee = bmr * 1.375;
        break;
      case 3:
        tdee = bmr * 1.55;
        break;
      case 4:
        tdee = bmr * 1.725;
        break;
      case 5:
        tdee = bmr * 1.9;
        break;
      default:
        setRecommendation(
          "Invalid activity level input. Please select a valid activity level."
        );
        return;
    }

    let recommendationText;

    setTdee(tdee);

    if (tdee < 2300) {
      recommendationText = `Your TDEE (Total Daily Energy Expenditure) is approximately <span style="color: red;">${tdee.toFixed(
        2
      )} calories</span> per day. It seems like your energy expenditure is relatively low. To maintain a healthy lifestyle, aim for a balanced diet with a mix of carbohydrates, proteins, and fats. Include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals. Additionally, consider incorporating regular physical activity into your routine to enhance your overall well-being.`;
    } else {
      recommendationText = `Your TDEE (Total Daily Energy Expenditure) is approximately <span style="color: red;">${tdee.toFixed(
        2
      )} calories</span> per day. It appears that you have a higher energy expenditure. To maintain your current weight and support your active lifestyle, aim to consume around this amount of calories per day. Focus on incorporating a variety of nutrient-dense foods from all food groups in your diet to meet your nutritional needs and support your energy requirements. Additionally, consider incorporating regular physical activity tailored to your preferences and fitness goals to optimize your health and well-being.`;
    }

    setRecommendation(recommendationText);
    // setTdeeValue(tdee.toFixed(2));
    setError("");
    setShowRecommendation(true);
  };

  const handleCalculateClick = () => {
    if (!height || !weight || !age) {
      setError("Please fill in all fields.");
      setShowError(true);
      return;
    }
    calculateTDEE();
  };

  const handleCloseError = () => {
    setError("");
    setShowError(false);
  };

  const handleCloseRecommendation = () => {
    setShowRecommendation(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="bg-cover bg-fixed flex-grow"
        style={{ backgroundImage: `url(${tdeebg})` }}
      >
        {(showError || showRecommendation) && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
        )}
        <div className="max-w-md mx-auto mt-20 p-5 rounded-lg shadow-lg bg-white">
          <h2 className="mb-5 text-2xl text-center text-gray-800">
            TDEE Calculator
          </h2>
          <p className="text-center">
            The Total Daily Energy Expenditure (TDEE) Calculator estimates how
            many calories you burn per day.
          </p>

          {showError && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 z-20 w-52 p-5 rounded-lg text-black text-center ">
              <p className="text-lg">{error}</p>
              <button
                className="w-36 mt-2 px-4 py-2 bg-black text-white rounded"
                onClick={handleCloseError}
              >
                Close
              </button>
            </div>
          )}
          {showRecommendation && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-5 rounded-lg text-black text-center z-20 ">
              <h3 className="text-lg font-bold">Recommendation:</h3>
              <p
                className="text-base"
                dangerouslySetInnerHTML={{ __html: recommendation }}
              ></p>
              <div className="flex space-x-4 overflow-x-auto my-5">
                {listoffood
                    .sort((a, b) => {
                        const differenceA = Math.abs(a.Calories - tdee);
                        const differenceB = Math.abs(b.Calories - tdee);
                        // Ascending order (Lowest to Highest)
                        if (tdee > 2300) {
                            return differenceA - differenceB;
                        } else { // Descending order (Highest to Lowest)
                            return differenceB - differenceA;
                        }
                    })
                    .slice(0, 4)
                    .map((value, key) => (
                        <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:translate-y-[-5px] hover:shadow-lg w-1/4">
                            <Link to={`/FoodDetail/${value.id}`} className="block text-black no-underline">
                                <div className="h-52 overflow-hidden">
                                    <img className="w-full h-full object-cover" src={getImageUrl(value.id)} alt="Food" />
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="text-lg font-bold mb-2 text-center">{value.FoodName}</div>
                                    <div className="flex flex-col items-center text-yellow-600">
                                        <div className="flex items-center mt-2">
                                            <img className="w-5 h-auto mr-1" src={caloriesIcon} alt="Calories" />
                                            Calories: {value.Calories}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
              </div>
              <button
                className="mt-2 px-4 py-2 w-48 bg-black text-white rounded"
                onClick={handleCloseRecommendation}
              >
                Close
              </button>
            </div>
          )}
          <div className="mb-4 relative">
            <label htmlFor="height" className="block mb-2 text-gray-700">
              Height:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded pr-12"
                placeholder=" "
              />
              <span className="absolute right-3">cm</span>
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="weight" className="block mb-2 text-gray-700">
              Weight:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder=" "
              />
              <span className="absolute right-3">kg</span>
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="age" className="block mb-2 text-gray-700">
              Age:
            </label>
            <div className="flex items-center">
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              />
              <span className="absolute right-3">years</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Gender:</label>
            <div className="flex items-center ">
              <input
                type="radio"
                id="maleRadio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="mr-2 custom-radio"
              />
              <label htmlFor="maleRadio" className="mr-5">
                Male
              </label>

              <input
                type="radio"
                id="femaleRadio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="mr-2 custom-radio"
              />
              <label htmlFor="femaleRadio" className="mr-5">
                Female
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="activityLevel" className="block mb-2 text-gray-700">
              Activity Level:
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="1">Sedentary (little or no exercise)</option>
              <option value="2">Lightly active (exercise 1-3 days/week)</option>
              <option value="3">
                Moderately active (exercise 3-5 days/week)
              </option>
              <option value="4">Very active (exercise 6-7 days/week)</option>
              <option value="5">Super active (twice/day)</option>
            </select>
          </div>

          <button
            className="block w-full py-3 bg-black text-white rounded mt-4"
            onClick={handleCalculateClick}
          >
            Calculate
          </button>
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

export default TDEERec;
