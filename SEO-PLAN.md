# HorCare SEO implementation and measurement

Reviewed: 2026-10-25. Canonical origin: https://horcare-landing.vercel.app.

## Search intent and page ownership

These are qualitative keyword targets based on the product and observed search results, not measured search volumes or current ranking claims.

| Page | Primary Thai search intent | Supporting intent |
| --- | --- | --- |
| `/` | ระบบจัดการหอพัก, โปรแกรมหอพัก | โปรแกรมจัดการอพาร์ทเม้นท์, ระบบจัดการหอพักฟรี |
| `/calculator` | คำนวณค่าน้ำค่าไฟหอพัก | คำนวณค่าเช่ารายห้อง, เครื่องคิดค่าน้ำค่าไฟ |
| `/blog/property-management-platform-guide` | Property Management Platform คืออะไร | ระบบบริหารอสังหาริมทรัพย์ให้เช่า |
| `/blog/how-dormitory-management-saves-time` | ออกบิลหอพัก | ขั้นตอนจัดการบิลรายเดือน |
| `/blog/excel-vs-dormitory-software` | Excel vs โปรแกรมจัดการหอพัก | เลือกโปรแกรมหอพัก, ย้ายข้อมูลหอพัก |
| `/blog/calculate-water-electricity-dormitory` | วิธีคำนวณค่าน้ำค่าไฟจากมิเตอร์ | สูตรค่าน้ำค่าไฟหอพัก, ตัวอย่างบิล |
| `/blog/line-notify-vs-line-oa` | ส่งบิลหอพักผ่าน LINE OA | LINE Notify ปิด, แจ้งเตือนค่าเช่าผ่าน LINE |
| `/blog/rental-contract-guide` | เช็กลิสต์สัญญาเช่าหอพัก | เอกสารส่งมอบห้อง |
| `/blog/open-new-dormitory-2026` | เปิดหอพักต้องเตรียมอะไร | เตรียมทะเบียนห้อง, ตั้งระบบออกบิล |

English equivalents live at `/en` and `/en/...`, with distinct titles and rendered content. Existing Thai article URLs remain intact, including historical slugs, to avoid unnecessary URL migrations.

## Implemented

- Descriptive home, calculator, and journal headings with readable product language.
- Static HTML for 16 routes in each language; HTML language, self-canonical URLs, reciprocal `th`, `en`, and `x-default` annotations.
- Locale-preserving internal links. Explicit URLs determine language; no automatic language redirects based on browser settings or stored preference. This makes shared links and crawler output deterministic. Switching language keeps calculator state and updates the URL.
- Sitemap includes the 32 indexable routes, excluding both 404 pages.
- WebSite, Organization, SoftwareApplication, BlogPosting, and BreadcrumbList structured data where applicable. No fabricated reviews or ratings; markup does not guarantee rich results.
- Visible article update dates for substantive revisions, source links, related guides, calculator links, and pricing links.
- Corrected LINE Notify guidance using LINE's official termination announcement. Removed unsupported survey statistics, obsolete plan prices, and universal legal-rate/permit claims from revised articles.
- Trimmed translations for retired content.

## Verification

Run `npm run build`, `npm run test:seo`, and `npm run test:language`.

The SEO checks inspect generated HTML without relying on client JavaScript. Browser checks cover language URLs, missing translations, calculator state, mobile navigation, and viewport overflow.

## Publication and Search Console

1. Confirm the canonical domain before publishing. If it changes, update the origin, robots sitemap URL, and absolute social image URLs together. Redirect an old domain only when domain ownership and hosting configuration are confirmed.
2. Publish the tested code to the existing deployment. Check live Thai and English routes return the expected HTML and that unknown URLs return HTTP 404, not a successful homepage response.
3. The existing Google verification meta tag was preserved. Its presence does not prove account ownership or active verification. In the verified Search Console property, submit `https://horcare-landing.vercel.app/sitemap.xml`.
4. Inspect `/`, `/calculator`, `/en`, and the utility/LINE guides using URL Inspection. Check Google-selected canonical, indexing status, and rendered page. Request indexing for the changed priority pages; this does not guarantee indexing or a date.
5. Record a baseline for non-brand queries, impressions, clicks, CTR, and average position by page, country, and device. Compare equivalent 28-day windows. Review query-to-page matches before creating additional pages.
6. Measure business outcomes separately: visits to signup, requests for demos, and qualified leads. Do not install tracking or claim conversion improvements without an agreed measurement setup.

## Content work after baseline data

- Add real product screenshots and an owner-approved workflow walkthrough with actual inputs and outputs.
- Publish case studies only with permission and evidence for numbers. Include the baseline, measurement period, and limitations.
- Improve existing pages for queries with impressions and low CTR before creating overlapping keyword pages.
- Review legal content with a qualified reviewer and current primary sources before publishing specific tariff caps, licensing thresholds, or contractual deadlines.
- Review commercial details and LINE integration guidance whenever product plans or upstream services change.

No guaranteed ranking, invented keyword volumes, purchased links, keyword stuffing, or mass near-duplicate location pages.

## Sources consulted

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.line.biz/en/news/2025/04/01/line-notify/
- https://developers.line.biz/en/docs/messaging-api/overview/
- https://www.ocpb.go.th/news_view_en.php?nid=17156
