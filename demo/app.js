import { icon, itemArt, roomArt, mascotArt, floorplanArt } from './assets.js';
import { seedItems, sampleItems, wantedPosts, sprintItems, rooms, achievements, protectedItems } from './data.js';

const $ = (s) => document.querySelector(s);
const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => '$' + Number(n || 0).toLocaleString('en-US');
const I = (name, size = 20) => icon(name, size);
// Keep the existing storage keys to preserve saved progress after the rename.
const key = new URLSearchParams(location.search).has('test') ? 'homestuff-demo-test-v1' : 'homestuff-demo-v1';
const fresh = () => ({ items: structuredClone(seedItems), xp: 340, cleared: 12, recovered: 186, streak: 4, weeklyDone: 12, sprintCompleted: false, savedIds: [], offeredIds: [], completedTradeIds: [], messagesByThread: {}, customPosts: [], reminder: false, reportCount: 0 });
let state;
try { state = { ...fresh(), ...JSON.parse(localStorage.getItem(key) || '{}') }; if (!Array.isArray(state.items)) state = fresh(); } catch { state = fresh(); }
let view = 'home', activeTab = 'home', selectedSample = sampleItems[0], selectedItem = null;
let inventoryFilter = 'All', query = '', communityFilter = 'Wanted', selectedRoom = 'garage';
let sprintIndex = 0, decisions = [], sentiment = 'Useful', targetLocation = '', selectedPost = null;
let scanStep = 0, scanToken = 0, photoUrl = '', vaultOpen = false, reportIncludeVault = false;
let currentModal = null, toastTimer, previousView = 'home', storedAward = 0, sprintAward = 0;

function save() { localStorage.setItem(key, JSON.stringify(state)); }
function level() { return Math.floor(state.xp / 150) + 1; }
function button(label, action, value = '', cls = 'primary full', symbol = '') { return `<button class="button ${cls}" data-action="${action}" data-value="${esc(value)}">${symbol ? I(symbol) : ''}<span>${label}</span></button>`; }
function back(title, subtitle = '') { return `<header class="back-header"><button class="icon-button" data-action="back" aria-label="Go back">${I('arrow-left')}</button><div><h1 class="page-title">${title}</h1>${subtitle ? `<p class="tiny muted">${subtitle}</p>` : ''}</div><span class="header-spacer"></span></header>`; }
function toast(message) { clearTimeout(toastTimer); const el = $('#toast'); el.textContent = message; el.classList.add('visible'); toastTimer = setTimeout(() => el.classList.remove('visible'), 3200); }
function navigate(next, tab) { scanToken++; previousView = view; view = next; if (tab) activeTab = tab; currentModal = null; render(); }
function page(content, cls = '') { return `<div class="page fade-in ${cls}">${content}<div class="bottom-spacer"></div></div>`; }
function progress(value, max, cls = '') { return `<div class="progress-track ${cls}"><div class="progress-fill" style="width:${Math.min(100, value / max * 100)}%"></div></div>`; }
function publicItems() { return state.items.filter(x => !x.protected && !['donated','traded','sold'].includes(x.status)); }
function hasExited(id) { return ['donated','traded','sold'].includes(itemById(id)?.status) || state.completedTradeIds.includes(id); }
function allPosts() { return [...state.customPosts, ...wantedPosts]; }
function threadKey() { return `${(selectedPost || selectedSample.request)?.name || 'Neighbor'}:${selectedSample.id}`; }
function availableItems() { return state.offeredIds.map(itemById).filter(x => x && x.status === 'offered' && !hasExited(x.id)); }
function itemById(id) { return state.items.find(x => x.id === id) || seedItems.find(x => x.id === id); }
function artwork(kind, cls = '') { return itemArt(kind || 'box', cls); }
function nav() {
  $('#tabbar').innerHTML = [ ['home','home','Today'],['inventory','grid','My stuff'],['capture','scan','Add'],['community','community','Neighbors'],['profile','leaf','My growth'] ].map(([target,symbol,label]) => `<button class="nav-item ${target === 'capture' ? 'scan-nav' : ''} ${activeTab === target ? 'active' : ''}" data-action="nav" data-value="${target}" aria-label="${label}" ${activeTab === target ? 'aria-current="page"' : ''}>${I(symbol,23)}<span>${label}</span></button>`).join('');
}

function home() {
  const done = state.sprintCompleted;
  return page(`<header class="page-header"><div class="brandmark"><span class="logo-flower">✳</span><span class="brand-name">home space</span></div><div class="header-actions"><button class="icon-button notification-button" data-action="notifications" aria-label="Notifications">${I('bell')}<i></i></button><button class="avatar" data-action="nav" data-value="profile" aria-label="Your profile">J</button></div></header>
    <div class="welcome"><div><p class="eyebrow">SUNDAY, OCTOBER 25</p><h1 class="display-title">A little less stuff.<br>A lot more <em>life.</em></h1></div><span class="streak-pill">${I('flame',16)} ${state.streak}</span></div>
    <section class="hero-card"><div class="hero-top"><span class="chip">${I('sparkles',14)} ${done ? 'LOOK AT YOU GROW' : 'YOUR LITTLE WIN TODAY'}</span><span class="hero-time">${I('clock',14)} 5 min</span></div><div class="hero-art">${roomArt(done ? 1 : 0)}</div><div class="hero-bottom"><div><h2>${done ? 'Room to breathe.' : 'One shelf. Fresh start.'}</h2><p>${done ? 'Small steps. Real space. Nice work.' : 'Three things between you and a lighter day.'}</p></div>${button(done ? 'See your little wins' : 'Let’s make some room', done ? 'nav' : 'start-sprint', done ? 'profile' : '', 'dark full', 'arrow-right')}</div></section>
    <div class="stats-row"><div class="stat-card"><span class="stat-symbol">${I('package',17)}</span><strong class="stat-value">${state.cleared}</strong><span class="stat-label">things rehomed</span></div><div class="stat-card"><span class="stat-symbol yellow">${I('sparkles',17)}</span><strong class="stat-value">${money(state.recovered)}</strong><span class="stat-label">value unlocked</span></div><div class="stat-card"><span class="stat-symbol sage">${I('leaf',17)}</span><strong class="stat-value">${level()}</strong><span class="stat-label">space maker level</span></div></div>
    <div class="section-heading"><h2>Your week, a little lighter</h2><span class="tiny muted">${state.weeklyDone}/20 things</span></div><div class="weekly-card"><div class="row between"><span>${I('leaf',16)} The little-by-little club</span><b>${Math.round(state.weeklyDone / 20 * 100)}%</b></div>${progress(state.weeklyDone,20)}<p class="tiny muted">Every item with a plan is a small win.</p></div>
    <button class="community-peek" data-action="nav" data-value="community"><span class="person-avatar peach">M</span><span><b>Your extra could be their everything.</b><small>Maya is looking for camping gear nearby.</small></span>${I('chevron-right',18)}</button>
    <div class="section-heading"><h2>A little peace of mind</h2></div><div class="quick-links"><button data-action="journey" data-value="map">${I('map',22)}<span>Your home map</span>${I('chevron-right',16)}</button><button data-action="journey" data-value="report">${I('shield',22)}<span>Insurance inventory</span>${I('chevron-right',16)}</button></div>`);
}

function inventory() {
  const items = publicItems().filter(x => (inventoryFilter === 'All' || x.location?.toLowerCase().includes(inventoryFilter.toLowerCase())) && `${x.name} ${x.category} ${x.location}`.toLowerCase().includes(query.toLowerCase()));
  return page(`<header class="page-header"><div><p class="eyebrow">YOUR HOUSEHOLD MEMORY</p><h1 class="display-title compact">Hello, belongings.</h1></div><button class="icon-button soft" data-action="journey" data-value="map" aria-label="View home map">${I('map')}</button></header><p class="subtle">${publicItems().length} things, each with a place in your life.</p>
    <label class="search-box">${I('search')}<input id="inventory-search" type="search" placeholder="Where did I put that…" value="${esc(query)}" aria-label="Search your belongings"></label><div class="filter-row">${['All','Garage','Closet','Living'].map(f => `<button class="filter-chip ${f === inventoryFilter ? 'active' : ''}" data-action="filter" data-value="${f}">${f}</button>`).join('')}</div>
    <div class="item-grid">${items.map(x => `<button class="item-card" data-action="item" data-value="${x.id}"><div class="item-visual art-${x.kind}">${artwork(x.kind)}${x.status === 'offered' ? '<span class="item-status">Trade ready</span>' : ''}</div><div class="item-card-copy"><h3 class="item-name">${esc(x.name)}</h3><p class="item-meta">${I('location',12)} ${esc((x.location || 'Awaiting placement').split(' / ').slice(0,2).join(' · '))}</p><div class="row between"><span class="item-value">${money(x.value)}</span><span class="tiny muted">demo estimate</span></div></div></button>`).join('')}</div>${items.length ? '' : `<div class="empty-state">${I('search',32)}<h3>No lost treasure here.</h3><p>Try a different name or storage area.</p></div>`}
    <button class="vault-entry" data-action="vault">${I('lock',20)}<span><b>The private little corner</b><small>Your valuables, safely tucked away.</small></span>${I('chevron-right')}</button>`);
}

function itemDetail() {
  const x = selectedItem || publicItems()[0];
  return page(`${back('A familiar favorite')}<div class="detail-art art-${x.kind}">${artwork(x.kind)}</div><div class="row between"><span class="tag">${esc(x.category || 'Household')}</span><span class="tiny muted">Saved in your home</span></div><h1 class="display-title compact">${esc(x.name)}</h1><div class="value-banner"><div><span class="tiny muted">ESTIMATED RESALE VALUE</span><strong>${money(x.value)}</strong></div><span class="tag">Demo estimate</span></div><div class="section-heading"><h2>Right where you left it</h2><button class="text-link" data-action="move-item">Move</button></div><button class="location-option selected" data-action="journey" data-value="map">${I('location',22)}<span><b>${esc(x.location || 'Awaiting placement')}</b><small>Last confirmed today · by you</small></span>${I('chevron-right')}</button>${x.story ? `<div class="memory-card">${I('heart',20)}<div><b>A little meaning</b><p>${esc(x.story)}</p></div></div>` : ''}<div class="section-heading"><h2>Its next chapter</h2></div><div class="button-row">${button('Keep & use','keep-item',x.id,'secondary','heart')}${button('Offer to neighbors','offer-item',x.id,'primary','community')}</div><div class="notice">${I('sparkles',17)}<span>Finding something you own is a win, too.</span></div>`);
}

function capture() {
  return page(`${back('A new little possibility','Point, snap, find its next chapter.')}<div class="scan-viewport"><div class="scan-label"><span class="live-dot"></span> DEMO CAMERA</div><div class="scan-corners"></div><div class="scan-object">${photoUrl ? `<img src="${photoUrl}" alt="Your selected photo">` : artwork(selectedSample.kind)}</div><div class="scan-hint">${I('scan',16)} One item is all it takes</div></div><div class="row between sample-label"><span class="form-label">TRY A SAMPLE ITEM</span><span class="tiny muted">No camera needed</span></div><div class="sample-strip">${sampleItems.map(s => `<button class="sample-option ${s.id === selectedSample.id ? 'active' : ''}" data-action="sample" data-value="${s.id}">${artwork(s.kind)}<span>${esc(s.kind.charAt(0).toUpperCase()+s.kind.slice(1))}</span></button>`).join('')}</div><div class="capture-footer">${button('Find its next chapter','scan','','primary full','sparkles')}<button class="button ghost full" data-action="upload">${I('camera',17)} Use a photo from your phone</button><p class="tiny muted center">${photoUrl ? 'Your photo is local. Demo analysis uses the selected sample.' : 'AI recognition and prices are simulated for this demo.'}</p></div>`);
}

function analyzing() {
  return page(`${back('Finding the possibilities')}<div class="analyzing"><div class="recognition-art">${artwork(selectedSample.kind)}<div class="scan-line"></div></div><div class="loader"></div><h1 class="display-title compact">A little discovery<br>is on its way.</h1><p class="subtle">Looking at what it is. And what it could be.</p><div class="steps">${['Recognizing your item','Finding its place at home','Checking neighborhood interest'].map((s,i) => `<div class="step ${scanStep > i ? 'done' : scanStep === i ? 'current' : ''}"><span>${scanStep > i ? I('check',16) : i+1}</span>${s}${scanStep > i ? '<small>Done</small>' : ''}</div>`).join('')}</div><p class="tiny muted">Demo analysis · no photo is sent to a server</p></div>`);
}

function recognition() {
  const s = selectedSample, req = s.request || wantedPosts[0];
  const low = s.range?.[0] ?? s.value - 15, high = s.range?.[1] ?? s.value + 15;
  return page(`${back('Look what you’ve got')}<div class="analysis-header"><div class="recognition-thumb">${artwork(s.kind)}</div><div><span class="tag">${I('check-circle',12)} IDENTIFIED · DEMO</span><h1 class="page-title">${esc(s.name)}</h1><p class="tiny muted">${esc(s.condition || 'Good condition')} · tap below to make a plan</p></div></div><div class="value-banner lavender"><div><span class="eyebrow">A LITTLE HIDDEN VALUE</span><strong class="value-amount">${money(low)}–${money(high)}</strong><span class="tiny muted">Illustrative resale range, not an appraisal</span></div>${I('sparkles',30)}</div>
    <div class="section-heading"><h2>A place it belongs</h2><span class="tag">Smart suggestion</span></div><button class="location-option selected" data-action="choose-location"><span class="location-radio">${I('check',14)}</span><span><b>${esc(targetLocation || s.location)}</b><small>${esc(s.reason || 'Related things are already here.')}</small></span>${I('chevron-down',16)}</button><p class="tiny muted location-footnote">Just a suggestion. Confirm after you put it there.</p>
    <div class="section-heading"><h2>Or, a new beginning</h2></div><div class="interest-card"><div class="row between"><span class="tag warm">${I('heart',12)} SOMEONE’S LOOKING</span><span class="tiny muted">Demo neighbor</span></div><div class="person-row"><span class="person-avatar peach">${esc(req.initials || req.name?.[0] || 'M')}</span><div><b>${esc(req.name || 'Maya')}</b><small>${esc(req.area || 'Temescal · 0.8 mi away')}</small></div></div><p>“${esc(req.message || 'Looking for something just like this!')}”</p><div class="row between"><span class="tiny muted">Their stated budget <b>${esc(req.budget || '$80–$100')}</b></span><button class="text-link" data-action="match">View match ${I('arrow-right',15)}</button></div></div>
    <p class="form-label">WHAT DOES IT MEAN TO YOU?</p><div class="sentiment-row">${['Just stuff','Useful','Special'].map(v=>`<button class="sentiment ${sentiment===v?'active':''}" data-action="sentiment" data-value="${v}">${v==='Special'?I('heart',14):''}${v}</button>`).join('')}</div>${button('I put it here · save item','store','','primary full','check')}<p class="tiny muted center">Private by default. Nothing is posted automatically.</p>`);
}

function stored() {
  return page(`<div class="completion"><div class="completion-kicker">ONE LESS THING ON YOUR MIND</div><div class="celebration-art">${mascotArt('happy')}</div><span class="reward-pill big">${I('sparkles',19)} ${storedAward ? '+20 space points' : 'Your place is updated'}</span><h1 class="display-title">A place for it.<br>A little peace for you.</h1><p class="subtle">${esc(selectedSample.name)} is now in<br><b>${esc(targetLocation || selectedSample.location)}</b>.</p><div class="memory-card">${I('search',20)}<span>Next time, just ask your inventory.<br><b>Future you says thank you.</b></span></div>${button('See it in my stuff','nav','inventory','primary full','grid')}${button('That’s my little win for now','nav','home','ghost full')}</div>`);
}

function sprint() {
  if (sprintIndex >= sprintItems.length) return sprintComplete();
  const s = sprintItems[sprintIndex];
  return page(`<header class="back-header"><button class="icon-button" data-action="exit-sprint" aria-label="Pause sprint">${I('close')}</button><div><h1 class="page-title">The little reset</h1><p class="tiny muted">ONE SHELF. THREE DECISIONS.</p></div><span class="timer-pill">${I('clock',14)} 5 min</span></header><div class="sprint-progress">${sprintItems.map((_,i)=>`<span class="${i<sprintIndex?'done':i===sprintIndex?'current':''}"></span>`).join('')}</div><div class="row between"><span class="tiny muted">ITEM ${sprintIndex+1} OF ${sprintItems.length}</span><span class="reward-pill">${I('sparkles',13)} ${state.sprintCompleted ? 'Demo replay' : '+20 points'}</span></div><div class="sprint-card"><div class="sprint-art art-${s.kind}">${artwork(s.kind)}</div><div class="sprint-card-copy"><span class="tag">${esc(s.location?.split(' / ')[0] || 'Living room')}</span><h1>${esc(s.name)}</h1><p class="sprint-prompt">${esc(s.prompt || 'Does this still have a place in your life?')}</p>${s.story ? `<p class="sprint-story">${I('heart',14)} ${esc(s.story)}</p>` : ''}</div></div><div class="decision-grid"><button data-action="decide" data-value="keep">${I('heart',22)}<b>Keep & love</b><small>It still matters</small></button><button data-action="decide" data-value="trade">${I('community',22)}<b>Give a new life</b><small>Someone will love it</small></button><button data-action="decide" data-value="donate">${I('gift',22)}<b>Donation bag</b><small>Make a little room</small></button><button data-action="decide" data-value="later">${I('clock',22)}<b>Not today</b><small>And that’s okay</small></button></div><p class="tiny muted center">A thoughtful decision counts. Keeping does, too.</p>`);
}

function sprintComplete() {
  const exits = decisions.filter(d=>['trade','donate'].includes(d.action)).length;
  return page(`<div class="completion"><div class="completion-kicker">SMALL STEPS. GOOD FEELINGS.</div><div class="celebration-art">${mascotArt('celebrate')}<span class="orbit-star s1">✦</span><span class="orbit-star s2">✦</span><span class="orbit-star s3">✦</span></div><span class="reward-pill big">${I('sparkles',18)} ${sprintAward ? '+60 space points' : 'A little win, revisited'}</span><h1 class="display-title">You made room<br>for a good day.</h1><p class="subtle">Three decisions. A clearer shelf.<br>That’s a pretty lovely little win.</p><div class="reward-grid"><div class="reward-card"><strong>3</strong><span>things with a plan</span></div><div class="reward-card"><strong>${exits}</strong><span>ready for a new life</span></div></div><div class="discovery-card"><span class="discovery-icon">${I('sun',30)}</span><div><span class="eyebrow">A LITTLE SURPRISE</span><b>You found the Sunday Sun!</b><p>A new keepsake for your growth shelf.</p></div></div>${exits ? button('Finish the handoff','finish-handoff','','primary full','gift') : button('See my growing collection','nav','profile','primary full','leaf')}${button('Done for today. Feels good.','nav','home','ghost full')}<p class="tiny muted">Your progress stays. Even on days you take off.</p></div>`);
}

function community() {
  return page(`<header class="page-header"><div><p class="eyebrow">GOOD THINGS GO AROUND</p><h1 class="display-title compact">Hello, neighbors.</h1></div><button class="icon-button soft" data-action="new-post" aria-label="Create community post">${I('plus')}</button></header><div class="community-banner"><div class="avatar-stack"><span>A</span><span>M</span><span>J</span></div><div><b>The Temescal little-givers club</b><small>32 neighbors · 18 things rehomed this week</small></div><span class="tag">DEMO</span></div><div class="community-tabs">${['Wanted','Available','Our wins'].map(f=>`<button class="filter-chip ${communityFilter===f?'active':''}" data-action="community-filter" data-value="${f}">${f}</button>`).join('')}</div>
    ${communityFilter==='Wanted' ? `<p class="subtle">Your extra could be their next favorite.</p>${allPosts().map((p,i)=>`<button class="trade-card" data-action="post" data-value="${p.id}"><div class="trade-art art-${p.kind}">${artwork(p.kind)}</div><div class="trade-info"><span class="trade-tag">${esc(p.owned ? p.tag : sampleItems.some(s=>s.kind===p.kind&&!hasExited(s.id)) ? 'MATCHES YOUR STUFF' : 'LOOKING FOR')}</span><h3>${esc(p.item || p.wants)}</h3><p>${esc(p.name)} · ${esc(p.area || 'Nearby')}</p><div class="row between"><b>${esc(p.budget || 'Open to trade')}</b><span class="text-link">See request ${I('arrow-right',14)}</span></div></div></button>`).join('')}` : communityFilter==='Available' ? `<p class="subtle">Ready for another chapter.</p>${availableItems().length ? '' : '<div class="empty-state"><h3>A new chapter starts with you.</h3><p>Choose an item in My stuff and offer it to your neighbors.</p></div>'}${availableItems().map(x=>`<button class="trade-card" data-action="item" data-value="${x.id}"><div class="trade-art">${artwork(x.kind)}</div><div class="trade-info"><span class="trade-tag">${state.offeredIds.includes(x.id)?'YOUR OFFER':'DEMO COMMUNITY ITEM'}</span><h3>${esc(x.name)}</h3><p>A good thing looking for a good home.</p><b>Open to a thoughtful trade</b></div></button>`).join('')}` : `<div class="community-feed"><h2>Little acts. Big ripple.</h2><div class="feed-row"><span class="person-avatar peach">M</span><div><b>Maya gave a lamp a new home.</b><p>“My reading corner is finally complete.”</p><span class="tiny muted">2 hours ago · demo story</span></div>${I('heart',18)}</div><div class="feed-row"><span class="person-avatar sage">A</span><div><b>Alex cleared one whole shelf.</b><p>Made room for a new hobby.</p><span class="tiny muted">Yesterday · demo story</span></div>${I('leaf',18)}</div><div class="section-heading"><h2>This week’s space makers</h2><span class="tag">Friendly & optional</span></div>${[['Maya',480],['Alex',420],['You',state.xp]].sort((a,b)=>b[1]-a[1]).map(([name,xp],i)=>`<div class="leaderboard-row ${name==='You'?'you':''}"><b>${i+1}</b><span class="person-avatar">${name[0]}</span><span>${name}</span><strong>${xp} pts</strong></div>`).join('')}<p class="tiny muted">Sample community. Your pace is the right pace.</p></div>`}
    <div class="notice">${I('shield',18)}<span>Only what you choose to share. Your home stays private.</span></div>`);
}

function matchView() {
  const p = selectedPost || selectedSample.request || wantedPosts[0];
  return page(`${back('A lovely little match')}<div class="match-art">${artwork(selectedSample.kind)}<span class="match-heart">${I('heart',24)}</span><span class="person-avatar large peach">${esc(p.initials || p.name?.[0] || 'M')}</span></div><span class="tag warm">POTENTIAL MATCH · DEMO</span><h1 class="display-title compact">A new chapter<br>might be next door.</h1><div class="card"><div class="person-row"><span class="person-avatar peach">${esc(p.initials || p.name?.[0])}</span><div><b>${esc(p.name)}</b><small>${esc(p.area || 'Temescal · nearby')}</small></div></div><p class="request-quote">“${esc(p.message)}”</p><div class="offer-summary"><span>Their stated budget</span><strong>${esc(p.budget || '$80–$100')}</strong></div><p class="tiny muted">A request budget, not an offer or guaranteed sale.</p></div><div class="section-heading"><h2>Your sharing preview</h2></div><div class="summary-list"><div><span>Item</span><b>${esc(selectedSample.name)}</b></div><div><span>Visible area</span><b>Temescal, Oakland</b></div><div><span>Exact location & private notes</span><b class="green">Hidden ${I('lock',13)}</b></div></div>${button('Offer this item','send-offer','','primary full','community')}${button('Keep it & find a place','return-result','','ghost full')}<p class="tiny muted center">This sends a simulated offer. No real person is contacted.</p>`);
}

function chatView() {
  const p = selectedPost || selectedSample.request || wantedPosts[0];
  return page(`${back(`${esc(p.name || 'Maya')} · your neighbor`,'SIMULATED CONVERSATION')}<div class="chat-item"><div>${artwork(selectedSample.kind)}</div><span><b>${esc(selectedSample.name)}</b><small>Offer sent · exact location private</small></span><span class="tag">Demo</span></div><div class="chat-date">TODAY · A NEW LITTLE CONNECTION</div><div class="message-bubble mine">Hi ${esc(p.name || 'Maya')}! I have ${esc(selectedSample.name.toLowerCase())} that could be perfect for you.</div><div class="message-bubble">Oh, this is exactly what I’ve been looking for! Would you be open to a trade? I have a lovely plant that needs a new home. 🌱</div><div class="message-bubble mine">A plant sounds like a lovely next chapter.</div>${(state.messagesByThread[threadKey()] || []).map(m=>`<div class="message-bubble mine">${esc(m)}</div>`).join('')}<div class="notice">${I('location',18)}<span>Meet in a public place. Share only what you choose.</span></div>${button('Confirm demo handoff','complete-trade','','primary full','check-circle')}<form id="chat-form" class="chat-input"><input aria-label="Message your neighbor" id="chat-message" placeholder="Say something kind…" maxlength="240"><button type="submit" class="icon-button" aria-label="Send demo message">${I('arrow-right')}</button></form><p class="tiny muted center">All people and messages in this demo are simulated.</p>`);
}

function profile() {
  const pct = state.xp % 150;
  return page(`<header class="page-header"><div><p class="eyebrow">LOOK HOW FAR YOU’VE COME</p><h1 class="display-title compact">Little by little.</h1></div><button class="icon-button soft" data-action="settings" aria-label="Settings">${I('settings')}</button></header><div class="growth-hero"><div>${mascotArt('happy')}</div><span class="tag">LEVEL ${level()} · SPACE MAKER</span><h2>You’re growing room.</h2><p>For the things you love. And the life you want.</p></div><div class="level-track"><div class="row between"><b>${state.xp} space points</b><span class="tiny muted">${150-pct} to level ${level()+1}</span></div>${progress(pct,150)}</div><div class="stats-row"><div class="stat-card"><strong class="stat-value">${state.cleared}</strong><span class="stat-label">things rehomed</span></div><div class="stat-card"><strong class="stat-value">${state.streak}</strong><span class="stat-label">active days</span></div><div class="stat-card"><strong class="stat-value">${money(state.recovered)}</strong><span class="stat-label">value unlocked</span></div></div><div class="section-heading"><h2>Your little keepsakes</h2><span class="tiny muted">Earned, never lost</span></div><div class="badge-grid">${[{title:'First little step',icon:'leaf',earned:true},{title:'A thoughtful giver',icon:'gift',earned:true},{title:'Sunday Sun',icon:'sun',earned:state.sprintCompleted},{title:'Neighborhood bloom',icon:'community',earned:state.offeredIds.length>0}].map(b=>`<div class="badge ${b.earned?'unlocked':''}"><span>${I(b.earned?b.icon:'lock',28)}</span><b>${b.title}</b><small>${b.earned?'Yours to keep':'A little win ahead'}</small></div>`).join('')}</div><div class="memory-card">${I('heart',20)}<div><b>Life happens. Your progress stays.</b><p>Rest days don’t take anything away.</p></div></div><button class="settings-row" data-action="reminder"><span>${I('bell')} A gentle nudge tomorrow</span><span class="toggle ${state.reminder?'on':''}"></span></button><p class="tiny muted">Demo preference only. No real notification is scheduled.</p>${state.pendingDecisions?.some(d=>['trade','donate'].includes(d.action))?button('Finish your planned handoff','finish-handoff','','primary full','gift'):''}<div class="quick-links"><button data-action="journey" data-value="report">${I('shield',20)}<span>Your insurance inventory</span>${I('chevron-right')}</button><button data-action="vault">${I('lock',20)}<span>Private little corner</span>${I('chevron-right')}</button></div>`);
}

function mapView() {
  const room = rooms.find(r=>r.id===selectedRoom) || rooms[0];
  const count = publicItems().filter(x=>x.location?.toLowerCase().includes(selectedRoom==='living'?'living':selectedRoom)).length;
  return page(`${back('A place for everything')}<div class="row between"><span class="tag">YOUR HOME · GROUND FLOOR</span><button class="text-link" data-action="find-plan">Find a floor plan</button></div><div class="floorplan">${floorplanArt(selectedRoom)}</div><div class="map-legend"><span><i></i> Your storage areas</span><span class="tiny muted">Sample floor plan</span></div><div class="section-heading"><h2>Every corner, remembered</h2><span class="tiny muted">4 places</span></div><div class="room-list">${rooms.map(r=>`<button class="room-row ${r.id===selectedRoom?'selected':''}" data-action="room" data-value="${r.id}"><span class="room-color" style="background:${r.color || '#ece5f6'}">${I(r.id==='garage'?'package':r.id==='closet'?'grid':'home',20)}</span><span><b>${esc(r.name)}</b><small>${esc(r.description || 'A home for your favorite things')}</small></span>${I('chevron-right',17)}</button>`).join('')}</div><div class="card map-detail"><p class="eyebrow">${esc(room.name).toUpperCase()}</p><h3>${count} things with a place</h3><p class="subtle">${selectedRoom==='garage'?'Camping gear → Blue bin B3<br>Tools → Shelf A, toolbox':'Tap below to see what’s tucked away here.'}</p>${button('Find my things here','room-items',selectedRoom,'secondary full','search')}</div><p class="tiny muted">Plans suggest areas. You confirm where items actually go.</p>`);
}

function reportView() {
  const items = publicItems();
  const total = items.reduce((a,x)=>a+Number(x.value||0),0);
  return page(`${back('A little peace of mind')}<div class="report-cover"><span class="report-seal">${I('shield',32)}</span><p class="eyebrow">HOUSEHOLD ITEMS REPORT</p><h1>Prepared today.<br>There when you need it.</h1><p>Your home inventory for insurance, all in one place.</p><span class="tag">SAMPLE HOME · OCT 25, 2026</span></div><div class="report-stats"><div><b>${items.length}</b><span>items documented</span></div><div><b>${money(total)}</b><span>illustrative resale total</span></div></div><div class="summary-list"><div><span>${I('camera',17)} Item descriptions & locations</span><b class="green">Included</b></div><div><span>${I('file',17)} Values & missing evidence</span><b class="green">Clearly labeled</b></div><div><span>${I('lock',17)} Protected valuables</span><b>Excluded</b></div><div><span>${I('clock',17)} Snapshot date</span><b>October 25, 2026</b></div></div><div class="notice">${I('shield',18)}<span>Demo figures are resale estimates, not replacement costs or guaranteed insurance payouts.</span></div>${button('Download insurance report','report-pdf','','primary full','download')}${button('Export item spreadsheet','report-csv','','secondary full','file')}<button class="button ghost full" data-action="report-preview">Preview included items ${I('chevron-right',16)}</button><p class="tiny muted center">Real downloads. Sample data. No cloud backup in this demo.</p><div class="memory-card">${I('heart',20)}<div><b>Keep a copy outside your home.</b><p>A simple little step for future peace of mind.</p></div></div>`);
}

function vault() {
  if (!vaultOpen) return page(`${back('The private little corner')}<div class="vault-lock"><div class="vault-illustration">${I('lock',55)}</div><span class="tag">A SPACE JUST FOR YOU</span><h1 class="display-title compact">Some things deserve<br>a little extra care.</h1><p class="subtle">Your valuables stay out of community posts, everyday searches, and reports.</p>${button('Unlock demo vault','unlock','','primary full','lock')}<p class="tiny muted center">No password needed for this prototype.<br>Production authentication is not implemented.</p></div>`);
  const x = protectedItems?.[0] || {name:'Grandma’s gold ring',kind:'ring',value:1200};
  return page(`${back('Your private little corner')}<div class="row between"><span class="tag">${I('lock',13)} DEMO VAULT OPEN</span><button class="text-link" data-action="lock-vault">Lock</button></div><div class="detail-art art-ring">${artwork('ring')}</div><h1 class="display-title compact">${esc(x.name)}</h1><div class="memory-card">${I('heart',20)}<div><b>Irreplaceable.</b><p>Some value will never fit on a price tag.</p></div></div><div class="summary-list"><div><span>Documented value</span><b>${money(x.value)} · sample</b></div><div><span>Community visibility</span><b class="green">Private</b></div><div><span>Insurance report</span><b>Excluded by default</b></div></div><div class="notice">${I('shield',20)}<span>This is a visual prototype. Do not enter real sensitive information.</span></div>${button('Lock my little corner','lock-vault','','primary full','lock')}`);
}

function render() {
  const screens = {home,inventory,item:itemDetail,capture,analyzing,recognition,stored,sprint,community,match:matchView,chat:chatView,profile,map:mapView,report:reportView,vault};
  $('#screen').innerHTML = (screens[view] || home)();
  $('#screen').scrollTop = 0;
  nav();
  renderModal();
  document.title = `Home Space · ${view === 'home' ? 'Make room for good things' : view.charAt(0).toUpperCase()+view.slice(1)}`;
}

function modal(title, body, footer = '') { currentModal = {title,body,footer}; renderModal(); }
function renderModal() {
  $('#modal-root').innerHTML = currentModal ? `<div class="modal-backdrop" data-action="close-modal"><section class="sheet" role="dialog" aria-modal="true" aria-label="${esc(currentModal.title)}"><div class="sheet-handle"></div><div class="sheet-header"><h2>${currentModal.title}</h2><button class="icon-button" data-action="close-modal" aria-label="Close dialog">${I('close')}</button></div><div class="sheet-body">${currentModal.body}</div>${currentModal.footer?`<div class="sheet-actions">${currentModal.footer}</div>`:''}</section></div>` : '';
  if (currentModal) setTimeout(()=>$('#modal-root .sheet button, #modal-root input')?.focus({preventScroll:true}),30);
}
function closeModal() { currentModal=null; renderModal(); }
function earn(points) { state.xp += points; save(); }
function startSprint() {
  if (state.sprintCompleted) { modal('A lovely place to pause', '<p>You’ve finished today’s three-item reset. Your points and Sunday Sun are yours to keep.</p><p>Want to revisit the journey for the demo? It won’t award points twice.</p>',button('Replay the sprint','replay-sprint','','primary full')+button('Enjoy my little win','close-modal','','ghost full')); return; }
  sprintIndex=0; decisions=[]; sprintAward=0; navigate('sprint','home');
}
function startScan() {
  scanStep=0; view='analyzing'; activeTab='capture'; render(); const token=++scanToken;
  [700,1450,2150].forEach((ms,i)=>setTimeout(()=>{if(token!==scanToken||view!=='analyzing')return;scanStep=i+1;render();},ms));
  setTimeout(()=>{if(token!==scanToken||view!=='analyzing')return;targetLocation=selectedSample.location;view='recognition';render();},2750);
}

function download(name, content, type) {
  const blob = new Blob([content],{type}); const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function pdfEscape(s) { return String(s).normalize('NFKD').replace(/[^\x20-\x7E]/g,' ').replace(/([\\()])/g,'\\$1'); }
function buildPDF() {
  const items=publicItems();
  const lines=[['HOME SPACE',22],['Household Items Report for Insurance',17],['DEMO DOCUMENT - FICTIONAL INVENTORY AND VALUES',10],['Sample home | Oakland, CA | October 25, 2026',10],['',10],['Inventory snapshot',14],...items.flatMap((x,i)=>[[`${i+1}. ${x.name} | Quantity: 1 | ${x.condition || 'Good condition'}`,11],[`Location: ${x.location || 'Awaiting placement'}`,9],[`Illustrative resale estimate: ${money(x.value)} | Receipt/serial: not recorded`,9],['',6]]),['',10],[`Total illustrative resale value: ${money(items.reduce((s,x)=>s+Number(x.value||0),0))}`,12],['Purchase costs, replacement costs and appraisals are not recorded.',9],['These estimates do not determine insurance coverage or reimbursement.',9],['Protected valuables are excluded. Item illustrations are not ownership evidence.',9],['Sample data only. Keep a real inventory and evidence backed up outside your home.',9]];
  const pages=[];let current=[],y=755;
  for(const [text,size] of lines){if(y<size+60){pages.push(current);current=[];y=755;}current.push({text,size,y});y-=size+7;} if(current.length)pages.push(current);
  const objects=[];objects[1]='<< /Type /Catalog /Pages 2 0 R >>';objects[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  const kids=[];pages.forEach((p,i)=>{const pid=4+i*2,cid=pid+1;kids.push(`${pid} 0 R`);const stream=p.map(({text,size,y})=>`BT /F1 ${size} Tf ${size>13?'0.31 0.24 0.43':'0.18 0.17 0.21'} rg 44 ${y} Td (${pdfEscape(text)}) Tj ET`).join('\n');objects[pid]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${cid} 0 R >>`;objects[cid]=`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;});objects[2]=`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${pages.length} >>`;
  let out='%PDF-1.4\n';const offsets=[0];for(let i=1;i<objects.length;i++){offsets[i]=out.length;out+=`${i} 0 obj\n${objects[i]}\nendobj\n`;}const xref=out.length;out+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;for(let i=1;i<objects.length;i++)out+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';out+=`trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;return out;
}

document.addEventListener('click', event => {
  const roomTarget=event.target.closest('[data-room]');if(roomTarget && rooms.some(r=>r.id===roomTarget.dataset.room)){selectedRoom=roomTarget.dataset.room;render();return;}
  const el=event.target.closest('[data-action]'); if(!el)return;
  if(el.classList.contains('modal-backdrop') && event.target!==el)return;
  const a=el.dataset.action,v=el.dataset.value;
  if(a==='close-modal'){closeModal();return;}
  if(a==='nav'||a==='journey'){if(v==='sprint'){startSprint();return;}if(v==='capture'){photoUrl='';selectedSample=sampleItems[0];}navigate(v,['home','inventory','capture','community','profile'].includes(v)?v:(v==='map'?'inventory':'profile'));return;}
  if(a==='back'){navigate(['recognition','stored','match'].includes(view)?'capture':['chat'].includes(view)?'community':['map','item','vault'].includes(view)?'inventory':'home',['recognition','stored','match'].includes(view)?'capture':['chat'].includes(view)?'community':['map','item','vault'].includes(view)?'inventory':'home');return;}
  if(a==='reset'){modal('A fresh start for the demo?','<p>This resets only the sample items, points, and demo conversations in this browser.</p>',button('Reset demo','confirm-reset','','primary full')+button('Keep my progress','close-modal','','ghost full'));return;}
  if(a==='confirm-reset'){state=fresh();save();vaultOpen=false;photoUrl='';query='';inventoryFilter='All';communityFilter='Wanted';selectedPost=null;selectedSample=sampleItems[0];navigate('home','home');toast('Fresh sample home. All yours to explore.');return;}
  if(a==='notifications'){modal('A gentle little nudge',`<div class="quest-card"><span class="quest-icon">${I('leaf',24)}</span><div class="quest-body"><h3>Five minutes for a lighter day?</h3><p class="subtle">Your garage shelf is ready for a little reset.</p></div></div><div class="notice">${I('heart',18)}<span>No rush. Your progress isn’t going anywhere.</span></div>`,button('Start my little reset','begin-sprint','','primary full'));return;}
  if(a==='start-sprint'||a==='begin-sprint'){closeModal();startSprint();return;}
  if(a==='replay-sprint'){sprintIndex=0;decisions=[];sprintAward=0;navigate('sprint','home');return;}
  if(a==='exit-sprint'){modal('Pause is part of progress.','<p>Your stuff will be here when you’re ready. There’s nothing to lose.</p>',button('Keep going','close-modal','','primary full')+button('Back to today','nav','home','ghost full'));return;}
  if(a==='decide'){
    decisions.push({id:sprintItems[sprintIndex].id,action:v});sprintIndex++;
    if(sprintIndex===sprintItems.length&&!state.sprintCompleted){state.sprintCompleted=true;sprintAward=60;state.xp+=60;state.weeklyDone+=3;state.pendingDecisions=decisions;save();}
    render();if(sprintIndex<sprintItems.length)toast(v==='keep'?'Keeping what matters is a win.':v==='later'?'A little breathing room. No pressure.':v==='trade'?'A new chapter is waiting.':'Added to your donation plan.');return;
  }
  if(a==='finish-handoff'){modal('Make the little win real',`<p>Ready-to-go items stay in your home until you confirm they’ve left.</p><div class="summary-list">${(state.pendingDecisions||decisions).filter(d=>['trade','donate'].includes(d.action)).map(d=>`<div><span>${esc(itemById(d.id)?.name||d.id)}</span><b>${d.action==='donate'?'Donation':'Community handoff'}</b></div>`).join('')}</div>`,button('Confirm demo handoff','confirm-handoff','','primary full','check'));return;}
  if(a==='confirm-handoff'){let n=0;(state.pendingDecisions||[]).filter(d=>['trade','donate'].includes(d.action)).forEach(d=>{const x=itemById(d.id);if(x&&!['donated','traded'].includes(x.status)){x.status=d.action==='donate'?'donated':'traded';n++;}});state.cleared+=n;state.pendingDecisions=[];save();navigate('profile','profile');toast(`${n} things, a new beginning. Lovely work.`);return;}
  if(a==='filter'){inventoryFilter=v;render();return;}
  if(a==='item'){selectedItem=itemById(v);navigate('item','inventory');return;}
  if(a==='sample'){selectedSample=sampleItems.find(x=>x.id===v)||sampleItems[0];photoUrl='';render();return;}
  if(a==='upload'){$('#photo-input').click();return;}
  if(a==='scan'){startScan();return;}
  if(a==='sentiment'){sentiment=v;const scroll=$('#screen').scrollTop;render();$('#screen').scrollTop=scroll;return;}
  if(a==='choose-location'||a==='move-item'){modal('Find its little place',`<p class="subtle">Related things are easier to find together.</p>${['Garage / Blue bin B3','Garage / Shelf A, toolbox','Closet / Top shelf','Living room / Reading corner'].map(l=>button(esc(l),a==='move-item'?'move-to':'select-location',l,'secondary full','location')).join('')}`);return;}
  if(a==='select-location'){targetLocation=v;closeModal();render();return;}
  if(a==='move-to'){selectedItem.location=v;save();closeModal();render();toast('New spot remembered. Future you thanks you.');return;}
  if(a==='store'){
    if(hasExited(selectedSample.id)){toast('This item already found a new home. Try another sample.');return;}
    let x=itemById(selectedSample.id);if(!x){x={...selectedSample};state.items.push(x);}x.location=targetLocation||selectedSample.location;x.status='stored';x.story=sentiment==='Special'?'A little thing with a lot of meaning.':x.story;
    storedAward=0;if(!state.savedIds.includes(x.id)){state.savedIds.push(x.id);state.xp+=20;storedAward=20;}save();navigate('stored','capture');return;
  }
  if(a==='match'){selectedPost=selectedSample.request; navigate('match','community');return;}
  if(a==='post'){
    selectedPost=allPosts().find(p=>p.id===v);
    if(!selectedPost)return;
    if(selectedPost.owned){modal('Your neighborhood wish',`<p>${esc(selectedPost.item)}</p><div class="notice">${I('heart',18)}<span>Your local demo request is saved. A neighbor’s offer would appear here.</span></div>`,button('Close','close-modal','','primary full'));return;}
    const candidate=sampleItems.find(s=>s.kind===selectedPost.kind&&!hasExited(s.id));
    if(!candidate){modal('A wish from your neighborhood',`<p>“${esc(selectedPost.message)}”</p><p class="subtle">No available item in your sample inventory matches this request right now.</p>`,button('Explore my stuff','nav','inventory','primary full'));return;}
    selectedSample=candidate;navigate('match','community');return;
  }
  if(a==='return-result'){navigate('recognition','capture');return;}
  if(a==='send-offer'){if(hasExited(selectedSample.id)){toast('This item already found a new home. Try another sample.');return;}const x=itemById(selectedSample.id);if(x)x.status='offered';if(!state.offeredIds.includes(selectedSample.id)){state.offeredIds.push(selectedSample.id);state.xp+=15;}save();navigate('chat','community');toast('Demo offer sent. A new little connection.');return;}
  if(a==='complete-trade'){modal('A good thing, passed on',`<div class="celebration-mini">${mascotArt('happy')}</div><p>Confirm your simulated handoff with ${esc((selectedPost||selectedSample.request)?.name||'your neighbor')}.</p><p class="tiny muted">No money moves and no real person is contacted.</p>`,button('Confirm handoff · +30 points','confirm-trade','','primary full','check'));return;}
  if(a==='confirm-trade'){const x=itemById(selectedSample.id);if(x&&!hasExited(x.id)){x.status='traded';state.completedTradeIds.push(x.id);state.cleared++;state.xp+=30;state.recovered+=Number(x.value||0);}save();navigate('profile','profile');toast('A new home for your stuff. A little room for you.');return;}
  if(a==='community-filter'){communityFilter=v;render();return;}
  if(a==='offer-item'){
    selectedItem=itemById(v);if(!selectedItem||hasExited(v))return;
    const sample=sampleItems.find(s=>s.id===v);
    if(sample){selectedSample=sample;selectedPost=sample.request;navigate('match','community');return;}
    modal('A new chapter is possible',`<div class="recognition-thumb">${artwork(selectedItem.kind)}</div><h3>${esc(selectedItem.name)}</h3><p>No matching wanted request yet. Offer this item to your demo neighborhood.</p><div class="notice">${I('lock',18)}<span>Only the item name and general area appear. Your exact storage location and private story stay hidden.</span></div>`,button('Publish demo offer','publish-offer',v,'primary full','community'));return;
  }
  if(a==='publish-offer'){const x=itemById(v);if(!x||hasExited(v))return;x.status='offered';if(!state.offeredIds.includes(v)){state.offeredIds.push(v);state.xp+=15;}save();communityFilter='Available';navigate('community','community');toast('Your demo offer is ready for a new chapter.');return;}
  if(a==='keep-item'){toast('A place in your home, and in your life.');return;}
  if(a==='room'){selectedRoom=v;render();return;}
  if(a==='room-items'){inventoryFilter=v==='living'?'Living':v[0].toUpperCase()+v.slice(1);query='';navigate('inventory','inventory');return;}
  if(a==='find-plan'){modal('Let’s get to know your home',`<label class="form-label" for="demo-address">YOUR HOME ADDRESS</label><input class="input" id="demo-address" placeholder="Try: 124 Maple Avenue" value="124 Maple Avenue"><div class="notice">${I('map',20)}<span>This demo opens a sample plan. No address is searched or sent anywhere.</span></div>`,button('Find sample floor plan','load-plan','','primary full','search'));return;}
  if(a==='load-plan'){closeModal();toast('Sample plan found. Confirm the rooms before storing.');return;}
  if(a==='report-pdf'){download('Home-Space-Insurance-Inventory-DEMO.pdf',buildPDF(),'application/pdf');state.reportCount++;save();toast('Your demo insurance PDF is downloaded.');return;}
  if(a==='report-csv'){const rows=[['Item','Category','Location','Quantity','Illustrative resale USD','Condition','Evidence'],...publicItems().map(x=>[x.name,x.category,x.location,1,x.value,x.condition||'Good','Demo record; receipt/serial not recorded'])];download('Home-Space-Inventory-DEMO.csv',rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n'),'text/csv;charset=utf-8');toast('Your inventory spreadsheet is downloaded.');return;}
  if(a==='report-preview'){modal('Your report, at a glance',`<p class="tiny muted">SAMPLE INVENTORY · PRIVATE ITEMS EXCLUDED</p><div class="summary-list">${publicItems().map(x=>`<div><span>${esc(x.name)}</span><b>${money(x.value)}</b></div>`).join('')}</div><p class="tiny muted">Values are illustrative resale estimates. Receipts and serial numbers are not recorded in this demo.</p>`,button('Download PDF','report-pdf','','primary full','download'));return;}
  if(a==='vault'){vaultOpen=false;navigate('vault','inventory');return;}
  if(a==='unlock'){vaultOpen=true;render();return;}
  if(a==='lock-vault'){vaultOpen=false;render();return;}
  if(a==='reminder'){state.reminder=!state.reminder;save();const scroll=$('#screen').scrollTop;render();$('#screen').scrollTop=scroll;toast(state.reminder?'Gentle nudge enabled for the demo.':'A little quiet. Nudges turned off.');return;}
  if(a==='new-post'){modal('What are you looking for?',`<label class="form-label" for="wanted-text">GIVE YOUR REQUEST A LITTLE TITLE</label><input class="input" id="wanted-text" placeholder="A plant for my reading corner" maxlength="80"><p class="tiny muted">This creates a local demo post. It won’t reach real people.</p>`,button('Post my demo request','create-post','','primary full','plus'));return;}
  if(a==='create-post'){const value=$('#wanted-text')?.value.trim();if(!value){toast('Give your request a little title first.');return;}state.customPosts.unshift({id:'local-'+Date.now(),owned:true,name:'You',initials:'J',area:'Temescal',item:value,kind:'box',budget:'Open to trade',message:value,tag:'YOUR DEMO REQUEST'});save();communityFilter='Wanted';closeModal();render();toast('A little wish, shared with your demo neighbors.');return;}
  if(a==='settings'){modal('Your space, your pace',`<div class="settings-row"><span>${I('shield')} Private by default</span><b>Always</b></div><div class="settings-row"><span>${I('heart')} Rest days</span><b>Welcome</b></div><div class="settings-row"><span>${I('sparkles')} Demo mode</span><b>On</b></div><p class="subtle">No account, ads, or purchases. Sample values and community activity. Local browser storage only.</p>`,button('Reset this demo','reset','','secondary full','refresh'));return;}
});

document.addEventListener('input',event=>{
  if(event.target.id==='inventory-search'){query=event.target.value;const pos=event.target.selectionStart;const scroll=$('#screen').scrollTop;render();const input=$('#inventory-search');input.focus({preventScroll:true});try{input.setSelectionRange(pos,pos);}catch{}$('#screen').scrollTop=scroll;}
});
document.addEventListener('submit',event=>{
  if(event.target.id==='chat-form'){event.preventDefault();const msg=$('#chat-message').value.trim();if(!msg)return;(state.messagesByThread[threadKey()] ||= []).push(msg);save();render();$('#screen').scrollTop=$('#screen').scrollHeight;toast('Demo message added. No real message sent.');}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&currentModal)closeModal();});
$('#photo-input').addEventListener('change',event=>{const file=event.target.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){toast('Choose an image to try this journey.');return;}if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=URL.createObjectURL(file);render();toast('Photo stays local. Analysis uses the selected demo item.');event.target.value='';});
render();
