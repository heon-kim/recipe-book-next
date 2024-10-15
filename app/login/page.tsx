'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, FormEvent } from 'react';
import InputField from '@/components/InputField';
import { saveUser, findUser } from '@/utils/userStorage';
import { signIn, useSession } from 'next-auth/react';

const OAuthButton: React.FC<{
  provider: 'github' | 'google';
  label: string;
  icon: string;
}> = ({ provider, label, icon }) => {
  const handleOAuthSignIn = () => {
    signIn(provider);
  };

  return (
    <button
      type='button'
      className='w-full flex items-center justify-center gap-2 border rounded-md p-3 hover:bg-gray-100'
      onClick={handleOAuthSignIn}
    >
      <Image src={icon} alt={`${provider} logo`} width={16} height={16} />
      <span>{label}</span>
    </button>
  );
};

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email;
      saveUser({ email: userEmail, password: '' });
      localStorage.setItem('loggedUser', userEmail);
      window.location.href = '/';
    }
  }, [session, router]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      window.location.href = '/';
    }
  }, [router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const storedUser = findUser(email);

      if (!storedUser || email !== storedUser.email) {
        alert('존재하지 않는 회원입니다.');
        setIsSubmitting(false);
        return;
      }

      if (password === storedUser.password) {
        localStorage.setItem('loggedUser', email);
        alert('로그인 성공!');
        window.location.href = '/';
      } else {
        alert('비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='w-96 shadow-md p-8 flex flex-col gap-6 rounded-md'>
        <h2 className='text-lg font-bold'>로그인</h2>
        <form onSubmit={handleLogin} className='flex flex-col gap-3'>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className='flex flex-col gap-2'>
          <OAuthButton
            provider='github'
            label='Sign In with GitHub'
            icon='/img/github-mark.svg'
          />
          <OAuthButton
            provider='google'
            label='Sign In with Google'
            icon='/img/google-mark.png'
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
