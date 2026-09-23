# Development Workflow

## Delivery Priority

The current priority is shipping a reliable production-ready v1 for the client.

Development should remain disciplined despite the urgent timeline.

Do not trade basic security, accessibility or correctness for superficial speed.

---

## Technology Stack

Use:

- Next.js
- App Router
- React
- TypeScript
- Tailwind CSS
- Resend
- Vercel
- Git
- GitHub

---

## Architecture

Use a static-first architecture.

Most content pages should not require browser-side JavaScript for ordinary content rendering.

Use Server Components by default.

Use Client Components only for actual interactive browser functionality.

Use small Next.js server-side functionality for secure operations such as Resend communication.

Do not create a separate backend application.

---

## Suggested Responsibility Structure

Exact folder names may adapt to the final implementation, but responsibilities should remain clear.

Possible structure:

app/
components/
lib/
config/
public/

Potential responsibilities:

`app/`
- Routes
- Layouts
- Metadata
- Server-side route-specific behavior

`components/`
- Reusable UI

`config/`
- Business/site configuration

`lib/`
- Validation
- Email integration
- Shared utilities

`public/`
- Static assets

Do not create folders without a real purpose.

---

## Business Configuration

Centralize business information.

Example categories:

- Name
- Address
- Phone
- WhatsApp
- Email
- Instagram
- Google Maps
- Opening hours
- Site URL

Do not hardcode the same mutable values in multiple components.

---

## Form Architecture

Conceptual flow:

Browser
→ form
→ client-side UX validation
→ server-side Next.js boundary
→ authoritative validation
→ Resend
→ business email

Client validation must never replace server validation.

---

## Resend

Resend must be called from server-side code.

Never expose:

`RESEND_API_KEY`

to the browser.

Use environment variables.

Provide:

`.env.example`

Never commit `.env.local` containing real credentials.

Email configuration should be easy to change without editing unrelated UI components.

---

## Git Strategy

For this small urgent project, keep Git workflow simple.

Primary branch:

`main`

Use short-lived feature branches when they provide practical value.

Possible examples:

- `feature/homepage`
- `feature/part-inquiry`
- `feature/seo`

Do not create branch complexity without a reason.

---

## Commit Philosophy

A commit should represent one coherent logical change.

Good examples:

`feat: add responsive site navigation`

`feat: implement spare part inquiry form`

`feat: integrate resend inquiry delivery`

`feat: add page metadata and sitemap`

`fix: improve mobile navigation accessibility`

`refactor: centralize business contact configuration`

Avoid:

`update`

`stuff`

`changes`

`final`

`final-final`

---

## Dependencies

Before adding a production dependency:

1. Identify the problem it solves.
2. Check whether Next.js/browser APIs already solve it adequately.
3. Consider maintenance and runtime/bundle cost.
4. Add it only when justified.

Avoid unnecessary packages.

---

## Code Quality

Prefer:

- Clear naming
- Strong TypeScript types
- Focused components
- Simple data flow
- Separation of concerns
- Centralized configuration
- Reuse where genuine reuse exists

Avoid:

- Premature abstraction
- Giant components
- Excessive prop drilling caused by poor architecture
- Global state libraries without a requirement
- Dead code
- Commenting obvious code instead of writing clear code

---

## Environment Variables

Provide `.env.example`.

Potential variables may include:

`RESEND_API_KEY`

`RESEND_FROM_EMAIL`

`CONTACT_RECIPIENT_EMAIL`

`NEXT_PUBLIC_SITE_URL`

Only use the `NEXT_PUBLIC_` prefix for values that are intentionally safe to expose to browser code.

Never place secrets in public environment variables.

---

## Security

Treat all incoming form data as untrusted.

Validate on the server.

For uploaded images validate at minimum:

- Presence when expected
- File size
- Supported MIME/type

Do not rely only on file extensions.

Add reasonable spam/bot mitigation appropriate to the final architecture.

Avoid returning internal implementation details in public error responses.

---

## Definition of Done

A feature is not complete merely because it looks correct.

Review relevant:

- Functional requirements
- Responsive behavior
- Accessibility
- Error handling
- SEO
- Security
- Performance
- Content integrity

---

## Production Verification

Before production release:

1. Run lint.
2. Run type checks.
3. Run production build.
4. Fix implementation errors.
5. Verify every route.
6. Verify navigation.
7. Verify mobile layout.
8. Verify form validation.
9. Test successful inquiry delivery.
10. Test failed inquiry behavior.
11. Verify uploaded-image restrictions.
12. Verify secrets are server-side.
13. Verify metadata.
14. Verify sitemap.
15. Verify robots configuration.
16. Verify structured data.
17. Check for broken links.
18. Check for placeholder business information.
19. Check accessibility basics.
20. Check performance.
21. Verify production HTTPS.

---

## Deployment

Production target:

Vercel.

The production domain may be managed through the client's existing domain provider.

Domain registration and hosting do not need to be provided by the same company.

DNS records should be configured according to the final Vercel domain setup.

Do not change DNS blindly.

Record the previous DNS configuration before production changes.

---

## Post-Deployment

After deployment:

- Verify production domain.
- Verify HTTPS.
- Test contact actions.
- Test form delivery.
- Verify Google Maps link.
- Verify WhatsApp link.
- Verify social links.
- Configure/verify Google Search Console.
- Verify sitemap discovery.
- Inspect important URLs.
- Monitor indexing.