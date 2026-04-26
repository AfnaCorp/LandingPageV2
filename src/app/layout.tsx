
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JLOOW',
  description: 'Just Let Outstanding Outperformers Win',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full font-body antialiased">
        {children}
      </body>
    </html>
  );
}
