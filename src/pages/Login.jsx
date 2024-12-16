import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { data } from "../assets/data";
import { EmailInput } from "../components/EmailInput";
import { FormMessage } from "../components/FormMessage";
import { PasswordInput } from "../components/PasswordInput";
import { useFormSubmit } from "../hooks";
import { loginAction } from "../actions/loginAction";

export const Login = () => {
  const navigate = useNavigate()
  const { inputProps, formButtonProps, handleSubmit, res } = useFormSubmit({
    onSubmit: loginAction,
    onSuccess: ()=>{
      navigate("/profile")
    }
  });  

  // State for form inputs and error messages
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [errors, setErrors] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validate form with Zod
  //   const result = signupSchema.safeParse(formData);

  //   if (!result.success) {
  //     const validationErrors = result.error.format();
  //     setErrors({
  //       email: validationErrors.email?._errors[0] || "",
  //       password: validationErrors.password?._errors[0] || "",
  //     });
  //     return;
  //   }

  //   // If validation passes
  //   alert("Sign-up successful!");
  //   console.log(formData);
  // };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-opacity-5 px-6 "
      style={{ backgroundImage: `url(${data.bg_image})` }}
    >
      <div className="w-full max-w-md px-12 py-8 md:px-20 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={data.logo} alt="Logo" className="h-12 w-12" />
          <p className="text-[#1E1E1E] text-[30px] text-bold playfair">
            Qlodin
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4 quicksand-600">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormMessage {...res} />
          <EmailInput
            {...inputProps("email")}
            // value={formData.email}
            // onChange={handleChange}
            // error={errors.email}
          />
          <PasswordInput
            {...inputProps("password")}
            // value={formData.password}
            // onChange={handleChange}
            // error={errors.password}
          />
          <button
            disabled={formButtonProps.loading}
            type="submit"
            className="w-full py-2 bg-black quicksand-600 text-white text-[15px] rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
           {formButtonProps.loading ? "Logging in..." : "Login"}
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
              <p className="text-[14px] quicksand-600 text-black">
                Sign Up with Facebook
              </p>
            </div>
          </button>
          <button className="w-full flex items-center justify-center py-2 bg-[#DDDBFF] text-white rounded-md hover:bg-blue-700 transition">
            <div className="flex items-center justify-center gap-4">
              <FaGoogle className="h-5 w-5 text-red-500" />
              <p className="text-[14px] quicksand-600 text-black">
                Sign Up with Google
              </p>
            </div>
          </button>
          <button className="w-full flex items-center justify-center py-2 bg-[#DDDBFF] text-white rounded-md hover:bg-blue-700 transition">
            <div className="flex items-center justify-center gap-4">
              <FaApple className="h-5 w-5 text-black" />
              <p className="text-[14px] quicksand-600 text-black">
                Sign Up with Apple
              </p>
            </div>
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm quicksand-400 text-black">
          Don't have an account?{" "}
            <Link className="text-black font-bold hover:underline" to="/auth/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
