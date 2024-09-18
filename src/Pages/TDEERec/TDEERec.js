import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TDEERec.css';
import axios from 'axios';
import caloriesIcon from '../../Asset/meallist/calories.png';
function TDEERec() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('1');
    const [recommendation, setRecommendation] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false); 
    const [showRecommendation, setShowRecommendation] = useState(false); 
    const [listoffood, setListoffood] = useState([]);
    const [tdee, setTdee] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3001/food/`).then((response) => {
        setListoffood(response.data);
        });
    }, []);

    const supportedImageFormats = ['jpeg', 'jpg', 'png', 'webp'];
    const getImageUrl = (id) => {
        for (const format of supportedImageFormats) {
            const imageUrl = `/foodpicture/${id}.${format}`;
            return imageUrl;
        }
        return '/foodpicture/default.jpg';
        };

    const calculateTDEE = () => {
        if (parseFloat(height) <= 0 || parseFloat(weight) <= 0 || parseInt(age) <= 0) {
            setError('Please enter valid values for height, weight, and age.');
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
                setRecommendation("Invalid activity level input. Please select a valid activity level.");
                return;
        }

        let recommendationText;
        
        setTdee(tdee);

        if (tdee < 2300) {
            recommendationText = `Your TDEE (Total Daily Energy Expenditure) is approximately <span style="color: red;">${tdee.toFixed(2)} calories</span> per day. It seems like your energy expenditure is relatively low. To maintain a healthy lifestyle, aim for a balanced diet with a mix of carbohydrates, proteins, and fats. Include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals. Additionally, consider incorporating regular physical activity into your routine to enhance your overall well-being.`;
        } else {
            recommendationText = `Your TDEE (Total Daily Energy Expenditure) is approximately <span style="color: red;">${tdee.toFixed(2)} calories</span> per day. It appears that you have a higher energy expenditure. To maintain your current weight and support your active lifestyle, aim to consume around this amount of calories per day. Focus on incorporating a variety of nutrient-dense foods from all food groups in your diet to meet your nutritional needs and support your energy requirements. Additionally, consider incorporating regular physical activity tailored to your preferences and fitness goals to optimize your health and well-being.`;
        }

        
        setRecommendation(recommendationText);
        // setTdeeValue(tdee.toFixed(2));
        setError('');
        setShowRecommendation(true); 
    };

    const handleCalculateClick = () => {
        if (!height || !weight || !age) {
            setError('Please fill in all fields.');
            setShowError(true);
            return;
        }
        calculateTDEE();
    };

    const handleCloseError = () => {
        setError('');
        setShowError(false); 
    };

    const handleCloseRecommendation = () => {
        setShowRecommendation(false); 
    };

    return (
    <div className="TDEE-container">
        <div className="modal-overlay" style={{ display: showError || showRecommendation ? 'block' : 'none' }}></div>
        <div className="container">
            <h2>TDEE Calculator</h2>
            <p>The Total Daily Energy Expenditure (TDEE) Calculator estimates how many calories you burn per day.</p>

            {showError && (
                <div className="error-popup">
                    <p>{error}</p>
                    <button onClick={handleCloseError}>Close</button>
                </div>
            )}
            {showRecommendation && (
                <div className="recommendation-popup">
                    <h3>Recommendation:</h3>
                    <p style={{fontSize:'15px'}} dangerouslySetInnerHTML={{ __html: recommendation }}></p>
                    <div className="food-row">
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
                        .slice(0,4)
                        .map((value, key) => (
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
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleCloseRecommendation}>Close</button>
                </div>
            )}
            <div className="input-group">
                <label htmlFor="height">Height:</label>
                <div className="input-with-placeholder">
                    <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    <span className="placeholder">cm</span>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="weight">Weight:</label>
                <div className="input-with-placeholder">
                    <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    <span className="placeholder">kg</span>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="age">Age:</label>
                <div className="input-with-placeholder">
                    <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    <span className="placeholder">years</span>
                </div>
            </div>

            <div className="input-group">
                <label>Gender:</label>
                <div className="radio-group">
                    <input type="radio" id="maleRadio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
                    <label htmlFor="maleRadio" className="gender-label">Male</label>
                    <input type="radio" id="femaleRadio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
                    <label htmlFor="femaleRadio" className="gender-label">Female</label>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="activityLevel">Activity Level:</label>
                <select id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                    <option value="1">Sedentary (little or no exercise)</option>
                    <option value="2">Lightly active (exercise 1-3 days/week)</option>
                    <option value="3">Moderately active (exercise 3-5 days/week)</option>
                    <option value="4">Very active (exercise 6-7 days/week)</option>
                    <option value="5">Super active (twice/day)</option>
                </select>
            </div>

            <button onClick={handleCalculateClick}>Calculate</button>
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

export default TDEERec;
