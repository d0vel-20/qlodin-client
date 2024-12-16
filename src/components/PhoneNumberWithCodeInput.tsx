import { countries } from "country-codes-flags-phone-codes";
import { HTMLAttributes, useEffect, useState } from "react";

type PhoneNumberWithCodeInputProps = HTMLAttributes<HTMLInputElement> & {
  onChangeText?: (value: string) => void;
  codeValue?: string;
  error?: string;
};

export function PhoneNumberWithCodeInput({
  onChangeText,
  defaultValue,
  codeValue,
  error,
  ...props
}: PhoneNumberWithCodeInputProps) {
  const [value, setValue] = useState<string>(
    codeValue || countries[0].dialCode
  );
  const [phone, setPhone] = useState<string>(
    defaultValue ? `${defaultValue}`.replace(value, "") : ""
  );

  useEffect(() => {
    onChangeText?.(`${value} ${phone}`);
  }, [value, onChangeText, phone]);

  return (
    <div>
      <div className="flex space-x-2">
        <select
          name="countryCode"
          className="w-32 px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.dialCode}>
              {country.code} {country.dialCode}
            </option>
          ))}
        </select>
        <input
          {...props}
          type="number"
          name="mobileNumber"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Mobile number"
          className="w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:ring-black"
        />
      </div>
      {error && <p className="text-red-500 text-[10px]">{error}</p>}
    </div>
  );
}
