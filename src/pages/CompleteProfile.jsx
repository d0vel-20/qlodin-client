import React, { useState } from 'react';
import { data } from '../assets/data';


 export const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    driptag: '',
    dateOfBirth: '',
    mobileNumber: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  // Check if all form fields are filled and the checkbox is checked
  const isFormComplete =
    formData.firstName &&
    formData.lastName &&
    formData.driptag &&
    formData.dateOfBirth &&
    formData.mobileNumber &&
    isChecked;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    alert('Profile created!');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center px-6" style={{ backgroundImage: `url(${data.bg_image})` }}>
      <div className="bg-white p-8 rounded-lg px-12 py-12 md:px-20  w-full max-w-lg shadow-lg">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
            <img src={data.logo} alt="Logo" className="h-12 w-12" />
            <p className="text-[#1E1E1E] text-[30px] text-bold playfair">Qlodin.</p>
        </div>
        <h1 className='text-center quicksand-600 mb-4 text-[20px]'>Complete your profile</h1>

        {/* Form Fields */}
        <div className="space-y-2 mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black placeholder-black"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black placeholder-black"
            />
          </div>

          <input
              type="text"
              name="driptag"
              value={formData.driptag}
              onChange={handleChange}
              placeholder="@driptag"
              className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black placeholder-black"
            />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder='Date of birth'
            className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black"
          />

          <div className="flex space-x-2">
          <select
              name="countryCode"
              className="w-24 px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black"
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+91">+91</option>
            </select>
            <input
              type="number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile number"
              className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black"
            />
            
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">
            I have read and agree to the{' '}
            <a href="/terms" className="text-blue-600">terms of service</a>
          </span>
        </div>

        {/* Continue Button */}
        <button
          className={`w-full py-3 text-white font-semibold rounded-md ${
            isFormComplete ? 'bg-black cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!isFormComplete}
        >
          Continue
        </button>

        <p className="mt-4 text-xs text-gray-500">
          By clicking Continue, you agree to Qlodin's{' '}
          <a href="/terms" className="text-blue-600">Terms of Service</a> and confirm that you have read Qlodin's{' '}
          <a href="/privacy" className="text-blue-600">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

