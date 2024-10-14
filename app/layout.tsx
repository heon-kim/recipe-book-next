import Header from './components/header';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <Header />
        </SessionProvider>
        <main className='h-dvh'>{children}</main>
        <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
      </body>
    </html>
  );
}
