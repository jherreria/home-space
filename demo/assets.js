let artSequence = 0;

const iconPaths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  scan: '<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3M7 12h10"/><rect x="8" y="8" width="8" height="8" rx="2"/>',
  community: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m3 9v-2a6 6 0 0 0-2-4.5"/>',
  leaf: '<path d="M20 4C9 2 3 7 4 14c.7 6 8 7 12 2 3-4 4-8 4-12Z"/><path d="M4 21 15 10m-5 5v-5m0 5h5"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM21 2v4m-2-2h4M3 19v4m-2-2h4"/>',
  'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  'arrow-left': '<path d="M20 12H4m6-6-6 6 6 6"/>',
  'chevron-right': '<path d="m9 5 7 7-7 7"/>',
  'chevron-down': '<path d="m5 9 7 7 7-7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  bell: '<path d="M5 16h14l-2-3V9A5 5 0 0 0 7 9v4Zm5 4a2 2 0 0 0 4 0M12 2v2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
  shield: '<path d="m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5Z"/><path d="m8 12 3 3 5-6"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8m-8 4h6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  heart: '<path d="M20 5a5 5 0 0 0-7 0l-1 1-1-1a5 5 0 0 0-7 7l8 8 8-8a5 5 0 0 0 0-7Z"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Zm6-3v15m6-12v15"/>',
  location: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  flame: '<path d="M13 2c2 5-4 6-3 10 2-1 4-2 5-5 3 3 5 6 4 10-1 3-4 5-7 5s-7-2-7-6c0-6 6-7 8-14Z"/>',
  camera: '<path d="M3 7h4l2-3h6l2 3h4v13H3Z"/><circle cx="12" cy="13" r="4"/>',
  more: '<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>',
  gift: '<path d="M3 8h18v4H3Zm2 4v9h14v-9M12 8v13m0-13H7a3 3 0 1 1 3-3Zm0 0h5a3 3 0 1 0-3-3Z"/>',
  trophy: '<path d="M7 3h10v6a5 5 0 0 1-10 0Zm0 2H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 2v5m-4 2h8"/>',
  message: '<path d="M21 11a9 9 0 0 1-9 9H4l-3 3V11a10 10 0 0 1 20 0Z"/><path d="M7 10h9m-9 4h6"/>',
  refresh: '<path d="M20 8a8 8 0 0 0-13-4L3 8m0-5v5h5m-4 8a8 8 0 0 0 13 4l4-4m0 5v-5h-5"/>',
  settings: '<path d="m10 2-.7 3-2 .8L4.7 4 2 8l2.4 2v3L2 15l2.7 4 2.6-1.8 2 .8.7 3h4l.7-3 2-.8 2.6 1.8 2.7-4-2.4-2v-3L22 8l-2.7-4-2.6 1.8-2-.8L14 2Z"/><circle cx="12" cy="11.5" r="3"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  moon: '<path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  bolt: '<path d="m14 2-10 12h7l-1 8 10-12h-7Z"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  external: '<path d="M14 3h7v7m0-7-11 11m-1-11H4v17h17v-5"/>',
  printer: '<path d="M7 8V3h10v5M7 17H3v-7h18v7h-4M7 14h10v7H7Zm10-3h1"/>',
  pause: '<path d="M8 5v14m8-14v14"/>',
  play: '<path d="m7 4 14 8-14 8Z"/>',
  volume: '<path d="m11 4-6 5H2v6h3l6 5Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  star: '<path d="m12 2 3 6.5 7 1-5 5 1 7-6-3.5L6 21l1-6.5-5-5 7-1Z"/>',
  package: '<path d="m12 2 9 5v10l-9 5-9-5V7Zm-9 5 9 5 9-5m-9 5v10M7 5l9 5"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>',
};

export function icon(name, size = 24) {
  return `<svg width="${Number(size) || 24}" height="${Number(size) || 24}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="icon">${iconPaths[name] || iconPaths.sparkles}</svg>`;
}

const itemShapes = {
  tent: `<path d="M18 113 65 28h39l44 85Z" fill="#9aa58d"/><path d="m65 28 45 85H18Z" fill="#c9c9a8"/><path d="m65 45 29 68H37Z" fill="#4f3f70"/><path d="m65 45 4 68H37Z" fill="#71617e"/><path d="m65 28 45 85m-92 0h130" fill="none" stroke="#526350" stroke-width="3"/><path d="m22 105-13 9m134-9 12 10" stroke="#4f3f70" stroke-width="2"/><path d="m106 40 19 35-15 38" fill="none" stroke="#7d8d72" stroke-width="2"/><path d="m65 50 1 19" stroke="#e5dba3" stroke-width="2"/>`,
  drill: `<path d="m43 49 63-4 3 33-24 3-4 29-27 1 6-31-17-1Z" fill="#cba64d"/><rect x="37" y="41" width="67" height="39" rx="9" fill="#e5c764"/><path d="M94 45h21v28H94" fill="#4b4b50"/><path d="M115 52h18v14h-18" fill="#797a79"/><path d="M133 58h19v3h-19" fill="#5d5b61"/><path d="m63 79-5 28h20l4-28" fill="#55535b"/><rect x="48" y="105" width="43" height="15" rx="5" fill="#504e57"/><rect x="45" y="52" width="29" height="5" rx="2" fill="#f4df91"/><path d="M46 64h19m-19 5h19" stroke="#b39442" stroke-width="3"/><path d="M82 82h9v9H80" fill="#b49649"/>`,
  lamp: `<ellipse cx="80" cy="117" rx="31" ry="6" fill="#d7ac69"/><path d="M77 58h7v54h-7" fill="#a17748"/><path d="M80 62v46" stroke="#edd6ad" stroke-width="2"/><path d="M61 26h38l21 44H40Z" fill="#dbaf85"/><path d="M66 26h26l13 44H54Z" fill="#ebc6a7"/><ellipse cx="80" cy="70" rx="40" ry="5" fill="#bd8c67"/><ellipse cx="80" cy="71" rx="31" ry="3" fill="#f5deb1"/><path d="M103 74v17" stroke="#7f6754" stroke-width="1.5"/><circle cx="103" cy="92" r="2" fill="#7f6754"/>`,
  boots: `<path d="m39 33 32 3-2 47 19 15c12 10 6 22-6 22H29c-7 0-9-6-7-12l10-34Z" fill="#7b735d"/><path d="m83 29 32 4-2 48 19 13c13 9 9 23-5 23H81c-11 0-14-7-11-14l9-30Z" fill="#a78c69"/><path d="M81 111h50m-105 3h59" stroke="#4e4b44" stroke-width="8" stroke-linecap="round"/><path d="m87 40 20 2m-22 9 21 2m-24 9 21 2m-23 9 22 2" stroke="#e2c9a0" stroke-width="2.5"/><path d="m42 43 19 2m-20 8 19 2m-22 8 20 2m-22 8 20 2" stroke="#c8bf9d" stroke-width="2.5"/><path d="m114 88 13 11m-57-7 11 10" stroke="#d2b78e" stroke-width="3" stroke-linecap="round"/>`,
  camera: `<path d="m57 41 6-12h35l6 12" fill="#69646b"/><rect x="26" y="42" width="111" height="67" rx="12" fill="#746e75"/><path d="M26 62h111v34a13 13 0 0 1-13 13H39a13 13 0 0 1-13-13Z" fill="#514c55"/><circle cx="81" cy="76" r="29" fill="#bcb1b1"/><circle cx="81" cy="76" r="24" fill="#363a49"/><circle cx="81" cy="76" r="17" fill="#6c7888"/><circle cx="81" cy="76" r="11" fill="#3f4a62"/><circle cx="75" cy="70" r="6" fill="#a8b6c0" opacity=".65"/><rect x="36" y="50" width="18" height="8" rx="2" fill="#e5d8c1"/><circle cx="120" cy="53" r="3" fill="#dfac7c"/><rect x="112" y="35" width="13" height="8" rx="3" fill="#443f48"/>`,
  vase: `<path d="M64 27h32v15c0 13 26 22 27 43 2 23-13 38-43 38S35 108 37 85c1-21 27-30 27-43Z" fill="#bf8b79"/><path d="M68 31h10v13c0 14-26 30-25 44 0 18 13 29 20 31-24-2-33-15-30-35 3-17 25-26 25-40Z" fill="#d9a392"/><ellipse cx="80" cy="28" rx="16" ry="4" fill="#8b6155"/><path d="M80 28C75 5 53 8 52 0m28 28c3-17 17-25 24-26" stroke="#7b8b6d" stroke-width="3" fill="none"/><path d="M74 16C58 18 55 7 53 3c17-1 20 7 21 13m12-4c0-15 13-13 17-11-1 13-11 12-17 11" fill="#9cae8d"/>`,
  guitar: `<g transform="rotate(18 80 75)"><path d="M75 15h12v65H75" fill="#9b6949"/><rect x="72" y="6" width="19" height="24" rx="5" fill="#a47752"/><path d="M72 10h-5m5 8h-5m24-8h5m-5 8h5" stroke="#6b6362" stroke-width="3"/><path d="M58 59c-13 1-17 15-12 25-23 18-11 44 18 47 35 4 55-20 37-42 12-13 7-26-7-28-12-1-18 7-20 8-5-8-8-10-16-10Z" fill="#d8a36b"/><path d="M54 85c-19 24-4 40 19 41" fill="none" stroke="#e8b981" stroke-width="5"/><circle cx="77" cy="88" r="12" fill="#644b45"/><circle cx="77" cy="88" r="15" fill="none" stroke="#a77750" stroke-width="2"/><rect x="63" y="109" width="28" height="5" rx="1" fill="#6e5043"/><path d="M78 21v92m4-92v92" stroke="#edd4a2" stroke-width="1"/></g>`,
  kettle: `<path d="M108 52c40-6 39 49 2 46" fill="none" stroke="#5d7168" stroke-width="10"/><path d="m44 79-22-16 7 31 20 11" fill="#92a99a"/><path d="M54 49h46c3 0 24 30 24 51 0 18-15 24-44 24s-47-7-47-23c0-21 17-52 21-52Z" fill="#adc1af"/><path d="M51 61c-8 13-13 28-10 42 2 9 9 13 20 15" stroke="#d5dfcc" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M52 50h51" stroke="#647b6f" stroke-width="6" stroke-linecap="round"/><path d="M62 44c0-17 27-17 28 0" fill="none" stroke="#63766b" stroke-width="7"/><circle cx="78" cy="33" r="4" fill="#ad8c63"/>`,
  box: `<path d="m28 50 51-21 53 20-52 25Z" fill="#d6b890"/><path d="m28 50 52 24v48l-52-25Z" fill="#bb9772"/><path d="m80 74 52-25v49l-52 24Z" fill="#caa77f"/><path d="m54 39 53 22v15l-14 7V67L40 46Z" fill="#e5cda8"/><path d="m28 50 52 24 52-25M80 74v48" fill="none" stroke="#a58565" stroke-width="2"/><path d="m95 91 22-10v12l-22 10Z" fill="#f4e5ca"/><path d="m98 92 12-5m-12 9 16-7" stroke="#bda681" stroke-width="1.5"/>`,
  ring: `<ellipse cx="79" cy="88" rx="31" ry="34" fill="none" stroke="#bc9444" stroke-width="11"/><ellipse cx="79" cy="88" rx="31" ry="34" fill="none" stroke="#ebcd76" stroke-width="6"/><path d="m59 41 11-17h19l13 17-22 27Z" fill="#c5d6d7"/><path d="m59 41 21 27 22-27Z" fill="#a6bfc7"/><path d="m70 24 10 44 9-44m-30 17h43" fill="none" stroke="#edf4ec" stroke-width="2"/><path d="M113 34v11m-5-5h11M45 54v8m-4-4h8" stroke="#e8c46b" stroke-width="2" stroke-linecap="round"/>`,
};

export function itemArt(kind, className = '') {
  const cls = String(className).replace(/[^a-zA-Z0-9 _-]/g, '');
  return `<svg viewBox="0 0 160 145" fill="none" class="item-art ${cls}" role="img" aria-label="${Object.hasOwn(itemShapes, kind) ? kind : 'item'} illustration"><ellipse cx="80" cy="126" rx="49" ry="7" fill="#443a55" opacity=".08"/>${itemShapes[kind] || itemShapes.box}</svg>`;
}

export function mascotArt(mood = 'happy') {
  const eyes = mood === 'sleepy' ? '<path d="M48 56q5 5 10 0m18 0q5 5 10 0" stroke="#4f3f70" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<ellipse cx="53" cy="56" rx="3" ry="4" fill="#4f3f70"/><ellipse cx="81" cy="56" rx="3" ry="4" fill="#4f3f70"/>';
  return `<svg viewBox="0 0 132 118" fill="none" class="mascot-art" aria-hidden="true"><ellipse cx="65" cy="105" rx="34" ry="6" fill="#4f3f70" opacity=".09"/><path d="M64 12c7-4 15 13 23 17 8 4 27-1 29 7 3 8-11 18-12 27-1 8 9 23 3 29-7 6-23-1-31 1-8 2-15 17-24 14-8-3-8-20-14-27-5-6-23-8-23-17 0-8 17-14 22-22 4-8 6-25 15-24 4 0 8-4 12-5Z" fill="#f1cf77"/><path d="M42 37c3-9 5-17 10-17" stroke="#fae4ac" stroke-width="6" stroke-linecap="round"/><ellipse cx="43" cy="67" rx="7" ry="4" fill="#d69b81" opacity=".6"/><ellipse cx="91" cy="67" rx="7" ry="4" fill="#d69b81" opacity=".6"/>${eyes}<path d="M59 70q8 8 16 0" stroke="#4f3f70" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="m17 27-4-7m102 57 8 2" stroke="#a798c2" stroke-width="3" stroke-linecap="round"/></svg>`;
}

export function roomArt(progress = 0) {
  const clean = Number(progress) >= 3;
  const id = `room-${artSequence++}`;
  return `<svg viewBox="0 0 350 190" fill="none" class="room-art" aria-label="A cozy room getting a little more organized" role="img"><defs><linearGradient id="${id}-wall" x1="56" y1="20" x2="251" y2="127" gradientUnits="userSpaceOnUse"><stop stop-color="#e9e2f0"/><stop offset="1" stop-color="#d2c5e0"/></linearGradient></defs><ellipse cx="180" cy="167" rx="143" ry="16" fill="#746181" opacity=".08"/><path d="m35 123 122-62 157 63-125 56Z" fill="#dbc7af"/><path d="M35 32 157 7v111L35 153Z" fill="#ede7ee"/><path d="m157 7 157 33v113l-157-35Z" fill="url(#${id}-wall)"/><path d="m35 153 154 28 125-28-157-35Z" fill="#e4d3bd"/><path d="m45 148 146 26m-110-38 146 27m-109-37 145 26m-108-38 145 26" stroke="#c9af95" stroke-width="1" opacity=".55"/>
  <path d="M66 50c0-17 35-29 35-12v47l-35 10Z" fill="#fff9df"/><path d="M83 40v50M66 67l35-10" stroke="#e0d3b6" stroke-width="3"/><path d="m65 96 38-11v5L65 101Z" fill="#b9a28b"/>
  <path d="m219 53 73 17v78l-73-17Z" fill="#a88c76"/><path d="m224 59 62 14v64l-62-14Z" fill="#bca690"/><path d="m219 91 73 17m-73 18 73 17" stroke="#91765f" stroke-width="5"/><path d="M220 53v83m72-67v84" stroke="#8e735f" stroke-width="5" stroke-linecap="round"/>
  <path d="m230 65 21 5v17l-21-5Z" fill="#c8b4dc"/><path d="m257 71 21 5v17l-21-5Z" fill="#cfb16d"/><path d="m237 74 7 2m20 4 7 2" stroke="#fff5db" stroke-width="3" stroke-linecap="round"/>
  <path d="m230 101 20 5v17l-20-5Z" fill="#a1b6a2"/><path d="m257 107 21 5v17l-21-5Z" fill="#ddd4be"/><path d="m237 110 7 2m20 4 7 2" stroke="#f3ecd9" stroke-width="3" stroke-linecap="round"/>
  <path d="m166 98 35 8v28l-35-8Z" fill="#bba4cc"/><path d="m162 93 39 9 9 7-38-8Z" fill="#d6c5e1"/><path d="m201 102 9 7v28l-9-3Z" fill="#9c83b2"/><path d="m175 111 15 4" stroke="#efe3f4" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="120" cy="151" rx="40" ry="10" fill="#b8b891"/><ellipse cx="120" cy="149" rx="35" ry="7" fill="#c9c7a4"/>
  <path d="M54 119h19l-3 20H58Z" fill="#bb8974"/><path d="M63 121V96" stroke="#68866a" stroke-width="2"/><path d="M63 110c-14 1-16-10-13-15 12 1 14 8 13 15m0-9c1-13 12-15 16-11-1 11-9 14-16 11m1 17c8-11 16-7 17-3-5 9-11 8-17 3" fill="#8da886"/>
  ${clean ? '<path d="m112 122 12-20 12 20Z" fill="#e6c66e"/><path d="m125 113 7 6-7 7" stroke="#fff3ca" stroke-width="2"/><path d="M113 133h24" stroke="#b6aa83" stroke-width="3" stroke-linecap="round"/>' : '<g><path d="m87 121 26-6 22 13-27 7Z" fill="#d5b88b"/><path d="m87 121 21 14v22l-21-13Z" fill="#c4a27b"/><path d="m108 135 27-7v22l-27 7Z" fill="#b78f6a"/><path d="m89 119-9-8 28-6 5 10m0 0 8-8 25 12-11 9" fill="#e5cda7"/><path d="m113 142 12-3" stroke="#f4e7cb" stroke-width="4" stroke-linecap="round"/></g>'}
  ${Number(progress) > 0 ? '' : '<path d="m145 146 17-11 25 7-17 12Z" fill="#c4acd7"/><path d="m145 146 25 8v8l-25-8Z" fill="#ae8dc8"/><path d="m170 154 17-12v8l-17 12Z" fill="#9875b2"/>'}
  <path d="M187 34v8m-4-4h8M303 21v10m-5-5h10" stroke="#f6d774" stroke-width="2.5" stroke-linecap="round"/>
  <path d="m190 62 17 4v14l-17-4Z" fill="#f7edd5"/><path d="m193 72 4-4 7 8" stroke="#bba4cd" stroke-width="2"/>
  </svg>`;
}

export function floorplanArt(active = 'garage') {
  const regions = [
    { id: 'garage', x: 21, y: 22, w: 126, h: 119, label: 'Garage', count: '24 items', cx: 84, cy: 78 },
    { id: 'kitchen', x: 155, y: 22, w: 182, h: 97, label: 'Kitchen', count: '18 items', cx: 246, cy: 68 },
    { id: 'closet', x: 21, y: 149, w: 126, h: 107, label: 'Closet', count: '12 items', cx: 84, cy: 202 },
    { id: 'living', x: 155, y: 127, w: 182, h: 129, label: 'Living room', count: '16 items', cx: 246, cy: 192 },
  ];
  return `<svg viewBox="0 0 360 280" class="floorplan-art" role="img" aria-label="Home storage map"><rect x="10" y="10" width="339" height="258" rx="12" fill="#f7f4ec"/><path d="M18 18h323v242H18Z" fill="none" stroke="#9e95a4" stroke-width="5"/>${regions.map(r => `<g data-room="${r.id}"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="3" fill="${active === r.id ? '#ded1ed' : '#eae7df'}"/><text x="${r.cx}" y="${r.cy}" text-anchor="middle" fill="${active === r.id ? '#4f3f70' : '#7d7881'}" font-family="system-ui,sans-serif" font-size="12" font-weight="650">${r.label}</text><text x="${r.cx}" y="${r.cy + 17}" text-anchor="middle" fill="#8a8390" font-family="system-ui,sans-serif" font-size="9">${r.count}</text>${active === r.id ? `<circle cx="${r.cx}" cy="${r.cy - 21}" r="7" fill="#7c65a6"/><path d="m${r.cx - 3} ${r.cy - 21} 2 2 4-4" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` : ''}</g>`).join('')}<path d="M151 18v75m0 28v46m0 31v62M18 145h53m28 0h52m0-22h69m31 0h90" stroke="#aaa1ac" stroke-width="5"/><path d="M71 145v-28a28 28 0 0 1 28 28M151 167h30a30 30 0 0 1-30 31m69-75V96a27 27 0 0 1 31 27" stroke="#c0b6c5" stroke-width="1.4" fill="none"/><path d="M18 54v40m323-46v42m-81 170h42" stroke="#b5cad0" stroke-width="6"/><rect x="29" y="29" width="104" height="11" rx="2" fill="#b5a2c5" opacity=".6"/><rect x="166" y="30" width="159" height="13" rx="3" fill="#c6c9b7"/><path d="M168 42v59h16V42" fill="#c6c9b7"/><rect x="31" y="159" width="17" height="83" rx="3" fill="#c9b79e"/><rect x="284" y="149" width="39" height="75" rx="8" fill="#c3b6cc"/><rect x="213" y="226" width="56" height="17" rx="5" fill="#c3b6cc"/></svg>`;
}
