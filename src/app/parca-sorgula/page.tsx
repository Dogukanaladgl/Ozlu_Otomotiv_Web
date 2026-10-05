import { InquiryForm } from "@/components/form/InquiryForm";
import { InquirySteps } from "@/components/form/InquirySteps";
import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Parça Sorgula",
  description:
    "Konya Selçuklu’da Hyundai veya Kia yedek parça sorgusu gönderin. Marka, model, şasi numarası ve parça bilginizi Özlü Otomotiv’e iletin.",
  path: "/parca-sorgula",
});

export default function InquiryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Parça Sorgula", path: "/parca-sorgula" },
        ])}
      />
      <PageHero
        eyebrow="Birincil iletişim"
        title="Parça Sorgula"
        description={`${siteConfig.name} olarak Konya Selçuklu’dan Hyundai ve Kia parça taleplerinizi bu form üzerinden alıyoruz. Stok listesi yayınlamıyoruz; her talep ayrı incelenir.`}
        contentClassName="pt-10 pb-0 sm:pt-12"
      />

      <section>
        <Container className="pt-8 pb-[clamp(3.25rem,6.5vw,5.5rem)]">
          <InquirySteps />
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="panel p-6 sm:p-8">
              <InquiryForm />
            </div>

            <aside className="space-y-5">
            <div className="panel p-5">
              <h2 className="font-display text-lg font-semibold">
                Peki Sonra Ne Olacak?
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
                <li>Talebiniz tarafımıza iletilir.</li>
                <li>Araç ve parça bilgileriniz değerlendirilir.</li>
                <li>En kısa sürede tarafınıza dönüş sağlanır.</li>
              </ol>
            </div>

            <div className="panel p-5">
              <h2 className="font-display text-lg font-semibold">
                Alternatif İletişim Tercihleri
              </h2>
              <p className="mt-2 text-sm text-muted">
                Bize form göndermek istemiyorsanız aşağıdaki yollardan da bizimle
                iletişime geçebilirsiniz.
              </p>
              <div className="mt-4">
                <ContactActions showInquiry={false} layout="choices" />
              </div>
            </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
