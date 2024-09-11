import React, { useState, useEffect } from "react";

const AddressDetails = ({ prevStep, nextStep }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData({
      ...formData,
      [name]: value,
    });

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

    if (!formData.city) {
      formErrors.city = "City cannot be empty.";
    }
    if (!formData.state) {
      formErrors.state = "State cannot be empty.";
    }
    if (!formData.country) {
      formErrors.country = "Country cannot be empty.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-5/6 sm:w-1/2 lg:w-1/4 bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">
        Address Details
      </h1>

      <form className="w-full pt-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            className={`w-full p-3 rounded-lg text-white bg-gray-800 border ${
              errors.city ? "border-red-500" : "border-gray-400"
            }`}
            type="text"
            id="city"
            name="city"
            onChange={handleChange}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="text-red-500 mt-1 text-sm">{errors.city}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            className={`w-full p-3 rounded-lg text-white bg-gray-800 border ${
              errors.state ? "border-red-500" : "border-gray-400"
            }`}
            type="text"
            id="state"
            name="state"
            onChange={handleChange}
            placeholder="Enter your state or province"
          />
          {errors.state && (
            <p className="text-red-500 mt-1 text-sm">{errors.state}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <select
            className={`w-full p-3 rounded-lg text-white bg-gray-800 border ${
              errors.country ? "border-red-500" : "border-gray-400"
            }`}
            id="country"
            name="country"
            onChange={handleChange}
          >
            <option value="">Select your country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && (
            <p className="text-red-500 mt-1 text-sm">{errors.country}</p>
          )}
        </div>

        <div className="flex justify-between gap-10 mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="py-2 px-4 w-1/2 bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Back
          </button>
          <button
            type="submit"
            className="py-2 px-4 w-1/2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export { AddressDetails };
