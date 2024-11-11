import React from 'react';
import { Link } from 'react-router-dom';
import member1 from '../../Asset/homepage/nguyentoankhang.jpg';
import member2 from '../../Asset/homepage/tranminhnguyenhong.jpg';
import cbum from '../../Asset/homepage/cbum.jpg';
import healthy from '../../Asset/homepage/healthy.jpg';
function homepage() {
  return (
    <div className="max-w-full mx-auto  bg-[#141414]">
      <section className="bg-cover bg-center py-52 text-center" style={{ backgroundImage: `url(${healthy})` }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-5">Welcome to Your Fitness Journey</h1>
          <p className="text-xl  text-white mb-10">Start your fitness journey with personalized meal plans and calorie tracking.</p>
          <Link to="/tdee" className="inline-block px-6 py-3 text-lg text-black  bg-gray-200 rounded-full transition duration-300 hover:bg-yellow-500">Calculate Your TDEE</Link>
        </div>
      </section>

      <section className="flex justify-between mt-20 p-5">
        <div className="flex-1 p-5 h-40 text-center bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">
          <h2 className="text-2xl font-bold text-black mb-2">Personalized Meal Plans</h2>
          <p className="text-xl text-black">Access a variety of meal plans tailored to your dietary preferences and fitness goals.</p>
        </div>
        <div className="flex-1 p-5 text-center bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">
          <h2 className="text-2xl font-bold text-black mb-2">Track Your Progress</h2>
          <p className="text-xl text-black">Monitor your calorie intake and track your progress towards your fitness goals.</p>
        </div>
        <div className="flex-1 p-5 text-center bg-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">
          <h2 className="text-2xl font-bold text-black mb-2">Expert Blog</h2>
          <p className="text-xl text-black">Stay informed with our expert blog featuring fitness tips, recipes, and success stories.</p>
        </div>
      </section>

      <section className="bg-[#1D1D1D] text-white py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-5">
            <img src={cbum} alt="Avatar" className="w-36 h-36 rounded-full object-cover mr-5" />
            <div>
              <p className="text-xl italic">"This website has transformed the way I approach fitness. The meal plans are delicious and easy to follow, and the calorie tracking feature helps me stay on track with my goals."</p>
              <p className="mt-5 text-lg">- Christopher Adam Bumstead, Fitness Enthusiast</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-10">About Us</h2>
          <p className="text-lg text-white mb-5">Our mission is to help you achieve your fitness goals through personalized meal plans and effective calorie tracking.</p>
          <h3 className="text-2xl font-semibold text-white mb-10">Meet the Team</h3>
          <div className="flex justify-center mt-10">
            <div className="mx-5 flex flex-col items-center">
              <img src={member2} alt="Tran Minh Nguyen Hong" className="w-36 h-36 rounded-full object-cover mb-2" />
              <h4 className="text-lg text-white font-bold mb-1">Tran Minh Nguyen Hong</h4>
            </div>
            <div className="mx-5 flex flex-col items-center">
              <img src={member1} alt="Nguyen Toan Khang" className="w-36 h-36 rounded-full object-cover mb-2" />
              <h4 className="text-lg text-white font-bold mb-1">Nguyen Toan Khang</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-10">Ready to Start Your Journey?</h2>
          <div className="flex flex-col items-center">
            <p className="text-lg text-white mb-5">Take the first step towards your fitness goals.</p>
            <Link to="/signup" className="inline-block px-6 py-3 text-lg text-black font-semibold bg-white rounded-full transition duration-300 hover:bg-yellow-500">Sign Up Now</Link>
            <p className="text-lg text-white mt-5">Have questions? Contact us at <span className="text-red-500">food4g@gmail.com</span></p>
          </div>
        </div>
      </section>

      <footer className="bg-[#272728] py-10 text-center">
        <div className="max-w-5xl mx-auto">
          <ul className="list-none p-0">
            <li className="inline-block mr-5"><Link to="/posts" className="text-white">Blog</Link></li>
            <li className="inline-block mr-5 text-white">Terms of Service</li>
            <li className="inline-block mr-5 text-white">Privacy Policy</li>
            <li className="inline-block"><a href="mailto:food4g@gmail.com" className="text-white">Contact Us</a></li>
          </ul>
          <p className="mt-5 text-sm text-white">&copy; 2024 Fitness Journey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default homepage;
