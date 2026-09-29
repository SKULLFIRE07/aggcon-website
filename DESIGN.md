---
name: AGGCON
description: Cinematic industrial photography with warm editorial surfaces and practical equipment discovery.
colors:
  orange: "#ff6b2c"
  orange-hover: "#ff824c"
  ink: "#171917"
  ink-hover: "#363c31"
  paper: "#f4f3ec"
  muted: "#66695f"
  heading-muted: "#858a7c"
  heading-secondary: "#707469"
  line: "#d7d8ce"
  machine-surface: "#e6e8dd"
  fleet-surface: "#e9eae2"
  category-surface: "#f5f5ef"
  field-border: "#c6c8be"
  focus: "#cb4d15"
typography:
  display:
    fontFamily: "Barlow, 'Arial Narrow', sans-serif"
    fontSize: "clamp(75px, 7.4vw, 96px)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow, 'Arial Narrow', sans-serif"
    fontSize: "clamp(38px, 4.5vw, 64px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow, 'Arial Narrow', sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  large-copy:
    fontFamily: "DM, Arial, sans-serif"
    fontSize: "clamp(19px, 1.8vw, 25px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.03em"
  label:
    fontFamily: "DM, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  navigation:
    fontFamily: "DM, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  control: "3px"
  feedback: "4px"
  dialog: "5px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  gutter-mobile: "24px"
  xl: "30px"
  2xl: "40px"
  3xl: "60px"
  section-sm: "70px"
  section-md: "90px"
  section-lg: "110px"
  section-xl: "120px"
  gutter: "clamp(24px, 5.2vw, 80px)"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.orange-hover}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
    height: "52px"
  button-dark-hover:
    backgroundColor: "{colors.ink-hover}"
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "6px 0"
  input:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "13px 15px"
    width: "100%"
  tab-resource:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 13px"
  tab-resource-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  machine-card:
    textColor: "{colors.ink}"
  machine-image:
    backgroundColor: "{colors.machine-surface}"
    padding: "18px"
    height: "230px"
  category-tab:
    textColor: "{colors.ink}"
    padding: "21px 17px"
    width: "100%"
  category-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
    padding: "12px 0"
---

# Design System: AGGCON

## Overview

**Creative North Star: "Cinematic industrial"**

Heavy machinery supplies the scale, material and atmosphere. Warm ivory reading surfaces, graphite foundations and a clear orange accent carry an ambitious industrial identity without making equipment selection feel complicated. Photography earns the dramatic moments; condensed type provides confidence and compact emphasis.

Editorial sections are spacious, while catalogues, specifications, documents and forms are quieter and more closely ruled. Controls remain practical and flat. The same pairing of photographic authority and warm-paper clarity carries across public pages and the local enquiry workspace. Illustrative concept imagery is identified honestly rather than presented as evidence of a specific project.

**Key Characteristics:**
- Monumental machinery photography and tightly set condensed headings.
- Warm ivory and graphite surfaces with purposeful orange actions.
- Flat equipment grids, ruled specifications and square editorial geometry.
- Restrained image motion, explicit selected states and visible keyboard focus.
- Mobile equipment labels remain readable at their observed 12px size.

Extracted from `src/app/globals.css`, the shipped components in `src/components`, and `src/lib/data.ts`; checked against `.impeccable/surfaces/home.md` and the desktop review capture. Tokens record the implementation, including its actual 3px control corners.

## Colors

The palette combines warm paper, nearly black graphite, worksite orange and olive-grey secondary information; lighter neutral surfaces separate operational content without introducing a second decorative accent.

### Primary
- **Worksite Orange** (`orange`): primary rental actions, wordmark punctuation, active details and selected heading emphasis.
- **Warm Orange Hover** (`orange-hover`): the primary button's responsive hover state.
- **Burnt Orange Focus** (`focus`): keyboard outlines and field caret; it stays distinct from filled orange actions.

### Neutral
- **Graphite** (`ink`): primary text, dark photographic foundations, selected controls and the footer.
- **Lifted Graphite** (`ink-hover`): dark button hover state.
- **Warm Ivory** (`paper`): default page background and light text on graphite.
- **Olive Grey** (`muted`): body support text, technical metadata and document information.
- **Quiet Olive Heading** (`heading-muted`): secondary lines of large editorial headings.
- **Fleet Olive Heading** (`heading-secondary`): the fleet section's secondary heading line; the implemented darker value supports the pale fleet surface.
- **Paper Rule** (`line`): catalogue separators, forms, header boundaries and data rows.
- **Machine Ground** (`machine-surface`): equipment image beds, related equipment and catalogue search.
- **Fleet Ground** (`fleet-surface`): the broad fleet discovery section.
- **Category Paper** (`category-surface`): the category presentation panel.
- **Field Stroke** (`field-border`): text field, select and textarea outlines.

**The Orange Points the Way Rule.** Orange marks actions and meaningful emphasis. Keep long reading passages in graphite or the established secondary neutrals.

## Typography

**Display Font:** locally hosted Barlow Condensed, registered under the source family name `Barlow`, with Arial Narrow and sans-serif fallbacks. The shipped display faces have weights 700 and 800.

**Body Font:** locally hosted DM Sans, registered under `DM`, with Arial and sans-serif fallbacks. The implementation loads regular and semibold assets.

**Character:** Condensed, close-set display type carries scale and industrial confidence. DM Sans keeps navigation, technical content and enquiries calm and legible. Uppercase belongs to authored display statements and the brand wordmark; task controls use natural sentence case.

### Hierarchy
- **Display** (`display`): the main photographic hero uses the 800 face, a tight line height and deliberate line breaks. At the mobile breakpoint its observed size is 80px with a 0.9 line height.
- **Headline** (`headline`): editorial section headings use the 700 face. Individual sections tune the base clamp to their composition; mobile section headings commonly sit between 43px and 52px.
- **Title** (`title`): equipment names use the condensed face with the final 1.04 line height. Mobile catalogue titles are 23px.
- **Large copy** (`large-copy`): editorial introductions use open body type; mobile introductions commonly use 19px–21px.
- **Body** (`body`): the base reading size is 15px. Paragraphs have an observed maximum of 72ch; denser support copy varies by component.
- **Label** (`label`): primary buttons and inline links use the semibold body face. Field labels are semibold, with field content in the regular face.
- **Navigation** (`navigation`): compact semibold labels with an underline revealing hover and the active page.

**The Compressed Display, Open Task Rule.** Reserve condensed type for headings and equipment names. Use DM Sans for actions, specifications, forms and navigation.

Not canonized: the wide hero override and project-story hero currently reach 108px, beyond the confirmed 96px display cap. Several ancillary captions remain 8px–11px, and the main hero carries an 8px vertical decorative slogan. These are observed exceptions or craft defects, not reusable type roles or a new caption/eyebrow system.

## Layout

The primary container is fluid, capped at 1600px, with the observed responsive gutter token. On phones the gutter is fixed at 24px. Content aligns to common left and right edges rather than floating inside rounded panels. Editorial sections use generous vertical intervals, commonly 90px–120px on desktop and approximately 50px–70px on mobile.

Desktop editorial sections pair two columns with unequal ratios when imagery or a lead statement needs dominance. The fleet selector pairs a 320px category rail with a flexible presentation area. The catalogue has a filter sidebar and a three-column machine grid; below 1200px the grid becomes two columns. At 900px the home category rail becomes horizontally scrollable and the quote workspace becomes a single column. At 640px the main navigation moves into a full-height dialog, editorial pairs stack and catalogue filters become an explicit revealable panel. The catalogue deliberately retains two machine columns on mobile.

The header is fixed, 89px tall on desktop and 75px on mobile. Page introductions leave clearance above their content; anchor scrolling accounts for the persistent header. Machinery photos use contained image beds in discovery and detail views, while project photography uses deliberate cover crops. The mobile hero changes crop and composition rather than shrinking the desktop viewport.

**The Shared Edge Rule.** Align text, photographic panels, rules and grids to the responsive container edges. Use internal padding only where a surface genuinely contains a component.

## Elevation & Depth

The reading and catalogue surfaces are flat at rest. Depth comes from photographic lighting, controlled gradient scrims, alternating paper and graphite regions, and restrained tonal backgrounds. Equipment cards and forms do not use decorative lift or glass. Gradients are functional photographic scrims and are native to this world.

### Shadow Vocabulary
- **Navigation overlay:** `0 20px 35px #17191718`, under the expanded equipment menu.
- **Transient feedback:** `0 6px 22px #17191735`, under the quote feedback toast.

Dialog backdrops use a dark translucent overlay with a 6px blur. This is modal separation rather than a translucent card language. Dark-surface separators use thin translucent white strokes.

**The Flat at Rest Rule.** Keep editorial panels, catalogue cards and forms unshadowed. Reserve the observed shadows for navigation overlays and transient feedback.

Hero imagery has a subtle pointer displacement and scroll zoom, transitioning with the established easing curve. Scroll progress moves the scale from 1.03 to 1.09 and adds up to 18px vertical translation. The brand belt moves continuously over 40 seconds; image hover zooms are small. Reduced-motion preference disables the hero's JavaScript motion, CSS animation and transitions, smooth scrolling and belt movement.

## Shapes

Broad photographs, equipment image beds, editorial panels and ruled rows have square geometry. The actual controls use the small `control` radius; toast and search dialog corners use their separate observed tokens. Circular arrows, step numbers and quote-count badges supply compact action/status shapes rather than rounding entire content containers. Thin strokes and tonal fills describe boundaries.

**The Square Field Rule.** Keep content fields and photographic compositions square. Apply small corners to controls and circles to the observed arrow/status devices.

## Components

### Buttons

Confident filled controls with a compact arrow and clear action copy.

- **Shape:** slight control corners; base minimum height is 52px, with 14px 24px padding and a 28px icon gap. The frontmatter height records this minimum, not a fixed clipping height.
- **Primary:** orange fill with graphite text. Hover uses the established lighter orange; the diagonal arrow moves 3px right and 3px up.
- **Dark:** graphite fill with ivory text; hover uses lifted graphite.
- **Inline link:** no filled container, a current-color bottom rule, 6px vertical padding and a 20px arrow gap expanding to 28px on hover.
- **Focus:** interactive elements have the observed 3px burnt-orange outline with 5px offset. Disabled controls use reduced opacity and a default cursor.

### Chips

Investor document filters are compact outlined tabs with the control corner radius, a paper-rule border and 10px 13px padding. The selected tab fills with graphite and switches to ivory text. They wrap rather than forcing a fixed single row. These are functional filters, not decorative status pills.

### Cards / Containers

Equipment appears in a flat grid. A contained photograph rests on Machine Ground, with a small circular diagonal-arrow action. The machine name follows in condensed type, then regular equipment-type copy, a ruled manufacturer/category row and an edge-to-edge Add to quote control. The default image bed is 230px high; the mobile bed is 165px. Hover gently enlarges the image to 1.04. The final mobile type, mini specification, results and quote-action labels are 12px.

Project photography uses cover crops and a restrained scale change, with title and precise project role placed below or inside a legible image scrim. Cards stay square, without a shadow or surrounding rounded shell.

### Inputs / Fields

Fields have transparent backgrounds, a thin Field Stroke border, slight control corners and 13px 15px base padding. Labels remain visible above the field. Quote forms use a two-column grid with 23px gaps, collapsing to one column with 20px gaps on mobile. Quote field text is 12px on desktop and 14px on mobile.

Search fields place their icon and input together on a tonal background. Their container receives a 2px burnt-orange focus-within outline. Validation errors are presented as readable inline text on a pale warm error background; no visual error is represented solely by color.

### Navigation

A permanent fixed header pairs the condensed wordmark with compact body-font links, search and the orange quote action. It is transparent over the main dark heroes, becomes graphite after scrolling, and uses paper on ordinary reading routes. Active and hovered navigation links reveal a thin underline. The expanded equipment menu is a flat ivory two-column overlay with ruled category links. On mobile, a full-height graphite dialog shows larger condensed route links and a clear close action.

### Fleet Category Selector

The selected category rail row fills graphite, switches its name to ivory and colors its arrow orange. Other rows remain flat with a thin separator and a subtle neutral hover fill. Selection updates the corresponding equipment photograph, editorial heading, explanation and catalogue link. The desktop display-type rail becomes a horizontally scrollable body-type control on smaller screens, with the final mobile labels set at 12px. The faint oversized category name is decorative, separate from the readable heading and action.

### Specifications and Quote Progress

Specifications use label/value pairs separated by thin horizontal rules, with muted labels and right-aligned values. Quote progress uses three equal-width stages on a continuous bottom rule. The current stage has an orange underline; current and completed step circles use graphite fill and ivory text. These patterns express actual information and workflow state.

## Do's and Don'ts

### Do:
- **Do** pair warm-paper reading surfaces with graphite photographic and support surfaces.
- **Do** use orange for a meaningful action or clear emphasis, and graphite or established neutrals for reading copy.
- **Do** use the locally hosted condensed display faces and DM Sans body faces through their existing aliases.
- **Do** keep equipment grids and specification rows flat, square and aligned to shared container edges.
- **Do** preserve visible keyboard focus, explicit selected states and the reduced-motion behavior.
- **Do** keep mobile fleet labels at their observed 12px size and disclose illustrative machinery imagery where the source does.

### Don't:
- **Don't** replace the restrained industrial palette with unrelated decorative accents.
- **Don't** turn equipment cards or forms into rounded, shadowed or glass panels.
- **Don't** set task copy, navigation or input content in the condensed display face.
- **Don't** replace photographic image scrims with illegible unprotected overlay text.
- **Don't** generalize the observed 108px display exceptions, tiny ancillary captions or decorative vertical slogan into reusable rules.
- **Don't** imply verified project evidence, exact model photography, price or availability through an illustrative visual.
