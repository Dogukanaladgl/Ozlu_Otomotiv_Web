import {
  getMailtoHref,
  getMapsUrl,
  getDirectionsUrl,
  getTelHref,
  getWhatsAppHref,
  hasEmail,
  hasInstagram,
  hasPhone,
  hasWhatsApp,
  siteConfig,
} from "@/config/site";
import { ExternalLinkButton, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ContactActionsProps = {
  className?: string;
  compact?: boolean;
  showInquiry?: boolean;
  whatsappPrefill?: string;
};

export function ContactActions({
  className,
  compact = false,
  showInquiry = true,
  whatsappPrefill = "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
}: ContactActionsProps) {
  const telHref = getTelHref();
  const mailHref = getMailtoHref();
  const whatsappHref = getWhatsAppHref(whatsappPrefill);
  const size = compact ? "sm" : "md";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {showInquiry ? (
        <ButtonLink href="/parca-sorgula" size={size}>
          Parça Sorgula
        </ButtonLink>
      ) : null}

      {hasWhatsApp() && whatsappHref ? (
        <ExternalLinkButton
          href={whatsappHref}
          variant="whatsapp"
          size={size}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp&apos;tan Sor
        </ExternalLinkButton>
      ) : null}

      {hasPhone() && telHref ? (
        <ExternalLinkButton href={telHref} variant="outline" size={size}>
          Telefon
        </ExternalLinkButton>
      ) : null}

      {hasEmail() && mailHref ? (
        <ExternalLinkButton href={mailHref} variant="outline" size={size}>
          E-posta
        </ExternalLinkButton>
      ) : null}

      <ExternalLinkButton
        href={getDirectionsUrl()}
        variant="outline"
        size={size}
        target="_blank"
        rel="noopener noreferrer"
      >
        Yol Tarifi
      </ExternalLinkButton>

      <ExternalLinkButton
        href={getMapsUrl()}
        variant="ghost"
        size={size}
        target="_blank"
        rel="noopener noreferrer"
      >
        Haritada Gör
      </ExternalLinkButton>

      {hasInstagram() ? (
        <ExternalLinkButton
          href={siteConfig.instagramUrl!}
          variant="ghost"
          size={size}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </ExternalLinkButton>
      ) : null}
    </div>
  );
}

export function PendingContactNote() {
  const missing: string[] = [];
  if (!hasPhone()) missing.push("telefon");
  if (!hasWhatsApp()) missing.push("WhatsApp");
  if (!hasEmail()) missing.push("e-posta");

  if (missing.length === 0) return null;

  return (
    <p className="rounded-md border border-line bg-surface px-3 py-2 text-sm text-muted">
      Bazı iletişim kanalları henüz yapılandırılmadı ({missing.join(", ")}).
      Adres bilgisi üzerinden konum ve yol tarifi kullanılabilir.
    </p>
  );
}
