# Home Space Product Requirements Document

**Status:** Draft v1 for product and engineering review  
**Date:** October 25, 2026  
**Primary device:** Mobile phone  
**Platforms:** iOS and Android phone apps, supported by a responsive companion web app  
**Planning scope:** Full product specification with a scoped MVP build and separate demo scope  
**Initial assumptions:** English language, US pilot, one household organizer managing multiple storage locations; validate before implementation  
**Working promise:** Know what you own, where it is, where to store it, what it is worth, and what to do with it.

## 1. Product summary

Home Space is a mobile-first visual inventory and decision assistant with its own trading community. It serves households with belongings spread across garages, attics, crawl spaces, closets, storage units, and multiple homes. A user can photograph an item where it is already stored or start by photographing something they are about to put away. The app proposes what the item is, confirms an existing location or recommends a destination, records its condition and age, estimates a resale range when possible, asks about sentimental value, and captures expiration or maintenance dates. It then helps the household find, use, sell, trade, donate, recycle, or safely dispose of the item.

The phone is the primary device for everyday use: capture, storage confirmation, retrieval, cleaning, alerts, and community exchanges must work without a desktop. The web app complements the phone with larger-screen review, bulk editing, reports, and label preparation. Home Space creates and operates its own community, where users can join or create local groups, post available or wanted items, discover matches, exchange messages, make offers, and confirm handoffs. Community participation is separate from access to private household inventory.

The app also generates a **Household Items Report for Insurance** from the saved inventory, so users can document belongings before a fire and retrieve that evidence afterward even if their original phone is lost.

When putting something away, the app recommends storage locations based on where similar or related belongings are already stored. For example, it can suggest keeping tent stakes with the tent and camping equipment, even though those objects belong to different item categories.

An optional house map can be built from available blueprints or floor plans found with the user's permission, an uploaded plan, or a manually created layout. The app identifies candidate rooms and storage areas for review, then uses the confirmed map alongside capture context to suggest where an item is being stored or where it could go.

With community matching enabled in the community release, the same capture can reveal that someone has an active request for an item like this. The app presents the potential match and available value information before the user decides whether to store, offer, or trade the item.

The product's distinctive idea is **a household memory assistant that helps people finish small organizing tasks**. Its recurring value comes from finding things, avoiding duplicate purchases, preserving meaningful stories, and reclaiming usable space. The user should get value from one photographed box without first cataloging an entire home.

The first release should prove a complete loop on a phone: **capture → confirm → find → decide → complete an action**. Keep AI identification, assisted date reading, and evidence-backed valuation in the pilot at a narrow, testable scope. The Home Space trading community is a committed product pillar, delivered in a later planned release after the inventory foundation and community operating controls are ready.

## 2. Problem and opportunity

The problem hypothesis is that people with many stored belongings buy duplicates, lose useful things, miss important dates, overlook resale opportunities, and postpone cleaning because the task feels too large. Home Space should make capture fast enough for a real garage cleanup and turn the inventory into small, achievable actions. Validate the frequency and cost of these problems in household interviews.

### Primary users

| User | Job to be done | Important constraint |
| --- | --- | --- |
| Pack-rat household | Find and manage stored items without cataloging everything by hand | Capture must work in cluttered spaces |
| Family organizer | Coordinate shared belongings across people and locations | Roles, privacy, and edit history |
| Reseller or declutterer | Identify items worth selling and prepare listings | Pricing is an estimate, not a guarantee |
| Caregiver or estate organizer | Sort another person's belongings respectfully | Sentimental context and delegated access |
| Multi-property owner | Know which home or storage unit holds an item | Reliable location hierarchy |

**First customer:** a household organizer with belongings spread across a garage, closets, an attic or crawl space, or a storage unit, who wants to find things and make space gradually. Resellers, professional estate services, and commercial inventory are secondary segments. The app supports organization; it does not diagnose or treat hoarding disorder. Product language should avoid shame and pressure.

### Competitive context

Photo catalogs and QR labels are established features. [Sortly](https://www.sortly.com/solutions/home-inventory-software/) describes photos, locations, labels, and date alerts. [Itemtopia](https://www.itemtopia.com/) describes inventory, memories, reminders, and offline use. [HomeZada](https://www.homezada.com/homeowners/home-inventory/) describes AI photo recognition and inventory value summaries. These official pages were reviewed on October 25, 2026.

**Differentiation hypothesis:** combine reliable location history, optional sentimental context, and short cleaning tasks that reach completion. The opportunity is the quality of this complete experience; the reviewed pages do not establish that competitors lack individual features.

### Outcomes

1. Find an item quickly, including its container and last confirmed location.
2. Capture a room, shelf, or box with minimal typing.
3. Surface timely actions: expiring, potentially hazardous, valuable, forgotten, or good sale/trade candidates.
4. Make spring cleaning feel like a series of short missions rather than a single large project.
5. Protect sensitive inventory details and preserve trust in AI suggestions.
6. Recommend a place to store an item near similar belongings or things used together, with an explanation and user confirmation.
7. Surface relevant community wanted requests and potential value while the user is deciding whether to put an item into storage.
8. Reduce location setup and selection effort by turning verified house plans into a usable storage map.
9. Prepare and retrieve a documented household inventory for insurance claim preparation after a fire.

## 3. Product principles

- **Phone first.** Design and validate everyday workflows on a mobile phone; a desktop is never required to complete the core experience.
- **Photo first, confirmation always.** AI proposes; the user confirms consequential details.
- **Location is a hierarchy.** Property → optional building and floor → area → container → shelf or spot, with a last-confirmed date.
- **Private by default.** Item photos, exact locations, values, and sentimental notes are not public.
- **Action beats accumulation.** Every dashboard insight should lead to a concrete next step.
- **Safety is a core feature.** Hazard alerts and protected-item controls are available in the free tier.
- **A value range is not an appraisal.** Show evidence, freshness, and confidence when estimating resale value.
- **Keep is a valid outcome.** Sentiment is optional; “skip,” “unknown,” and “decide later” are supported states. No guilt scores or automatic disposal decisions.
- **Incomplete is useful.** A box can be saved as “contents not fully cataloged.” Never imply that unrecorded items have been inspected.

## 4. Core experience

### 4.1 Set up locations

The user creates one or more properties and areas such as “Main house / garage / north wall / blue bin.” They may print or display QR labels for bins and shelves. The first release uses selected locations and QR scans; a scan identifies a container's recorded location and does not prove that the container has not moved. Moving a container updates the location path of its contents. Visual room recognition is a later suggestion feature that always permits correction.

#### Optional house plans and storage map P1

Offer **Find my house plans**, **Upload a floor plan**, and **Create a room map**. Address-based discovery requires the user to confirm the property/unit and authorize the lookup. Search supported building-record portals, licensed plan sources, or documents the user explicitly supplies. Show each candidate's source, plan date/version if known, property match, and access requirements. Confirm the exact unit and layout before import; a nearby address or similar builder model is not proof of a match.

Plan availability and copying permissions are source-specific. For example, San Francisco's building-record instructions describe approvals needed to reproduce plan sets. Discovery must support “not found,” “permission required,” and “request pending,” with upload/manual setup always available; it must not promise nationwide coverage or instant retrieval. Requests to a third party, payments, or account connections require a separate explicit user action. [San Francisco building record requests](https://sfdbi.org/records).

Read supported PDF/image plans to propose buildings, floors, room boundaries, and labels, including possible garages, closets, storage rooms, attics, or crawl spaces where shown. The user confirms the current layout and marks which areas may actually be used for storage. Keep missing rooms and uncertain labels unresolved. Movable shelves and bins are added by the user and linked to a room; they are not invented from an architectural drawing. Distinguish floors and separate buildings even when room names repeat.

Record source provenance, plan version, and the last layout confirmation. Users can rename areas, correct boundaries, add renovations, and retire obsolete maps. Replacing a plan proposes a mapping to existing location IDs; it must not silently move items or erase their history. A plan describes layout, not available capacity, current environmental conditions, accessibility, or storage safety.

#### Use the map during capture P1

Link current reference photos and QR-labeled storage spots to confirmed map areas. Visual context from a capture may suggest a room; a scanned label identifies its recorded spot. Present the evidence and a confirmation such as “This appears to be the ground-floor garage. Confirm location?” A close-up item photo or the floor plan alone cannot establish the camera's room, floor, or exact bin. If evidence is absent, stale, or conflicting, ask the user to select a room or scan a label.

Keep **Suggested current location** distinct from **Recommended destination**. Only a user-confirmed location/placement updates the inventory. The map can propose an eligible storage area even before it contains related items, but must explain that the suggestion comes from the confirmed layout rather than existing belongings.

### 4.2 Capture items

Offer two starting options on mobile and web:

- **Catalog stored items:** choose or scan the current location, then photograph an item or container already there.
- **Store an item:** photograph the item first, confirm its identity, and receive storage suggestions before choosing a destination. No existing location is required to save the photo. If the household has no locations or related inventory yet, offer to create a location or keep the item awaiting placement.

The app proposes a name/category, reads a separately framed label when needed, and asks for only missing information. A quick-capture mode saves the photo and any confirmed location immediately, then places uncertain details in a review queue. “Saved” and “AI analysis complete” are separate states. Users can add multiple photos, receipts, serial numbers, dimensions, condition, purchase date, and notes later.

For a crowded shelf, the first release saves the whole photo as a container reference without claiming to identify every object. Later batch capture lets users accept, split, merge, or reject candidate items. The user can mark a capture as protected before it is uploaded or sent for AI analysis.

### 4.3 Understand and decide

Each item card shows its location, last confirmation, estimated resale range if available, sentimental importance or private story, relevant dates, and suggested action. Ask “How important is this to you?” with optional choices: little attachment, meaningful, irreplaceable, or skip. This is distinct from money and never converted into dollars. Irreplaceable items are excluded from proactive sell/donate suggestions unless the user changes that preference.

Suggested actions include keep, use soon, move, sell, trade, donate, recycle, dispose safely, or decide later. Selecting “donate” creates an open task; only confirming that the item left the home changes active inventory and space-reclaimed totals. Users may dismiss or snooze any non-urgent suggestion.

### 4.4 Find and act

Search accepts names, categories, photo similarity, location, and natural phrases such as “the camping stove in the garage.” Results show a retrieval path and a photo of the container or shelf. A cleaning mission can target an area, 15-minute time window, item category, or goal such as “clear one shelf” or “find $100 of sale candidates.”

The first release supports text, categories, tags, and location filters; photo similarity and conversational search follow later. A mission asks for time, energy, and a practical goal, then offers up to five actions. Users can exclude lifting or hard-to-access areas, pause, undo, and resume. The end screen records actual outcomes such as “one shelf cleared” or “three items relocated,” without estimating precise space from a photo.

### 4.5 Choose where to store an item

During capture or a move, offer up to three existing storage locations containing similar items or items used for the same activity. Explain each suggestion using accessible inventory evidence: “Garage / Blue bin — your tent and other camping gear are stored here.” Let the user choose a suggestion, select another location, create a new one, or skip.

The MVP matches confirmed categories and shared activity tags within the selected property. These are proposed destinations, distinct from the item's last confirmed location. Choosing a destination creates a pending placement; the location and history change only after the user confirms that the item was physically stored there. An item without a confirmed location shows “Awaiting placement.” Users can cancel a pending placement or undo a confirmed move. If there is no useful match, offer manual selection without inventing a recommendation.

Use only active inventory and locations the user may access; exclude protected records from ordinary suggestions, explanations, and ranking. Mark stale supporting locations for verification. Apply known storage restrictions before ranking and do not infer available space or safe compatibility from similarity. The MVP does not suggest destinations for items flagged as potentially hazardous; those enter the existing hazard-review flow. Users confirm fit and suitability before placement.

### 4.6 Check community interest before storing

In the community release, users who enable matching can see two independent results after confirming the photographed item: **Suggested storage** and **Community interest**. Match against active wanted requests in communities the user has joined, using category, model where known, condition requirements, and the selected broad area. Show why each request may fit and any details still needing confirmation.

The community card presents a sourced resale estimate when available, the requester's stated budget if provided, or what they are willing to trade. Keep these distinct. A match or budget is not an actual offer, and barter interest does not imply a cash value. If there is no reliable estimate or stated budget, show the interest without inventing a monetary amount.

The user can continue storing, view a request, prepare an offer, or dismiss the suggestion. Matching never publishes the item or notifies a requester. Sharing and contact require an explicit reviewed action. Storage remains available when matching is disabled, offline, unavailable, or has no matches; a failed check must not be reported as “Nobody wants this.”

### 4.7 Household Items Report for Insurance

From the phone or companion web app, choose a property and inventory scope, review missing details, preview the report, and generate a dated PDF with an optional CSV and evidence archive. The basic report is available in the free tier. Users can prepare it before a fire or retrieve the latest saved report afterward. Generating or downloading the report never submits an insurance claim or sends it to an insurer automatically.

Include household/property identification as selected by the user, report version, generation time, inventory cutoff/last sync, and an itemized list grouped by room or storage area. Each line includes available description, category, quantity, brand/model, serial number, purchase date or estimated age, pre-loss condition, photos, receipts, appraisal documents, and evidence references. Identify missing, user-entered, estimated, and reconstructed information explicitly. The source inventory may be incomplete; the report must not imply every household possession was recorded.

Keep purchase cost, estimated replacement cost, resale estimate, and documented appraisal as separate fields with currency, source, and date. For the MVP, replacement costs may be entered manually with supporting evidence; the report does not depend on automatic replacement-price research. Unknown values remain unknown, not zero. Summaries use one value basis and currency at a time, show the number of valued items, and avoid counting both a container's contents and a container total. The report supports claim preparation and does not determine coverage or reimbursement.

Save each generated report as a read-only snapshot while retained, with its selected item/evidence versions. Corrections create a new linked version. A report created after a fire retains its actual creation time and cannot be backdated as pre-loss evidence. P1 adds a post-fire supplement with incident date, user-reported damaged/destroyed/missing/unaffected/unknown status, notes, and new evidence; it preserves the original inventory and does not assume every recorded item was destroyed. Items kept off-site or lent out remain clearly distinguished from items at the affected property.

Vault items are excluded by default. Including them requires fresh authentication, item-by-item selection, and a preview of photos, documents, values, and location detail. Reports and evidence packages containing protected content inherit vault access controls. If an item is later protected, restrict stored snapshots containing it to vault access without rewriting their historical contents; previously exported external copies cannot be recalled. Omit sentimental notes, precise hiding places, and floor plans by default; users control the necessary property and room detail before export. Reports contain no advertisements.

Offer an explicit save/export action to a user-chosen destination outside the home, with no automatic sharing. Synced reports must be retrievable on a replacement phone or the companion web app after account recovery; protected content still requires vault recovery. Show whether the report and evidence are fully synced or only on the original device. Previously downloaded files remain available offline. Retention and deletion follow the household's data controls.

This report design follows NAIC home-inventory guidance to organize possessions, retain photos and purchase/appraisal evidence, record identifying details, and keep an accessible copy. [NAIC home inventory guidance](https://content.naic.org/consumer/homeowners-insurance.htm).

## 5. Functional requirements

Priority: **P0** = first release, **P1** = next release, **P2** = later planned release. Exploratory ideas are explicitly identified in the roadmap; the Home Space trading community is planned scope.

| ID | Priority | Requirement | Acceptance criterion |
| --- | --- | --- | --- |
| MOB-01 | P0 | Complete the core inventory experience on a mobile phone | On supported iOS/Android phones, users can onboard, photograph, review, place, find, edit, run a cleaning sprint, unlock the vault, and manage their plan without a desktop |
| MOB-02 | P2 | Complete community participation and exchanges on a mobile phone | Users can join/create a group, post available/wanted items, review matches, message, offer, confirm a handoff, and report/block from the phone |
| INV-01 | P0 | Create properties, areas, containers, and spots; move items between them | An item can be located and moved without losing its location history |
| INV-02 | P0 | Add an item from mobile camera or web upload | A user can save a photo and any confirmed location in under 30 seconds in a usability test; missing location does not block saving |
| INV-03 | P0 | Suggest item name and category from photos; allow correction | Every AI field is editable and uncertain suggestions are visibly marked |
| INV-04 | P0 | Save multiple photos, quantity, condition, tags, and notes | An item can represent one object or a quantity of identical objects |
| INV-05 | P0 | Search and filter by item, category, location, and status | Results include last confirmed location and timestamp |
| INV-06 | P0 | Identify a saved container using a QR label | User confirms its storage path; moving the container updates its contents without duplicate records |
| INV-07 | P1 | Batch capture multiple objects in one photo | User can split, merge, or discard proposed item cards |
| INV-08 | P0 | Save containers with incomplete contents | Uncataloged contents are explicit; item and container counts are not added together |
| INV-09 | P1 | Suggest a current location from visual context and a confirmed map when available | Show supporting reference/label evidence; ambiguous rooms or floors require selection; a suggestion never silently overwrites the confirmed location |
| INV-10 | P0 | Start with an item photo before choosing where to store it | Save as awaiting placement, suggest existing suitable locations when evidence exists, and support creating a first location or deciding later |
| STORE-01 | P0 | Recommend storage locations containing similar or related items | Show up to three locations with category/activity reasons; allow another choice or skip; preserve the current location until placement is confirmed; return no suggestion when evidence is insufficient or restrictions exclude candidates |
| PLAN-01 | P1 | Discover available house plans with permission, or import a user-supplied floor plan | Confirm property/unit and source access; show provenance and unavailable/permission-required states; retain manual location setup |
| PLAN-02 | P1 | Convert a plan into editable buildings, floors, rooms, and candidate storage areas | User reviews current layout and storage eligibility; uncertain regions stay unresolved; new plan versions preserve existing location IDs/history through explicit reconciliation |
| PLAN-03 | P1 | Use confirmed map areas for location suggestions and storage recommendations | Distinguish current-location inference from a proposed destination; apply access/storage restrictions; require placement confirmation; do not infer room or bin from a close-up item image alone |
| VAL-01 | P0 | Ask for a private sentimental rating and optional story | Sentimental data is never included in listing drafts or public profiles by default |
| VAL-02 | P0 | Show evidence-backed resale ranges for one or two supported categories | Range includes currency, region, condition assumptions, comparable count, source type, and date; unsupported items show “No reliable estimate” |
| VAL-03 | P1 | Refresh stale estimates and flag likely high-value items for review | The user can manually override and annotate the estimate |
| DATE-01 | P0 | Record expiration, warranty, and maintenance dates manually | User can choose reminders or turn them off |
| DATE-02 | P0 | Read a user-framed date label with OCR | User confirms the date and its type; ambiguous dates stay in review and create no automatic expiration reminder |
| CLEAN-01 | P0 | Build short cleaning missions and a decision queue | User can complete, skip, or snooze each item without losing progress |
| CLEAN-02 | P1 | Offer seasonal plans, such as spring cleaning | Plan proposes rooms and tasks based on inventory age, deadlines, and user goals |
| DASH-01 | P0 | Show counts by location, category, and time since last confirmed | Dashboard distinguishes “time in storage” from “time owned” |
| DASH-02 | P0 | Show expiration, quality dates, and other deadlines in separate groups | Views distinguish confirmed expiration from best-before, unknown, and unverified dates |
| DASH-03 | P1 | Show unused, duplicate, and sale/trade candidates | Each insight opens the supporting item list and action |
| SAFE-01 | P0 | Protect sensitive items with a separate vault | Reopening requires the platform-appropriate authentication in section 7; all protected details are hidden outside it |
| SAFE-02 | P0 | Track hazard categories, quantities, and storage areas | User can review possible concentrations and open relevant safety guidance |
| SAFE-03 | P1 | Prompt periodic review of aging batteries, chemicals, fuels, and similar items | Alerts avoid claiming a location is safe or unsafe from a photo alone |
| SAFE-04 | P1 | Match supported products to official recall records | Match requires product identifiers; possible matches require review and show the official notice |
| SHARE-01 | P1 | Invite household members with owner, editor, and viewer roles | Owner can restrict access to specific locations and the vault |
| SELL-01 | P1 | Generate an editable sale listing draft from item details | No listing is published without explicit user action |
| SELL-02 | P2 | Surface local availability gaps and possible marketplace demand | Feature appears only where listing data can be obtained through permitted methods; uncertainty is shown |
| TRADE-01 | P2 | Opt selected items into Home Space's own local trading community | Explicit community-visible item snapshots are separate from private inventory; exact home location remains hidden |
| TRADE-02 | P2 | Support offers, negotiation, and completion feedback | Users can block/report others; moderation and abuse controls are in place |
| TRADE-03 | P2 | Create and maintain community wanted requests | Requests contain item criteria, broad area, optional budget/currency or trade interests, and an expiry; fulfilled, withdrawn, or expired requests are excluded from new matches |
| TRADE-04 | P2 | Match a newly photographed item to active wanted requests and show potential value | Show match reasons and freshness; distinguish resale estimate, stated budget, and actual offer; require explicit sharing/contact and keep private inventory unpublished |
| TRADE-05 | P2 | Create and join groups within the Home Space community | Group membership, invitations, and moderation roles are enforced independently of household permissions; joining a group grants no private inventory access |
| SYNC-01 | P0 | Save mobile captures offline and retry interrupted sync | Ten offline items survive app restart and sync into exactly ten records with intact photos |
| DATA-01 | P0 | Export and delete household records | Exports respect vault access; deletion removes active records and follows a disclosed backup retention policy |
| REPORT-01 | P0 | Generate a Household Items Report for Insurance from a phone or web app | Produce a previewed, dated PDF with optional CSV/evidence archive; show provenance, missing fields, scope, and separate value bases without calculating reimbursement |
| REPORT-02 | P0 | Preserve and recover insurance report snapshots after device loss | Fully synced reports remain accessible through authorized account recovery; protected exports require vault access and explicit selection; revisions preserve earlier snapshots while retained |
| REPORT-03 | P1 | Add a post-fire loss supplement | Record user-reported status and new evidence against selected items without altering the pre-loss snapshot, backdating records, or treating unassessed items as destroyed |
| BILL-01 | P0 public launch | Offer free with ads and an ad-free subscription | Purchase, restore, renewal, cancellation, and expiry produce consistent entitlements across mobile and web |
| ADS-01 | P0 public launch | Show labeled contextual ads in non-sensitive browsing areas | No ads interrupt capture, search, cleaning, date alerts, insurance reports, account recovery, or the vault; paid accounts receive none |

**Valuation dependency:** VAL-02 enters a real pilot only after access and data-use rights are confirmed for the chosen categories. A fixture can demonstrate the interface but must be labeled demo data. A manually entered price cannot count as validation of automatic valuation.

M0 must define category-specific minimum evidence counts, freshness limits, model matching, condition rules, and validation against reviewed sale evidence. An asking-price comparison alone does not satisfy VAL-02's resale-estimate requirement. If only asking prices are available, the product owner must explicitly revise the advertised capability and release scope before launch.

## 6. Dashboards and recommendations

The home dashboard should answer: **What needs attention this week? Where is my stuff? What can I reclaim?** Proposed cards:

- **Find it:** recently searched items, location map, and items whose location has not been confirmed recently.
- **Use it soon:** items nearing expiration, warranty end, or maintenance date.
- **Hidden value:** likely resale candidates, with estimated range and confidence.
- **Forgotten stuff:** items untouched for a chosen period, grouped by area and sentimental rating.
- **Duplicates:** likely duplicate tools, supplies, and household purchases.
- **Hazard review:** potential concentration by area and category, with quantity and age.
- **Space reclaimed:** items removed and containers or shelves cleared during missions.
- **Marketplace opportunity:** items that appear uncommon in a selected local marketplace, only when reliable and permitted listing data exists. Absence from search results must never be presented as proof of demand.
- **Community interest P2:** active wanted requests that may match the user's eligible items, with stated budgets or trade interests when available; separate from marketplace scarcity signals.
- **Insurance records:** last report date, sync/backup status, and missing photos, receipts, or identifying details for the selected inventory; a completion indicator measures documentation, not insurance coverage.

**Age definitions:** distinguish purchase/acquisition date, manufacture date, date first added to the app, last used date, and last location confirmation. Unknown dates remain unknown. “Not used in a year” requires use history or an owner confirmation; it cannot be inferred from the app's lack of activity. Show age groups such as under one year, one to three years, over three years, and unknown, with the selected date basis labeled.

**Value totals:** show the number of items with usable estimates, exclude protected items outside the vault, and keep purchase cost, replacement cost, resale estimate, and realized sale proceeds separate. Do not present an incomplete resale sum as the value of the whole household. Space reclaimed uses user-confirmed shelves, bins, or measured volume, not inferred square footage.

Recommendations should explain their reason (“Three unopened paint cans have been in the garage for two years”), present one action, and allow dismissal. They should never reveal protected items in notifications or shared views.

## 7. Valuable and hazardous items

### Protected vault

Users can mark jewelry, precious metals, gemstones, collectibles, documents, or any other item as protected. The default is complete exclusion from ordinary search, thumbnails, dashboard totals, activity feeds, notifications, public listings, and standard exports. Protection applies to API responses and photo downloads, as well as the screen. Users explicitly unlock the vault before viewing or exporting its contents.

Mobile unlock uses supported device authentication or a dedicated vault credential; web uses a passkey or dedicated vault credential. Proposed defaults are automatic locking on mobile backgrounding and after five minutes of inactivity on web. Credential attempts are rate limited. Recovery requires an established recovery factor or recovery code; a normal account password reset does not automatically unlock the vault. Explain recovery before the first protected item is saved.

Moving an existing item into the vault removes it from ordinary search indexes, derived recommendations, shared views, and caches, and revokes ordinary media access. Protected captures are excluded from external AI processing by default. An optional per-item analysis flow must explain what will be shared and require fresh authentication and explicit consent. No protected fields enter ads, analytics payloads, or application logs.

Protection also prompts review of linked shelf/container photos that may show the object or its location. Users can crop, redact, or protect that reference media. The service cannot guarantee finding the object in unrelated photos, or withdrawing copies already exported by another person. Selling and trading use the same sanitized-media pipeline.

MVP vault unlocking requires connectivity so session and device revocation can be checked. Protected captures may queue offline only in mandatory encrypted device storage, including temporary media, thumbnails, extracted text, and keys protected by platform facilities; otherwise protected offline capture is unavailable. Once locked, a queued protected item cannot be reopened until an online vault unlock. Ordinary offline search never includes protected records.

For the MVP, use encrypted transport and storage with separate access controls and encryption keys for protected data. Do not describe this as end-to-end encryption. Document key management, server access, recovery, and backup behavior before development. A security review and direct-URL access tests are release gates. Shared-household vault grants are an explicit later feature; household ownership alone must not expose another member's private vault.

A photo cannot authenticate a diamond, identify its grade, or establish gold purity. Support uploaded appraisals, certificates, and manually recorded values with their dates; do not generate jewelry appraisals from appearance.

### Hazard review

Potential hazard categories include batteries, paint, solvents, fuels, propane cylinders, pesticides, cleaning chemicals, medicines, and damaged electronics. The user records product type, label photo, quantity and unit, container condition, and location. The first release provides a hazard inventory and expert-reviewed prompts for supported categories. Broader compatibility and quantity rules follow after specialist review.

Aggregate only meaningful quantities with compatible units. “Four containers, volume unknown” is a useful review prompt; it is not proof of a dangerous concentration. Unknown quantities must never become zero. Do not combine battery counts, chemical volumes, and fuel weights into a universal danger score. Any threshold must identify the substance, storage conditions, source, jurisdiction, and rule version. Generic counts cannot establish that a space is safe.

Each alert includes the reason, confirmed inputs, missing information, source guidance, and an action such as checking the product label or contacting a local disposal service. The app does not recommend mixing, opening, decanting, or moving an unknown substance. A user report of an immediate problem, such as smoke or a leak, bypasses cleaning prompts and presents concise direction to appropriate local emergency services. Absence of an alert is never presented as a safety assessment.

EPA identifies several household product categories as potentially hazardous and emphasizes labels and local disposal guidance. This supports a cautious review workflow rather than image-based safety certification. [EPA household hazardous waste guidance](https://www.epa.gov/hw/household-hazardous-waste-hhw/).

### Date interpretation

Store the visible label text, parsed date, date precision, date type, and confirmation state. A label such as “03/04/27” requires clarification if the format is ambiguous. A missing year or unreadable label remains unresolved; lot and manufacturing codes are not silently converted into expiration dates. A generic product barcode does not establish the expiration date of a particular unit. Items with different dates are separate lots.

Distinguish expiration, best-before, sell-by, manufacture, opened-on, warranty, and maintenance dates. The label and relevant category guidance govern interpretation. USDA explains that common food quality dates do not themselves establish food safety; the app must not label every past quality date “unsafe” or apply that interpretation to medicines. [USDA food product dating](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-product-dating).

### Valuation evidence

Choose the pilot's one or two categories after checking provider coverage; identifiable branded tools and small electronics are candidate categories, not a commitment. Require a confirmed product match and condition before showing a range. Store evidence dates, source identifiers or links, geography, currency, comparable count, and whether evidence reflects asking prices or completed sales. Exclude obviously mismatched models and disclose thin evidence. Uncalibrated model confidence is not displayed as a precise probability.

Keep estimated resale value, purchase price, replacement cost, and an appraisal as separate records. Preserve manual overrides during refresh. If only asking prices are available, call the result an asking-price comparison. Do not call it an achieved resale value or mix it silently with sold evidence. Unknown model, unsupported category, missing condition, or insufficient comparables may produce “No reliable estimate.”

eBay's public documentation states that Marketplace Insights is restricted and not open to new users. Sold-price access is therefore a dependency to resolve, not an assumed free data source. [eBay marketplace API availability](https://developer.ebay.com/api-docs/buy/ref-marketplace-supported.html).

## 8. Selling and trading

**Selling flow:** choose an item → review condition and suggested range → redact private details → create title, description, and selected photos → user approves → copy/share or publish through an authorized integration if one becomes available. Selling suggestions should consider market value, effort to sell, sentimental rating, condition, and the user's preferences. “Worth selling” is a recommendation, not an automatic posting decision.

The first selling release exports a draft and selected photos for the user to post. Strip location metadata and offer crop/redaction review for visible addresses, documents, faces, and valuables in the background. External sale status is user-confirmed unless a permitted integration supplies it. A confirmed sale records proceeds separately from the earlier estimate.

Explain sale effort using an optional net-return calculation: expected proceeds minus estimated platform fees, shipping, and preparation cost. Costs and assumptions are editable; do not invent fees for an unselected platform. Prevent proactive resale recommendations for protected items, items marked irreplaceable, prohibited categories, or confirmed recalled products. Potential recall matches enter review.

**Facebook Marketplace gaps:** define this as “few similar listings observed in a named source, area, and time window.” Show query, coverage limitations, and observation time. Never claim an item is absent from all Facebook Marketplace inventory, or that scarcity proves demand. Do not plan unauthorized scraping: Meta's published explanation says automated collection requires permission. Native integration and automated coverage remain unverified dependencies, with a permitted manual research link as the fallback. [Meta on automated collection](https://about.fb.com/news/2021/04/how-we-combat-scraping/amp/).

**Home Space trading community:** Home Space creates and operates the community inside its own mobile app and companion web experience. It includes member profiles, local groups, available-item posts, wanted requests, matching, in-app messaging, offers, and handoff confirmation. Facebook Marketplace and other external channels remain separate optional selling integrations; they are not dependencies for this community.

**Trading flow:** users opt individual items into a community-visible trade profile. A trade card exposes only chosen photos, broad area, condition, and interests. The app can suggest trades based on complementary needs, for example “unused camping gear for gardening tools.” An offer workflow records terms and the local handoff plan. Community launch requires reporting, blocking, moderation, scam detection, and rules for prohibited goods. It is a planned release with readiness gates for participation and trust operations.

Start with invitation-only local groups, such as a building or hobby club. Include gifting and wanted posts so every exchange need not find an exact reciprocal swap. The initial community supports local handoffs; payments, escrow, shipping, and multi-party swaps are outside that release. Store offers as proposed, accepted, canceled, or completed. Acceptance reserves the item and prevents simultaneous accepted offers. Completion requires confirmation; unresponsive offers expire without changing ownership.

Users can create groups or join through the group's invitation process. Group administrators manage membership and community rules, while Home Space retains platform moderation and reporting controls. Neither membership nor an administrator role grants access to household records, floor plans, or protected items. Messaging is user-initiated and follows the existing reviewed-sharing rules; a capture or match does not start a conversation automatically.

The owner confirms that the handoff occurred and the recipient acknowledges receipt. Community completion requires both; a mismatch enters a disputed state. Until resolved, the item cannot receive another accepted offer or acquire a new owner in the community record. Accepted offers record an agreed handoff deadline; passing it prompts cancellation or extension rather than automatically releasing a possibly transferred item. Either party can cancel before a reported handoff, with notice to the other. The owner may separately mark the private item missing or physically handed off while a dispute is reviewed.

Members must be adults under the proposed launch policy. Provide report/block controls, rate limits, moderator review queues, and a documented dispute process. Prohibit weapons, medicines, recalled products, and hazardous materials in the initial community policy. Keep chat and listing access separate from private household access. A recipient receives only a new, explicitly shared item record after a transfer; prior locations, private notes, and sentimental history are not transferred automatically.

**Wanted requests and capture matching:** requesters specify the item/category, optional model, acceptable condition, broad area, budget and currency or desired trade, and expiration date. Requests can be active, fulfilled, withdrawn, or expired. Match only requests visible to the owner in joined communities, excluding blocked participants. Display request date and last validation time, and recheck status before an offer is sent.

Private matching is an optional setting and can be disabled. Exclude protected items, items marked irreplaceable, prohibited goods, and confirmed recalled items from proactive matches; possible recall matches enter review. Do not send the owner's photo, exact location, or identity to requesters during matching. A user who chooses to offer an item reviews the selected public fields and sanitized photos before sharing or contacting anyone.

**Illustrative value card, not live market data:** “Someone in your camping group is looking for a two-person tent. Their stated budget is $40–$60.” If supported resale evidence exists, display its range separately with source and date. An actual offer appears only after the requester makes one. Do not add these amounts together or call the requester's budget guaranteed proceeds.

## 9. Monetization

| Tier | Proposed experience |
| --- | --- |
| Free | Core inventory, search, reminders, cleaning missions, protected vault, hazard review, and basic Household Items Report for Insurance; clearly labeled ads in non-sensitive surfaces |
| Plus subscription | Ad-free experience, with optional convenience benefits to test such as larger media storage, household collaboration, and advanced reports |

The primary subscription promise is **no ads**. Safety alerts, access to one's own inventory, export, and protection of valuables should not depend on payment. Ads must not appear inside the vault, hazard/date alerts, capture, search, or cleaning missions. Use clearly labeled contextual placements in general browsing areas, without using private inventory, photos, sentiment, exact location, or inferred household wealth for targeting. Sponsored content cannot determine safety or sell/keep recommendations.

**Pricing experiments, not approved prices:** test a household plan at $4.99 versus $7.99 per month, plus an annual option after measuring willingness to pay. AI-processing and photo-storage allowances remain to be set from measured usage. If a free allowance is exhausted, keep existing items readable and searchable, and explain the limit before new processing or uploads. Subscription cancellation must not lock the vault or remove inventory; a downgrade preserves existing records.

Track monthly contribution per household as subscription revenue after fees and refunds plus ad revenue, minus AI, media storage, delivery, support, and moderation costs. Measure the entire free/paid population, not paid users alone. Do not assume ad income will fund unlimited photo analysis. Mobile and web share account entitlements, restore-purchase behavior, and the same transparent plan status.

## 10. New ideas worth testing

| Idea | Why it could matter | Earliest phase |
| --- | --- | --- |
| **Keep the story** | Save a voice note, photo, and family story when the owner chooses to let an object go; preserve the memory after it leaves | P1 |
| **Maybe box** | Put undecided objects in a real labeled box with an optional revisit date; keep and snooze remain valid choices | P0 basic / P1 richer |
| **Check before buying** | Search a shopping list against owned items and near substitutes to avoid unnecessary purchases | P1 |
| **Space budget** | Let users allocate a chosen shelf or bin to a hobby and decide what fits; avoid shame scores or photo-derived volume claims | P1 |
| **Borrow before buy** | Show a trusted household or neighborhood item that could be borrowed before buying a duplicate | P2 |
| **Insurance and emergency records** | Prepare the Household Items Report for Insurance and retain accessible evidence; add post-fire loss supplements in P1 | P0 report / P1 supplements |
| **Move mode** | Print box labels, scan boxes at a new property, and flag missing items | P1 |
| **One photo, one shelf** | Turn a shelf photo into a review queue for rapid cataloging and spring cleaning | P1 |
| **Family handoff** | Give a trusted person a controlled inventory view for downsizing or estate planning | P2 |
| **Use-it challenge** | Suggest using an owned tool, ingredient, or hobby supply before buying another | P1 |
| **Exit routes** | Recommend donation, recycling, repair, or disposal options based on item type and local availability | P2 |
| **Confidence map** | Show which rooms and boxes have been photographed recently and which inventory areas may be stale | P1 |
| **Lending ledger** | Record who borrowed an item and a mutually agreed return date; prevent a loan from appearing as a missing object | P1 |
| **Project kits** | Link supplies for a camping trip, repair, or hobby project across storage areas; show what is already owned | P2 |
| **Recall watch** | Match confirmed brand/model details to public recall records and prompt a review | P1 |

Recall watch has a potential official data source: CPSC publishes a recall API. Matching must still account for model numbers, affected dates, and incomplete identifiers; no match is not a safety guarantee. [CPSC recall API](https://www.cpsc.gov/Recalls/CPSC-Recalls-Application-Program-Interface-API-Information).

## 11. MVP scope and release plan

**MVP (P0):** account and onboarding; location hierarchy with QR labels; single-item and container photo capture with both catalog-stored and photograph-before-storage entry options; editable AI item suggestion; storage recommendations from existing categories/activity tags; supported-category valuation with evidence; framed-label OCR and confirmed dates; optional sentiment; search; short cleaning missions and pending exit tasks; basic dashboards; protected vault; basic hazard inventory; offline mobile capture; responsive web review; Household Items Report for Insurance with recoverable snapshots; export and deletion. The first public release adds restrained ads and a functioning ad-free subscription.

**Next release (P1):** batch capture and visual location suggestions, broader price coverage, household sharing, sale listing drafts, duplicate checks, recall matching, seasonal plans, richer hazard review, memory stories, lending, move mode, and post-fire insurance supplements. Sequence these by pilot evidence rather than committing to all of them at once.

P1 also includes optional blueprint/floor-plan discovery and import, editable storage maps, and map-assisted location suggestions. Launch discovery only for sources with verified access and measured property-match quality; upload/manual maps remain available elsewhere. This is a map-and-confirmation workflow; continuous indoor positioning and automatic room reconstruction are separate future research and are not prerequisites.

**Planned community release (P2):** launch Home Space's own trading community with local groups, member profiles, available/wanted posts, capture-time matching with potential value, messaging, offers, local handoffs, and moderation. All essential community workflows work on the phone. Begin with invited groups and expand once participation and operations support it. The photograph-before-storage flow ships in P0; its community-interest card ships with this community release.

**Exploration backlog:** external marketplace availability signals, local disposal routes, neighborhood borrowing, and estate features. Validate each separately; these do not determine whether Home Space will create its own community.

### Deliberate MVP limits

- One household organizer account; multiple properties and storage areas. Household invitations and role management follow in P1.
- One item or container per capture; no complete room reconstruction, automatic volume measurement, or augmented-reality navigation.
- No automatic marketplace publication or automated valuation presented as an appraisal.
- No claim that a photographed item is safe, edible, authentic, or legally sellable.
- No exact location disclosure to trade partners.
- No promise of detecting every item in a crowded photo; users can save and review later.
- No payment collection for item sales, shipping, trade chat, or public community in the MVP.

### Build milestones and release gates

| Milestone | Build scope | Exit evidence |
| --- | --- | --- |
| M0 Feasibility | Capture prototype, category/source selection, date examples, vault design, user interviews | Provider rights and pricing understood; pilot categories selected; vault recovery and hazard guidance reviewed |
| M1 Inventory foundation | Account, locations, QR, photos, manual fields, container moves, search, offline sync, lifecycle | End-to-end capture and retrieval work after restart; no duplicate uploads or silent location conflicts |
| M2 Assisted decisions | AI suggestions, storage recommendations, valuation adapter, date OCR, sentiment, reminders, cleaning queue, dashboards | Evaluation targets met; unsupported cases stay unknown; user edits survive reprocessing; suggested destinations remain separate from confirmed locations |
| M3 Private pilot | Vault, hazard review, insurance report/snapshots, export/deletion, telemetry, accessibility, failure recovery | Representative households complete real retrievals and cleaning actions; report evidence/totals and replacement-device recovery are verified; privacy and reliability gates pass |
| M4 Public MVP | Ad placement, subscription, entitlement sync, support and recovery processes | Billing flows verified; costs measured; release-blocking issues resolved; no sensitive data in ads or logs |
| M5 Expansion | Selected P1 capabilities, including the companion map experience | Demand, data access, and measured usability justify each addition |
| M6 Home Space community | Invited community pilot followed by the planned P2 release: groups, posts, matching, messages, offers, and local handoffs | Phone exchange flows pass; membership isolation and moderation work; real participants complete exchanges before broader rollout |

For the P1 map release, verify source access, correct property/unit matching, layout review, multi-floor ambiguity handling, and plan privacy before enabling discovery. Measure how often suggestions reduce selection effort without increasing wrong-location reports.

Vault and data-isolation design begins in M0 and applies to the foundation; M3 is the completion gate, not the first point when security is considered. No delivery date is committed before team capacity and integration access are known. Prototypes must validate phone-sized workflows and camera interaction from the start. The public MVP includes iOS/Android phone experiences and the scoped companion web app.

**Small demo scope:** photograph a drill, confirm “Garage / Shelf B / Blue bin,” view a clearly sourced or explicitly simulated price card, photograph a date label, find the drill, and finish a three-item cleaning sprint. Include one protected item and one hazard-review example. Demo fixtures must not be presented as live price, recall, or safety determinations. A demo does not demonstrate production security or billing readiness.

## 12. Key user stories

1. **Inventory:** As a user storing a drill in a garage bin, I can photograph it, confirm the bin, and later find it by searching “drill.”
2. **Spring cleaning:** As a user with one free hour, I can start a garage mission and work through a manageable set of items.
3. **Expiration:** As a user storing supplies, I can confirm a visible date and receive a reminder before it passes.
4. **Sentiment:** As a user sorting family objects, I can mark an item as emotionally important and keep its story private.
5. **Valuables:** As a user cataloging jewelry, I can keep photos, estimated value, and exact location behind a separate lock.
6. **Hazards:** As a user with several battery packs in one area, I can see a review prompt and decide what action to take.
7. **Sale:** As a user deciding whether to sell a collectible, I can inspect an evidence-backed price range and make an editable listing draft.
8. **Trade:** As a user offering a spare tool, I can expose that one item publicly without exposing my full inventory or address.
9. **Storage recommendation:** As a user putting away tent stakes, I can see where my tent and camping gear are stored, choose that location, and confirm the placement after putting the stakes there.
10. **Store or offer:** As a user photographing a tent before putting it away, I can see both a suggested storage location and, when community matching is enabled, an active request for a tent like mine with available value information, then choose whether to store it or prepare an offer.
11. **House map:** As a user setting up my home, I can authorize a search for its floor plans or upload one, confirm the storage areas, and later receive a suggested current room or destination while putting something away.
12. **Insurance after a fire:** As a household member whose belongings or phone may be lost in a fire, I can retrieve my authorized saved inventory report, photos, and receipts from another device and prepare supporting documentation for my insurer.

## 13. Success measures

The first research goal is to prove that users can build a useful inventory and act on it. **Primary outcome:** the share of activated households completing at least one meaningful action in a rolling 28-day period. Meaningful actions are a user-confirmed retrieval, use, relocation, completed cleaning task, or completed exit; opening the app and adding empty records do not count. Monthly cadence accommodates seasonal household use.

Proposed pilot targets are hypotheses, not forecasts or market benchmarks:

| Measure | Initial hypothesis to validate |
| --- | --- |
| Activation | At least 60% of eligible new pilot households save 5 items across 2 locations and complete a retrieval within 7 days |
| Capture speed | Median single-item capture under 30 seconds after onboarding |
| Retrieval success | At least 80% of observed retrieval attempts find the correct physical object; record stale-location and search failures separately |
| Action rate | At least 40% of activated pilot households complete a meaningful action in days 8–28; also report cleaning and exit actions separately |
| Repeated value | Measure week-four household return and 28-day outcomes by storage/cleaning use case; investigate drop-off before setting a retention target |
| Recognition | At least 85% correct broad category suggestions on a labeled pilot set; measure exact-model accuracy and abstention separately |
| Date extraction | At least 95% exact extraction on readable supported labels; 100% of ambiguous evaluation cases require confirmation before reminders |
| Valuation | Every displayed range has valid provenance; report supported-item coverage and errors against reviewed comparables before setting a predictive accuracy claim |
| Subscription | Measure exposure-to-paid conversion, renewal, cancellation reason, and contribution across free and paid households |

Use observed sessions and labeled evaluations alongside user corrections; a low correction rate alone does not prove accuracy. Track accidental sharing, wrong-location reports, misleading prices, false hazard alerts, and reported pressure to discard possessions. Privacy leakage is a release blocker, not an acceptable percentage target.

Minimum analytics events are item_saved, ai_field_accepted_or_corrected, retrieval_confirmed, location_updated, mission_started_or_completed, exit_confirmed, reminder_reviewed, subscription_started_or_ended, and ad_impression. Collect category-level event metadata only when needed; never attach photos, item names, exact locations, values, or sentimental text. Give users analytics controls.

## 14. Privacy, accessibility, and reliability

Treat exact addresses, source plans, map coordinates, and storage-area annotations as private household data. Obtain permission before sending an address to an external search source or a plan to an analysis provider, and explain the data involved. Map visibility follows location access grants; use filtered derived maps when a member cannot view the full source plan. Exclude protected-item markers and private areas from unauthorized views. Plans and coordinates never appear in community profiles, listing exports, or ad targeting. Plan originals and derivatives are included in household deletion and separately controlled exports.

- Use encrypted transport and storage; apply role-based access to household data and additional protection to vault content.
- Offer data export and deletion, clear consent for processing photos, and controls over AI analysis and notification detail.
- Keep exact home addresses and item locations out of public trading profiles and listing drafts by default.
- Support offline capture with later sync, especially in garages, basements, and storage units with weak connectivity.
- Make text, buttons, and camera guidance accessible; provide keyboard navigation and non-camera entry on web.
- Preserve original photos, user corrections, and an edit history so AI reprocessing cannot silently overwrite trusted information.
- Surface freshness and confidence for location, dates, prices, and hazard suggestions.

### Nonfunctional acceptance targets

These are proposed engineering budgets for the MVP, to be validated on the selected devices and deployment environment.

| Area | Target and verification |
| --- | --- |
| Inventory size | Support 5,000 item records per household in the performance dataset; plan/storage limits are a separate commercial decision |
| Search | 95th-percentile text/filter response under 2 seconds on the benchmark dataset and documented network profile |
| Capture | Persist a local draft within 2 seconds after photo processing; enrichment runs independently with visible pending/error states |
| Offline mobile | Create 10 items, terminate the app, reopen, reconnect, and obtain exactly 10 complete records; test interrupted photo uploads |
| Sync conflicts | Location, quantity, deletion, and sensitivity conflicts are explicit; a stale client cannot downgrade protection or resurrect a deleted item |
| Phone experience | Complete core workflows without desktop assistance on representative supported iOS/Android handsets; test one-handed capture, readable controls, interruptions, and weak connectivity |
| Companion web | Browse, upload, edit, move, search, review queues/dates, view reports, prepare labels, manage billing, and unlock vault; camera-specific and offline mobile flows do not require identical web implementations |
| Reminders | At most one app reminder per configured event; deduplicate retries, handle time zones, support quiet hours, and show due items even if push permission is denied |
| Accessibility | Target [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) for web; test keyboard/screen-reader flows, scalable text, non-color status indicators, and manual alternatives to camera entry |
| Service reliability | Initial operational target of 99.5% monthly availability; monitor capture and retrieval separately from third-party AI/valuation outages |
| Recovery | Proposed server recovery objectives: at most 24 hours of data loss and 24 hours to restore after a major incident; verify with a restore exercise before public launch |
| Privacy | Account isolation, vault media access, export filtering, and redacted logs pass adversarial tests; no advertising access to inventory data |

Offline records use stable IDs and idempotent uploads. User-confirmed fields take precedence over enrichment results; conflicting human edits are surfaced. Require encrypted mobile storage for inventory caches and clear session-bound access on logout. Cache ordinary item metadata, location paths, and search indexes after sync; photos are available only if downloaded. Show last-sync time and missing-media states. Cloud failures leave ordinary manual capture and retrieval of cached records usable; protected records follow the online-unlock rules in section 7. The app can report a reminder as scheduled or delivered to the provider, but cannot guarantee that a device displayed it.

Deletion removes live records and associated public copies from this service, revokes media access, and expires backups on the published schedule. Implement deletion records so restoring a backup does not resurrect deleted content. Explain that copies independently exported or posted to an external marketplace cannot be remotely erased by Home Space.

Export ordinary inventory as CSV plus a downloadable media archive and a manifest linking item IDs to photos. Include locations, quantities, confirmed fields, dates, and valuation provenance; do not include protected records by default. A separate protected export requires fresh vault authentication and an explicit selection. Define and publish processing times and backup expiry before public launch.

## 15. Core data model

| Entity | Essential fields and relationships |
| --- | --- |
| Household and membership | Household ID, owner, members/roles when enabled, plan, timezone, currency, region, settings |
| Location | ID, household, parent location, type such as property/building/floor/area/container/spot, name, reference photo, label ID, optional map-region link, confirmed storage eligibility/restrictions, last confirmation |
| Property plan and map region | Property/unit, private source document, source URL/provider, access basis, plan/version date, import/confirmation timestamps, building/floor, room label/boundary, scale if verified, uncertainty, superseded version and location mapping |
| Item | ID, household, owner/steward, nullable confirmed location, proposed destination, placement status, name/category/model, quantity/unit, condition, lifecycle, sensitivity, tags, acquisition/use dates |
| Media and evidence | Item/location link, original private photo, derived crop, OCR text, provenance, access scope, retention status |
| Field observation | Field, proposed value, source, observation time, confidence class, confirmation state, confirming actor; preserve original and corrected values |
| Sentimental context | Optional importance, private story/voice reference, people or occasion, recommendation preference |
| Date or lot | Item, raw label, parsed value, precision, type, confirmation, quantity/lot, reminder preference |
| Valuation | Item, type, low/high or manual amount, currency, region, condition assumptions, sources, comparable count, observation date |
| Hazard record and rule | Product/category, quantity/unit, condition, location, missing inputs; rule/source/version and resulting alert state |
| Mission and action | Goal, location, selected items, time/energy preference, planned/in-progress/completed/skipped state, completion evidence, undo history |
| Listing and offer | Explicit public field snapshot, selected sanitized media, broad area, listing state, participants, offer state and terms |
| Wanted request and match | Community, requester, item/model/condition criteria, broad area, optional budget/currency or trade interests, status and expiry; private item reference, match reasons, missing details, last validation, dismissed state |
| Insurance report and loss supplement | Household/property, selected scope and item/evidence versions, report version, generation/cutoff timestamps, value basis/currency, protected-content flag, sync state, prior version; optional incident and user-reported per-item loss status |
| Community group and conversation | Group, broad area, membership/invitation status, member/moderator role, rules; conversation participants, shared listing/request reference, messages, block/report state; no inherited household access |
| Audit and entitlement | Actor, action, timestamp, protected payload exclusion; plan/provider, validity period, renewal/restore state |

**Lifecycle:** active items may be stored, in use, lent, or missing. Sold, donated, consumed, and disposed are exit outcomes with timestamps and optional proceeds. Archive is a visibility choice, not proof that an item left the home. Offer/listing status is separate: an offered item remains owned until transfer completes. A completed exit stops ordinary reminders and removes the item from active counts, while retaining owner-controlled history.

Quantity records support partial exits and consumption. Selling two of five identical items creates an exit event for two, records proceeds for those two, and leaves three active. Reminders continue for remaining lots; only zero remaining quantity completes the record's exit. Undo reverses the associated quantity and proceeds event, subject to external transfer state. Individual unique valuables use quantity one.

**Integrity rules:** a location cannot contain itself or its ancestor; quantity cannot become negative; moving a container is atomic; quantities with different expiration dates remain distinct lots; repeat operations cannot create duplicate items or completed trades. A move or sale by someone other than the owner requires the appropriate grant once sharing is enabled. Household edits and public trade actions use separate authorization paths.

## 16. Product and technical risks

| Risk | Mitigation |
| --- | --- |
| AI misses objects or identifies them incorrectly | Keep capture editable, retain originals, show confidence, and measure corrections |
| Visual location matching confuses similar bins or rooms | Use QR labels and explicit confirmation; timestamp last known location |
| Plans are unavailable, outdated, or for the wrong unit | Verify source/property/version, require layout review, support manual/upload fallback, and reconcile renovations without moving inventory |
| Price estimates become misleading | Use ranges, dated evidence, condition prompts, and “no reliable estimate” |
| Expiration OCR mistakes a lot number or manufacturing date | Ask user to confirm the date type before reminders |
| Hazard alerts create false reassurance or alarm | Keep claims narrow, seek expert-reviewed guidance, and show missing information |
| Valuable inventory attracts unauthorized access | Step-up authentication, data minimization, private defaults, and security review |
| Ads undermine trust | Restrict placement and targeting; measure user feedback and retention |
| Marketplace or trade features face data access and moderation constraints | Gate launch on permitted integrations, clear policies, and operational capacity |

## 17. Open decisions for discovery

The following defaults allow product and design work to proceed. They are proposals, not validated commercial commitments.

| Decision | Working default | Evidence or owner needed before commitment |
| --- | --- | --- |
| Initial customer | Household organizer with multiple storage areas | Product lead validates interviews and observed retrieval tasks |
| Launch region | US English pilot | Product and safety reviewers choose supported local guidance coverage |
| House-plan discovery P1 | Limited verified sources with upload/manual fallback | Integration owner confirms retrieval rights, geographic coverage, and property/unit match evaluation before launch |
| Platforms | Mobile phone is primary; iOS/Android apps with companion web review/management | Engineering lead selects implementation and a representative handset/browser test matrix |
| Price evidence | One or two identifiable product categories | Product/data owner confirms provider rights, coverage, freshness, and cost in M0 |
| Vault model | Separate authorization and encrypted storage; no end-to-end encryption claim | Security owner documents recovery factors, key access, and threat model in M0 |
| AI allowance and subscription | Test monthly price options; limits unset | Product/finance evaluate usage, willingness to pay, and contribution before M4 |
| Hazard alerts | Narrow reviewed categories; no universal quantity thresholds | Qualified reviewer signs off each rule and local resource coverage |
| Trading launch | Home Space's own community; adults, invited local groups, local handoffs | Community owner validates match density and moderation capacity before the M6 community launch |
| External publishing | Copy/export listing drafts first | Integration owner verifies current permissions before promising native publication |

## 18. First validation plan

Interview 12–15 target users, emphasizing household organizers while including multi-property owners and people downsizing. Observe at least three real storage-capture sessions, including a garage or storage unit with weak connectivity. Ask participants to locate something they genuinely need before introducing the prototype. Test whether one-box capture produces useful recall without an exhausting cataloging session.

Run a four-week pilot with 20–30 households after the technical and privacy gates pass. Observe item capture, a later retrieval, a changed location, a cleaning sprint, and a completed exit. Include varied lighting, similar bins, ambiguous date labels, unsupported objects, and interrupted connections. Build a consented, labeled evaluation set; do not reuse private household images for model training by default.

Test three propositions separately: whether users retrieve objects more reliably, whether sentiment-aware prompts help them complete desired actions, and whether ad-free access is worth paying for. If users catalog but do not return to find or act, improve the retrieval/action loop before expanding AI or launching a community. If reliable valuation data cannot be obtained, explicitly revise the product promise and scope; do not quietly substitute invented prices.

## 19. Screens and interaction requirements

| Screen | Primary actions | Required states |
| --- | --- | --- |
| Onboarding | Create household, choose timezone/currency, photograph an item or box, create areas when ready | Skip optional fields, no locations yet, camera permission denied, manual entry, privacy/AI choice |
| Home | Search, choose Catalog stored items or Store an item, review due items, resume mission | Empty inventory, incomplete inventory, no urgent tasks, offline; protected data excluded |
| Capture | Photograph first or select/scan current location, review storage suggestions, mark protected, save draft; view community interest in P2 | Offline, upload pending, unreadable label, ambiguous identity, unsupported valuation, no suitable storage match, pending placement, retry; community matching disabled/pending/unavailable/no match |
| Review queue | Confirm/correct identity, label date, condition, optional sentiment | Needs input, accepted, skipped, enrichment failed; originals retained |
| Item detail | View path/photo, edit, confirm location, review storage suggestions, move, choose action, protect | Unknown value/date, stale location, pending placement, missing, lent, exited, locked |
| Locations | Browse hierarchy, print QR, view container photo, move container | Empty, partially cataloged, stale, move conflict, invalid parent |
| House map P1 | Authorize plan search, review candidates, upload plan, confirm floors/areas, link photos/QR labels, correct layout | Plan not found, access approval needed, wrong property/unit, uncertain room, outdated layout, multi-floor ambiguity, restricted view |
| Cleaning sprint | Pick goal/time, work a short queue, pause, undo, record result | No suitable tasks, deferred item, incomplete exit, completed sprint |
| Dates and hazards | Review confirmed dates, unresolved labels, hazard records and guidance | Missing quantity, unverified date, dismissed/reviewed alert, unavailable local guidance |
| Vault | Authenticate, capture/view protected items, deliberate export | Locked, session expired, rate limited, recovery required, processing consent |
| Plan and settings | Upgrade, restore, cancel/manage, export, delete, set reminders | Billing pending/failed, entitlement expired, push denied, export pending |
| Insurance report | Select property/items, review evidence gaps, preview/generate/download PDF, export evidence, retrieve snapshots; add loss supplement in P1 | Incomplete inventory, unknown values, upload/sync pending, protected selection requiring authentication, generation failure, snapshot available, account/vault recovery required |
| Sell preparation P1 | Pick eligible item, review evidence, redact photos, export draft | Unsupported price, restricted item, recall review, draft ready, user-confirmed sale |
| Home Space community P2 | Join/create groups, opt in items, create/manage wanted posts, review matches and value, message, offer, agree, complete, report | Pending invitation, empty group, no matches, expired/fulfilled request, no budget, uncertain product match, pending/accepted/expired offer, reserved item, blocked user, moderation hold |

The mobile phone is the primary design and acceptance surface. Navigation should keep capture, finding belongings, storage decisions, cleaning, and the Home Space community easy to reach. All everyday tasks, including messages and exchange completion, must work on the phone. Web emphasizes review queues, bulk edits, reporting, and printable labels. Every AI-assisted field has an editable manual path. User text and text extracted from photos or plans are treated as data; they must never trigger tool actions, external publication, or changes to access controls.

## 20. Household permissions

The MVP has one organizer. P1 adds the following permission model; all grants are scoped to a household and, where applicable, selected locations.

| Capability | Owner | Editor | Viewer |
| --- | --- | --- | --- |
| View ordinary shared inventory | Yes | Within grant | Within grant |
| Add and edit ordinary items | Yes | Within grant | No |
| Move items or containers | Yes | Within grant and item-owner rules | No |
| Approve sale, donation, or transfer | Owned items or explicit owner authorization | Owned items or explicit owner authorization | No |
| Invite/revoke members and manage plan | Yes | No | No |
| Export ordinary shared inventory | Yes | Only with separate export grant | No |
| Read another member's vault | Only with that member's explicit vault grant | Only with explicit vault grant | Only with explicit vault grant |

Leaving a household or revoking a member removes future access and cached session credentials; explain that previously exported copies cannot be recalled. Any ownership transfer requires an explicit flow. Trusted organizer access and estate handoff are separate later grants, with scope and expiry, rather than sharing the owner's password.

## 21. System boundaries and acceptance scenarios

### Implementation boundaries

Use one account and household service across mobile and web. Keep private inventory and media storage separate from sanitized public listing snapshots. A background job layer handles image analysis, OCR, valuation, reminders, and retries; capture must not wait for these jobs. Use replaceable providers for image analysis and price evidence so the core inventory remains usable during outages or provider changes.

Run hazard recommendations through versioned reviewed rules with traceable inputs. Generative text may explain a rule but cannot invent thresholds or replace its decision. Keep billing entitlements separate from inventory authorization, so a billing failure does not remove access to possessions. Provide operational queues for failed jobs, recovery cases, and later community reports, without exposing vault payloads to ordinary support staff.

Detailed vendor choices, endpoints, database migrations, and deployment configuration belong in the implementation design after M0. The product requirements and tests here define the build boundary.

### Release acceptance scenarios

| ID | Scenario | Expected result |
| --- | --- | --- |
| AT-01 | Save 10 items offline, restart, reconnect twice | Exactly 10 items with intact media, location, and user edits; no duplicate enrichment |
| AT-02 | Move a bin containing 20 items to another room | All retrieval paths update together; previous location is preserved in history |
| AT-03 | Photograph an unfamiliar object and a similar-looking tool model | Broad suggestions are editable; missing exact identity stays unknown; no invented serial number or price |
| AT-04 | Read an ambiguous date, missing year, or lot code | Needs-review state; no automatic expiration reminder until a real date/type is confirmed |
| AT-05 | Re-run AI after a user corrects a name, date, or price | Confirmed values remain; new suggestions are separately reviewable |
| AT-06 | Protect an ordinary item that had a thumbnail and search entry | Those surfaces clear; old ordinary media links fail; normal totals and exports omit it |
| AT-07 | Use a logged-in but unauthorized account to request a vault image directly | Access denied by the service, regardless of screen state or guessed identifier |
| AT-08 | Mark an item for donation, then confirm handoff later | It remains active while pending; completion changes counts, stops ordinary reminders, and preserves optional memory |
| AT-09 | Add four hazardous-product containers with unknown volume | Show four containers with volume unknown; do not infer a quantity threshold or declare safety |
| AT-10 | Interrupt a subscription purchase, restore it on another device, then cancel renewal | Entitlements converge; renewal cancellation preserves access until expiry; inventory remains accessible afterward |
| AT-11 | Deny camera and notification permissions | Manual entry and uploads remain available; due items remain visible in-app |
| AT-12 | Delete an item while a second device holds a stale offline edit | Sync cannot resurrect the item; restore procedures honor deletion records |
| AT-13 | Consume two units from a five-unit dated lot, then undo | Remaining quantity changes from five to three and back; reminders stay attached to the remaining lot; totals reconcile |
| AT-14 | Protect an item visible in a linked ordinary shelf photo | The protection flow requires review of linked media and offers crop/redact/protect; ordinary photo access matches the chosen protection |
| AT-15 P1 | Export a sale draft for an eligible ordinary item | Only selected public fields and sanitized photos appear; sentiment, exact location, and private notes are absent |
| AT-16 P2 | Accept one of two offers on an item | The item is reserved once; the other offer cannot also be accepted; ownership changes only on confirmed completion |
| AT-17 | Add tent stakes sharing a camping tag with gear in an accessible bin, then choose the suggested bin | Explain the related-item match; keep the prior location until placement is confirmed; omit protected evidence and restricted destinations; show manual selection when no useful match exists |
| AT-18 | Choose Store an item, photograph it before creating any location, save, then select a destination | Save succeeds as awaiting placement; offer create-location/decide-later choices; record an actual location only after physical placement is confirmed |
| AT-19 P2 | Photograph an eligible tent with matching enabled and an active wanted request, then expire that request | Initially show a potential match and stated budget separately from any resale estimate; publish/contact nothing automatically; revalidation removes the expired opportunity; storing remains available |
| AT-20 P1 | Search for a plan with no available result, a restricted result, and a plan for another unit | Show distinct outcomes, do not import an unconfirmed match, and preserve upload/manual setup; no third-party request or payment occurs automatically |
| AT-21 P1 | Import a multi-floor plan, correct a room, then capture a close-up item with no room context | Keep floors distinct, preserve user corrections, and ask for room/QR confirmation instead of claiming an exact current location |
| AT-22 P1 | Replace a renovated floor plan and view its map through a restricted household account | Reconcile existing location IDs without moving items; hide unauthorized regions, source plans, and protected markers; ordinary exports and public profiles omit the map |
| AT-23 | Complete onboarding, capture, storage confirmation, retrieval, a cleaning task, and plan management using only a phone | All steps succeed on supported iOS/Android handsets without desktop assistance; interruptions preserve progress |
| AT-24 P2 | Join a Home Space group, post a wanted item, exchange an offer/message, and confirm a handoff using phones | The exchange works within Home Space; membership grants no private household access; block/report controls remain available |
| AT-25 | Generate an insurance report with partial quantities, missing receipts, multiple value types, and protected items | PDF/CSV totals reconcile by value basis/currency; gaps are visible; evidence links resolve; protected items are excluded unless explicitly selected after authentication |
| AT-26 | Sync a report, lose access to the original phone, recover on another device, and create a revision | Authorized ordinary reports and evidence remain retrievable; protected content still requires vault recovery; the new revision preserves the original snapshot and timestamps |
| AT-27 P1 | Add a fire incident and mark only some items damaged or destroyed | Create a linked user-reported supplement; leave unassessed items unknown and the pre-loss snapshot unchanged; preserve off-site/lent status |

**MVP definition of done:** M0–M4 gates and AT-01–AT-14 plus AT-17–AT-18, AT-23, and AT-25–AT-26 pass; the pilot supports the retrieval/action hypothesis; no unresolved critical privacy, data-loss, or safety defects remain; provider rights, billing behavior, operational ownership, and measured cost are documented. Failure to secure valuation evidence or to validate vault isolation blocks the corresponding advertised capability and requires an explicit scope decision before launch.

**Community release definition of done:** M6 readiness gates and P2 scenarios AT-16, AT-19, and AT-24 pass; group/member isolation, reviewed sharing, reporting/blocking, moderation ownership, and completed phone-based exchanges are verified before wider availability.
