import {
  getWhatsAppHref,
  siteConfig,
} from "@/config/site";
import { cn } from "@/lib/cn";

type SocialKind = "whatsapp" | "facebook" | "sahibinden";

type SocialItem = {
  kind: SocialKind;
  label: string;
  href: string | null;
  wide?: boolean;
  icon: React.ReactNode;
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.01 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.77 8.44-4.93 8.44-9.94z" />
    </svg>
  );
}

function SahibindenIcon() {
  return (
    <span className="font-display text-[1.35rem] font-bold leading-none text-[#111]" aria-hidden="true">
      S
    </span>
  );
}

function resolveUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getSocialItems(): SocialItem[] {
  return [
    {
      kind: "whatsapp",
      label: "WhatsApp",
      href: getWhatsAppHref(
        "Merhaba, yedek parça hakkında bilgi almak istiyorum.",
      ),
      icon: <WhatsAppIcon />,
    },
    {
      kind: "facebook",
      label: "Facebook",
      href: resolveUrl(siteConfig.facebookUrl),
      icon: <FacebookIcon />,
    },
    {
      kind: "sahibinden",
      label: "Sahibinden",
      href: resolveUrl(siteConfig.sahibindenUrl),
      wide: true,
      icon: <SahibindenIcon />,
    },
  ];
}

type SocialExpandLinksProps = {
  className?: string;
};

export function SocialExpandLinks({ className }: SocialExpandLinksProps) {
  const items = getSocialItems();

  return (
    <ul
      className={cn("flex flex-wrap items-center gap-2", className)}
      aria-label="Sosyal medya ve satış kanalları"
    >
      {items.map((item) => {
        const itemClassName = cn(
          "social-expand",
          `social-expand--${item.kind}`,
          item.wide && "social-expand--wide",
          !item.href && "social-expand--pending",
        );

        const content = (
          <>
            <span className="social-expand__icon">{item.icon}</span>
            <span className="social-expand__label" aria-hidden="true">
              {item.label}
            </span>
          </>
        );

        return (
          <li key={item.kind}>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClassName}
                aria-label={`${item.label} — yeni sekmede açılır`}
              >
                {content}
              </a>
            ) : (
              <span
                className={itemClassName}
                aria-label={`${item.label} — bağlantı yakında eklenecek`}
                title="Bağlantı Yakında Eklenecek"
              >
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
