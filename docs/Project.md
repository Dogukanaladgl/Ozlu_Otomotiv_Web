# Özlü Otomotiv Website

## Project Overview

This project is the production website for Özlü Otomotiv, an automotive spare-parts business located in Selçuklu, Konya, Turkey.

The business specializes in Hyundai and Kia spare parts.

The website is NOT an e-commerce platform and does not maintain an inventory database.

The project should remain simple, fast, accessible, SEO-friendly and easy to maintain.

---

## Business Goals

The website exists to:

1. Establish a professional online presence for Özlü Otomotiv.
2. Clearly communicate the company's Hyundai and Kia specialization.
3. Present original/new and original used/dismantled spare-part services accurately.
4. Generate customer leads through spare-part inquiries.
5. Allow customers to contact the business quickly.
6. Help customers locate the physical store.
7. Build strong foundations for organic Google visibility.
8. Build strong foundations for local search visibility in Konya.

---

## Target Audience

Primary users include:

- Hyundai owners searching for spare parts.
- Kia owners searching for spare parts.
- People searching for original spare parts.
- People searching for original used/dismantled parts.
- People searching for Hyundai/Kia spare parts in Konya.
- Customers wanting to visit the physical business.

---

## Primary User Question

A visitor should quickly be able to determine:

- Does this business deal with my vehicle brand?
- Does it deal with the type of part I need?
- How can I ask whether a specific part is available?
- How can I contact the business?
- Where is the business located?

---

## Primary Conversion

The primary conversion is:

> Submit a spare-part inquiry.

Secondary conversions include:

- Start a WhatsApp conversation.
- Call the business.
- Send an email.
- Request directions.
- Visit the physical store.

Instagram is a supporting contact/social channel rather than the primary conversion.

---

## Known Business Information

### Business Name

Özlü Otomotiv

### Address

Fatih Mahallesi  
Gündüz Sokak No:57  
42100 Selçuklu / Konya  
Turkey

Other business information must not be invented.

Missing information must be verified before production.

This includes:

- Phone number
- WhatsApp number
- Email
- Instagram URL
- Opening hours
- Website/domain
- Exact Google Maps URL

---

## Planned Routes

- `/`
- `/hyundai-yedek-parca`
- `/kia-yedek-parca`
- `/cikma-yedek-parca`
- `/parca-sorgula`
- `/hakkimizda`
- `/iletisim`

Also provide appropriate:

- 404/not-found behavior
- `sitemap.xml`
- `robots.txt` / robots configuration

---

## Fixed Technology Stack

### Application

- Next.js
- React
- TypeScript
- App Router

### Styling

- Tailwind CSS

### Email

- Resend

### Deployment

- Vercel

### Version Control

- Git
- GitHub

### Rendering Philosophy

Static-first.

Pages containing mostly business/service content should be statically rendered/prerendered where appropriate.

Use client-side JavaScript only where actual browser interactivity is required.

Use small server-side Next.js capabilities where required for secure form/email processing.

---

## Explicitly Not Required

The v1 project does not require:

- Database
- Product database
- Inventory system
- Admin panel
- User accounts
- Authentication
- Shopping cart
- E-commerce
- Online payment
- Order management
- Customer dashboard
- Customer order history
- Separate backend application

If these are requested later, they represent new scope.

---

## Engineering Principles

### Simplicity

Prefer the simplest implementation that correctly satisfies the requirements.

### Performance

Avoid unnecessary client-side JavaScript and dependencies.

### Accessibility

Accessibility is part of implementation, not a later patch.

### SEO

SEO must influence page architecture, HTML and content from the beginning.

### Security

Secrets must remain server-side.

User input must be treated as untrusted.

### Maintainability

Frequently changing business information should be centralized rather than duplicated throughout the application.

### Content Integrity

Never fabricate business information for the sake of making the website look complete.