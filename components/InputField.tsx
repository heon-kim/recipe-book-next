import React from 'react';

interface InputFieldProps {
  htmlFor: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showButton: boolean;
  onAdd?: () => void;
}
const InputField: React.FC<InputFieldProps> = ({
  htmlFor,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  showButton,
  onAdd,
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
          onClick={onAdd}
        >
          추가
        </button>
      )}
    </div>
  </label>
);

export default InputField;
