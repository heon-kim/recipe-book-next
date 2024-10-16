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
    const user = localStorage.getItem('loggedUser');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = async () => {
    if (session?.user) {
      signOut();
    }
    localStorage.removeItem('loggedUser');
    setIsLoggedIn(false);
    alert('로그아웃 성공!');
    window.location.href = '/';
  };
  return (
    <header className='flex justify-between items-center bg-slate-800 text-white p-6 shadow-md'>
      <h1
        className='font-extrabold text-xl tracking-wide hover:cursor-pointer hover:text-blue-400 transition duration-200 ease-in-out'
        onClick={() => router.push('/')}
      >
        나만의 레시피
      </h1>
      <div className='flex gap-4'>
        {isLoggedIn ? (
          <>
            <Link
              href='/add'
              className='bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200 ease-in-out shadow-sm'
            >
              레시피 추가
            </Link>
            <button
              onClick={handleLogout}
              className='bg-slate-600 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 ease-in-out shadow-sm'
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              href='/register'
              className='bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-200 ease-in-out shadow-sm'
            >
              회원가입
            </Link>
            <Link
              href='/login'
              className='bg-slate-600 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 ease-in-out shadow-sm'
            >
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
