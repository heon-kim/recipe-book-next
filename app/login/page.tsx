'use client';

import { useEffect, useState } from 'react';
import AuthForm from '@/components/AuthForm';
import OAuthButton from '@/components/OAuthButton';
import { saveUser, findUser } from '@/utils/userStorage';
import { useSession } from 'next-auth/react';

const Login: React.FC = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      saveUser({ email, password: '' });
      localStorage.setItem('loggedUser', email);
      window.location.href = '/';
    }
  }, [session]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      window.location.href = '/';
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = findUser(email);
    if (!storedUser || email !== storedUser.email) {
      alert('존재하지 않는 회원입니다.');
      return;
    }

    if (password === storedUser.password) {
      localStorage.setItem('loggedUser', email);
      alert('로그인 성공!');
      window.location.href = '/';
    } else {
      alert('비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='w-96 p-8 flex flex-col gap-6  bg-white shadow-lg rounded-lg'>
        <h2 className='text-lg font-bold'>로그인</h2>
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          buttonText='로그인'
        />
        <div className='flex flex-col gap-2'>
          <OAuthButton provider='github'>Sign In with GitHub</OAuthButton>
          <OAuthButton provider='google'>Sign In with Google</OAuthButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
