# Design & UX Specification

## Primary UX Goal

A visitor should quickly understand:

1. Who the business is.
2. What it specializes in.
3. That Hyundai and Kia are core brands.
4. That original/new and original used parts are relevant services.
5. That the business is located in Konya / Selçuklu.
6. How to ask for a specific part.

---

## Design Direction

The website should communicate:

- Reliability
- Automotive industry
- Professionalism
- Local physical business
- Hyundai/Kia specialization

Avoid:

- Generic SaaS aesthetics
- Excessive gradients
- Glassmorphism-heavy UI
- Excessive animation
- Decorative effects that harm usability
- Extremely oversized typography
- Fake luxury aesthetics
- Visual clutter

Prefer:

- Clear typography
- Strong hierarchy
- Authentic business imagery
- Clear calls to action
- Excellent mobile usability
- Restrained visual design
- Readable content

---

## CTA Hierarchy

### Primary

`Parça Sorgula`

### Secondary

`WhatsApp'tan Sor`

### Supporting

- Telefon
- Yol Tarifi
- Email
- Instagram

Do not give every action equal visual prominence.

---

## Global Navigation

Expected navigation:

- Ana Sayfa
- Hyundai
- Kia
- Çıkma Parça
- Hakkımızda
- İletişim
- Parça Sorgula

Desktop and mobile navigation should provide the same important destinations in an appropriate form.

---

## Homepage Structure

### 1. Header / Navigation

Provide:

- Business identity/logo
- Navigation
- Primary CTA

---

### 2. Hero

The hero should communicate:

- Özlü Otomotiv
- Hyundai & Kia
- Spare parts
- Original/new and original used parts
- Konya / Selçuklu
- Primary inquiry CTA
- WhatsApp CTA

Prefer authentic business imagery when available.

---

### 3. Business / Trust Signals

Use only verified facts.

Possible signals may include:

- Hyundai specialization
- Kia specialization
- Original parts
- Original used parts
- Konya / Selçuklu

Do not invent:

- Years of experience
- Customer counts
- Review counts
- Shipping coverage

---

### 4. Services

Present:

- Hyundai spare parts
- Kia spare parts
- Original used/dismantled parts

Each service should link to the relevant page.

---

### 5. Inquiry Process

Explain the process simply.

Example:

1. Enter vehicle information.
2. Describe the requested part.
3. Optionally attach an image.
4. Submit the request.

Provide a clear `Parça Sorgula` CTA.

---

### 6. About Preview

Provide a concise business introduction.

Use authentic business/store imagery where possible.

Link to `/hakkimizda`.

---

### 7. Service Content

Provide useful, human-readable information related to the core services.

Content should serve users first.

Do not create blocks of text purely to repeat SEO keywords.

---

### 8. Strong Inquiry CTA

Provide a clear conversion section leading to `/parca-sorgula`.

WhatsApp can be offered as an alternative.

---

### 9. Location / Contact

Include verified:

- Address
- Map/location
- Directions
- Phone
- WhatsApp
- Email

---

### 10. Footer

Include:

- Business identity
- Important navigation
- Contact information
- Social link(s)
- Appropriate legal/copyright information

---

## Spare-Part Inquiry Form

Fields:

### Vehicle Brand

Required.

Prefer a controlled choice if the business only accepts Hyundai/Kia inquiries.

Do not assume other brands are supported.

### Vehicle Model

Required.

Free text is acceptable unless a verified model list is available.

### VIN / Chassis Number

Required according to current requirements.

Provide useful helper text.

### Requested Part

Required.

Allow the user to describe the requested part clearly.

### Phone Number

Required.

### Image

Optional.

Explain supported file restrictions where appropriate.

---

## Form UX

Every field must have a proper visible label.

Do not use placeholders as replacements for labels.

Validation messages should explain the problem.

Bad:

`Invalid`

Better:

`Lütfen geçerli bir telefon numarası girin.`

Provide clear:

- Idle state
- Validation state
- Submitting state
- Success state
- Failure state

Do not expose technical error messages to ordinary users.

---

## Responsive Design

Mobile usability is a priority.

Do not merely shrink the desktop layout.

Layouts should adapt.

Example:

Desktop:

`IMAGE | CONTENT`

Mobile:

`IMAGE`
`CONTENT`

Consider a restrained mobile action area for important actions such as:

- WhatsApp
- Parça Sorgula

Ensure it does not obscure content or interfere with accessibility.

---

## Design System

Use a small consistent system for:

- Typography
- Spacing
- Colors
- Containers
- Border radius
- Buttons
- Inputs
- Cards
- Focus states

Do not use arbitrary values everywhere.

Do not overbuild a large design-system abstraction for this project.

---

## Images

Prefer authentic images supplied by the business.

Do not fabricate business photos.

Images should:

- Have appropriate dimensions.
- Be optimized.
- Avoid unnecessarily large files.
- Use appropriate responsive behavior.
- Include meaningful alternative text when informative.

---

## Accessibility

Design must account for:

- Keyboard interaction
- Focus visibility
- Contrast
- Touch target size
- Labels
- Error states
- Link/button distinction
- Reduced motion where relevant

Accessibility must survive responsive/mobile design.