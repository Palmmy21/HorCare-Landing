---
name: HorCare — Property Club
description: A readable Thai Property Management Platform identity with sky blue, green, navy, and orange.
colors:
  page: "#f5faff"
  paper: "#ffffff"
  navy: "#173c63"
  green: "#23895b"
  orange: "#ffab32"
  muted: "#536f86"
  line: "#dce7ef"
  sky-soft: "#e8f5ff"
  orange-soft: "#fff0dc"
  sky: "#3298dc"
  green-soft: "#d5f1e2"
  primary-hover: "#ec931c"
  accent-hover: "#ffbb56"
  focus: "#177dcc"
typography:
  display:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(37px, 4.15vw, 60px)"
    fontWeight: 500
    lineHeight: 1.43
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(30px, 3.1vw, 44px)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Kanit, sans-serif"
    fontSize: "27px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Sarabun, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Kanit, sans-serif"
    fontSize: "15px"
    fontWeight: 500
rounded:
  field: "6px"
  control: "9px"
  panel: "12px"
  surface: "16px"
spacing:
  compact: "12px"
  control-gap: "16px"
  mobile-gutter: "20px"
  control-inline: "24px"
  panel: "28px"
  card: "35px"
  section-mobile: "68px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-accent:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.sky-soft}"
  field:
    backgroundColor: "#f8fcff"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
    padding: "10px 13px"
  plan:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.surface}"
    padding: "35px"
  plan-pro:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.surface}"
    padding: "35px"
---

# Design System: HorCare

## Overview

**Creative North Star: "Property Club"**

A bright, contemporary owner workspace: pale sky backgrounds, navy ink, green highlights, and orange actions make property management feel approachable. A youthful editorial voice is balanced by familiar Thai labels, visibly organized data, and generous reading space.

The visual system serves a Property Management Platform across apartments, rental condos, and rental homes. This scope follows the current redesign request; the dormitory-only wording in the legacy PRODUCT.md does not limit new surfaces. Keep its durable commitments to clarity, transparent prices, readable Thai, and a friendly personality.

**Key Characteristics:**
- Pale sky surfaces with navy typography and orange actions.
- Locally hosted Thai display and reading fonts.
- Concrete product examples with explicit sample labels.
- Restrained depth and compact, gently rounded controls.

The user approved the layout and explicitly replaced the earlier palette with sky blue, green, blue/navy, and orange. The supplied logo at public/HORCARE small.png is the binding brand asset; retain the unchanged transparent 2000 × 2000 original rather than recreating its artwork.

This is a code scan of src/index.css, src/App.css, current React components, and public/fonts/fonts.css. It records implementation rather than asserting a completed accessibility audit. Page sequence and commercial copy belong in .impeccable/surface-brief.md.

## Colors

The user-pinned palette combines open sky-blue surfaces, confident navy, fresh green, and warm orange actions.

### Primary
- **Navy ink**: default text, paid plan, contact band, and business-overview panel.
- **Action orange**: primary and accent buttons, selection background, and contact emphasis. Buttons use navy text.
- **Sky blue**: chart emphasis and the blue half of the brand; pale variants provide supporting surfaces.

### Secondary
- **Brand green**: headline emphasis, the green half of the brand, and positive status cues.
- **Soft green**: the short editorial underline beneath highlighted headline words.
- **Soft orange**: maintenance illustration surface, providing differentiation without competing with actions.

### Neutral
- **Sky paper**: page canvas and navigation.
- **White paper**: dashboard, pricing, and calculator panels.
- **Muted blue**: secondary explanation and supporting metadata.
- **Soft sky**: quiet hover and supporting surfaces.
- **Divider blue**: restrained one-pixel boundaries.

**The Ink and Paper Rule.** Keep long text on quiet, high-contrast surfaces; reserve orange for emphasis and action.

## Typography

**Display Font:** Kanit, sans-serif. **Body Font:** Sarabun, sans-serif.

Both families are hosted locally as WOFF2 with Thai and Latin subsets in public/fonts; their loading stylesheet is public/fonts/fonts.css. Kanit gives headings and numeric summaries a compact, approachable voice. Sarabun carries Thai explanations and reading content.

The frontmatter captures desktop hero display, section headline, feature title, hero body, and button label roles. General body line-height is 1.7; explanatory text commonly uses 1.85–1.95. Articles use 17px text with 1.95 line-height, reducing to 16px on mobile. Mobile hero display uses clamp(33px, 7.5vw, 49px), with a 31px fallback at the narrowest breakpoint. Monetary summaries use tabular numerals.

**The Thai Reading Rule.** Preserve comfortable Thai line-height and natural word wrapping when changing copy or widths; do not compress body text to preserve a desktop composition.

The dashboard is a compact demonstration with smaller metadata than the reading pages. Mobile sample labels, disclosures, metric labels, dates, and property selectors use 12px text; chart axes use 11px. Its primary revenue metric occupies a full row above two secondary metrics. These compact demonstration sizes are not the general body-text scale.

## Layout

The shared container is centered, capped at 1200px, and leaves 40px side gutters on desktop. At 760px and below it uses 20px gutters; at 370px and below it uses 14px. Standard sections use 100px vertical padding, reducing to 68px on mobile.

Wide layouts use purposeful asymmetry: a 1.1:1 hero, a 1.3:1 feature grid, and a narrower introductory column alongside FAQs. Product data is denser than surrounding copy. Pricing uses two equal columns within 890px; journal entries use three equal columns. Articles constrain reading width to 760px and legal pages to 800px.

Responsive adjustments occur at 1100px, 900px, 760px, and 370px. Mobile stacks major content in reading order, replaces desktop navigation with a menu, removes the decorative contact wordmark, and hides dashboard sidebar and recent-payment rows while retaining the numeric overview and chart. Calculator summary becomes static below the form.

## Elevation & Depth

Depth comes primarily from tonal surfaces, thin dividers, and generous space. The dashboard has a quiet ambient shadow; the rotated example invoice has a slightly stronger paper shadow. Ordinary feature and pricing cards remain flat.

### Shadow Vocabulary
- **Dashboard ambient** (`0 12px 32px #173c6310`): lifts the white demonstration from its sky-blue frame.
- **Invoice paper** (`0 14px 28px #173c6312`): distinguishes the sample invoice from the billing feature background.
- **Mobile navigation** (`0 15px 22px #173c6310`): separates the expanded menu from page content.

## Shapes

Use gently rounded rectangles: fields are compact, controls slightly softer, panels and feature surfaces broader. The frontmatter records the recurring radii. One-pixel dividers organize dense data without boxing every item. Circular shapes are confined mainly to avatars and status dots.

The soft-green underline is a short, slightly rotated highlight beneath selected words. The sample invoice rotates by -4 degrees to suggest a paper document; this is a signature demonstration treatment, not a rule for functional forms.

## Components

### Buttons
Primary and accent buttons pair orange with navy; accent buttons appear on dark surfaces. Outline buttons retain the local canvas with a muted blue border. Standard buttons have a 50px minimum height, centered text, and optional inline arrow. Hover lifts by 2px and changes the surface over 0.18s. Focus uses a 3px blue outline with a 5px offset. Header actions use a more compact size.

### Cards / Containers
Feature containers use broad rounded corners and distinct tonal backgrounds. Pricing and calculator panels use white paper and a thin divider border; the paid plan reverses to navy. Internal padding typically ranges from 28px to 35px, reducing for narrow screens.

### Inputs / Fields
Calculator fields have a pale paper fill, one-pixel blue-gray border, compact radius, 46px minimum height, and tabular numerals. Visible labels sit above each field. Focus strengthens the border; inline error text uses a warm red. The implementation does not define a separate disabled visual state.

### Navigation
The supplied logo appears within a compact image viewport alongside the green “Hor”, blue “Care”, and orange period wordmark. CSS adjusts only display size and transparent margins; the source artwork remains unchanged. The sample dashboard also uses the supplied logo.

The sky-paper header is sticky, with a bottom divider and compact brand. Desktop links use semibold Sarabun. At the mobile breakpoint, a labeled button opens a full-width vertical menu below the header. Expanded state and controlled region are exposed accessibly; Escape closes the menu and returns focus to the toggle. A focus-revealed skip link leads to the main content.

### Selectors and status labels
Property and billing choices use native buttons with aria-pressed. Their selected surface is white within a soft sky group. Blog category buttons use navy and white for the selected state. Status labels always include words alongside color.

### Sample portfolio
The dashboard is the central product illustration, rendered with real HTML and CSS. Property buttons update sample portfolio identity, key values, and descriptive copy; polite live regions announce changing summaries. A visible sample label distinguishes examples from customer evidence. The miniature navigation and chart are illustrative rather than a functional application shell.

### Disclosure and motion
FAQs use native details/summary, a thin divider, and a plus mark that rotates when expanded. Ordinary content is visible without reveal animation. The desktop dashboard heading has a 0.4s ease-out entrance from 5px below; current CSS does not guarantee replay on each property selection. Reduced-motion preference disables transitions, animation, and smooth scrolling.

## Do's and Don'ts

### Do:
- **Do** keep Thai explanations readable and allow mobile content to reflow.
- **Do** use explicit text for selected states, status, errors, and sample data.
- **Do** retain visible keyboard focus and reduced-motion behavior.
- **Do** keep real business figures and prices clearly distinguished from examples.

### Don't:
- **Don't** narrow the current Property Management Platform scope to dormitories alone.
- **Don't** introduce a cold banking or government-portal visual identity.
- **Don't** treat compact dashboard metadata as the standard for body text.
- **Don't** add fabricated customer proof or decorative effects that obscure product meaning.
