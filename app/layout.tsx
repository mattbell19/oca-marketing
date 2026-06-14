import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serif = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Makeup Artistry Course Bundle | Online Courses Australia',
  description: 'Become a professional makeup artist with Australia\'s most comprehensive online course. Includes professional kit and mentorship.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${sans.variable} ${serif.variable}`}>
      <body className={`${sans.className} antialiased`} suppressHydrationWarning>
        <Script id="hyros-tracking" strategy="afterInteractive">
          {`
            var head = document.head;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://216149.t.hyros.com/v1/lst/universal-script?ph=db8d4f02d7dd2edb00ea2442104b86c5da1265fc030a59fd8d633f3170652ee7&tag=!clicked&ref_url=" + encodeURI(document.URL) ;
            head.appendChild(script);
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
