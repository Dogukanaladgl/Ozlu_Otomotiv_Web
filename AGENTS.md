<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Development Instructions

## Project

This repository contains the production website for Özlü Otomotiv, a Hyundai and Kia spare-parts business located in Selçuklu, Konya, Turkey.

Before making substantial changes, read:

- `docs/PROJECT.md`
- `docs/REQUIREMENTS.md`
- `docs/SEO.md`
- `docs/DESIGN.md`
- `docs/DEVELOPMENT.md`

Treat these documents as the project's source of truth.

If implementation and documentation conflict, do not silently change the requirements. Identify the conflict first.

---

## Fixed Technology Decisions

Use:

- Next.js
- App Router
- React
- TypeScript
- Tailwind CSS
- Vercel for deployment
- Resend for transactional email
- Git and GitHub for version control
- Static-first rendering

Use Server Components by default.

Use Client Components only when browser-side interactivity requires them.

Small Next.js server-side functionality for secure form/email processing is acceptable.

There is no requirement for a separate backend application.

---

## Architecture Constraints

Do NOT introduce unless requirements explicitly change:

- Database
- ORM
- Authentication
- User accounts
- Admin dashboard
- Inventory management
- Shopping cart
- Payment processing
- E-commerce system
- Customer portal
- Unnecessary API architecture
- Unnecessary global state management

Prefer the simplest architecture that satisfies the requirements.

Do not overengineer.

---

## Working Mode

The immediate priority is delivering a production-ready v1 for a real client.

When implementing:

1. Read the relevant project documentation.
2. Understand the requirement.
3. Make the smallest coherent architectural choice.
4. Implement it.
5. Validate it.
6. Fix errors introduced by the implementation.
7. Keep unrelated files unchanged where practical.

Do not stop at scaffolding when the task explicitly requests a complete feature.

Do not silently change project scope.

---

## Content Integrity

NEVER invent business facts.

Do not fabricate:

- Years of experience
- Customer counts
- Product availability
- Inventory
- Prices
- Shipping capabilities
- Supported vehicle models
- Testimonials
- Reviews
- Ratings
- Opening hours
- Phone numbers
- Email addresses
- WhatsApp numbers
- Instagram accounts
- Business claims

If verified information is unavailable, use a centralized TODO/configuration value or conservative wording that makes no unsupported claim.

Never create fake reviews or ratings for structured data.

---

## SEO

SEO is a first-class requirement.

SEO must be considered during implementation, not added as an afterthought.

Maintain:

- Semantic HTML
- Logical heading hierarchy
- Crawlable navigation
- Useful internal links
- Page-specific metadata
- Canonical handling where appropriate
- Sitemap
- Robots configuration
- Appropriate structured data
- Good performance
- Mobile usability
- Accessibility

Never use keyword stuffing.

Never generate large numbers of thin pages solely to target search queries.

Never create doorway pages.

Content should primarily serve real users and their search intent.

---

## Accessibility

Accessibility is part of the definition of done.

Prefer native semantic HTML before ARIA.

Requirements include:

- Keyboard-accessible interaction
- Visible focus states
- Correct button semantics
- Correct link semantics
- Proper form labels
- Understandable validation errors
- Appropriate alt text
- Sufficient contrast
- Accessible mobile navigation

Do not use clickable `div` elements when a native `button` or `a` element is appropriate.

---

## Performance

Keep client-side JavaScript minimal.

Do not turn the entire application into Client Components.

Use Server Components by default.

Optimize:

- Images
- Fonts
- Initial page weight
- Layout stability
- Component boundaries

Avoid unnecessary dependencies.

Avoid unnecessary animations.

Do not sacrifice usability or performance for decorative effects.

---

## Forms and Security

Treat all user-provided data as untrusted.

The spare-part inquiry must use both appropriate client-side UX validation and authoritative server-side validation.

Never rely on client-side validation for security.

Validate:

- Required fields
- Expected field formats
- Uploaded file type
- Uploaded file size

Implement reasonable spam/bot protection.

Never expose private API keys or secrets to browser code.

`RESEND_API_KEY` must remain server-side.

Do not commit real environment secrets.

Provide `.env.example` containing variable names/placeholders only.

---

## Business Configuration

Business information must be centralized.

Examples:

- Business name
- Address
- Phone
- WhatsApp
- Email
- Instagram
- Google Maps URL
- Opening hours
- Website URL

Do not duplicate mutable business data throughout arbitrary components.

---

## Dependencies

Before adding a dependency, verify that it solves a real project requirement.

Prefer platform/framework capabilities when they are sufficient.

Avoid adding libraries for trivial functionality.

Every production dependency should have a clear purpose.

---

## Code Quality

Prefer:

- Clear naming
- Type safety
- Small focused components
- Separation of concerns
- Centralized configuration
- Reuse where genuine reuse exists
- Straightforward architecture

Avoid premature abstraction.

Do not build a complex internal framework for a small seven-page website.

Do not leave obvious dead code.

---

## Verification

Before declaring implementation complete, run the relevant checks.

At minimum for production-ready changes:

- Lint
- Type checking
- Production build

Also inspect relevant:

- Routes
- Internal links
- Responsive behavior
- Form behavior
- Error states
- Accessibility
- Metadata
- Sitemap
- Robots configuration
- Structured data
- Secret exposure
- Placeholder content

Never claim something was tested unless it was actually tested.
