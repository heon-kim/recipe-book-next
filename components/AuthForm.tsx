import React from 'react';
import InputField from './InputField';

interface AuthFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  buttonText,
}) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <InputField
        htmlFor='email'
        type='email'
        label='이메일'
        placeholder='your-email@example.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
      />
      <InputField
        htmlFor='password'
        type='password'
        label='비밀번호'
        placeholder='비밀번호를 입력하세요'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      />
      <button
        type='submit'
        className='block p-2 bg-slate-700 text-white rounded-md'
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
