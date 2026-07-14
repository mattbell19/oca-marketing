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
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '157746245507563');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=157746245507563&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
