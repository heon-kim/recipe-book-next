'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 사용자 정보를 확인
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
    alert('로그아웃 성공!');
  };
  return (
    <header className='flex justify-between items-center bg-slate-700 text-white p-3'>
      <h1 className='font-extrabold text-lg'>나만의 레시피</h1>
      <div className='flex gap-3'>
        {isLoggedIn || session?.user ? (
          <>
            <button className='bg-white text-slate-700 p-2 rounded-md hover:bg-slate-100'>
              레시피 추가
            </button>
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
