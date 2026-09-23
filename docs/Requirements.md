# Requirements

## Functional Requirements

### FR-01 — Business Presentation

Visitors must be able to understand:

- Who Özlü Otomotiv is.
- That it specializes in Hyundai and Kia.
- Which general spare-part services it provides.
- That it operates in Selçuklu, Konya.
- How to contact the business.

---

### FR-02 — Hyundai Page

Visitors must be able to access dedicated information about Hyundai spare-part services.

Route:

`/hyundai-yedek-parca`

---

### FR-03 — Kia Page

Visitors must be able to access dedicated information about Kia spare-part services.

Route:

`/kia-yedek-parca`

---

### FR-04 — Original Used Parts

Visitors must be able to learn about original used/dismantled spare parts.

Route:

`/cikma-yedek-parca`

Content must not make unsupported claims about inventory or availability.

---

### FR-05 — Spare-Part Inquiry

Visitors must be able to submit a spare-part inquiry.

Route:

`/parca-sorgula`

Required fields:

- Vehicle brand
- Vehicle model
- VIN / chassis number
- Requested part
- Phone number

Optional:

- Image

---

### FR-06 — Form Validation

The inquiry form must provide understandable validation.

Client-side validation should improve UX.

Server-side validation must remain authoritative.

Required fields must not be accepted when missing.

Uploaded files must be restricted according to supported:

- File type
- File size

---

### FR-07 — Inquiry Delivery

A valid successful inquiry must be delivered to the configured business email through Resend.

Users must receive clear feedback for:

- Submission in progress
- Successful submission
- Validation failure
- Delivery/system failure

Private Resend credentials must never be exposed to browser code.

---

### FR-08 — WhatsApp

Visitors must be able to open a WhatsApp conversation with the verified business number.

The application must not invent the number if it is not yet configured.

---

### FR-09 — Phone

Visitors must be able to call the verified business phone number on supported devices.

---

### FR-10 — Email

Visitors must be able to access the verified business email contact method.

---

### FR-11 — Instagram

Visitors must be able to access the official verified Instagram profile when configured.

---

### FR-12 — Location

Visitors must be able to:

- See the business address.
- Access the business location through Google Maps.
- Request directions.

---

### FR-13 — About

Visitors must be able to learn about Özlü Otomotiv.

Do not invent:

- Years in business
- Customer counts
- Awards
- Certifications
- Experience claims

unless verified.

---

## Non-Functional Requirements

### NFR-01 — Responsive Design

The website must work correctly on:

- Mobile
- Tablet
- Desktop

Mobile usability is a priority.

---

### NFR-02 — SEO

The website must provide strong technical foundations for search engines.

Requirements include:

- Semantic HTML
- Logical heading hierarchy
- Page-specific titles
- Useful page-specific meta descriptions
- Crawlable internal links
- Appropriate canonical handling
- Sitemap
- Robots configuration
- Appropriate structured data
- Mobile-friendly layout
- Good performance
- Search Console readiness

Do not use keyword stuffing.

---

### NFR-03 — Performance

The website should:

- Minimize unnecessary JavaScript.
- Optimize images.
- Avoid avoidable layout shifts.
- Use appropriate image dimensions.
- Lazy-load appropriate below-the-fold resources.
- Avoid unnecessary third-party dependencies.
- Load fonts efficiently.
- Aim for good Core Web Vitals.

Performance should be measured rather than assumed.

---

### NFR-04 — Accessibility

The website must provide:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Correct labels
- Meaningful error messages
- Appropriate alternative text
- Sufficient contrast
- Correct button/link semantics
- Accessible mobile navigation

---

### NFR-05 — Security

The website must:

- Use HTTPS in production.
- Keep private secrets server-side.
- Validate user input server-side.
- Restrict uploaded file type and size.
- Include reasonable anti-spam/bot mitigation.
- Avoid exposing private credentials in source code.

---

### NFR-06 — Maintainability

Business information should be stored centrally.

Components should not contain duplicated mutable business information when it can be read from shared configuration.

---

## Scope

### In Scope

- Corporate website
- Homepage
- Hyundai page
- Kia page
- Original used-parts page
- Spare-part inquiry page
- Optional image attachment
- Resend email delivery
- About page
- Contact page
- WhatsApp
- Phone
- Email
- Instagram
- Google Maps
- Directions
- Responsive design
- SEO foundations
- Local SEO foundations
- Accessibility fundamentals
- Performance optimization
- Domain integration
- HTTPS
- Vercel deployment
- Search Console setup support
- Production verification

---

## Out of Scope

- Database
- Inventory management
- Product catalog management system
- Admin dashboard
- Authentication
- User accounts
- Shopping cart
- E-commerce
- Online payment
- Order management
- Customer profile
- Order history
- Inventory API
- Separate backend application