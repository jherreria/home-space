# Home Space Hackathon Demo

Home Space turns a few minutes of organizing into a small, satisfying win. The phone is the primary experience. This lightweight prototype demonstrates the product without account creation, credentials, a production backend, or external API connections.

## Launch the demo

From the repository root, run:

```sh
cd demo
npm start
```

Open [http://localhost:4173](http://localhost:4173) in a browser. No dependency installation is required; the server uses Node.js built-ins. Keep the terminal process running while presenting. Stop it with **Control-C** when finished.

The desktop page contains an interactive **browser-based phone simulator**, plus buttons that jump directly into the five journeys. At a narrow browser width, the app fills the available phone-sized screen. This is not a compiled native mobile app. Apple's native iOS Simulator is not installed in the demo environment, so no Xcode or simulator runtime is required.

Use **Reset demo** beside the desktop phone, or **My growth → Settings → Reset this demo**, to return to the sample home between presentations.

## Five journeys to show

1. **Finish a small sprint.** From **Today**, choose **Let’s make some room**. Make three decisions about the lamp, boots, and vase; try **Donation bag**, **Keep & love**, and **Not today**. See the space points and Sunday Sun keepsake. If an exit was chosen, select **Finish the handoff → Confirm demo handoff**, then check the updated rehomed count and inventory. An item stays in inventory until the handoff is confirmed. Keeping something is a valid decision.

2. **Photograph and decide.** Open **Add**, select the tent sample, and choose **Find its next chapter**. After the simulated analysis, review the illustrative resale range, camping-gear storage suggestion, and Maya’s wanted request. Choose **I put it here · save item**, then **See it in my stuff**. To demonstrate the alternative path, return to **Add**, run **Find its next chapter** again, and choose **View match**. The optional **Use a photo from your phone** button opens the browser's image picker/camera input; analysis still uses the selected sample and does not identify the uploaded image.

3. **Find what you own.** Open **My stuff**, search for “tent” or filter by **Garage**, and open an item. Try **Move** to change its recorded location. Open the map using the map icon or **Your home map** on Today, select a room, and choose **Find my things here**. **Find a floor plan** opens a sample-address interaction only; it does not search property records or recognize a real blueprint.

4. **Meet community demand.** Open **Neighbors → Wanted**, select Maya’s tent request, and review the sharing preview. Choose **Offer this item**, add a demo message, then **Confirm demo handoff** and confirm the simulated exchange. Check the updated progress and inventory. Explore **Available** and **Our wins** for the community and friendly-ranking views. The requester’s budget, item resale estimate, and simulated trade are different concepts; no buyer, payment, or external message exists.

5. **Protect the record.** Open **Insurance inventory** from Today or My growth. Preview included items, choose **Download insurance report**, and choose **Export item spreadsheet**. These produce real PDF and CSV downloads containing the current ordinary sample inventory. From My stuff or My growth, open **Private little corner → Unlock demo vault**, inspect the separate ring, then lock it again. The protected ring stays out of ordinary report exports. There is no actual authentication or encryption boundary in this prototype.

## What is real and what is simulated

| Feature | Demo behavior |
| --- | --- |
| Navigation and state | Real interactive screens, inventory location/status changes, progress, and browser-local persistence; no user credentials |
| PDF and CSV exports | Real downloadable files containing fictional item details and illustrative resale values; the PDF is a text report, not a photo/evidence package |
| Camera and AI | Sample-item recognition animation; an optional locally selected photo is only a preview, not identified or sent to an AI provider |
| Values and demand | Fixed demonstration ranges, budgets, neighbors, requests, and messages; no live price research, verified buyer, or live community |
| Sharing and handoffs | Local simulated offers and confirmations only; no external posting, money transfer, shipping, or real contact |
| House map | Interactive sample layout; no address lookup, blueprint retrieval, indoor positioning, or floor-plan recognition |
| Vault | Visual unlock/lock demonstration only; no real password, biometric authentication, secure storage, or production privacy guarantee |
| Insurance and recovery | Sample documentation, with missing receipts and serial numbers identified; no claim filing, coverage calculation, cloud backup, or replacement-device recovery |
| Reminders and progression | Demo preferences and visible earned progress; no push notification is scheduled and no penalty is applied for taking a break |

All sample inventory, people, community activity, prices, and requests are fictional. Use sample content when presenting and do not enter real sensitive information. Browser-local state is not an off-site backup; clearing site data or using another browser starts a separate demo. Image previews are temporary and are not stored as report evidence.

## Habit design

The experience uses Nir Eyal’s four-part model: **trigger → action → reward → investment**. A visible small mission is the trigger; a simple item decision is the action; progress and an occasional delightful discovery provide the reward; saving a meaningful location, story, or community preference makes the next visit more useful. [Nir Eyal’s explanation of the Hooked Model](https://www.nirandfar.com/multi-device/).

The supplied video transcript informs three design choices:

- **Transparent progress with pleasant surprises.** Most XP and milestone rewards are understandable. A small discovery or collectible adds delight without hiding the cost of an action.
- **Progress that accumulates.** One visible progression system reinforces real organizing actions. Earned progress is not removed for taking a break; a sprint has an end.
- **Friendly social recognition.** Community generosity and optional comparison make contributions visible. Seeded member activity is demonstration content, not evidence of a live network.

The transcript’s retention statistics, neuroscience claims, and product comparisons were not empirically validated for this demo. They should not be used as pitch evidence. This prototype borrows interaction ideas rather than claiming that it produces addiction or any measured retention outcome.

## Presentation notes

Start on Today and show one complete journey before opening the other sections. A compact presentation can show the three-item sprint, tent recognition, Maya's match, and a downloaded report. Reset before repeating a completed item handoff so the next presentation starts with the full sample inventory. Keep the simulated-data labeling visible when describing prices, community matches, recognition, or insurance documentation. The strongest pitch is a useful outcome: an item found, a shelf cleared, or a possession connected with someone who wants it.

## Verification completed

- JavaScript syntax checks passed (`npm run check`).
- Browser walkthroughs covered the three-item sprint, replay without duplicate rewards, scan → storage confirmation → inventory search, neighbor offer → local chat → confirmed handoff, room filtering, and vault unlock/lock.
- Verified conversations stay separate, completed items cannot be offered again, personal wanted requests persist without self-matching, and points/inventory persist after reload.
- Downloaded both report formats. Verified six remaining ordinary items and the expected $309 sample total after the test handoffs, with the private ring and rehomed items excluded.
- Checked the layout at 390 × 844 and desktop size; no browser console errors were observed.
- Browser testing used a separate `?test=1` local-storage key. The main demo is ready at its starting screen.
