import { InquiryForm } from "@/components/form/InquiryForm";
import {
  ContactActions,
  PendingContactNote,
} from "@/components/contact/ContactActions";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Parça Sorgula",
  description:
    "Hyundai veya Kia için yedek parça sorgusu gönderin. Marka, model, şasi numarası ve parça bilginizi Özlü Otomotiv’e iletin.",
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
      <header className="border-b border-line bg-ink text-white">
        <Container className="py-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            Birincil iletişim
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Parça sorgula
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {siteConfig.name} olarak Hyundai ve Kia için parça taleplerinizi
            bu form üzerinden alıyoruz. Stok listesi yayınlamıyoruz; her talep
            ayrı incelenir.
          </p>
        </Container>
      </header>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <SectionHeading
              title="Sorgu formu"
              description="Zorunlu alanları doldurun. Görsel eklemek isteğe bağlıdır."
            />
            <div className="mt-6 rounded-lg border border-line bg-surface-elevated p-5 sm:p-7">
              <InquiryForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-line bg-white p-5">
              <h2 className="font-display text-lg font-semibold">
                Ne olur sonra?
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
                <li>Talebiniz e-posta ile işletmeye iletilir.</li>
                <li>Araç ve parça bilgisi incelenir.</li>
                <li>Size dönüş yapılır.</li>
              </ol>
              <p className="mt-3 text-xs text-muted">
                Yanıt süresi konusunda doğrulanmamış taahhüt vermiyoruz.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-white p-5">
              <h2 className="font-display text-lg font-semibold">
                Alternatif kanallar
              </h2>
              <p className="mt-2 text-sm text-muted">
                Form dışında da iletişime geçebilirsiniz.
              </p>
              <div className="mt-4 space-y-3">
                <ContactActions showInquiry={false} />
                <PendingContactNote />
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
