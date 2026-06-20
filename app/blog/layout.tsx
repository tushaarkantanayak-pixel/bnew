import type { Metadata } from "next";
import AdsterraPopunder from "@/components/Ads/AdsterraPopunder";
import AdsterraSocialBar from "@/components/Ads/AdsterraSocialBar";

export const metadata: Metadata = {
  title: "Gaming News & Pro Guides | BlueBuff MLBB & HOK India",
  description: "Your definitive source for expert gaming news, meta tier lists, and safety guides. Get the edge in Mobile Legends, Honor of Kings, and other top titles in India.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdsterraPopunder />
      <AdsterraSocialBar />
      {children}
    </>
  );
}
