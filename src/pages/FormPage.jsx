// src/pages/FormPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalDetails } from "../components/PersonalDetails";
import { AddressDetails } from "../components/AddressDetails";
import { ProfileInformation } from "../components/ProfileInformation";

const FormPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Redirect to SuccessPage after successful form submission
    navigate("/success");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {step === 1 && <PersonalDetails nextStep={nextStep} />}
      {step === 2 && <AddressDetails prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && (
        <ProfileInformation prevStep={prevStep} nextStep={handleSubmit} />
      )}
    </div>
  );
};

export { FormPage };
