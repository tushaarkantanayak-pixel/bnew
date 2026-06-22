
export const metadata = {
  title: "BlueBuff | Build Your Gaming Store & Esports Empire",
  description:
    "The complete infrastructure for gaming entrepreneurs. Automated top-up websites, esports hubs, and secure payment solutions. Scale your gaming business with BlueBuff.",
};

import LandingPage from "@/components/Landing/LandingPage";
import WhatsAppQRPopup from "@/components/WhatsAppQRPopup";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "BlueBuff Gaming Store Platform",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Product",
        "name": "BlueBuff Game Top-Up Infrastructure",
        "description": "Automated gaming store builder and esports tournament management system.",
        "brand": {
          "@type": "Brand",
          "name": "BlueBuff"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1247"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I start my own gaming top-up store?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With BlueBuff, you can create your own automated gaming top-up store instantly without coding. Just sign up, customize your theme, and start selling."
            }
          },
          {
            "@type": "Question",
            "name": "Does BlueBuff support automated API delivery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, BlueBuff provides fully automated API integration for instant game top-ups, including MLBB, Free Fire, and PUBG."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <WhatsAppQRPopup /> */}
      <LandingPage />
    </>
  );
}
