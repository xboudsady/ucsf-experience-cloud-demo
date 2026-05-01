# UCSF Campus Services Portal — Claude Code Instructions

## What This Is

A **prototype Experience Cloud portal** for UCSF Facilities Services, being built to simulate the desired product output of a future Salesforce Experience Cloud implementation. The prototype is deployed to **Netlify** as a live POC demo for stakeholder alignment — not a production build.

This is **not** a Salesforce org project. It's a standalone static web app that visually and functionally mirrors what the real Experience Cloud portal will look like and do. We're simulating features to get stakeholder buy-in before the real build begins.

---

## Tech Stack

- **Vanilla HTML/CSS/JavaScript** — no framework, no build step required
- **Netlify** for deployment (drag-and-drop `index.html` or connect repo)
- **Anthropic API** for the AI chat widget (Agentforce simulation) — use `claude-sonnet-4-20250514`
- **Google Fonts** — Source Sans 3, Source Serif 4
- No npm, no bundler unless a specific feature requires it

Keep the stack as simple as possible. The audience is UCSF stakeholders, not engineers. Every feature should work in a browser with zero setup.

---

## Project Structure

```
ucsf-campus-portal/
├── index.html              # Main entry point — all views live here
├── netlify.toml            # Netlify config (if needed for functions)
├── netlify/
│   └── functions/
│       └── chat.js         # Anthropic API proxy (serverless function)
├── data/
│   └── transportation-kb.json  # KB source of truth (loaded by index.html)
├── CLAUDE.md               # This file
├── README.md               # Project overview
├── CONTEXT.md              # Deep project and stakeholder context
└── docs/
    └── feature-specs.md    # Detailed specs for each feature to build
```

---

## Design System

### UCSF Brand Tokens
```css
--ucsf-navy:      #052049   /* Primary header, form bands, table headers */
--ucsf-teal:      #18A3AC   /* Primary action color, links, active states */
--ucsf-teal-dark: #127a82   /* Hover state for teal */
--ucsf-gold:      #EDBC42   /* Accent, header nav active indicator */
--ucsf-light-bg:  #F3F6F9   /* Page background */
--ucsf-border:    #D8DEE8   /* Card and input borders */
--ucsf-text:      #1A2533   /* Body text */
--ucsf-muted:     #5C6878   /* Secondary text, labels */
```

### Department Colors
```
Facilities Services:    teal   (#18A3AC) — bg: #e6f4f5
Campus Life Services:   amber  (#E07A00) — bg: #FEF0CD
Transportation:         purple (#7B5CE5) — bg: #F3EEFE
```

### Status Badge Colors
```
New:         bg #FFD6D6  text #BA0517
Open:        bg #D4E8FD  text #0070D2
In Progress: bg #FEF0CD  text #7A4600
Resolved:    bg #D4ECD9  text #2E844A
Closed:      bg #f3f3f3  text #706E6B
```

### Typography
- **Body:** Source Sans 3 (Google Fonts)
- **Display/headings:** Source Serif 4 (Google Fonts)
- **Base size:** 14px

### Component Patterns
- Border radius: `4px` on all cards, inputs, buttons
- Card shadow: `0 2px 8px rgba(0,0,0,.10)`
- Hover card shadow: `0 4px 20px rgba(0,0,0,.13)`
- All inputs use `1px solid var(--ucsf-border)` with teal focus ring
- Buttons: `--ucsf-teal` primary, `#fff border` neutral

---

## Current State — What's Built

### Views (single-page, JS-toggled)
1. **Home View** — greeting, department tabs, service tiles, sidebar
2. **Form View** — breadcrumb, form card, confirmation state
3. **My Requests View** — filter bar, data table with case history

### Home View Components
- **Global header** — UCSF wordmark, nav links, search bar, user avatar
- **Announcement banner** — maintenance/outage notices
- **Department tabs** — Facilities | Campus Life | Transportation (custom flex, not SLDS)
- **Service tile grid** — 9 tiles per department, 3-column, hover animation with color accent bar
- **Sidebar** — My Recent Requests card, Helpful Links card, AI Chat teaser card
- **Transportation Knowledge Base** — below tiles, search + filter pills + accordion articles, collapsed by default (shows 3, expands on click)

### Department: Facilities Services
Categories: Access Control/Keys, Custodial, Electrical, HVAC, Plumbing, Elevators, Structural/Grounds, Pest Control, General

### Department: Campus Life Services
Categories: Event Spaces, Food Services, Recreation & Wellness, Child Care, Sustainability, Faculty & Staff Housing, Arts & Culture, Employee Programs, General

### Department: Transportation Services
Categories: Parking Permits, Shuttle & Transit, Fleet/Vehicle Request, Bike Program, Rideshare/Commuter, EV Charging, Citation/Appeals, Accessible Transport, General

### Form View
- Pre-populated requester info (simulates MyAccess SSO auto-populate)
- Location picker: Campus → Building → Floor → Room
- Dynamic service type dropdown (populates based on selected category)
- Priority selector: Emergency / Urgent / Routine / Low
- File upload drop zone (UI only)
- Submit → generates case number (CS-00XXXX) → shows confirmation state

### My Requests View
- Filter bar: Department, Status, Time range, Search
- Data table: Case #, Department, Category, Subject, Status, SR/WO #, Submitted, Last Update
- Color-coded department pills and status badges
- Maximo SR/WO column (Facilities only, shows integration story)

### Transportation Knowledge Base
- 46 articles across 4 categories: Parking, Shuttles, Commuter Benefits, Bikes & Programs
- Source: `data/transportation-kb.json`
- Features: live search, category filter pills, accordion expand/collapse, "Show all" expand button
- Each article optionally links to a specific request form
- Answers include context, pro tips (💡), process steps, and direct contact info

---

## View Switching (JavaScript)

```javascript
// Views are toggled by directly setting element.style.display
// DO NOT use CSS classes for view management — caused !important conflicts with SLDS attempts
function showView(name) {
  const map = { home:'homeView', form:'formView', requests:'requestsView' };
  Object.values(map).forEach(id => document.getElementById(id).style.display = 'none');
  document.getElementById(map[name]).style.display = 'block';
  window.scrollTo(0, 0);
}
```

**Critical:** View state is controlled by `element.style.display` only — inline JS style, not CSS classes. This was a deliberate decision after repeated specificity conflicts. Do not revert to class-based toggling.

---

## Simulated Data

### Logged-in User (simulated MyAccess SSO)
```javascript
const CURRENT_USER = {
  firstName: 'Jamie',
  lastName: 'Doe',
  email: 'jamie.doe@ucsf.edu',
  department: 'Dept. of Medicine'
}
```

### Case Number Generation
```javascript
let caseCounter = 4998;
// On submit: caseCounter++ → `CS-00${caseCounter}`
```

### My Requests (static seed data)
```javascript
// 7 sample cases covering all 3 departments, all status types
// Facilities cases include Maximo SR/WO numbers to tell the integration story
// CS-004821: In Progress | CS-004756: Resolved | CS-004701: Resolved
// CS-004633: Closed | CS-004512: Closed | CS-004488: Closed | CS-004399: Closed
```

---

## Priority Feature Queue

Build these in order. Each has a spec in `docs/feature-specs.md`.

### 1. Agentforce Chat Widget (HIGHEST PRIORITY)
A floating chat button (bottom-right) that opens a conversation panel. Powered by the Anthropic API using the Transportation KB as context. This is the single highest-impact demo feature.

**Anthropic API setup:**
- Use a Netlify serverless function as proxy (`netlify/functions/chat.js`)
- Model: `claude-sonnet-4-20250514`
- System prompt: inject KB articles as context, instruct Claude to answer UCSF Transportation questions and suggest form submissions when appropriate
- UI: floating button → slide-up panel → message thread → typing indicator

### 2. Case Detail View
Clicking a case row in My Requests opens a detail page showing:
- Status timeline (submitted → assigned → in progress → resolved)
- Maximo SR/WO number with mock link
- Communication log (back-and-forth between requester and BOSC)
- Related work orders (Facilities only)

### 3. Facilities & Campus Life Knowledge Bases
Clone the Transportation KB pattern for the other two departments. Source material to come — build the data structure and rendering first, populate with placeholder articles.

### 4. See-It-Fix-It Guest Submission
A tile on the home page (unauthenticated mode) that opens a simplified 3-field form: location, description, photo. No login required. Simulates the future guest submission feature in the BRD.

### 5. Admin Announcement Banner
A simulated admin toggle (accessible via a hidden `?admin=true` URL param) that lets the demo operator edit the announcement banner text live during a demo. Shows the operational communication story.

### 6. Mobile Responsive Polish
The prototype renders on desktop. Make it usable on mobile (320px–768px) for stakeholders reviewing on phones during the demo.

---

## Netlify Deployment

### Static (current state — no functions)
1. Rename `index.html` entry point is already correct
2. Drag entire project folder to [netlify.app/drop](https://app.netlify.com/drop)
3. Done — live URL generated instantly

### With Serverless Functions (for chat widget)
Create `netlify.toml`:
```toml
[build]
  publish = "."
  functions = "netlify/functions"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
```

The Anthropic API key goes in Netlify environment variables (`ANTHROPIC_API_KEY`), never in client-side code.

---

## What NOT to Do

- Do not add a JavaScript framework (React, Vue, etc.) — not needed for this prototype
- Do not use the Salesforce SLDS CDN stylesheet — it was tried and caused repeated CSS specificity conflicts that broke the layout. All SLDS-inspired styling is custom CSS using UCSF brand tokens.
- Do not use CSS classes to toggle view visibility — use `element.style.display` directly (see View Switching section)
- Do not add a build step unless absolutely required for a specific feature
- Do not break the existing layout — the two-column grid (tiles + sidebar) with department tabs above is the approved design

---

## Key Contacts & Stakeholders (for context only)

- **Seth** — BOSC Application Support, project lead for this prototype
- **Jaycee** — responsible for Campus Life Services and Transportation Services portal adoption
- **Rashi** — Salesforce admin building the actual Service Cloud org (her prototype is the real backend reference)
- **Brian** — BOSC team, high-volume Facilities Services inbox (primary end user benefit)
- **Anthony / Bernard** — leadership stakeholders for demo sign-off

---

## Integration Context (for future phases, not this prototype)

The real Experience Cloud portal will connect to:
- **Salesforce Service Cloud** — cases created on form submit
- **IBM Maximo (via App Connect)** — SR/WO creation and status sync
- **UCSF MyAccess (SAML SSO)** — authentication and user data auto-populate
- **Genesys Cloud CX** — voice/chat channel integration
- **Agentforce** — real AI chatbot (our widget simulates this)
- **Archibus** — location lookup (Campus → Building → Floor → Room)

In the prototype, all of these are simulated with static data and JavaScript.
