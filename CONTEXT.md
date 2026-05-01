# Project Context

## Background

UCSF Facilities Services operates a Business Operations Support Center (BOSC) that handles all campus service requests — maintenance, custodial, HVAC, access control, and more. Currently, intake happens through fragmented channels: email inboxes, a legacy MyFS portal, and phone. Requests are manually re-entered into IBM Maximo, the system of record for work order management.

The strategic initiative is to replace this with **Salesforce as the system of engagement**, while Maximo remains the system of record. The platform has three components:

1. **Experience Cloud portal** — what this prototype simulates
2. **Service Cloud CRM** — BOSC agent console (Rashi's build)
3. **Genesys Cloud CX + Agentforce** — voice/chat AI, after-hours handling

This prototype focuses entirely on component #1: the customer-facing portal.

## Why the Prototype Exists

The real Experience Cloud build requires org setup, licensing, SSO integration, and Salesforce development time. Before that investment, leadership and department stakeholders need to see and react to the UX. This prototype lets us:

- Show Jaycee's teams (Campus Life, Transportation) what the portal experience looks like for their departments
- Demonstrate the AI chatbot (Agentforce) concept with a working simulation
- Get buy-in on the unified portal approach before anyone writes an LWC

## Stakeholders

| Name | Role | Relevance |
|---|---|---|
| Seth | BOSC Application Support | Project lead, prototype builder |
| Jaycee | Campus Life / Transportation | Needs to champion portal adoption for her departments |
| Rashi | Salesforce Admin | Building the real Service Cloud org; her prototype is the backend reference |
| Brian | BOSC Agent | Primary beneficiary — high-volume Facilities inbox |
| Paul Landry | Sr. Director, Engineering & Utilities | Senior operational stakeholder |
| Anthony / Bernard | BOSC Leadership | Demo sign-off audience |

## The Unified Portal Argument

The key message this prototype needs to communicate to Jaycee:

> Campus Life and Transportation currently have no structured digital intake. Customers email or call, nothing is tracked, nothing is measurable. The UCSF Campus Services Portal gives both departments the same intake quality, case tracking, and visibility that Facilities is already building — without building separate systems. One portal, one platform, one place for UCSF staff to go.

The prototype demonstrates this by showing all three departments under the same tabbed interface, with the same form UX, the same My Requests tracking, and — eventually — the same AI chatbot serving all three.

## Salesforce Architecture (future state)

```
┌─────────────────────────────────────────────────────┐
│              Experience Cloud Portal                 │
│         (this prototype simulates this layer)        │
│   MyAccess SSO · Service tiles · Forms · KB · Chat  │
└─────────────────┬───────────────────────────────────┘
                  │ Case creation
┌─────────────────▼───────────────────────────────────┐
│              Service Cloud CRM                       │
│    BOSC agent console · Omni-Channel routing         │
│    Queues per dept · SLA dashboards · AI summaries   │
└─────────────────┬───────────────────────────────────┘
                  │ SR/WO sync (bidirectional)
┌─────────────────▼───────────────────────────────────┐
│              IBM Maximo Manage                       │
│    System of record · Work order lifecycle           │
│    Asset management · PM schedules                   │
└─────────────────────────────────────────────────────┘
```

Supporting systems:
- **Genesys Cloud CX** — voice/chat channel integration, CTI
- **Agentforce (Einstein)** — AI chatbot, case routing, next-best-action
- **IBM App Connect** — Salesforce ↔ Maximo integration middleware
- **Archibus** — authoritative location data (Campus → Building → Floor → Room)
- **UCSF Directory Services** — user data for SSO auto-populate

## Portal Requirements (from BRD)

### Authentication
- MyAccess SSO (SAML) — no separate portal password
- Auto-populate: name, department, email from Directory Services on login
- Role: Customer Community Plus license for UCSF employees

### Home Page
- Service category tiles (9 per department)
- My Requests widget (personalized case list)
- Helpful Links (SharePoint, IT portal)
- Search bar (Knowledge articles + past requests)
- Announcement banner (maintenance/outage notices)
- AI chat widget (Agentforce / Einstein Copilot)

### Request Forms
- Dynamic forms per service type
- Location picker: Campus → Building → Floor → Room (Archibus)
- File upload (photos, documents)
- Priority classification (Emergency / Urgent / Routine / Low)
- Submit → Salesforce Case → queue routing → Maximo SR push
- Instant case number confirmation + email notification

### My Requests
- All open and closed cases for the logged-in user
- Columns: Case #, Department, Category, Status, Maximo SR/WO, Submitted, Last Update
- Email + in-app notifications on status change

### Knowledge Base
- Salesforce Knowledge articles surfaced before form submission
- Deflects informational questions before they become cases
- AI chatbot uses same KB for conversational answers

## Transportation Services Context

Transportation at UCSF covers:
- Parking (garages at Parnassus, Mission Bay, Mt. Zion, ZSFGH, MCB, Buchanan Dental, 2001 Embarcadero)
- Shuttle system (GPS-tracked, ADA compliant, bike racks, free for patients)
- Vanpool (via Commute with Enterprise, 4+ riders, UCSF subsidized)
- Edenred pre-tax commuter benefits ($340/mo transit + $340/mo parking, 2026 IRS limits)
- EV charging (100+ spaces campus-wide)
- Bike cages (badge access, no-cost permit, all major campuses)
- Park and Ride (Japan Center, Music Concourse, 5th & Mission, Buchanan Dental)
- Uber Shuttle (Mission Bay commuters, North/South/East Bay)
- Citation appeals (PayMyCite.com, 21-day window)

Key policy context:
- Parnassus parking requires departmental approval (Chancellor's June 2025 policy change prioritized patients)
- Employee daily rate: $26/day, monthly: $332/month, no hourly rate
- Edenred follows a 2-month cycle (order by 23rd → deduct next month → available month after)
- Mission Bay permits NOT valid at Parnassus; Parnassus permits valid at Mission Bay

## Campus Life Services Context

Jaycee's department covers services that currently have no structured digital intake. Key areas:
- Event space reservations (rooms, auditoriums, outdoor areas)
- Food services and catering
- Recreation and wellness (Millberry gym, fitness programs)
- UCSF Childcare Center
- Faculty and Staff Housing (maintenance, billing, move-in/out)
- Sustainability programs (recycling, composting)
- Arts and culture programs
- Employee programs (work-life, recognition)

Current state: email and phone only. No case tracking, no visibility, no metrics.

## Facilities Services Context

BOSC handles:
- Access Control / Keys (badge access, lockouts)
- Custodial (cleaning, spills, restroom supplies)
- Electrical (outlets, lighting, power issues)
- HVAC / Temperature (heating, cooling, air quality)
- Plumbing (leaks, drains, fixtures)
- Elevators (out of service, malfunctions)
- Structural / Grounds (doors, walls, exterior)
- Pest Control

Emergency protocol: Life-safety issues (fire, flood, gas leak) go to UCSF Police Dispatch (415-476-1414), not this portal.

## Maximo Integration Context

Maximo is the system of record for all Facilities work. The portal doesn't replace it — it sits in front of it. The integration flow:
1. Customer submits form → Salesforce Case created
2. BOSC agent reviews → routes to appropriate queue
3. Salesforce pushes → Maximo Service Request created (via App Connect)
4. Maximo Work Order created by technician
5. Status updates sync back → Salesforce Case updated → customer notified

In the prototype, the My Requests table shows SR/WO numbers for Facilities cases to demonstrate this integration story. Campus Life and Transportation cases don't have SR/WO numbers (no Maximo integration for those departments).

## Design Decisions Already Made

| Decision | Rationale |
|---|---|
| No Salesforce SLDS CDN | Tried and caused repeated CSS specificity conflicts that broke the layout. Custom CSS mimics SLDS aesthetics. |
| No JavaScript framework | Prototype doesn't need it. Simpler = easier to demo, share, and modify. |
| View switching via `element.style.display` | CSS class toggling caused `!important` conflicts. Direct JS style is unambiguous. |
| Single `index.html` file | Simpler Netlify deployment. Can be refactored later if needed. |
| Tabs above two-column grid | This specific layout was approved after several iterations. Don't change it. |
| KB collapsed by default (show 3) | Prevents information overload on first view. Search bypasses collapse automatically. |
