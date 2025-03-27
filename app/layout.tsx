import type { Metadata } from 'next';
import { Montserrat_Alternates } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat_Alternates({ weight: '700', subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'GolFin',
  description: 'A Fin tech',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${montserrat.className} h-full`}>
        {children}
      </body>
    </html>
  );
}