import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6"; // Import the green tick icon

const SuccessPage = () => {
  const navigate = useNavigate();
  // Retrieve user data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("formData"));

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]); // Add dependencies here

  const handleSubmit = () => {
    sessionStorage.clear();
  };

  return (
    <div className="flex flex-col p-4 items-center text-white justify-center min-h-screen bg-gray-900">
      {/* Success Message with Icon */}
      <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-md">
        <FaCircleCheck className="text-green-500 text-7xl mb-4" />{" "}
        {/* Success Icon */}
        <h1 className="text-3xl font-bold mb-4 text-center">
          Profile Created Successfully!
        </h1>

        {/* User Image */}
        {userData?.profilePicture ? (
          <img
            src={userData.profilePicture}  // Use profilePicture instead of imageUrl
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-600 text-xl">User</span>
          </div>
        )}

        {/* User Message */}
        <p className="text-center mb-6">
          <span className="block text-2xl  font-semibold">
            Dear {userData?.name || "User"},
          </span>{" "}
          <span className="block  text-gray-300 mb-2 ">
            {userData?.bio},
          </span>{" "}
          Thank you for registering with Social Clubs! We're excited to have you
          on board. Your account has been successfully created.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          onClick={handleSubmit}
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export { SuccessPage };
