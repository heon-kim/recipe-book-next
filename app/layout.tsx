import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <header className='flex justify-between'>
          <h1>나만의 레시피</h1>
          <div>
            <button>레시피 추가</button>
            <button>로그아웃</button>
          </div>
        </header>
        {children}
        <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
      </body>
    </html>
  );
}
