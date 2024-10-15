import React from 'react';

const InputField = ({
  htmlFor,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  showButton,
}) => (
  <label htmlFor={htmlFor}>
    <p className='mb-1'>{label}</p>
    <div className='flex w-full'>
      <input
        className='border rounded-md p-2 w-full'
        type={type}
        name={htmlFor}
        id={htmlFor}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {showButton && (
        <button
          type='button'
          className='ml-2 w-20 bg-slate-500 text-white rounded-md'
        >
          추가
        </button>
      )}
    </div>
  </label>
);

export default InputField;
