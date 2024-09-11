import React from "react";
import Lottie from "lottie-react";
import animation from "../assets/welcome.json";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex flex-col p-4 items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-purple-900">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 text-center">
        Join <span className="text-blue-400">Social Clubs</span>
      </h1>

      <div className="flex items-center justify-center bg-blue-600 rounded-xl px-4 mb-6">
        <Lottie
          animationData={animation}
          style={{ width: "250px" }}
          className="sm:w-300 md:w-400 lg:w-500"
        />
      </div>

      <p className="text-lg sm:text-xl text-white text-center mb-8 max-w-md">
        Create an account to connect with friends, join clubs, and participate
        in exciting events. Be a part of something amazing today!
      </p>

      <Link
        to="/form"
        className="px-8 py-4  bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </Link>
    </div>
  );
};

export { WelcomePage };
