import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import meditiation from "../../Asset/trackcalo/meditiation.png";
import { IoFootsteps } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import { PiBrain } from "react-icons/pi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Calendar, theme, Modal, Button } from "antd";
import proteinIcon from "../../Asset/meallist/protein.png";
import carbIcon from "../../Asset/meallist/carb.png";
import fatIcon from "../../Asset/meallist/fat.png";
import caloriesIcon from "../../Asset/meallist/calories.png";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TrackCalo() {
  const [userInfo, setUserInfo] = useState({
    userId: localStorage.getItem('uid'),
    userName: localStorage.getItem('userName'),
  });
  const [userHealth, setUserHealth] = useState(null);
  const [nutritionTrack, setNutritionTrack] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const id = { uid: localStorage.getItem("uid") };
      try {
        const response = await axios.get(`http://13.251.119.140:3001/intake/${userInfo.userId}`);
        setNutritionTrack(response.data);
        const user = await axios.post("http://13.251.119.140:3001/users/get-me", id);
        setUserHealth(user.data);
        const chartDataResponse = await axios.get(`http://13.251.119.140:3001/track-food/${localStorage.getItem("uid")}`);
        setChartData(chartDataResponse.data);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    if (userInfo.userId) {
      fetchNutritionData();
    }
  }, [userInfo.userId]);

  // Prepare data for the chart
  const data = chartData.map(item => ({
    date: item.date,
    totalCalories: Number(item.totalCalories),
    totalProtein: Number(item.totalProtein),
    totalFat: Number(item.totalFat),
    totalCarb: Number(item.totalCarb),
  }));

  const transformedData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Calories',
        data: data.map(item => item.totalCalories),
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Protein',
        data: data.map(item => item.totalProtein),
        backgroundColor: '#4ADE80',
      },
      {
        label: 'Fat',
        data: data.map(item => item.totalFat),
        backgroundColor: '#F97316',
      },
      {
        label: 'Carb',
        data: data.map(item => item.totalCarb),
        backgroundColor: '#FBBF24',
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-5 gap-4 bg-[#1D1D1D] text-white p-6 shadow-lg">
        <div className="col-span-3 row-span-5">
          <h1 className="text-3xl font-bold mb-5">Dashboard Overview</h1>
          <header
            className="mb-6 p-4 rounded-md h-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, #d3a231, #c9704f, #995360, #5a4255, #2d2d2d)",
            }}
          >
            <h2 className="text-4xl font-semibold mt-2">
              Hello {userInfo.userName},
            </h2>
            <p className="mt-1 text-xl">
              Have a nice day and don't forget to take care of your health!
            </p>
            <img
              src={meditiation}
              alt="Meditation"
              className="h-auto w-1/6 object-cover rounded-md absolute bottom-[26rem] right-[30rem]"
            />
          </header>
          <div className="mt-6  rounded-md flex">
            <div className="w-full rounded-md bg-white p-4">
              <h3 className="text-3xl font-bold text-black text-center">
                Daily Nutritional Intake
              </h3>
              <Bar data={transformedData} options={{ responsive: true }} />
            </div>

          </div>
        </div>
        <div className="row-span-5 col-start-4   bg-white p-6 rounded-lg">
          {userHealth ? (         
            <section className="text-center  flex flex-col items-center bg-gray-200 p-5 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl text-black font-bold mb-2 text-nowrap">
              {userInfo.userName}
            </h3>

            <div className="text-center">
              <div className="grid grid-cols-2 gap-4 space-x-2">
                <div className=" p-2  ">
                  <p className="text-gray-500">Height</p>
                  <p className="text-black font-bold text-xl">{userHealth.user.Height}</p>
                </div>
                <div className="p-2">
                  <p className="text-gray-500">Weight</p>
                  <p className="text-black font-bold text-xl">{userHealth.user.Weight}</p>
                </div>
              </div>
              <div className="p-2">
                <p className="text-gray-500">Aim</p>
                <p className="text-black font-bold text-xl">{userHealth.user.Aim}</p>
              </div>
            </div>
            <div className="  bg-gray-200  border-t-2  border-black">
              <h3 className="text-2xl font-bold text-black text-center mt-8">
                Nutritional a day
              </h3>
              {nutritionTrack ? (<div className="flex flex-col gap-4 items-center justify-center mt-6">
                <div className="bg-white p-4 rounded-md  text-white text-center border-2 border-black w-48">
                  <div className="flex items-center justify-center ">
                    <div className="inline-flex items-center justify-center rounded-full mr-2">
                      <img
                        src={proteinIcon}
                        alt="Protein"
                        className="w-10 h-10"
                      />
                    </div>
                    <p className="text-black">
                      <span className="font-bold text-2xl">{nutritionTrack.Protein}</span>
                      <span className="font-light text-base"> g</span>
                    </p>
                  </div>
                  <p className="ml-7 text-black font-bold">Protein</p>
                </div>
                <div className="bg-white p-4 rounded-md  text-white text-center border-2 border-black w-48">
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-full mr-2">
                      <img src={carbIcon} alt="Carbs" className="w-10 h-10" />
                    </div>
                    <p className="text-black">
                      <span className="text-2xl font-bold">{nutritionTrack.Carb}</span>{" "}
                      <span className="text-base font-light">g</span>
                    </p>
                  </div>
                  <p className="ml-4 text-black font-bold">Carbs</p>
                </div>
                <div className="bg-white p-4 rounded-md  text-white text-center border-2 border-black w-48">
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-full mr-2">
                      <img src={fatIcon} alt="Fat" className="w-10 h-10" />
                    </div>
                    <p className="text-black">
                      <span className="text-2xl font-bold">{nutritionTrack.Fat}</span>{" "}
                      <span className="text-base font-light">g</span>
                    </p>
                  </div>
                  <p className="ml-2 text-black font-bold">Fat</p>
                </div>
              </div>):null}
              
            </div>
          </section>):null}
 
            
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

export default TrackCalo;
