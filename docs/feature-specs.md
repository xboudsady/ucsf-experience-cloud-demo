# Feature Specifications

## Priority 1: Agentforce Chat Widget

### What It Is
A floating chat button (bottom-right corner) that opens a conversation panel. Powered by the Anthropic API using the Transportation KB as context. Simulates what the real Agentforce chatbot will do in the Experience Cloud portal.

### Why It's First
The AI deflection story is central to the BRD. A working chatbot — even simulated — is the single highest-impact demo moment. Stakeholders immediately understand the value when they ask "what's the parking rate at Parnassus?" and get an accurate, contextual answer with a link to submit a form.

### UI Spec
```
Collapsed state:
- Floating button, bottom-right, 56px circle
- Purple (#7B5CE5) background, white chat icon
- "Chat with UCSF Assistant" tooltip on hover
- Subtle pulse animation to draw attention

Expanded state:
- Slide-up panel, 380px wide × 520px tall
- Header: "UCSF Virtual Assistant" + department badge + close button
- Message thread area (scrollable)
- Input bar at bottom with send button
- Typing indicator (3-dot animation) while API responds

Opening message (auto-sent on open):
"Hi Jamie! I'm the UCSF virtual assistant. I can answer questions about 
parking, shuttles, commuter benefits, and campus services — or help you 
find the right form to submit a request. What can I help you with today?"
```

### API Implementation
Use a Netlify serverless function to proxy the Anthropic API (never expose the key client-side).

**`netlify/functions/chat.js`:**
```javascript
const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
  const { messages } = JSON.parse(event.body);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT, // see below
    messages
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: response.content[0].text })
  };
};
```

**System Prompt:**
```
You are the UCSF Campus Services virtual assistant, embedded in the UCSF 
Campus Services Portal. You help UCSF employees, students, patients, and 
visitors with questions about campus services.

Your primary knowledge areas:
[inject full KB JSON here as structured context]

Guidelines:
- Be helpful, warm, and concise. This is a professional university portal.
- When you can answer from the KB, do so directly with specific details 
  (rates, phone numbers, deadlines).
- When the user's need requires a service request (not just information), 
  tell them which form to use and offer to take them there.
- For emergencies (fire, flood, gas leak, injury), always direct to 
  UCSF Police Dispatch: 415-476-1414 immediately.
- If you don't know something, say so and suggest contacting 
  Transportation@ucsf.edu or calling 415-476-GOGO.
- Keep responses under 150 words unless a detailed step-by-step is needed.
- Do not make up policies, rates, or contact information.
```

### Suggested Form Routing
When the chatbot determines the user needs a form, it should display a button:
```
[→ Submit a Parking Permit Request]
```
Clicking this closes the chat and opens the appropriate form (using `openForm()`).

---

## Priority 2: Case Detail View

### What It Is
Clicking a case row in My Requests opens a full detail page for that case.

### UI Spec
```
Layout: full-width, max 900px, replaces main content area

Header card:
- Case number (large), Subject line
- Status badge, Department pill
- Submitted date, Last updated date
- Maximo SR/WO number (Facilities only)

Status Timeline:
- Horizontal or vertical stepper
- Steps: Submitted → Assigned → In Progress → Resolved → Closed
- Active step highlighted in teal
- Each step shows timestamp (simulated)

Communication Log:
- Threaded messages between Customer and BOSC Agent
- Customer messages: right-aligned, teal background
- Agent messages: left-aligned, white card
- UCSF avatar for agent, user initials for customer
- Timestamps on each message

Related Work Orders (Facilities only):
- Small table: WO #, Description, Technician, Status, Scheduled Date
- Shows the Maximo integration story
```

### Simulated Data
Pre-build 3-4 rich case detail objects for the seed cases:
- CS-004821 (In Progress HVAC) — most detailed, show full communication thread
- CS-004756 (Resolved parking permit) — Transportation example
- CS-004701 (Resolved event space) — Campus Life example

---

## Priority 3: Facilities & Campus Life Knowledge Bases

### What It Is
Clone the Transportation KB pattern for the other two departments. Add a KB section below the service tiles for Facilities and Campus Life, same UI pattern.

### Data Structure
Follow `data/transportation-kb.json` exactly. Create:
- `data/facilities-kb.json`
- `data/campus-life-kb.json`

### Facilities KB Categories
- Building Operations (HVAC policies, maintenance schedules, emergency procedures)
- Access & Security (badge process, key policy, lockout procedure)
- Service Request Process (how to submit, what to expect, SLA targets)
- Maximo & Work Orders (SR vs WO, how to check status, common questions)

### Campus Life KB Categories
- Event Spaces (reservation process, AV setup, catering policy)
- Food Services (catering requests, dietary accommodations, café feedback)
- Recreation & Wellness (gym access, membership, class enrollment)
- Housing (eligibility, maintenance requests, move-in/out process)

Source material needed from Jaycee's teams before populating.

---

## Priority 4: See-It-Fix-It Guest Submission

### What It Is
An unauthenticated submission path for reporting issues without logging in. Campus visitors, patients, or employees who don't want to log in can still report a problem.

### UI Spec
```
Trigger: A tile on the home page "See an issue? Report it →" (below main tiles)
Or: A separate URL path /?guest=true

Form (3 fields only):
1. Location (free text — "near the main entrance of MH building")
2. What you see (text area — describe the issue)
3. Photo upload (optional)

No login required. No user data collected.
Submit → shows confirmation with report number (RPT-XXXX)
```

### Notes
- Flagged as "Bot_Created" and "Guest_Submission" in the simulated case data
- Real implementation would route to a BOSC triage queue
- This is a future-phase BRD item — simulate it cleanly but don't over-build

---

## Priority 5: Admin Announcement Banner

### What It Is
A hidden admin mode (triggered by `?admin=true` in the URL) that lets the demo operator update the announcement banner text live during a stakeholder demo.

### UI Spec
```
?admin=true → shows a floating "Admin" badge in corner
Click badge → opens a small panel:
  - Text input pre-filled with current banner text
  - "Update Banner" button
  - "Clear Banner" button
  - Closes on outside click

Banner updates instantly on the page (no reload)
Banner can be cleared (hidden) to show "normal" state
```

### Purpose
During demos, being able to change the banner from "Planned Maintenance" to something demo-specific makes the portal feel more alive and configurable.

---

## Priority 6: Mobile Responsive Polish

### Breakpoints
```css
/* Tablet */
@media (max-width: 900px) {
  .content-grid { grid-template-columns: 1fr; }
  .sidebar-stack { display: none; } /* or collapsible */
  .service-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 600px) {
  .service-grid { grid-template-columns: 1fr; }
  .global-header { padding: 0 12px; }
  .ucsf-portal-label { display: none; }
  .header-search-wrap { display: none; }
  .dept-tab { padding: 8px 12px; font-size: 13px; }
  .main-container { padding: 16px 12px; }
}
```

### Priority areas
1. Department tabs (currently overflow on small screens)
2. Service tile grid (3-column collapses to 1 on mobile)
3. Form rows (multi-column collapses to single)
4. Global header (search + nav items overflow)
5. My Requests table (horizontal scroll or card layout on mobile)
