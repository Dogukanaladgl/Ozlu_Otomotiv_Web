import { AboutPreview } from "@/components/home/AboutPreview";
import { Hero } from "@/components/home/Hero";
import { PartPhotos } from "@/components/home/PartPhotos";
import { ServiceContent } from "@/components/home/ServiceContent";
import { Services } from "@/components/home/Services";
import { TrustSignals } from "@/components/home/TrustSignals";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <TrustSignals />
      <Services />
      <PartPhotos />
      <ServiceContent />
    </>
  );
}
