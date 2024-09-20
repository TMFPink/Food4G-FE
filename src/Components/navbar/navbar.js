import React, { useState, useEffect } from 'react';
import Food from '../../Pages/MealList/MealList';
import Home from '../../Pages/HomePage/HomePage';
import CreateFood from '../../Pages/CreateFood/CreateFood';
import TDEE from '../../Pages/TDEERec/TDEERec';
import Blog from '../../Pages/Blog/Blog';
import FoodDetail from '../../Components/fooddetail/FoodDetail';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../Asset/homepage/logo.png'
import SortedFood from '../sortedfood/sortedfood';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
  const [showRegisterSuccessPopup, setShowRegisterSuccessPopup] = useState(false);
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
    Mail: Yup.string().required('*'),
    Password: Yup.string().required('*'),
  });

  const registerSchema = Yup.object().shape({
    Name: Yup.string().required('*'),
    Mail: Yup.string().email('Invalid email').required('*'),
    Phone: Yup.string().required('*'),
    DOB: Yup.date().required('*'),
    Password: Yup.string().required('*'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('Password'), null], 'Passwords must match')
      .required('*'),
    Address: Yup.string().required('*'),
  });

  const handleLoginSubmit = (data) => {
    axios.post('https://food4g-api.onrender.com/auth/login', data)
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
    axios.post('https://food4g-api.onrender.com/auth', data)
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
        <div className='navigation-bar'> 
          <div className='nav-container'>
            <img src={logo} alt="logo" className='nav-logo'/>
        
            <div className='navbutt-container'>
              <Link to="/" className='navbutt'> HOME</Link>
              <Link to="/tdee" className='navbutt'>CALCULATE TDEE</Link> 
              <Link to="/food" className='navbutt' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>MEAL LIST</Link>
              <Link to="/posts" className='navbutt'>BLOG</Link>
              {/* <Link to="/account" className='navbutt'>ACCOUNT</Link> */}
              {user ? (
                <div  className='navbutt'>
                  <span>HI, </span>
                  <span style={{textTransform:'uppercase'}}>{user.Name.split(' ').slice(-1).join(' ')}</span>
                </div>
              ) : (
                <div to="/account" className='navbutt' style={{cursor:'pointer'}} onClick={openLoginForm}>
                  <span>ACCOUNT</span>
                </div>
              )}
              {user && (
                <Link to="/" onClick={() => handleLogout()} className='navbutt'>
                  LOGOUT
                </Link>
              )}
            </div>
          </div>
        </div>
        {isVisible && (
          <div className="sorted-food-filter"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/sorted-food/Appetizer">Appetizer</Link>
            <Link to="/sorted-food/Side Dish">Side Dish</Link>
            <Link to="/sorted-food/Soup">Soup</Link>
            <Link to="/sorted-food/Salad">Salad</Link>
            <Link to="/sorted-food/Main Course">Main Course</Link>
            <Link to="/sorted-food/Dessert">Dessert</Link>
            <Link to="/sorted-food/Beverage">Beverage</Link>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/food" exact Component={Food} />
          <Route path="/createfood" exact Component={CreateFood} />
          <Route path="/tdee" exact Component={TDEE} />
          <Route path="/fooddetail/:id" exact Component={FoodDetail} />
          <Route path="/sorted-food/:type" exact Component={SortedFood} />
          <Route path="/posts" element={<Blog user={user} isLoggedIn={isLoggedIn} openLoginForm={openLoginForm}/>} />
        </Routes>  
      </Router>
      <div className={`scroll-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
        <span>&#8679;</span>
      </div>
      {showLoginForm && (
        <div className='overlay'>
          <div className='login-form-container'>
            <div  className='close-button' onClick={closeLoginForm} >&#10006;</div>

            <div className='login-form'>
              <h2>Please log in to continue</h2>
              <Formik
                initialValues={{ Mail: '', Password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLoginSubmit} >
                
                  <Form>
                    <div className='form-group'>
                      <label htmlFor='Mail'>Email</label>
                      <Field type='text' id='Mail' name='Mail' />
                      <ErrorMessage name='Mail' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Password'>Password</label>
                      <Field type='password' id='Password' name='Password' />
                      <ErrorMessage name='Password' component='div' className='error-message' />
                    </div>
                    <button type='submit' className='login-button'>
                      Login
                    </button>
                  </Form>
              </Formik>
              <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
                <span style={{ paddingRight: '5px',marginLeft:'8px' }}>Don't have an account yet? </span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={openRegisterForm}>Sign Up</span>
              </div>
            </div>
          </div>
        </div>
        )}
      {showRegisterForm && (
        <div className='overlay'>
          <div className='register-form-container'>
            <div  className='close-button' onClick={closeRegisterForm} alt='clostform'>&#10006;</div>
            <h2>Create new account</h2>
            <Formik initialValues={{ Name: '', Mail: '', Phone: '', DOB: '', Password: '', Address: '', confirmPassword: ''}} validationSchema={registerSchema} onSubmit={handleRegisterSubmit}>
                <Form className='register-form' style={{display:'flex',flexDirection:'column'}}>
                  <div style={{display:'flex'}}>

                  
                  <div className='column' style={{marginLeft:'10px'}}>
                    <div className='form-group'>
                      <label htmlFor='Name'>Name</label>
                      <Field type='text' id='Name' name='Name' />
                      <ErrorMessage name='Name' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Mail'>Email</label>
                      <Field type='Email' id='Mail' name='Mail' />
                      <ErrorMessage name='Mail' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Phone'>Phone number</label>
                      <Field type='text' id='Phone' name='Phone' />
                      <ErrorMessage name='Phone' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='DOB'>Date of birth</label>
                      <Field type='date' id='DOB' name='DOB' />
                      <ErrorMessage name='DOB' component='div' className='error-message' />
                    </div>
                  </div>
                  <div className='column'>
                    <div className='form-group'>
                      <label htmlFor='Password'>Password</label>
                      <Field type='Password' id='Password' name='Password' />
                      <ErrorMessage name='Password' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='confirmPassword'>Confirmed Password</label>
                      <Field type='password' id='confirmPassword' name='confirmPassword' />
                      <ErrorMessage name='confirmPassword' component='div' className='error-message' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='Address'>Address</label>
                      <Field type='text' id='Address' name='Address' />
                      <ErrorMessage name='Address' component='div' className='error-message' />
                    </div>

                  
        


                  </div>

                  </div>

                  <div classsname='register-container'>
                    <button type='submit' className='register-button'>Sign Up</button>
                    <div style={{display:'flex',flexDirection:'row',paddingTop:'20px'}}>
                      <span style={{paddingRight:'5px'}}>Already have an account? </span>
                      <span style={{textDecoration:'underline',cursor:"pointer"}} onClick={openLoginForm} >Sign In</span>
                    </div>
                  </div>
                  
                  
                </Form>
            </Formik>
            
          </div>
        </div>
      )}
      {showLoginSuccessPopup && (
      <div className="success-popup-overlay" onClick={closeLoginPopups}>
        
        <div className="success-popup">         
            <p>Login Successfully!</p>
        </div>
      </div>
    )}
      {showLoginErrorPopup && (
      <div className="error-popup-overlay" onClick={closeLoginPopups}>
        <div className="error-popup">
          <p>Login failed. </p>
          <p>Please check your login information.</p>
        </div>
      </div>
    )}
    {showRegisterSuccessPopup && (
      <div className="success-popup-overlay" onClick={closeRegisterPopups}>
        <div className="success-popup">
          <p>Register Successfully!</p>
        </div>
      </div>
    )}
    {showRegisterErrorPopup && (
      <div className="error-popup-overlay" onClick={closeRegisterPopups}>
        <div className="error-popup">
          <p>Register failed. </p>
          <p>Please check your information again.</p>
        </div>
      </div>
    )}
    </div>
  );
}

export default Navbar;
