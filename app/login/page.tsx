'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { saveUser, findUser } from '@/utils/userStorage';
import { signIn, useSession } from 'next-auth/react';

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
      <div className='w-96 shadow-md p-8 flex flex-col gap-6 rounded-md'>
        <h2 className='text-lg font-bold'>로그인</h2>
        <form onSubmit={handleLogin} className='flex flex-col gap-3'>
          <label htmlFor='email'>
            <p className='mb-1'>이메일</p>
            <input
              className='border rounded-md p-2 w-full'
              type='email'
              name='email'
              id='email'
              placeholder='your-email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor='password'>
            <p className='mb-1'>비밀번호</p>
            <input
              className='border rounded-md p-2 w-full'
              type='password'
              name='password'
              id='password'
              placeholder='비밀번호를 입력하세요'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type='submit'
            className='block p-2 bg-slate-700 text-white rounded-md'
          >
            로그인
          </button>
        </form>

        <div className='flex flex-col gap-2'>
          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 border rounded-md p-3'
            // onClick={() => handleProviderSignIn('github')}
            onClick={() => signIn('github')}
          >
            <Image
              src='/img/github-mark.svg'
              alt='github mark'
              width={16}
              height={16}
            ></Image>
            <span>Sign In with GitHub</span>
          </button>
          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 border rounded-md p-3'
            onClick={() => signIn('google')}
          >
            <Image
              src='/img/google-mark.png'
              alt='google mark'
              width={16}
              height={16}
            ></Image>
            <span>Sign In with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
