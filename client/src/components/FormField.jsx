import React from "react";

const FormField = ({
  LabelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor='{name}'
          className='block text-sm font-medium text-gray-900'
        >
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            className='font-semibold text-[#52b788] bg-[#e9f5f0] px-2 py-1 rounded-md text-[12px]'
            onClick={handleSurpriseMe}
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className='bg-gray-50 border border-gray-300 focus:ring-[#52b788] focus:border-[#52b788] focus:bg-[#e9f5f0] block w-full outline-none p-3 text-sm rounded-lg'
      />
    </div>
  );
};

export default FormField;
