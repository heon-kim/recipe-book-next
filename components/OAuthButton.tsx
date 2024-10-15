import Image from 'next/image';
import React from 'react';
import { signIn } from 'next-auth/react';

interface OAuthButtonProps {
  provider: 'github' | 'google';
  children: React.ReactNode;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, children }) => {
  const handleSignIn = () => {
    signIn(provider);
  };

  return (
    <button
      type='button'
      className='w-full flex items-center justify-center gap-2 border rounded-md p-3'
      onClick={handleSignIn}
    >
      <Image
        src={`/img/${provider}-mark.svg`}
        alt={`${provider} mark`}
        width={16}
        height={16}
      />
      {children}
    </button>
  );
};

export default OAuthButton;
