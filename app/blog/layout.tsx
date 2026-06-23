import type { Metadata } from "next";
// import AdsterraPopunder from "@/components/Ads/AdsterraPopunder";
import AdsterraSocialBar from "@/components/Ads/AdsterraSocialBar";
import AdsterraStickyBanner from "@/components/Ads/AdsterraStickyBanner";

export const metadata: Metadata = {
  title: "Gaming News & Pro Guides | BlueBuff MLBB & HOK India",
  description: "Your definitive source for expert gaming news, meta tier lists, and safety guides. Get the edge in Mobile Legends, Honor of Kings, and other top titles in India.",
  alternates: {
    canonical: "https://bluebuff.in/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <AdsterraPopunder /> */}
      <AdsterraSocialBar />
      <AdsterraStickyBanner />
      {children}
    </>
  );
}
