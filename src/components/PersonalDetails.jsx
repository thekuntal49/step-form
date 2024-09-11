import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PersonalDetails = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Load saved data from sessionStorage
    const savedData = JSON.parse(sessionStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Remove the error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData({
      ...formData,
      [name]: value,
    });

    // Save data to sessionStorage
    sessionStorage.setItem(
      "formData",
      JSON.stringify({
        ...formData,
        [name]: value,
      })
    );
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) {
      formErrors.name = "Full name cannot be empty.";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email cannot be empty.";
    }
    if (!formData.password || formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep(); // Proceed to next step if validation passes
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-5/6 sm:w-1/2 lg:w-1/4 bg-gray-900">
      <form className="w-full " onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-white mb-10 text-center">
          Personal Details
        </h1>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className={`w-full p-3 rounded-lg outline-none text-white bg-gray-800 border ${
              errors.name ? "border-red-500" : "border-gray-400"
            }`}
            type="text"
            id="name"
            name="name"
            autoComplete="fullname"
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`w-full p-3 rounded-lg outline-none text-white bg-gray-800 border ${
              errors.email ? "border-red-500" : "border-gray-400"
            }`}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`w-full p-3 rounded-lg text-white outline-none bg-gray-800 border ${
              errors.password ? "border-red-500" : "border-gray-400"
            }`}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="password"
            onChange={handleChange}
            placeholder="Create a password"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-11 text-white cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export { PersonalDetails };
