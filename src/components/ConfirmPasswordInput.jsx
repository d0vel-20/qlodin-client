import React from "react";

export const ConfirmPasswordInput = ({ value, onChange, error }) => {
  return (
    <div>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md placeholder-black focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border-2 border-red-500" : ""
        }`}
      />
      {error && <p className="text-red-500 text-[10px]">{error}</p>}
    </div>
  );
};

