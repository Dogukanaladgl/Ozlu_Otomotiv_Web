import { AboutPreview } from "@/components/home/AboutPreview";
import { Hero } from "@/components/home/Hero";
import { InquiryCta } from "@/components/home/InquiryCta";
import { InquiryProcess } from "@/components/home/InquiryProcess";
import { LocationContact } from "@/components/home/LocationContact";
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
      <TrustSignals />
      <Services />
      <InquiryProcess />
      <AboutPreview />
      <ServiceContent />
      <InquiryCta />
      <LocationContact />
    </>
  );
}
