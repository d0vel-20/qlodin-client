// Input Component for FirstName, LastName, and Username
export const InputField = ({ name, placeholder, value, onChange, error }) => {
    return (
      <div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 bg-gray-100 text-[14px] rounded-md focus:ring-2 focus:outline-none placeholder-black ${
            error ? 'border-2 border-red-500' : 'focus:ring-black'
          }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  };