# Property Club — landing redesign

Mode: Persuade. User requested a complete Gen Z, readable Thai sales page repositioning HorCare as a Property Management Platform, using Impeccable.

FORM provenance: seed `a4124893`; scope `direction`; mode `persuade`; assigned direction index `3` (Property Club). The user subsequently approved the layout and explicitly pinned sky blue, green, blue/navy, and orange, overriding the initial palette. This later user instruction is the visual authority.

Grounded worlds considered: portfolio journal, neighborhood wayfinding, Property Club, rental ledger, lifestyle property magazine, owner workspace, contemporary Thai storefront. Property Club retains its editorial layout and alternation of dense product demonstrations with quiet explanatory copy. The seed's data-field discipline contributes aligned data, the concourse contributes clear status hierarchy, and the sleeping-city direction contributes quiet pacing; their literal forms are declined.

Brand assets: use the exact supplied transparent 2000 × 2000 logo at `public/HORCARE small.png`. The original artwork is unchanged. Header/footer pair its compact image viewport with a green/blue HorCare wordmark and orange period; the sample dashboard also uses the supplied logo.

First viewport: prominent Thai outcome, explicit Property Management Platform description, visible free signup and demo actions, followed immediately by an expansive interactive sample portfolio dashboard. Dashboard changes among apartment, condo, and rental-home example datasets. Sample values must be labeled, never presented as customer evidence.

Visitor path: understand offer → explore property types and working sample → connect features to daily jobs → compare transparent existing prices → answer objections → signup or LINE conversation. Existing commercial facts: free 250 rooms; paid 399 THB/month or 2,990 THB/year; up to 10 properties on paid. No invented reviews, logos, ROI guarantees, or scarcity.

Working controls: property selectors update example data, billing switch updates price and LINE message, FAQs expand natively, mobile navigation supports keyboard and Escape. All internal routes keep working; articles remain readable without JavaScript in production HTML.

Cross-surface: pale sky backgrounds, navy typography and dark sections, green headline emphasis, orange calls to action, generous Thai line-height, consistent navigation/footer, readable article/legal pages, and functional calculator. Mobile stacks content in reading order, hides dashboard sidebar/recent-payment rows, and gives the revenue metric a full row above two secondary metrics. Mobile sample labels, disclosures, metric labels, dates, and property selectors use 12px text; selectors have a 40px minimum height; chart axes use 11px.

Implementation: code-led React/CSS; the interactive product example is the central visual. Kanit and Sarabun are locally hosted as WOFF2. Reduced motion disables the dashboard heading entrance, button transitions, and smooth scrolling. The heading entrance is mount-based; CSS alone does not replay it for each property selection. Editorial freshness must preserve clear pricing and familiar Thai labels.

The current user scope supersedes dormitory-only language in the legacy PRODUCT.md; its schema is deliberately left unchanged.
