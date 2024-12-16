import React, { useState } from "react";
import { data } from "../assets/data";
import PinField from "react-pin-field";
import { useFormSubmit, useWaitTillAction } from "../hooks";
import { useCookie, useEffectOnce } from "react-use";
import { useNavigate } from "react-router-dom";
import { registerVerifyAction, resendResetCodeAction } from "../actions";
import { FormMessage } from "../components/FormMessage";
import { __cookies } from "../utils";
import { COOKIE_MAX_AGE } from "../constants";

export const OtpVerify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [_registerData, _, deleteRegisterData] = useCookie(
    __cookies.register_data
  );
  const [__, setUserToken] = useCookie(__cookies.user_token);
  const [registerData] = useState(() => JSON.parse(_registerData));
  useEffectOnce(() => {
    if (!registerData || !registerData.email) navigate("/auth/register");
  });
  const { formButtonProps, handleSubmit, res } = useFormSubmit({
    onSubmit: registerVerifyAction,
    extra: { otp: code, email: registerData.email },
    onSuccess: (data) => {
      deleteRegisterData();
      setUserToken(data.data.token, {
        expires: COOKIE_MAX_AGE,
      });
      navigate("/profile/complete-profile");
    },
  });
  const isOtpComplete = code.length === 6;

  // resend code
  const { allow, allowed, formattedTime, disallow } = useWaitTillAction(
    10 * 1000
  );
  async function _resendCode() {
    disallow();
    const sent = await resendResetCodeAction(registerData.email);
    if (!sent) allow();
    else {
      alert("Code was sent");
      // TODO: reset code was resent
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen  bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${data.bg_image})` }}
    >
      <div className="bg-white py-24 px-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <svg
              width="88"
              height="70"
              viewBox="0 0 88 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M78.6667 0.333252H9.33342C4.56675 0.333252 0.710081 4.23325 0.710081 8.99992L0.666748 60.9999C0.666748 65.7666 4.56675 69.6666 9.33342 69.6666H78.6667C83.4334 69.6666 87.3334 65.7666 87.3334 60.9999V8.99992C87.3334 4.23325 83.4334 0.333252 78.6667 0.333252ZM78.6667 17.6666L44.0001 39.3333L9.33342 17.6666V8.99992L44.0001 30.6666L78.6667 8.99992V17.6666Z"
                fill="black"
              />
            </svg>
          </div>

          <h2 className="text-2xl quicksand-600 mt-2">Verify your email</h2>
          <p className="text-[12px] text-gray-500">
            Please check your email for the code
          </p>
        </div>

        <FormMessage {...res} />
        <div className="flex justify-center items-center gap-2 my-6">
          <PinField
            length={6}
            validate={/^[0-9]$/}
            className="w-12 h-16 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            onComplete={(value) => {
              setCode(value);
            }}
          />
          {/* {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
              className="w-12 h-16 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))} */}
        </div>

        <button
          onClick={() => {
            if (allowed) _resendCode();
          }}
          className="mt-4 text-sm text-black cursor-pointer mb-4 quicksand-400 disabled:opacity-50"
          disabled={!allowed}
        >
          Resend code {!allowed && `in (${formattedTime})`}
        </button>
        <button
          className={`w-full py-3 text-white quicksand-600 rounded-md disabled:opacity-50 ${
            isOtpComplete
              ? "bg-black cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={formButtonProps.loading || !isOtpComplete}
        >
          {formButtonProps.loading ? "please wait..." : "Continue"}
        </button>
      </div>
    </div>
  );
};
