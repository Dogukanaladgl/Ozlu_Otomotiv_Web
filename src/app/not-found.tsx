import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfadan veya
        parça sorgu formundan devam edebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Ana Sayfa</ButtonLink>
        <ButtonLink href="/parca-sorgula" variant="outline">
          Parça Sorgula
        </ButtonLink>
        <Link
          href="/iletisim"
          className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-accent underline-offset-2 hover:underline"
        >
          İletişim
        </Link>
      </div>
    </Container>
  );
}
