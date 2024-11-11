import React, { useState, useEffect } from "react";
import Food from "../../Pages/MealList/MealList";
import Home from "../../Pages/HomePage/HomePage";
import TDEE from "../../Pages/TDEERec/TDEERec";
import Blog from "../../Pages/Blog/Blog";
import FoodDetail from "../fooddetail/FoodDetail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import logo from "../../Asset/homepage/logo.png";
import SortedFood from "../sortedfood/sortedfood";
import TrackCalo from "../../Pages/TrackCalo/TrackCalo";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosArrowDown } from "react-icons/io";
function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  // user state
  const [user, setUser] = useState(null);
  // show login form and register form
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  // Pop-up state for login success/failure
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false);
  const [showLoginErrorPopup, setShowLoginErrorPopup] = useState(false);

  // Pop-up state for register success/failure
  const [showRegisterSuccessPopup, setShowRegisterSuccessPopup] =
    useState(false);
  const [showRegisterErrorPopup, setShowRegisterErrorPopup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginForm = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const openRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const closeRegisterForm = () => {
    setShowRegisterForm(false);
  };

  // Handler functions for closing pop-ups
  const closeLoginPopups = () => {
    setShowLoginSuccessPopup(false);
    setShowLoginErrorPopup(false);
  };

  const closeRegisterPopups = () => {
    setShowRegisterSuccessPopup(false);
    setShowRegisterErrorPopup(false);
  };

  // validation schema
  const loginSchema = Yup.object().shape({
    Mail: Yup.string().required("*"),
    Password: Yup.string().required("*"),
  });

  const registerSchema = Yup.object().shape({
    Name: Yup.string().required("*"),
    Mail: Yup.string().email("Invalid email").required("*"),
    Phone: Yup.string().required("*"),
    DOB: Yup.date().required("*"),
    Password: Yup.string().required("*"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("*"),
    Address: Yup.string().required("*"),
  });

  const handleLoginSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        console.log("Login Response:", response.data);
        if (response.data.message === "YOU LOGGED IN!!!") {
          closeLoginForm();
          closeRegisterForm();
          setShowLoginSuccessPopup(true);
          setUser(response.data.user);
          setIsLoggedIn(true);
        } else {
          // closeLoginForm();
          // closeRegisterForm();
          setShowLoginErrorPopup(true);
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setShowLoginErrorPopup(true);
      });
  };

  const handleRegisterSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then(() => {
        console.log("Register success");
        setShowRegisterSuccessPopup(true);
        closeLoginForm();
        closeRegisterForm();
      })
      .catch((error) => {
        console.error("Register Error:", error);
        closeLoginForm();
        setShowRegisterErrorPopup(true);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (800 / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <Router>
        <nav className="bg-black border-gray-200 ">
          <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-16 " alt="Logo" />
            </a>
            <button
              data-collapse-toggle="navbar-multi-level"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="navbar-multi-level"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-multi-level"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border text-white border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-black items-center">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D3A231] md:p-0 "
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tdee"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D3A231] md:p-0 "
                  >
                    CALCULATE TDEE
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    to="/food"
                    className="block py-2 px-3 flex items-center rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D3A231] md:p-0 "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    MEAL LIST
                    <IoIosArrowDown className="ml-2" />
                  </Link>
                  <div className="absolute w-32 top-4 left-0 hidden group-hover:block  bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10">
                    <Link
                      to="/sorted-food/Appetizer"
                      className="block px-4 py-2 text-black hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Appetizer
                    </Link>
                    <Link
                      to="/sorted-food/Side Dish"
                      className="block px-4 py-2 text-black hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Side Dish
                    </Link>
                    <Link
                      to="/sorted-food/Soup"
                      className="block px-4 py-2  text-black hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Soup
                    </Link>
                    <Link
                      to="/sorted-food/Salad"
                      className="block px-4 py-2 text-black hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Salad
                    </Link>
                    <Link
                      to="/sorted-food/Main Course"
                      className="block px-4 py-2 text-black hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Main Course
                    </Link>
                    <Link
                      to="/sorted-food/Dessert"
                      className="block px-4 py-2 text-black  hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Dessert
                    </Link>
                    <Link
                      to="/sorted-food/Beverage"
                      className="block px-4 py-2 text-black hover:bg-[#D3A231] hover:rounded-lg"
                    >
                      Beverage
                    </Link>
                  </div>
                </li>
                <li>
                  <Link
                    to="/posts"
                    className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D3A231] md:p-0 "
                  >
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trackcalo"
                    className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D3A231] md:p-0 "
                  >
                    TRACK CALORIES
                  </Link>
                </li>
                {user ? (
                  <li className="text-white p-2 relative group hover:text-[#D3A231] flex items-center">
                    <span className="mr-1">HI,</span>
                    <span className="uppercase">
                      {user.Name.split(" ").slice(-1).join(" ")}
                    </span>
                    <div className="absolute hidden group-hover:block bg-white border-2 rounded-lg shadow-lg mt-2 z-10">
                      <Link
                        to="/"
                        onClick={() => handleLogout()}
                        className="block px-4 py-2"
                      >
                        LOGOUT
                      </Link>
                    </div>
                  </li>
                ) : (
                  <li
                    className="text-white cursor-pointer p-2 block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#D3A231] md:p-0"
                    onClick={openLoginForm}
                  >
                    <span>ACCOUNT</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" exact Component={Food} />
          <Route path="/tdee" exact Component={TDEE} />
          <Route path="/fooddetail/:id" exact Component={FoodDetail} />
          <Route path="/sorted-food/:type" exact Component={SortedFood} />
          <Route path="/trackcalo" exact Component={TrackCalo} />
          <Route
            path="/posts"
            element={
              <Blog
                user={user}
                isLoggedIn={isLoggedIn}
                openLoginForm={openLoginForm}
              />
            }
          />
        </Routes>
      </Router>
      <div
        className={`fixed bottom-5 right-5 bg-gray-300 text-black w-12 h-12 flex items-center justify-center rounded-full cursor-pointer opacity-0 visibility-hidden transition-opacity duration-300 z-50 ${
          isVisible ? "opacity-100 visible" : ""
        }`}
        onClick={scrollToTop}
      >
        <span className="text-2xl">&#8679;</span>
      </div>
      {showLoginForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center fixed bg-white p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-50">
            <div className="flex flex-col absolute top-2 right-2 w-7 h-7 justify-center items-center bg-transparent text-[#333333] rounded-full cursor-pointer" onClick={closeLoginForm}>
              <IoMdClose className="text-2xl"/>
            </div>

            <div>
              <h2 className="text-2xl text-black mb-4">Please log in to continue</h2>
              <Formik
                initialValues={{ Mail: "", Password: "" }}
                validationSchema={loginSchema}
                onSubmit={handleLoginSubmit}
              >
                <Form className="grid grid-cols-1 gap-4">
                  <div className="relative mb-5 w-full">
                    <label htmlFor="Mail" className="text-[#333333] mb-1">Email</label>
                    <Field type="text" id="Mail" name="Mail" className="w-full border-2 border-[#333333] rounded-md p-2" />
                    <ErrorMessage
                      name="Mail"
                      component="div"
                      className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                    />
                  </div>
                  <div className="relative mb-5 w-full">
                    <label htmlFor="Password" className="text-[#333333] mb-1  ">Password</label>
                    <Field type="password" id="Password" name="Password" className="w-full border-2 border-[#333333] rounded-md p-2" />
                    <ErrorMessage
                      name="Password"
                      component="div"
                      className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                    />
                  </div>
                  <button type="submit" className="w-full p-2 bg-[#000000] text-white cursor-pointer rounded-md hover:bg-[#D3A231]">
                    Login
                  </button>
                </Form>
              </Formik>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "20px",
                }}
              >
                <span style={{ paddingRight: "5px", marginLeft: "8px" }}>
                  Don't have an account yet?{" "}
                </span>
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={openRegisterForm}
                >
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRegisterForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50">
          <div className="fixed bg-white p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-50">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeRegisterForm}
              alt="clostform"
            >
              <IoMdClose className="text-2xl"/>
            </div>
            <h2 className="text-2xl text-center font-bold text-black mb-4">Create new account</h2>
            <Formik
              initialValues={{
                Name: "",
                Mail: "",
                Phone: "",
                DOB: "",
                Password: "",
                Address: "",
                confirmPassword: "",
              }}
              validationSchema={registerSchema}
              onSubmit={handleRegisterSubmit}
            >
              <Form
                className="flex flex-col justify-between"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <div className="relative mb-5">
                      <label htmlFor="Name" className="text-[#333333] mb-1">Name</label>
                      <Field type="text" id="Name" name="Name" className="w-full border-2 border-[#333333] rounded-md p-2" />
                      <ErrorMessage
                        name="Name"
                        component="div"
                        className="text-red-500 text-sm top-0 right-1 absolute mt-1 mr-1"
                      />
                    </div>
                    <div className="relative mb-5">
                      <label htmlFor="Mail" className="text-[#333333] mb-1">Email</label>
                      <Field type="Email" id="Mail" name="Mail" className="w-full border-2 border-[#333333] rounded-md p-2" />
                      <ErrorMessage
                        name="Mail"
                        component="div"
                        className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                      />
                    </div>
                    <div className="relative mb-5">
                      <label htmlFor="Phone" className="text-[#333333] mb-1">Phone number</label>
                      <Field type="text" id="Phone" name="Phone" className="w-full border-2 border-[#333333] rounded-md p-2" />
                      <ErrorMessage
                        name="Phone"
                        component="div"
                        className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                      />
                    </div>
                    <div className="relative mb-5">
                      <label htmlFor="DOB" className="text-[#333333] mb-1">Date of birth</label>
                      <Field type="date" id="DOB" name="DOB" className="w-full border-2 border-[#333333] rounded-md p-2" />
                      <ErrorMessage
                        name="DOB"
                        component="div"
                        className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative mb-5">
                      <label htmlFor="Password" className="text-[#333333] mb-1">Password</label>
                      <Field type="Password" id="Password" name="Password" className="w-full border-2 border-[#333333] rounded-md p-2" />
                      <ErrorMessage
                        name="Password"
                        component="div"
                        className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                      />
                    </div>
                    <div className="relative mb-5">
                      <label htmlFor="confirmPassword" className="text-[#333333] mb-1">Confirmed Password</label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full border-2 border-[#333333] rounded-md p-2"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                      />
                    </div>
                    <div className="relative mb-5">
                      <label htmlFor="Address" className="text-[#333333] mb-1">Address</label>
                      <Field type="text" id="Address" name="Address" className="w-full border-2 border-[#333333] rounded-md p-2" />
                      <ErrorMessage
                        name="Address"
                        component="div"
                        className="text-red-500 text-sm top-0 right-0 absolute mt-1 mr-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <button type="submit" className="w-full p-2 bg-[#000000] text-white cursor-pointer rounded-md hover:bg-[#D3A231]">
                    Sign Up
                  </button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: "20px",
                    }}
                  >
                    <span style={{ paddingRight: "5px" }}>
                      Already have an account?{" "}
                    </span>
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={openLoginForm}
                    >
                      Sign In
                    </span>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
      {showLoginSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50" onClick={closeLoginPopups}>
          <div className="bg-green-500 text-white p-10  justify-center w-60 h-24 rounded-lg shadow-lg z-50 flex flex-col items-center">
            <h2 className="text-lg  font-bold">Success!</h2>
            <p>Login Successfully!</p>
          </div>
        </div>
      )}
      {showLoginErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50" onClick={closeLoginPopups}>
          <div className=" bg-red-500 text-white p-10 text-center justify-center w-60 h-24 rounded-lg shadow-lg z-50 flex flex-col items-center">
            <h2 className="font-bold text-lg">Error!</h2>
            <p>Login failed. Please check your login information.</p>
          </div>
        </div>
      )}
      {showRegisterSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50" onClick={closeRegisterPopups}>
          <div className="bg-green-500 text-white p-10  justify-center w-60 h-24 rounded-lg shadow-lg z-50 flex flex-col items-center">
            <h2 className="text-lg font-bold">Success!</h2>
            <p>Register Successfully!</p>
          </div>
        </div>
      )}
      {showRegisterErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50" onClick={closeRegisterPopups}>
          <div className="bg-green-500 text-white p-10 justify-center w-60 h-24 rounded-lg shadow-lg z-50 flex flex-col items-center">
            <h2 className="font-bold text-lg">Error!</h2>
            <p>Register failed. Please check your information again.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
