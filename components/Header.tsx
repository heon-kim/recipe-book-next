'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem('loggedUser')) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      setIsLoggedIn(true);
    }
  }, [session]);

  const handleLogout = async () => {
    if (session?.user) {
      signOut();
    }
    localStorage.removeItem('loggedUser');
    setIsLoggedIn(false);
    alert('로그아웃 성공!');
    router.push('/');
  };
  return (
    <header className='flex justify-between items-center bg-slate-700 text-white p-3'>
      <h1
        className='font-extrabold text-lg hover:cursor-pointer'
        onClick={() => router.push('/')}
      >
        나만의 레시피
      </h1>
      <div className='flex gap-3'>
        {isLoggedIn ? (
          <>
            <Link
              href='/add'
              className='bg-white text-slate-700 p-2 rounded-md hover:bg-slate-100'
            >
              레시피 추가
            </Link>
            <button
              onClick={handleLogout}
              className='p-2 rounded-md hover:bg-slate-800'
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              href='/register'
              className='bg-white text-slate-700 p-2 rounded-md hover:bg-slate-100'
            >
              회원가입
            </Link>
            <Link href='/login' className='p-2 rounded-md hover:bg-slate-800'>
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
