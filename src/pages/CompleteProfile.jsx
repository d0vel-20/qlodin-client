import React, { useState } from "react";
import { data } from "../assets/data";
import { InputField } from "../components/InputField";
import { PhoneNumberWithCodeInput } from "../components/PhoneNumberWithCodeInput";
import { useFormSubmit } from "../hooks";
import { profileSetupAction } from "../actions";
import { FormMessage } from "../components/FormMessage";

export const CompleteProfile = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const { inputProps, formButtonProps, handleSubmit, res } = useFormSubmit({
    extra: {
      mobileNumber,
    },
    onSubmit: profileSetupAction,
    onSuccess: () => {
      navigate("/profile");
    },
  });

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   driptag: "",
  //   dateOfBirth: "",
  //   mobileNumber: "",
  // });

  // const [errors, setErrors] = useState({});
  // const [isChecked, setIsChecked] = useState(false);

  // Check if all form fields are filled and the checkbox is checked
  // const isFormComplete =
  //   formData.firstName &&
  //   formData.lastName &&
  //   formData.driptag &&
  //   formData.dateOfBirth &&
  //   formData.mobileNumber &&
  //   isChecked;
  // Object.keys(errors).length === 0;

  // Validate fields and store errors
  // const validateField = (name, value) => {
  //   let error = "";
  //   try {
  //     if (name === "firstName" || name === "lastName") {
  //       nameSchema.parse(value);
  //     } else if (name === "driptag") {
  //       usernameSchema.parse(value);
  //     }
  //   } catch (e) {
  //     error = e.errors[0].message;
  //   }
  //   return error;
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   const newErrors = { ...errors };
  //   const error = validateField(name, value);

  //   if (error) newErrors[name] = error;
  //   else delete newErrors[name];

  //   setFormData({ ...formData, [name]: value });
  //   setErrors(newErrors);
  // };

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };

  // const handleSubmit = () => {
  //   alert("Profile created!");
  // };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${data.bg_image})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg px-12 py-12 md:px-20  w-full max-w-lg shadow-lg"
      >
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={data.logo} alt="Logo" className="h-12 w-12" />
          <p className="text-[#1E1E1E] text-[30px] text-bold playfair">
            Qlodin.
          </p>
        </div>
        <h1 className="text-center quicksand-600 mb-4 text-[20px]">
          Complete your profile
        </h1>

        {/* Form Fields */}
        <div className="space-y-2 mb-6">
          <FormMessage {...res} />
          <div className="flex space-x-4">
            <InputField
              {...inputProps("firstName")}
              name="firstName"
              placeholder="First name"
              // value={formData.firstName}
              // onChange={handleChange}
              // error={errors.firstName}
            />
            <InputField
              {...inputProps("lastName")}
              name="lastName"
              placeholder="Last name"
              // value={formData.lastName}
              // onChange={handleChange}
              // error={errors.lastName}
            />
          </div>

          <InputField
            {...inputProps("userName")}
            name="driptag"
            placeholder="@driptag"
            // value={formData.driptag}
            // onChange={handleChange}
            // error={errors.driptag}
          />

          <InputField
            {...inputProps("dateOfBirth")}
            type="date"
            name="dateOfBirth"
            // value={formData.dateOfBirth}
            // onChange={handleChange}
            placeholder="Date of birth"
            className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black"
          />

          <PhoneNumberWithCodeInput
            onChangeText={setMobileNumber}
            defaultValue={mobileNumber}
            error={res.fieldErrors?.mobileNumber?.[0]}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 flex items-center">
          <input type="checkbox" required className="mr-2" />
          <span className="text-sm text-gray-600">
            I have read and agree to the{" "}
            <a href="/terms" className="text-blue-600">
              terms of service
            </a>
          </span>
        </div>

        {/* Continue Button */}
        <button
          className={`w-full py-3 text-white font-semibold rounded-md 
            bg-black cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed 
          `}
          disabled={formButtonProps.loading}
        >
          Continue
        </button>

        <p className="mt-4 text-xs text-gray-500">
          By clicking Continue, you agree to Qlodin's{" "}
          <a href="/terms" className="text-blue-600">
            Terms of Service
          </a>{" "}
          and confirm that you have read Qlodin's{" "}
          <a href="/privacy" className="text-blue-600">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};
