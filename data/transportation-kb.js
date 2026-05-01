// Transportation Knowledge Base
// Source: UCSF Transportation Chatbot KB PDFs
// Last updated: May 2026
// Structure: array of category objects, each with cat (string) and articles (array)
// Each article: { q: string, a: string (may contain HTML), action: null | { label: string, form: string } }

const TRANSPORT_KB =
  {
    cat: 'Parking',
    articles: [
      {
        q: 'Where can I park at Parnassus?',
        a: `Public parking at Parnassus is available at two locations:<br><br>
        <strong>Millberry Union Patient &amp; Visitor Garage</strong> — the primary public option. Expect high occupancy between 7–9 AM on weekdays, so arriving early or after 9 AM can save you significant time circling for a spot.<br><br>
        <strong>Westside Dental Lot</strong> (50 Kirkham St) — a smaller mixed-use lot shared with UCSF employees. Same rates as Millberry Union. Payment via Pay by Phone or the onsite pay station.<br><br>
        💡 <em>Pro tip: If you're visiting for a clinical appointment, ask your provider's office for a validation sticker — it can substantially reduce your parking cost.</em>`,
        action: null
      },
      {
        q: 'Where can employees park at Parnassus?',
        a: `Employee parking at Parnassus is limited and requires <strong>departmental approval</strong> — you can't simply purchase a permit on your own.<br><br>
        <strong>Step 1:</strong> Request approval from your department's Control Point, Chief Administrative Officer (CAO), or Dean's Office.<br>
        <strong>Step 2:</strong> Once approved, contact <a href="mailto:Transportation@ucsf.edu">Transportation@ucsf.edu</a> for next steps on setting up Pay by Phone.<br><br>
        <strong>Approved locations:</strong> ACC Garage or Westside Dental Lot<br>
        <strong>Daily rate:</strong> $26 | <strong>Monthly:</strong> $332 | <strong>Hourly rate:</strong> Not available for employees<br><br>
        Your Parnassus permit also works at Mission Bay, Mt. Zion, MCB, Buchanan Dental, and 2001 Embarcadero — so it's the most flexible employee permit available.<br><br>
        💡 <em>Parnassus permits are scarce. As of June 2025, the Chancellor's cabinet updated policy to prioritize patients, so employee availability has decreased. If your role doesn't require daily Parnassus presence, consider whether a Mission Bay permit plus shuttle access is a better fit.</em>`,
        action: { label: 'Request a Parking Permit', form: 'parking' }
      },
      {
        q: 'What are the employee daily parking rates?',
        a: `<strong>Daily rate:</strong> $26/day at every UCSF campus location<br>
        <strong>Monthly permit:</strong> $332/month — roughly $15.10/workday, a better deal if you park more than 22 days/month<br>
        <strong>Hourly rate:</strong> Not available — employees pay the full daily rate regardless of how long they stay<br><br>
        Permits are tied to your license plate and managed via Pay by Phone.<br><br>
        💡 <em>If you're paying $332/month out of pocket, consider enrolling in Edenred pre-tax commuter benefits. You can pay for your parking permit pre-tax, which effectively reduces the real cost depending on your tax bracket — potentially saving $60–100/month.</em>`,
        action: null
      },
      {
        q: 'What are the public (visitor/patient) daily parking rates?',
        a: `Rates vary by campus and whether you have a clinical validation sticker:<br><br>
        <strong>With a validation sticker from your clinician:</strong> $5/hour up to $36/day at Parnassus–Millberry Union<br>
        <strong>Without a validation sticker:</strong> Up to $60/day at Parnassus<br>
        <strong>All other locations:</strong> $5/hour up to $35/day, no validation needed<br><br>
        ADA permit holders pay a flat $7/day at any UCSF garage — just present your hangtag at the exit.<br><br>
        💡 <em>If you're a patient or accompanying a patient, always ask the clinic for a validation sticker before leaving the building. Forgetting one means paying nearly double at the Parnassus exit.</em>`,
        action: null
      },
      {
        q: 'Where can staff park at Mission Bay?',
        a: `Mission Bay has significantly more employee parking capacity than Parnassus. Your options:<br><br>
        <strong>Third Street Garage</strong> — the primary structured garage, central to Mission Bay clinical and research buildings<br>
        <strong>Community Center Garage</strong> — adjacent to the Mission Bay Community Center<br>
        <strong>Surface lots</strong> — three lots at Nelson Rising Lane and Mission Hall, good for shorter visits<br><br>
        Monthly permits and daily rates ($26/day) both apply. No departmental approval required for Mission Bay — you can set up directly through Pay by Phone.<br><br>
        💡 <em>A Mission Bay permit is valid across most UCSF locations — Mission Bay, Mt. Zion, MCB, Buchanan Dental, and 2001 Embarcadero. It is not valid at Parnassus.</em>`,
        action: { label: 'Request a Parking Permit', form: 'parking' }
      },
      {
        q: 'Is my Mission Bay permit valid at Parnassus?',
        a: `<strong>No.</strong> Mission Bay permits are not valid at Parnassus — this is a firm policy, not a technicality.<br><br>
        If you have an occasional or recurring business need to be at Parnassus, you'll need to request a separate Parnassus permit through your CAO or Dean's Office. They'll verify operational need before approving.<br><br>
        The reverse is not true: <strong>Parnassus permits are valid at Mission Bay</strong> and most other UCSF locations, making them the more flexible (and harder to get) of the two.<br><br>
        💡 <em>If you only need Parnassus infrequently, the UCSF shuttle system may be a more practical solution — it runs reliably between campuses and avoids the permit hassle entirely.</em>`,
        action: { label: 'Request a Parnassus Permit', form: 'parking' }
      },
      {
        q: 'How do I appeal a parking citation?',
        a: `Citations can be appealed online — but you need to act quickly:<br><br>
        <strong>Portal:</strong> <a href="http://PayMyCite.com" target="_blank">PayMyCite.com</a><br>
        <strong>Deadline:</strong> Within <strong>21 days</strong> of the issue date — appeals submitted after this window will not be considered<br><br>
        Your appeal needs to include:<br>
        • Citation number (on the ticket)<br>
        • Clear written justification for dismissal<br>
        • Supporting screenshots or photos (e.g., a faded sign, a broken meter, a valid permit not visible from outside)<br><br>
        💡 <em>The strongest appeals include documentation. A photo of your vehicle in context — showing the permit, signage, or meter — is far more effective than a written explanation alone. Vague appeals ("I didn't know") are typically denied.</em>`,
        action: { label: 'Submit a Citation Appeal', form: 'violation' }
      },
      {
        q: 'Can I get a refund for unused parking days?',
        a: `Refund availability depends on your permit type and location:<br><br>
        <strong>Monthly permits (most locations):</strong> Refunds can be requested "within reason" for unused days. Email <a href="mailto:Transportation@ucsf.edu">Transportation@ucsf.edu</a> with your permit details and the reason for the refund request.<br><br>
        <strong>Parnassus permits:</strong> Be very careful here. Any request to refund, pause, or hibernate your Parnassus permit may result in it being <strong>permanently reallocated</strong> to another person in your department. Parnassus permits are scarce — once lost, there's no guarantee you'll get it back.<br><br>
        💡 <em>If you're going on leave or working remotely for an extended period, contact Transportation before making any changes to a Parnassus permit. Understand the risk before submitting.</em>`,
        action: { label: 'Contact Transportation Services', form: 'general' }
      },
      {
        q: 'How do I request an ADA parking permit?',
        a: `The process differs based on your affiliation:<br><br>
        <strong>UCSF Employees:</strong> Submit your request and required medical documentation to Disability Management Services (DMS) at <a href="mailto:HRDMS@ucsf.edu">HRDMS@ucsf.edu</a>. DMS reviews and forwards approval to Transportation, who issues the parking accommodation.<br><br>
        <strong>UCSF Students:</strong> Contact Student Disability Services at <a href="mailto:StudentDisability@ucsf.edu">StudentDisability@ucsf.edu</a>. Same review-and-forward process applies.<br><br>
        <strong>Patients &amp; Visitors:</strong> Park in any marked ADA stall with a valid ADA hangtag. Present it at the exit — you'll be charged the ADA rate of <strong>$7/day</strong>. If no ADA stalls are available, you may use a standard stall and still receive the $7 ADA rate upon exit.<br><br>
        💡 <em>ADA accommodations at UCSF are handled through HR, not Transportation directly. Starting with Transportation often results in being redirected — go to DMS or SDS first to save time.</em>`,
        action: { label: 'Request Accessible Parking', form: 'access' }
      },
      {
        q: 'Why is Parnassus parking so difficult?',
        a: `Parnassus sits in a residential San Francisco neighborhood with very limited garage and surface lot capacity. The campus wasn't built for the volume of employees and patients it now serves.<br><br>
        In June 2025, the Chancellor's cabinet formalized a policy change that prioritizes <strong>patients and patient-visitors</strong> over employees. This reduced the number of permits available to staff — particularly at ACC Garage.<br><br>
        The practical result: employee permits are allocated per department, and many departments have waiting lists. Getting a Parnassus permit often depends on turnover within your department, not just submitting a request.<br><br>
        💡 <em>If you're a regular Parnassus commuter, the UCSF shuttle system, Muni (N-Judah line stops nearby), and the Park and Ride program are worth exploring as alternatives. The shuttle in particular is free, reliable, and avoids the parking scramble entirely.</em>`,
        action: null
      },
      {
        q: 'Is there a Park and Ride program?',
        a: `Yes — Park and Ride lets you park at an off-campus lot and shuttle or transit to UCSF, which is often faster and cheaper than driving directly to campus.<br><br>
        <strong>Park and Ride locations:</strong><br>
        • Japan Center<br>
        • Music Concourse (Golden Gate Park area)<br>
        • 5th and Mission<br>
        • UCSF Buchanan Dental<br><br>
        These lots are particularly useful for Parnassus commuters who can't get a campus permit. Parking at these locations can be covered by your Edenred pre-tax benefit card.<br><br>
        💡 <em>The Music Concourse and Japan Center options connect well to the UCSF shuttle network. Check the shuttle trip planner to confirm which routes serve each location before committing to a spot.</em>`,
        action: null
      },
      {
        q: 'What happens to parking during Warriors games?',
        a: `Chase Center is adjacent to the Mission Bay campus, and game days create real parking and transit pressure — especially on weeknight games when it overlaps with the evening commute.<br><br>
        <strong>What to expect:</strong><br>
        • Third Street Garage is most impacted — expect reduced availability and possible closures<br>
        • Shuttle detours may shift your usual stop or add travel time<br>
        • Standard restrictions and congestion on 3rd Street and surrounding streets<br><br>
        <strong>How you'll know:</strong> Transportation posts <strong>Flash communications</strong> via email and text approximately 24 hours before the event. If you're subscribed to Transportation alerts, you'll get advance notice.<br><br>
        💡 <em>On heavy event days, arriving before 4 PM or using an alternate garage (Community Center Garage is typically less impacted) gives you the best chance of a smooth experience.</em>`,
        action: null
      },
    ]
  },
  {
    cat: 'Shuttles',
    articles: [
      {
        q: 'What time does the shuttle run?',
        a: `UCSF shuttles operate <strong>Monday–Friday</strong>, with most routes starting between <strong>5:00–6:00 AM</strong> and running through approximately <strong>8:00 PM</strong>.<br><br>
        Hours vary by route — some express routes only run during peak commute windows, while others run all day. Weekend service exists but is significantly reduced.<br><br>
        The best way to plan a trip is through the <strong>UCSF Mobile App</strong> (Go → Shuttle section) or the UCSF Shuttle Trip Planner on the Transportation website — both show live arrivals, route maps, and real-time GPS positions.<br><br>
        💡 <em>The UCSF Mobile App is genuinely the best tool here. Real-time GPS tracking means you can see exactly where your shuttle is and whether you have time to grab coffee before the stop — or whether you need to run.</em>`,
        action: null
      },
      {
        q: 'Do shuttles run on weekends?',
        a: `Yes, but weekend service is considerably reduced compared to weekdays. Not all routes operate, and frequency is lower — you may wait 30–60 minutes between shuttles on some routes.<br><br>
        Always check the current schedule before relying on weekend service, as routes can change seasonally or due to campus events. The UCSF Transportation website and Mobile App reflect the most current timetables.<br><br>
        💡 <em>If you're planning a weekend trip between campuses, building in extra buffer time is wise. For time-sensitive weekend travel, having a backup plan (Muni, BART, or rideshare) is a good habit.</em>`,
        action: null
      },
      {
        q: 'Are UCSF shuttles ADA accessible?',
        a: `Yes — all UCSF shuttles are fully ADA-compliant and equipped with <strong>wheelchair lifts</strong>. You don't need to request this in advance for standard boarding.<br><br>
        If you need additional assistance — including help with loading, specific stop accommodations, or have questions about accessibility at a particular stop — contact Shuttle Dispatch directly:<br><br>
        <strong>Phone:</strong> (415) 476-GOGO<br>
        <strong>App:</strong> UCSF Mobile App → Go section<br><br>
        💡 <em>If you have a recurring accessibility need (e.g., you use a power wheelchair or need a specific boarding location), reaching out to Transportation Services in advance allows them to flag your route and ensure drivers are prepared.</em>`,
        action: { label: 'Request ADA Transportation Assistance', form: 'access' }
      },
      {
        q: 'Are shuttles tracked in real-time?',
        a: `Yes. All UCSF shuttles use GPS tracking, and real-time arrival data is publicly accessible — no login required.<br><br>
        <strong>How to check:</strong><br>
        • <strong>UCSF Mobile App</strong> → Go section → Live Shuttle tab (most up-to-date)<br>
        • UCSF Transportation website → Shuttle tracker<br><br>
        The tracker shows vehicle positions on a map and estimated arrival times at each stop. It updates every 30–60 seconds.<br><br>
        💡 <em>The app tracker is accurate enough that most regular shuttle riders use it to time exactly when to leave their desk. The "next arrival" time displayed at physical stop signs may lag — the app is generally more reliable.</em>`,
        action: null
      },
      {
        q: 'Can I bring a bike on the shuttle?',
        a: `Yes — most UCSF shuttles have <strong>exterior bike racks</strong> that accommodate up to <strong>2 bikes</strong> per shuttle.<br><br>
        Loading is first-come, first-served. If both rack slots are taken, you'll need to wait for the next shuttle. Bikes must be secured by the rider before boarding.<br><br>
        💡 <em>During peak commute hours (7–9 AM and 5–7 PM), bike rack slots go quickly on popular routes. If you're bike-commuting regularly, arriving at the stop a few minutes early helps. UCSF also offers secure bike cages at major campuses as a complement — you can ride to campus, lock up securely, and take the shuttle between buildings.</em>`,
        action: null
      },
      {
        q: 'How do I report a shuttle issue?',
        a: `For any shuttle issue — missed stop, safety concern, accessibility problem, driver conduct, or vehicle condition — contact Shuttle Dispatch:<br><br>
        <strong>Phone:</strong> (415) 476-GOGO<br>
        <strong>App:</strong> UCSF Mobile App<br><br>
        Dispatch triages your report and routes it to the appropriate team. For urgent or safety-related issues, call directly rather than using the app.<br><br>
        For non-urgent issues or if you want a written record of your report, submitting through this portal creates a tracked case that you can follow up on.<br><br>
        💡 <em>When reporting, note the route number, approximate time, and direction of travel if you can. That information helps dispatch locate the specific vehicle and driver quickly.</em>`,
        action: { label: 'Report a Shuttle Issue', form: 'shuttle' }
      },
      {
        q: 'Can patients ride UCSF shuttles?',
        a: `Yes — UCSF patients and visitors may ride all UCSF shuttles <strong>free of charge</strong>. No registration, pass, or ID is required.<br><br>
        Masks may be required on shuttles that serve clinical areas, consistent with UCSF infection control policies. Check current masking guidance at your destination before boarding if you're unsure.<br><br>
        💡 <em>Patients traveling between Parnassus and Mission Bay clinics — or between any two UCSF campuses — often find the shuttle faster than driving and re-parking, especially during peak hours. Ask your clinic coordinator about which shuttle routes serve your appointment location.</em>`,
        action: null
      },
      {
        q: 'Where is lost and found for shuttles?',
        a: `Items left on UCSF shuttles are collected by Shuttle Dispatch. There's no online lookup — you'll need to call to check if your item was turned in.<br><br>
        <strong>Contact:</strong> Shuttle Dispatch at (415) 476-GOGO<br>
        <strong>Hours:</strong> During shuttle operating hours (approximately 5 AM–8 PM, Monday–Friday)<br><br>
        💡 <em>The sooner you call after realizing something is missing, the better. Dispatch can radio the driver on the specific route while the shuttle is still running. Waiting until the next day significantly reduces your chances of recovery, as items may be transferred to a central storage location.</em>`,
        action: null
      },
    ]
  },
  {
    cat: 'Commuter Benefits',
    articles: [
      {
        q: 'Does UCSF offer pre-tax commuter benefits?',
        a: `Yes — through <strong>Edenred</strong>, UCSF's pre-tax commuter benefit program lets you pay for eligible transit and parking expenses using pre-tax income. This reduces your taxable wages, which means you're effectively paying less for your commute.<br><br>
        <strong>How it works:</strong> You elect an amount to deduct from your paycheck before taxes. Those funds load onto a restricted Edenred debit card, usable only for eligible commute expenses.<br><br>
        <strong>Program fee:</strong> $3/month in any month you have an active order — small enough that virtually any regular commuter comes out ahead.<br><br>
        💡 <em>This is one of the most underused employee benefits at UCSF. If you're paying $332/month for a parking permit and you're in a 25% combined tax bracket, pre-tax enrollment saves you roughly $83/month — or about $1,000/year — with almost no effort to set up.</em>`,
        action: null
      },
      {
        q: 'What can I spend Edenred commuter benefits on?',
        a: `<strong>✅ Eligible — Parking:</strong><br>
        UCSF parking permits, Park &amp; Ride permits, ZSFG permits, and many parking facilities near UCSF campuses<br><br>
        <strong>✅ Eligible — Transit:</strong><br>
        Clipper cards, Muni, BART, Caltrain, Amtrak, ferries, vanpools, and employer-sponsored shuttle services (including the UCSF Uber Shuttle)<br><br>
        <strong>❌ Not eligible:</strong><br>
        Gas, highway tolls, standard Uber or Lyft rides (non-employer shuttle)<br><br>
        💡 <em>The Clipper card is one of the most flexible uses — you can load it with Edenred funds and use it across Muni, BART, Caltrain, and ferries. If your commute involves multiple transit systems, a Clipper pre-load can cover all of it with one card.</em>`,
        action: null
      },
      {
        q: 'What are the monthly Edenred contribution limits?',
        a: `For 2026, the IRS allows:<br><br>
        <strong>Transit:</strong> Up to <strong>$340/month</strong><br>
        <strong>Parking:</strong> Up to <strong>$340/month</strong><br><br>
        These are separate limits — you can elect up to $340 for each simultaneously, for a combined pre-tax maximum of <strong>$680/month</strong>.<br><br>
        Unused balances roll over as <strong>Flex Funds</strong>, so there's no pressure to spend everything in a given month.<br><br>
        💡 <em>Most UCSF employees elect only what they need (e.g., $332 for a monthly parking permit), which keeps it clean and predictable. If your commute costs vary month to month, Flex Funds let the balance accumulate and cover heavier-use months without re-enrolling.</em>`,
        action: null
      },
      {
        q: 'When will my Edenred funds be available?',
        a: `Edenred follows a <strong>two-month cycle</strong> — plan accordingly:<br><br>
        <strong>Order deadline:</strong> 23rd of each month<br>
        <strong>Payroll deduction:</strong> Following month's paycheck<br>
        <strong>Funds available:</strong> First of the month after deduction<br><br>
        <strong>Example:</strong> Order placed by July 23 → deducted from August paycheck → available September 1<br><br>
        The same cycle applies to changes in your deduction amount — update by the 23rd for it to take effect two months out.<br><br>
        💡 <em>New to Edenred? The two-month delay catches a lot of people off guard. If you're starting a new permit in October, set up Edenred in August so funds are ready when you need them. The $3 fee only applies in months with an active order, so there's no cost to setting it up early.</em>`,
        action: null
      },
      {
        q: 'Does UCSF support vanpools?',
        a: `Yes — in partnership with <strong>Commute with Enterprise</strong>. Vanpools are one of the most cost-effective commuting options for employees who live in the North Bay, South Bay, or East Bay.<br><br>
        <strong>Requirements:</strong> Minimum 4 riders; participants are encouraged to drive at least once per week<br><br>
        <strong>What UCSF covers:</strong> 25% subsidy per vanpool + free reserved parking at UCSF garages<br>
        <strong>What MTC covers:</strong> Additional $600 subsidy. County-specific subsidies available in Contra Costa, Marin, San Mateo, Santa Clara, and Solano.<br><br>
        <strong>Average cost to participants: ~$155/person/month</strong> — this includes the vehicle, insurance, maintenance, fuel, tolls, AND parking. Compare that to $332/month for a parking permit alone, and the savings are significant.<br><br>
        💡 <em>If you live in the suburbs and are paying $332 for parking plus $150–300 in gas and tolls, vanpooling could save you $300–500/month. Vanpool funds are also eligible for Edenred pre-tax benefits, stacking the savings further.</em>`,
        action: { label: 'Ask About Vanpool Options', form: 'rideshare' }
      },
      {
        q: 'What is the UCSF Uber Shuttle?',
        a: `UCSF has partnered with Uber to provide <strong>reserved seats on Uber's commuter shuttle buses</strong> for UCSF employees — this is not the standard Uber ride-hailing service.<br><br>
        <strong>Currently available for:</strong> Mission Bay commuters from the North Bay, South Bay, and East Bay<br>
        <strong>Expansion planned:</strong> Parnassus service is under consideration but not yet active<br><br>
        The Uber Shuttle is eligible for Edenred pre-tax commuter benefits (as an employer-sponsored shuttle service), which reduces your out-of-pocket cost.<br><br>
        For enrollment and route details, visit the program page through Campus Life Services Transportation.<br><br>
        💡 <em>This program is particularly useful for employees commuting from the East Bay who find BART-to-shuttle connections unreliable during peak hours. A dedicated commuter shuttle is often faster and more predictable.</em>`,
        action: null
      },
      {
        q: 'How do I set up my Edenred account?',
        a: `Access to the Edenred portal typically becomes available <strong>2–6 weeks after your UCSF hire date</strong>. You'll receive instructions from HR or through the UCSF onboarding process.<br><br>
        <strong>Once active, you can:</strong><br>
        • Set your monthly transit and/or parking deduction amount<br>
        • View your card balance and transaction history<br>
        • Update elections (changes take effect after the 23rd of the month)<br><br>
        If you're past the 2–6 week window and haven't received access, or if you're a long-tenured employee who's never enrolled, reach out to Transportation Services for guidance.<br><br>
        💡 <em>Don't wait until you "need" it to set it up. The two-month funding cycle means early setup prevents gaps in coverage. If your permit renews January 1, enroll in November.</em>`,
        action: { label: 'Contact Transportation Services', form: 'rideshare' }
      },
      {
        q: 'What happens to my Edenred funds if I leave UCSF?',
        a: `<strong>Unused pre-tax commuter funds are forfeited upon separation</strong> from UCSF and returned to the University. These funds cannot be refunded to you as cash.<br><br>
        This is an IRS requirement for pre-tax commuter programs — the funds are earmarked for commute expenses only, and once your employment ends, you're no longer incurring eligible expenses.<br><br>
        💡 <em>If you know you're leaving UCSF, wind down your Edenred elections before your last day. Reduce or cancel your future-month elections to minimize the balance at the time of separation. Remember the two-month cycle — changes need to be made well in advance to take effect before your last paycheck.</em>`,
        action: null
      },
    ]
  },
  {
    cat: 'Bikes & Programs',
    articles: [
      {
        q: 'Does UCSF provide secure bike storage?',
        a: `Yes — UCSF operates <strong>secure, badge-access bike cages</strong> at all major campuses:<br><br>
        • Parnassus Heights<br>
        • Mt. Zion<br>
        • Mission Bay<br>
        • ZSFGH Priede Hall<br><br>
        A <strong>no-cost bike permit</strong> is required for badge access. You can apply through the biking page on the UCSF Transportation website — approval is typically straightforward.<br><br>
        Standard bike racks (outdoor, unsecured) are also available at most UCSF buildings for shorter visits.<br><br>
        💡 <em>Bike cages are genuinely one of the best-kept secrets in UCSF commuter benefits. Free, secure, covered storage — especially valuable for higher-end bikes. If you're biking to campus even occasionally, getting the permit is worth the 5-minute application.</em>`,
        action: { label: 'Request Bike Program Access', form: 'bike' }
      },
      {
        q: 'Is there a Park and Ride program?',
        a: `Yes — Park and Ride lets you drive part of your commute and connect to the UCSF shuttle or transit for the last leg. It's especially useful for Parnassus commuters who can't get a campus permit.<br><br>
        <strong>Locations:</strong><br>
        • Japan Center (Western Addition — close Muni/shuttle access)<br>
        • Music Concourse (Golden Gate Park — near Parnassus shuttle stops)<br>
        • 5th and Mission (Downtown SF — central BART/Muni connection)<br>
        • UCSF Buchanan Dental<br><br>
        Parking at these locations is eligible for Edenred pre-tax benefits.<br><br>
        💡 <em>Music Concourse is a popular choice for Parnassus employees — it's a short shuttle ride from campus, parking is less expensive than on-campus, and the surrounding area is significantly less congested than Parnassus itself. Many employees find it less stressful than the morning ACC Garage scramble.</em>`,
        action: null
      },
      {
        q: 'How are transportation changes communicated?',
        a: `UCSF Transportation uses a tiered communication system based on urgency:<br><br>
        <strong>Flash Communications (urgent):</strong> Email and/or text alerts for immediate action items — shuttle detours, garage closures, emergency road conditions. Sent as close to real-time as possible.<br><br>
        <strong>Transportation Digest (routine):</strong> A regular newsletter covering policy updates, program changes, event impacts, and operational news. Less frequent, more informational.<br><br>
        <strong>UCSF Mobile App:</strong> Real-time shuttle tracking and service alerts — the best tool for day-of travel decisions.<br><br>
        💡 <em>If you commute regularly, subscribing to Flash communications is worthwhile — even one heads-up about a Warriors game congestion alert can save you significant frustration. You can opt in through the Transportation website.</em>`,
        action: null
      },
      {
        q: 'Does UCSF support carpools?',
        a: `Yes — UCSF offers <strong>discounted parking permits</strong> for employees who carpool. If you and a colleague both commute from a similar area, a carpool permit may be one of the most straightforward ways to cut commuting costs.<br><br>
        Carpool details, eligibility, and the signup process are available on the Transportation carpool webpage.<br><br>
        💡 <em>Carpooling pairs particularly well with Edenred pre-tax benefits — you can use Edenred to cover your share of a carpool parking permit, reducing your effective cost further. Even splitting a $332 monthly permit with one other person drops the per-person cost to $166 before the pre-tax benefit kicks in.</em>`,
        action: { label: 'Ask About Carpool Options', form: 'rideshare' }
      },
      {
        q: 'How do I contact Transportation Services?',
        a: `<strong>Email:</strong> <a href="mailto:Transportation@ucsf.edu">Transportation@ucsf.edu</a> — best for permit requests, refunds, or anything that benefits from a written record<br><br>
        <strong>Phone / Shuttle Dispatch:</strong> (415) 476-GOGO — best for urgent shuttle issues, lost and found, or real-time questions<br><br>
        <strong>Business hours:</strong> Monday–Friday, 8:00 AM–5:00 PM (excluding UCSF holidays)<br><br>
        After hours, the UCSF Mobile App and Transportation website are your best resources for self-service information.<br><br>
        💡 <em>For anything involving a permit change, citation, or refund — email is strongly preferred over a phone call. It creates a paper trail, gives the team time to research your specific situation, and typically results in a more accurate response than a front-line call center agent can provide in the moment.</em>`,
        action: { label: 'Submit a General Transportation Inquiry', form: 'general' }
      },
    ]
  }
;

export default TRANSPORT_KB;
