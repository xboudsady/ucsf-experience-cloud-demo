# UCSF Campus Services Portal — Prototype

A simulated Salesforce Experience Cloud portal for UCSF Facilities Services, built as a stakeholder proof-of-concept. Deployed via Netlify.

## Purpose

This prototype demonstrates the desired end-state of a Salesforce Experience Cloud implementation covering three UCSF service departments. It is used to:

- Align stakeholders on UX before the real Salesforce build begins
- Demonstrate AI-assisted intake (Agentforce simulation)
- Show the unified portal experience across Facilities, Campus Life, and Transportation
- Serve as a design spec for the actual Experience Cloud org build

## Live Demo

Deployed at: `[your-netlify-url].netlify.app`

## Departments Covered

| Department | Owner | Status |
|---|---|---|
| Facilities Services | BOSC / Rashi | ✅ Service tiles + forms + KB (planned) |
| Campus Life Services | Jaycee | ✅ Service tiles + forms |
| Transportation Services | Jaycee | ✅ Service tiles + forms + KB |

## Quick Start

No build step required. Open `index.html` in a browser, or deploy to Netlify by dragging the project folder to [app.netlify.com/drop](https://app.netlify.com/drop).

For features requiring the Anthropic API (chat widget), set up Netlify Functions — see `CLAUDE.md` for instructions.

## Feature Status

| Feature | Status |
|---|---|
| Home view — department tabs + tiles | ✅ Complete |
| Request forms (all 3 departments) | ✅ Complete |
| My Requests — case table | ✅ Complete |
| Transportation Knowledge Base | ✅ Complete |
| Agentforce chat widget | 🔲 Next |
| Case detail view | 🔲 Planned |
| Facilities / Campus Life KB | 🔲 Planned |
| See-It-Fix-It guest submission | 🔲 Planned |
| Admin announcement banner | 🔲 Planned |
| Mobile responsive polish | 🔲 Planned |

## Documentation

- `CLAUDE.md` — Full instructions for Claude Code (design system, decisions, feature queue)
- `CONTEXT.md` — Project background, stakeholder context, Salesforce architecture
- `docs/feature-specs.md` — Detailed specs for each planned feature
- `data/transportation-kb.json` — Transportation knowledge base source data

## Stack

- Vanilla HTML / CSS / JavaScript (no framework)
- Netlify (static hosting + serverless functions for API calls)
- Anthropic API (`claude-sonnet-4-20250514`) for chat widget
- Google Fonts (Source Sans 3, Source Serif 4)

## Related Systems (future integration)

Salesforce Service Cloud · IBM Maximo · UCSF MyAccess SSO · Genesys Cloud CX · Agentforce · Archibus
