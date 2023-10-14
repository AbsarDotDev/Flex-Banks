import Footer from 'components/footer/footer';
import TopBar from 'components/header/topbar';
import { ensureStartsWith } from 'lib/utils';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';

// eslint-disable-next-line no-unused-vars
const zurich = localFont({
  src: '../public/zurich.ttf',
  weight: 'normal',
  variable: '--font-zurich'
});
// eslint-disable-next-line no-unused-vars
const univers = localFont({
  src: '../public/uni.ttf',
  weight: 'normal',
  variable: '--font-univers'
});
const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${zurich.variable} ${univers.variable}`}>
      <meta name="facebook-domain-verification" content="cs4i59x7zg70jjgp7i7i1jfqyk4vh9" />
      <body className="bg-mycolors-bgcolor text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <TopBar />

        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
