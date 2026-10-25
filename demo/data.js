// All people, requests, prices, and inventory records below are fictional demo data.
// Monetary amounts are illustrative USD values, not appraisals or live offers.

export const seedItems = [
  { id: 'tent', name: 'North Face 2-person tent', kind: 'tent', category: 'Outdoors', location: 'Garage / Blue bin B3', value: 98, condition: 'Great', story: 'A few weekends under the stars.', status: 'stored' },
  { id: 'drill', name: 'Cordless drill', kind: 'drill', category: 'Tools', location: 'Garage / Tool shelf A1', value: 65, condition: 'Good', story: 'Ready for the next little project.', status: 'stored' },
  { id: 'lamp', name: 'Little reading lamp', kind: 'lamp', category: 'Home', location: 'Living room / Side table', value: 28, condition: 'Great', story: 'A warm light from your first apartment.', status: 'stored' },
  { id: 'boots', name: 'Weekend hiking boots', kind: 'boots', category: 'Outdoors', location: 'Closet / Bottom shelf', value: 30, condition: 'Good', story: 'Still a few good trails left in them.', status: 'stored' },
  { id: 'camera', name: 'Fujifilm instant camera', kind: 'camera', category: 'Electronics', location: 'Closet / Camera pouch', value: 72, condition: 'Great', story: 'Small moments, printed forever.', status: 'stored' },
  { id: 'vase', name: 'Ceramic flower vase', kind: 'vase', category: 'Home', location: 'Living room / Bookshelf', value: 18, condition: 'Great', story: 'Lovely, but you already have a favorite.', status: 'stored' },
  { id: 'guitar', name: 'Acoustic guitar', kind: 'guitar', category: 'Hobbies', location: 'Attic / Music corner', value: 85, condition: 'Good', story: 'Your someday songs are waiting.', status: 'stored' },
  { id: 'kettle', name: 'Everyday electric kettle', kind: 'kettle', category: 'Home', location: 'Living room / Tea station', value: 24, condition: 'Good', story: 'A little pause, one cup at a time.', status: 'stored' },
  { id: 'box', name: 'Holiday decorations', kind: 'box', category: 'Seasonal', location: 'Garage / Upper shelf C2', value: 35, condition: 'Good', story: 'The little things that make it feel like home.', status: 'stored' },
];

export const protectedItems = [
  { id: 'ring', name: "Grandma’s gold ring", kind: 'ring', category: 'Valuables', location: 'Private vault', value: 650, condition: 'Good', story: 'A family story worth keeping.', protected: true, status: 'stored' },
];

export const sampleItems = [
  {
    id: 'tent', name: 'North Face 2-person tent', kind: 'tent', category: 'Outdoors',
    value: 98, range: [85, 110], condition: 'Great', location: 'Garage / Blue bin B3',
    reason: 'Your sleeping bags and camping gear are already here.',
    request: {
      name: 'Maya', initials: 'MC', area: 'Your neighborhood', budget: '$80–$100',
      message: 'Looking for a small tent for our first weekend camping trip. Happy to trade a picnic set, too!',
      wants: 'A 2-person camping tent',
    },
  },
  {
    id: 'drill', name: 'Cordless drill', kind: 'drill', category: 'Tools',
    value: 65, range: [50, 80], condition: 'Good', location: 'Garage / Tool shelf A1',
    reason: 'Keep it with your toolbox, drill bits, and measuring tape.',
    request: {
      name: 'Leo', initials: 'LP', area: '0.6 miles away', budget: '$50–$70',
      message: 'Putting up shelves this weekend. Looking for a working cordless drill with its charger.',
      wants: 'A cordless drill',
    },
  },
  {
    id: 'lamp', name: 'Little reading lamp', kind: 'lamp', category: 'Home',
    value: 28, range: [20, 35], condition: 'Great', location: 'Living room / Bookshelf',
    reason: 'A useful spot next to your books and reading chair.',
    request: {
      name: 'Sofia', initials: 'SR', area: '0.4 miles away', budget: '$20–$30',
      message: 'Making a cozy reading nook. A small table lamp would be perfect!',
      wants: 'A small reading lamp',
    },
  },
  {
    id: 'camera', name: 'Fujifilm instant camera', kind: 'camera', category: 'Electronics',
    value: 72, range: [60, 85], condition: 'Great', location: 'Closet / Camera pouch',
    reason: 'Your photo albums and spare film are stored nearby.',
    request: {
      name: 'Noah', initials: 'NK', area: 'Your neighborhood', budget: '$60–$80',
      message: 'Hoping to capture a birthday party on instant film. Open to a trade for board games.',
      wants: 'An instant camera',
    },
  },
];

export const wantedPosts = [
  { id: 'wanted-tent', name: 'Maya', initials: 'MC', area: 'Your neighborhood', item: 'A little adventure starts here', kind: 'tent', budget: '$80–$100', message: 'Looking for a 2-person tent for our first camping trip.', tag: 'Matches your stuff', wants: '2-person tent' },
  { id: 'wanted-drill', name: 'Leo', initials: 'LP', area: '0.6 miles away', item: 'Building a home, one shelf at a time', kind: 'drill', budget: '$50–$70', message: 'Need a cordless drill with a charger for a weekend project.', tag: 'Wanted', wants: 'Cordless drill' },
  { id: 'wanted-lamp', name: 'Sofia', initials: 'SR', area: '0.4 miles away', item: 'A cozy corner needs a little glow', kind: 'lamp', budget: '$20–$30', message: 'Looking for a small reading lamp. A good home is waiting.', tag: 'Wanted', wants: 'Reading lamp' },
];

export const sprintItems = [
  {
    id: 'lamp', name: 'Little reading lamp', kind: 'lamp', location: 'Living room / Side table', value: 28,
    prompt: 'Does this still light up your life?',
    story: 'You have another lamp you use every day. This one could make someone’s reading nook.',
  },
  {
    id: 'boots', name: 'Weekend hiking boots', kind: 'boots', location: 'Closet / Bottom shelf', value: 30,
    prompt: 'More adventures, or a new home?',
    story: 'Keep them if a trail is calling. Otherwise, there’s still a lot of life in these soles.',
  },
  {
    id: 'vase', name: 'Ceramic flower vase', kind: 'vase', location: 'Living room / Bookshelf', value: 18,
    prompt: 'Keep the joy. Make a little room.',
    story: 'Your favorite vase is already on the table. It’s okay to let this one brighten another home.',
  },
];

export const initialState = {
  xp: 340,
  level: 3,
  streak: 4,
  cleared: 12,
  recovered: 186,
  weeklyGoal: 20,
  weeklyDone: 12,
  items: seedItems,
};

export const rooms = [
  { id: 'garage', name: 'Garage', count: 3, description: 'Tools, camping gear & seasonal things', color: '#ece5f6' },
  { id: 'closet', name: 'Closet', count: 2, description: 'Everyday favorites & little adventures', color: '#f4e8cc' },
  { id: 'attic', name: 'Attic', count: 1, description: 'Hobbies, memories & someday projects', color: '#e6ebdf' },
  { id: 'living', name: 'Living room', count: 3, description: 'The things that make it feel like home', color: '#f5e4de' },
];

export const achievements = [
  { id: 'first-win', title: 'First little win', description: 'You made a start. That counts.', icon: 'sparkles', earned: true },
  { id: 'room-to-breathe', title: 'Room to breathe', description: 'Give 10 things a thoughtful next step.', icon: 'leaf', earned: true },
  { id: 'good-neighbor', title: 'Good neighbor', description: 'Help one item find its next home.', icon: 'heart', earned: false },
  { id: 'clear-corner', title: 'A clear corner', description: 'Finish your first three-item sprint.', icon: 'trophy', earned: false },
];
