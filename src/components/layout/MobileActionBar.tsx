import {
  getTelHref,
  getWhatsAppHref,
  hasPhone,
  hasWhatsApp,
} from "@/config/site";
import { ButtonLink, ExternalLinkButton } from "@/components/ui/Button";

/**
 * Compact sticky action strip for mobile — does not cover main content heavily.
 */
export function MobileActionBar() {
  const whatsappHref = getWhatsAppHref(
    "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
  );
  const telHref = getTelHref();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface-elevated/95 p-3 backdrop-blur-sm md:hidden">
      <div className="container-page flex gap-2 pb-[env(safe-area-inset-bottom)]">
        <ButtonLink href="/parca-sorgula" className="flex-1" size="md">
          Parça Sorgula
        </ButtonLink>
        {hasWhatsApp() && whatsappHref ? (
          <ExternalLinkButton
            href={whatsappHref}
            variant="whatsapp"
            className="flex-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </ExternalLinkButton>
        ) : hasPhone() && telHref ? (
          <ExternalLinkButton href={telHref} variant="outline" className="flex-1">
            Ara
          </ExternalLinkButton>
        ) : (
          <ButtonLink href="/iletisim" variant="outline" className="flex-1">
            İletişim
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
