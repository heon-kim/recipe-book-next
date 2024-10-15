'use client';

import React, { useState, useEffect } from 'react';
import AuthForm from '@/components/AuthForm';
import OAuthButton from '@/components/OAuthButton';
import { saveUser, findUser } from '@/utils/userStorage';
import { useSession } from 'next-auth/react';

const Register: React.FC = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      saveUser({ email, password: '' });
      localStorage.setItem('loggedUser', email);
      window.location.href = '/';
    }
  }, [session]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (findUser(email)) {
      alert('이미 존재하는 이메일입니다.');
      return;
    }

    saveUser({ email, password });
    alert('회원가입 성공! 로그인 페이지로 이동합니다.');
    window.location.href = '/login';
  };

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='w-96 shadow-md p-8 flex flex-col gap-6 rounded-md'>
        <h2 className='text-lg font-bold'>회원가입</h2>
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleRegister}
          buttonText='회원가입'
        />
        <div className='flex flex-col gap-2'>
          <OAuthButton provider='github'>Sign In with GitHub</OAuthButton>
          <OAuthButton provider='google'>Sign In with Google</OAuthButton>
        </div>
      </div>
    </div>
  );
};

export default Register;
