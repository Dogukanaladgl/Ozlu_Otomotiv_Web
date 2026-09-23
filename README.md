# Özlü Otomotiv Web

Production website for Özlü Otomotiv — Hyundai and Kia spare parts in Selçuklu, Konya.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Resend (server-side inquiry email)
- Vercel-ready static-first architecture

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
```

## Environment variables

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_RECIPIENT_EMAIL`

Business contact details (phone, WhatsApp, email, Instagram, opening hours) are centralized in `src/config/site.ts` and must be filled with verified client data before production.

## Documentation

- `AGENTS.md` — AI / contributor rules
- `docs/PROJECT.md`
- `docs/REQUIREMENTS.md`
- `docs/SEO.md`
- `docs/DESIGN.md`
- `docs/DEVELOPMENT.md`
