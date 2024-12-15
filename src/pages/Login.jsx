import React, {useState} from 'react'
import { data } from '../assets/data';
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import { ConfirmPasswordInput } from '../components/ConfirmPasswordInput';
import { z } from 'zod';
import { signupSchema } from '../validations/signupSchema';
import { Link } from 'react-router-dom';


  


export const Login = () => {

 // State for form inputs and error messages
 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form with Zod
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const validationErrors = result.error.format();
      setErrors({
        email: validationErrors.email?._errors[0] || "",
        password: validationErrors.password?._errors[0] || "",
      });
      return;
    }

    // If validation passes
    alert("Sign-up successful!");
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-opacity-5 px-6 " style={{ backgroundImage: `url(${data.bg_image})` }}>
      <div className="w-full max-w-md px-12 py-8 md:px-20 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={data.logo} alt="Logo" className="h-12 w-12" />
          <p className="text-[#1E1E1E] text-[30px] text-bold playfair">Qlodin</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4 quicksand-600">Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <PasswordInput
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full py-2 bg-black quicksand-600 text-white text-[15px] rounded-md hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-8">
          <span className="px-2 text-black text-lg quicksand-600">or</span>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center py-2 bg-[#DDDBFF] text-white rounded-md hover:bg-blue-700 transition">
            <div className="flex items-center justify-center gap-4">
              <FaFacebook className="h-5 w-5 text-blue-600" />
              <p className="text-[14px] quicksand-600 text-black">Sign Up with Facebook</p>
            </div>
          </button>
          <button className="w-full flex items-center justify-center py-2 bg-[#DDDBFF] text-white rounded-md hover:bg-blue-700 transition">
            <div className="flex items-center justify-center gap-4">
              <FaGoogle className="h-5 w-5 text-red-500" />
              <p className="text-[14px] quicksand-600 text-black">Sign Up with Google</p>
            </div>
          </button>
          <button className="w-full flex items-center justify-center py-2 bg-[#DDDBFF] text-white rounded-md hover:bg-blue-700 transition">
            <div className="flex items-center justify-center gap-4">
              <FaApple className="h-5 w-5 text-black" />
              <p className="text-[14px] quicksand-600 text-black">Sign Up with Apple</p>
            </div>
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm quicksand-400 text-black">
          Don't have an account?{" "}
          <a  className="text-black font-bold hover:underline">
            <Link to="/auth/register">Sign Up</Link>
          </a>
        </p>
      </div>
    </div>
  )
}