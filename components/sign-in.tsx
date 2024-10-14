import Image from 'next/image';
import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <div className='w-96 shadow-md p-8 flex flex-col gap-6 rounded-md'>
      <h2 className='text-lg font-bold'>로그인</h2>
      <form action='' className='flex flex-col gap-3'>
        <label htmlFor='email'>
          <p className='mb-1'>이메일</p>
          <input
            className='border rounded-md p-2 w-full'
            type='email'
            name='email'
            id='email'
            placeholder='your-email@example.com'
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
          />
        </label>

        <button className='block p-2 bg-blue-500 text-white rounded-md'>
          로그인
        </button>
      </form>

      <div className='flex flex-col gap-2'>
        <form
          action={async () => {
            'use server';
            await signIn('github');
          }}
        >
          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 border rounded-md p-3'
          >
            <Image
              src='/img/github-mark.svg'
              alt='github mark'
              width={16}
              height={16}
            ></Image>
            <span>Sign In with GitHub</span>
          </button>
        </form>
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 border rounded-md p-3'
          >
            <Image
              src='/img/google-mark.png'
              alt='google mark'
              width={16}
              height={16}
            ></Image>
            <span>Sign In with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}
