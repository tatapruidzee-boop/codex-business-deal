import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Forma — Pre-IPO Investment Hub', description: 'Explore private markets with a fictional portfolio. Learn, practise, and build your confidence.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
