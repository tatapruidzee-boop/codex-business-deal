import type { Metadata } from 'next';
import '@fontsource/noto-serif-georgian/georgian-400.css';
import '@fontsource/noto-sans-georgian/georgian-400.css';
import '@fontsource/noto-sans-georgian/georgian-600.css';
import './globals.css';
export const metadata: Metadata = { title: 'Forma — Pre-IPO საინვესტიციო სივრცე', description: 'გაიცანით კერძო ბაზრები ვირტუალური პორტფელით. ისწავლეთ, ივარჯიშეთ და შეიძინეთ თავდაჯერება.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ka"><body>{children}</body></html>; }
