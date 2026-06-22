import type { Metadata } from "next";
import Script from "next/script";

// Google AdSense
const AdSenseScript = () => (
    <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3083932441516430"
        crossOrigin="anonymous"
        strategy="lazyOnload"
    />
);

export const dynamic = "force-dynamic";

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SocialFloat from "@/components/SocialFloat/SocialFloat";
import { GoogleAnalytics } from '@next/third-parties/google';
import ChristmasPopup from "@/components/Seasonal/ChristmasPopup";
import { Poppins } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import ChatBot from "@/components/SocialFloat/Chatbot"; // Removed as we use wrapper
import ValentinePopup from "@/components/Seasonal/ValentinePopup";
import ValentineEffect from "@/components/Seasonal/ValentineEffect";
import Maintaince from "@/components/Seasonal/Maintaince";
import MaintenanceWrapper from "@/components/Layout/MaintenanceWrapper";
import { FEATURE_FLAGS } from "@/lib/featureFlags";
import { getAppSettings } from "@/lib/settings";



export const metadata: Metadata = {
  title: {
    default: "BlueBuff | Premium Game Store & Esports Solutions",
    template: "%s | BlueBuff Tactical Gaming",
  },
  description:
    "Power up your gaming business with BlueBuff. We provide automated top-up websites, esports tournament tools, and secure payment systems. Build your store and esports empire today.",
  metadataBase: new URL("https://bluebuff.in"),
  openGraph: {
    title: "BlueBuff | Build Your Gaming Store & Esports Empire",
    description:
      "The complete infrastructure for gaming entrepreneurs. Automated top-up websites, esports hubs, and secure payment solutions. Scale your gaming business with BlueBuff.",
    url: "https://bluebuff.in",
    siteName: "BlueBuff",
    images: [
      {
        url: "/logoBB.png",
        width: 800,
        height: 600,
        alt: "BlueBuff - Gaming Store Infrastructure",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueBuff | Build Your Gaming Store & Esports Empire",
    description: "The complete infrastructure for gaming entrepreneurs. Automated top-up websites, esports hubs, and secure payment solutions. Scale your gaming business with BlueBuff.",
    images: ["/logoBB.png"],
    creator: "@bluebuff_india",
  },
  alternates: {
    canonical: "https://bluebuff.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-3083932441516430',
  },
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getAppSettings();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://pl29812869.effectivecpmnetwork.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.highperformanceformat.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pl29812869.effectivecpmnetwork.com" />
        <link rel="dns-prefetch" href="https://www.highperformanceformat.com" />
      </head>

      <body className="bg-black text-white">
        <AdSenseScript />
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Blue Buff",
              "url": "https://bluebuff.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bluebuff.in/games?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <Script
          id="organization-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Blue Buff",
              "url": "https://bluebuff.in",
              "logo": "https://bluebuff.in/logoBB.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9178521537",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://instagram.com/bluebuff.in",
                "https://x.com/tk_dev_"
              ]
            })
          }}
        />

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Header />

          {/* <div className="snow" />
  <span className="big-snow"></span>
  <span className="big-snow"></span>
  <span className="big-snow"></span>  */}
          {/* <div className="hearts" />

          {/* <ChristmasPopup />  */}
          {/* <ValentineEffect />

           */}
          {/* <ValentineEffect /> */}
          {/* <ValentinePopup /> */}
          <MaintenanceWrapper maintenanceMode={settings.maintenanceMode} />
          <main className="pt-16 pb-24 md:pb-0">{children}</main>




          <Footer />
          {/* <SocialFloat /> */}


          <div />
        </GoogleOAuthProvider>

        <GoogleAnalytics gaId="G-QG74Y0FC46" />
      </body>

      {/* <script src="https://quge5.com/88/tag.min.js" data-zone="191906" async data-cfasync="false"></script> */}
    </html>
  );
}
