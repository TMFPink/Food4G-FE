import React from "react";
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
import { Calendar, theme } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";

function TrackCalo() {
  const data = [
    { month: "Jan", type: "steps", value: 202 },
    { month: "Jan", type: "calories", value: 408 },
    { month: "Jan", type: "water", value: 87 },
    { month: "Feb", type: "steps", value: 220 },
    { month: "Feb", type: "calories", value: 420 },
    { month: "Feb", type: "water", value: 90 },
    { month: "Mar", type: "steps", value: 250 },
    { month: "Mar", type: "calories", value: 430 },
    { month: "Mar", type: "water", value: 95 },
    // Add more months as needed
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    seriesField: "type",
    isPercent: true,
    isStack: true,
    meta: {
      value: {
        min: 0,
        max: 100,
      },
    },

    colorField: "type",
    color: ["#3B82F6", "#4ADE80", "#7DD3FC"],
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
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
          <section>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md text-white text-center">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-400 rounded-full mr-2">
                    <IoFootsteps className="text-white" />
                  </div>
                  <p className="text-black">
                    <span className="font-bold text-2xl">202</span>
                    <span className="font-light text-base"> / 3000</span>
                  </p>
                </div>
                <p className="ml-7 text-black">Steps taken</p>
              </div>
              <div className="bg-white p-4 rounded-md text-white text-center">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-400 rounded-full mr-2">
                    <FaFire className="text-white" />
                  </div>
                  <p className="text-black">
                    <span className="text-2xl font-bold">408</span>{" "}
                    <span className="text-base font-light">kcal</span>
                  </p>
                </div>
                <p className="ml-[4.2rem] text-black">Calories burned</p>
              </div>
              <div className="bg-white p-4 rounded-md text-white text-center">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full mr-2">
                    <IoWater className="text-white" />
                  </div>
                  <p className="text-black">
                    <span className="text-2xl font-bold">87</span>{" "}
                    <span className="text-base font-light">litres</span>
                  </p>
                </div>
                <p className="ml-14 text-black">Water taken</p>
              </div>
            </div>
          </section>
          <div className="mt-6 bg-white rounded-md">
            <h3 className="text-3xl font-bold text-black text-center">
              Fitness Activity
            </h3>
            <Column {...config} />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-8  ">
            {/* Reminders Section */}
            <div className="bg-white p-6 rounded-lg h-72 flex flex-col ">
              <h3 className="text-2xl font-bold text-center text-black mb-10">
                Reminders
              </h3>
              <div className="grid grid-cols-2 gap-5 justify-items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-2 border-2 border-blue-500">
                    <CgGym className="text-white text-2xl" />
                  </div>
                  <span className="text-xl font-bold text-black">48min</span>
                  <span className="text-sm text-gray-900">Stretching</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-2 border-2 border-blue-500">
                    <PiBrain className="text-white text-2xl" />
                  </div>
                  <span className="text-xl font-bold text-black">32min</span>
                  <span className="text-sm text-gray-900">Mind training</span>
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="bg-white p-6 rounded-lg h-72  flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold  text-black mb-4">Reports</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="#e5e7eb"
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="#4ADE80"
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray="219.91"
                          strokeDashoffset={219.91 - (219.91 * 80) / 100}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-black mt-2 font-semibold">Weight loss</p>
                    <p className="text-sm text-green-400">80% decrease</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center">
                      <svg className="w-20 h-20 -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="#e5e7eb"
                          strokeWidth="5"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="#60A5FA"
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray="219.91"
                          strokeDashoffset={219.91 - (219.91 * 78) / 100}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-black mt-2 font-semibold">
                      General health
                    </p>
                    <p className="text-sm text-blue-400">78% increase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* New Monthly Goals Section */}
            <div className="bg-white p-6 rounded-lg h-72">
              <div className="flex flex-col items-center justify-center">
                <div className="relative inline-flex">
                  <div className="w-32 h-32 rounded-full bg-gray-700">
                    <div
                      className="w-32 h-32 rounded-full bg-blue-500"
                      style={{
                        background: `conic-gradient(#3B82F6 ${
                          86 * 3.6
                        }deg, #ffffff 0deg)`,
                      }}
                    />
                  </div>
                  <span
                    className="absolute text-black text-2xl font-bold"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    86%
                  </span>
                </div>
                <p className="text-black mt-4 text-lg">
                  You have achieved 86% of
                </p>
                <p className="text-black text-lg">your goals this month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-5 col-start-5 bg-white p-6 rounded-lg">
          <section className="text-center  flex flex-col items-center bg-gray-200 p-5 rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
              <FaUser className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl text-black font-bold mb-2">
              Tran Minh Nguyen Hong
            </h3>
            <p className="font-medium text-black text-sm mb-5">
              21 years old | <FaMapMarkerAlt className="inline" /> TPHCM,
              Vietnam
            </p>

            <div className="  text-center">
              <div className="grid grid-cols-3 gap-4 space-x-2">
                <div className=" p-2">
                  <p className="text-gray-500">Blood</p>
                  <p className="text-black font-bold text-xl">O+</p>
                </div>
                <div className=" p-2  ">
                  <p className="text-gray-500">Height</p>
                  <p className="text-black font-bold text-xl">186cm</p>
                </div>
                <div className="p-2">
                  <p className="text-gray-500">Weight</p>
                  <p className="text-black font-bold text-xl">90kg</p>
                </div>
              </div>
            </div>
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
    </div>
  );
}

export default TrackCalo;
