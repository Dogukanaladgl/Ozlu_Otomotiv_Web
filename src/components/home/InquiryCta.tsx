import {
  ContactActions,
  PendingContactNote,
} from "@/components/contact/ContactActions";
import { Section, SectionHeading } from "@/components/ui/Section";

export function InquiryCta() {
  return (
    <Section tone="ink">
      <SectionHeading
        invert
        align="center"
        eyebrow="Parça sorgusu"
        title="İhtiyacınız olan parçayı bize sorun"
        description="Formu doldurun; araç ve parça bilgilerinizle talebinizi iletin. WhatsApp veya diğer iletişim kanalları da kullanılabilir."
      />
      <div className="mt-8 flex flex-col items-center gap-4">
        <ContactActions showInquiry whatsappPrefill="Merhaba, bir parça sorgulamak istiyorum." />
        <PendingContactNote />
      </div>
    </Section>
  );
}
