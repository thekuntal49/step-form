import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProfileInformation = ({ prevStep, nextStep }) => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    bio: "",
    socialLinks: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, options } = e.target;
    if (name === "profilePicture" && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });

        sessionStorage.setItem(
          "formData",
          JSON.stringify({
            ...formData,
            profilePicture: reader.result,
          })
        );
      };
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

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

    if (!formData.profilePicture) {
      formErrors.profilePicture = "Profile picture is required.";
    }
    if (!formData.bio) {
      formErrors.bio = "Bio cannot be empty.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Profile Created Successfully!");
      nextStep();
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-5/6 sm:w-1/2 lg:w-1/4 bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">
        Profile Information
      </h1>

      <form className="w-full max-w-md p-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="profilePicture"
          >
            Profile Picture
          </label>
          <input
            className={`w-full p-3 rounded-lg text-white bg-gray-800 border ${
              errors.profilePicture ? "border-red-500" : "border-gray-400"
            }`}
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.profilePicture && (
            <p className="text-red-500 mt-1 text-sm">{errors.profilePicture}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="bio"
          >
            Bio
          </label>
          <textarea
            className={`w-full p-3 rounded-lg text-white bg-gray-800 border ${
              errors.bio ? "border-red-500" : "border-gray-400"
            }`}
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short introduction about yourself"
            rows="4"
          />
          {errors.bio && (
            <p className="text-red-500 mt-1 text-sm">{errors.bio}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="socialLinks"
          >
            Social Links (Optional)
          </label>
          <input
            className={`w-full p-3 rounded-lg text-white bg-gray-800 border ${
              errors.socialLinks ? "border-red-500" : "border-gray-400"
            }`}
            type="text"
            id="socialLinks"
            name="socialLinks"
            value={formData.socialLinks}
            onChange={handleChange}
            placeholder="Enter your social media links"
          />
          {errors.socialLinks && (
            <p className="text-red-500 mt-1 text-sm">{errors.socialLinks}</p>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export { ProfileInformation };
