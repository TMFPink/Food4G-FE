import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "@ant-design/charts";
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

function TrackCalo() {
  const data = [
    { month: "Today", type: "protein", value: 202 },
    { month: "Today", type: "carbs", value: 408 },
    { month: "Today", type: "fat", value: 87 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "type",
    isPercent: false,
    isStack: false,
    meta: {
      value: {
        min: 0,
      },
    },
    colorField: "type",
    color: ["#3B82F6", "#4ADE80", "#7DD3FC"],
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Tran Minh Nguyen Hong",
    age: "21 years old",
    location: "TPHCM, Vietnam",
    bloodType: "O+",
    height: "186cm",
    weight: "90kg",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 bg-[#1D1D1D] text-white p-6 shadow-lg">
        <div className="col-span-4 row-span-5">
          <h1 className="text-3xl font-bold mb-5">Dashboard Overview</h1>
          <header
            className="mb-6 p-4 rounded-md h-80"
            style={{
              backgroundImage:
                "linear-gradient(to right, #d3a231, #c9704f, #995360, #5a4255, #2d2d2d)",
            }}
          >
            <h2 className="text-4xl font-semibold mt-2">
              Hello Tran Minh Nguyen Hong,
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
            <div className="w-2/3 rounded-md bg-white p-4">
              <h3 className="text-3xl font-bold text-black text-center">
                Daily Caloric Intake
              </h3>
              <Column {...config} />
            </div>
            <div className="w-1/4 mx-auto  bg-gray-200 rounded-md p-4 ">
              <h3 className="text-2xl font-bold text-black text-center mt-8">
                Nutritional Information
              </h3>
              <div className="flex flex-col gap-4 items-center justify-center mt-12">
                <div className="bg-white p-4 rounded-md w-1/2 text-white text-center border-2 border-black">
                  <div className="flex items-center justify-center ">
                    <div className="inline-flex items-center justify-center rounded-full mr-2">
                      <img
                        src={proteinIcon}
                        alt="Protein"
                        className="w-10 h-10"
                      />
                    </div>
                    <p className="text-black">
                      <span className="font-bold text-2xl">202</span>
                      <span className="font-light text-base"> gam</span>
                    </p>
                  </div>
                  <p className="ml-7 text-black">Protein</p>
                </div>
                <div className="bg-white p-4 rounded-md w-1/2 text-white text-center border-2 border-black">
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-full mr-2">
                      <img src={carbIcon} alt="Carbs" className="w-10 h-10" />
                    </div>
                    <p className="text-black">
                      <span className="text-2xl font-bold">408</span>{" "}
                      <span className="text-base font-light">gam</span>
                    </p>
                  </div>
                  <p className="ml-4 text-black">Carbs</p>
                </div>
                <div className="bg-white p-4 rounded-md w-1/2 text-white text-center border-2 border-black">
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center justify-center rounded-full mr-2">
                      <img src={fatIcon} alt="Fat" className="w-10 h-10" />
                    </div>
                    <p className="text-black">
                      <span className="text-2xl font-bold">87</span>{" "}
                      <span className="text-base font-light">gam</span>
                    </p>
                  </div>
                  <p className="ml-2 text-black">Fat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-5 col-start-5 bg-white p-6 rounded-lg">
          <section className="text-center  flex flex-col items-center bg-gray-200 p-5 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl text-black font-bold mb-2 text-nowrap">
              {userInfo.name}
            </h3>
            <p className="font-medium text-black text-sm mb-5">
              {userInfo.age} | <FaMapMarkerAlt className="inline" /> {userInfo.location}
            </p>

            <div className="  text-center">
              <div className="grid grid-cols-3 gap-4 space-x-2">
                <div className=" p-2">
                  <p className="text-gray-500">Blood</p>
                  <p className="text-black font-bold text-xl">{userInfo.bloodType}</p>
                </div>
                <div className=" p-2  ">
                  <p className="text-gray-500">Height</p>
                  <p className="text-black font-bold text-xl">{userInfo.height}</p>
                </div>
                <div className="p-2">
                  <p className="text-gray-500">Weight</p>
                  <p className="text-black font-bold text-xl">{userInfo.weight}</p>
                </div>
              </div>
            </div>
            <Button onClick={handleEditClick} className="mt-4 bg-blue-500 text-white">
              Edit
            </Button>
          </section>
          <Calendar
            fullscreen={false}
            onPanelChange={onPanelChange}
            className="mt-4"
          />
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

      <Modal
        title={<div style={{ textAlign: 'center' }}>Edit User Information</div>}
        visible={isEditing}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="border-b-2 border-gray-500 w-full mb-2"
          />
          <label>Age:</label>
          <div className="flex items-center">
            <input
              type="text"
              name="age"
              value={userInfo.age.replace(" years old", "")}
              onChange={handleChange}
              className="border-b-2 border-gray-500 w-full mb-2"
            />
            <span className="ml-2 text-nowrap">years old</span>
          </div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={userInfo.location}
            onChange={handleChange}
            className="border-b-2 border-gray-500 w-full mb-2"
          />
          <label>Blood Type:</label>
          <input
            type="text"
            name="bloodType"
            value={userInfo.bloodType}
            onChange={handleChange}
            className="border-b-2 border-gray-500 w-full mb-2"
          />
          <label>Height:</label>
          <div className="flex items-center">
            <input
              type="text"
              name="height"
              value={userInfo.height.replace("cm", "")}
              onChange={handleChange}
              className="border-b-2 border-gray-500 w-full mb-2"
            />
            <span className="ml-2">cm</span>
          </div>
          <label>Weight:</label>
          <div className="flex items-center">
            <input
              type="text"
              name="weight"
              value={userInfo.weight.replace("kg", "")}
              onChange={handleChange}
              className="border-b-2 border-gray-500 w-full mb-2"
            />
            <span className="ml-2">kg</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TrackCalo;
