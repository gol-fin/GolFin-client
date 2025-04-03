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
    <html lang="en">
      <body className={`${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}