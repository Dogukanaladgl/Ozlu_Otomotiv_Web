import {
  getBusinessPhones,
  getMailtoHref,
  getMapsUrl,
  getDirectionsUrl,
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
  /** Inquiry sidebar: text links for phone and mail; only directions and WhatsApp are buttons. */
  layout?: "buttons" | "choices";
};

export function ContactActions({
  className,
  compact = false,
  showInquiry = true,
  whatsappPrefill = "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
  layout = "buttons",
}: ContactActionsProps) {
  const phones = getBusinessPhones();
  const mailHref = getMailtoHref();
  const whatsappHref = getWhatsAppHref(whatsappPrefill);
  const size = compact ? "sm" : "md";

  if (layout === "choices") {
    return (
      <div className={cn("space-y-4", className)}>
        <ul className="space-y-3 text-sm">
          <li>
            <span className="font-semibold text-ink">Telefon</span>
            {hasPhone() ? (
              phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="mt-1 block font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  {phone.display}
                </a>
              ))
            ) : (
              <span className="mt-1 block text-muted">yapılandırma bekleniyor</span>
            )}
          </li>
          <li>
            <span className="font-semibold text-ink">Mail</span>
            {hasEmail() && mailHref ? (
              <a
                href={mailHref}
                className="mt-1 block break-all font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                {siteConfig.email}
              </a>
            ) : (
              <span className="mt-1 block text-muted">yapılandırma bekleniyor</span>
            )}
          </li>
        </ul>
        <div className="flex flex-col gap-3">
          <ExternalLinkButton
            href={getDirectionsUrl()}
            variant="outline"
            size={size}
            className="w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yol Tarifi
          </ExternalLinkButton>
          {hasWhatsApp() && whatsappHref ? (
            <ExternalLinkButton
              href={whatsappHref}
              variant="whatsapp"
              size={size}
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp&apos;tan Sor
            </ExternalLinkButton>
          ) : null}
        </div>
      </div>
    );
  }

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

      {phones.map((phone) => (
        <ExternalLinkButton
          key={phone.href}
          href={phone.href}
          variant="outline"
          size={size}
        >
          Telefon: {phone.display}
        </ExternalLinkButton>
      ))}

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
        variant="outline"
        size={size}
        target="_blank"
        rel="noopener noreferrer"
      >
        Haritada Gör
      </ExternalLinkButton>

      {hasInstagram() ? (
        <ExternalLinkButton
          href={siteConfig.instagramUrl!}
          variant="outline"
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
    <p className="rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-muted">
      Bazı iletişim kanalları henüz yapılandırılmadı ({missing.join(", ")}).
      Adres bilgisi üzerinden konum ve yol tarifi kullanılabilir.
    </p>
  );
}
