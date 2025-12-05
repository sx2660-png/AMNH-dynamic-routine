import { TourMap, Waypoint } from './types';

export const MAPS: TourMap[] = [
  {
    floorIndex: 0,
    name: "Lower Level (Rose Center)",
    imageUrl: "https://cdn-imgix.headout.com/media/images/8a4a3755-dec1-4b4a-bb3f-4e4cd4d1ed53-1753083033368-293602.jpg?auto=format&w=1814.3999999999999&q=90&crop=faces&fit=crop"
  },
  {
    floorIndex: 1,
    name: "First Floor",
    imageUrl: "https://cdn-imgix.headout.com/media/images/5cb3af35-c191-44f7-bb3d-a444d8c719f6-1753083047108-293606.jpg?auto=format&w=1814.3999999999999&q=90&crop=faces&fit=crop"
  },
  {
    floorIndex: 2,
    name: "Second Floor",
    imageUrl: "https://cdn-imgix.headout.com/media/images/82d29474-60f6-4e08-bdc2-53ef74fd739e-1753083037319-293605.jpg?auto=format&w=1814.3999999999999&q=90&crop=faces&fit=crop"
  },
  {
    floorIndex: 3,
    name: "Third Floor",
    imageUrl: "https://cdn-imgix.headout.com/media/images/6294c1db-5897-4535-b1d9-b7821cf9971c-1753083035684-293604.jpg?auto=format&w=1814.3999999999999&q=90&crop=faces&fit=crop"
  },
  {
    floorIndex: 4,
    name: "Fourth Floor",
    imageUrl: "https://cdn-imgix.headout.com/media/images/4a63c3b5-00e9-4806-85ca-88b49ae8acf6-1753083022050-293603.jpg?auto=format&w=1814.3999999999999&q=90&crop=faces&fit=crop"
  }
];

// Coordinate estimations based on the visual layout of AMNH maps provided.
// X and Y are percentages (0-100) from Top-Left.

export const TOUR_PATH: Waypoint[] = [
  // --- FLOOR 0 ---
  {
    id: 'f0-start',
    floorIndex: 0,
    label: 'Ticket Counter',
    description: 'Entering from Floor 0 Ticket Counter',
    x: 60, y: 92,
    duration: 0
  },
  {
    id: 'f0-hall',
    floorIndex: 0,
    label: 'Corridor',
    description: 'Walking towards The Universe',
    x: 60, y: 68,
    duration: 1.5
  },
  {
    id: 'f0-universe',
    floorIndex: 0,
    label: 'The Universe',
    description: 'Exploring the Hall of the Universe',
    x: 72, y: 68,
    duration: 2
  },
  {
    id: 'f0-elevator',
    floorIndex: 0,
    label: 'Elevator',
    description: 'Taking elevator to Floor 1',
    x: 82, y: 65,
    duration: 1.5
  },

 // --- FLOOR 1 CORRECTED ROUTE ---
 // Path: Planetarium -> Hall -> #5 -> Theater -> Back Down -> #7 -> #4 -> Left Hall -> #1 -> Meteorites -> Gems -> Elevator
  {
    id: 'f1-planetarium',
    floorIndex: 1,
    label: 'Hayden Planetarium',
    description: 'Start: Arrival at Planetarium (Rose Center)',
    x: 82, y: 65,  // 右下角起点
    duration: 1
  },
  {
    id: 'f1-transit-hall',
    floorIndex: 1,
    label: 'Roosevelt Hall',
    description: 'Walking to Center Hall',
    x: 76, y: 76,  // 【转折点】走到中间大厅底部，避免斜穿
    duration: 1
  },
  {
    id: 'f1-na-mammals',
    floorIndex: 1,
    label: 'North American Mammals',
    description: 'North American Mammals (#5)',
    x: 61, y: 76,  // #5 位置上移
    duration: 2.5
  },
  {
    id: 'f1-theater',
    floorIndex: 1,
    label: 'Giant Screen Theater',
    description: 'Check out the Giant Screen Theater',
    x: 61, y: 56,  // 往上直走
    duration: 1.5
  },
  {
    id: 'f1-transit-bio-turn',
    floorIndex: 1,
    label: 'Hallway Turn',
    description: 'Heading to Biodiversity',
    x: 55, y: 56,  // 【转折点】从剧院出来往下走，准备左转
    duration: 1
  },
  
  {
    id: 'f1-biodiversity-gate',
    floorIndex: 1,
    label: 'Biodiversity gate',
    description: 'Biodiversity gate(#7)',
    x: 53, y: 79,  // #7 位置，在海洋馆下方
    duration: 1.5
  },
  {
    id: 'f1-biodiversity',
    floorIndex: 1,
    label: 'biodiversity',
    description: 'biodiversity (#7)',
    x: 48, y: 79,  // #4 大蓝鲸中心位置
    duration: 2,
    pauseDuration: 3000
  },
  {
    id: 'f1-ocean-life',
    floorIndex: 1,
    label: 'ocean life',
    description: 'Walking towards ocean life(#4)',
    x: 48, y: 58,  // 【转折点】走出海洋馆，走到最左侧走廊蓝鲸
    duration: 1.5
  },
  {
    id: 'f1-human origin',
    floorIndex: 1,
    label: 'Human Origins 1',
    description: 'Spitzer Hall of Human Origins (#1)',
    x: 40 y: 58,  // #1 直直往上走
    duration: 2
  },
  {
    id: 'f1-human',
    floorIndex: 1,
    label: 'Human Origins 2',
    description: 'Spitzer Hall of Human Origins (#1)',
    x: 40 y: 28,  // #1 直直往上走
    duration: 2
  },
  {
    id: 'f1-meteorites',
    floorIndex: 1,
    label: 'Meteorites',
    description: 'Ross Hall of Meteorites',
    x: 40, y: 18,  // 最左上角
    duration: 1.5
  },
  {
    id: 'f1-gems',
    floorIndex: 1,
    label: 'Gems & Minerals',
    description: 'Mignone Halls of Gems and Minerals',
    x: 47, y: 18,  // 往右走进入宝石厅
    duration: 2,
    pauseDuration: 2000
  },
  {
    id: 'f1-elevator',
    floorIndex: 1,
    label: 'Elevator',
    description: 'Taking elevator near Gems to Floor 2',
    x: 60, y: 30,  // 宝石厅右侧的电梯
    duration: 1.5
  },

  // --- FLOOR 2 ---
  // Adjusted start point to align with F1 elevator exit
  {
    id: 'f2-start',
    floorIndex: 2,
    label: 'Arrival Floor 2',
    description: 'Arriving on 2nd Floor',
    x: 60, y: 30,
    duration: 0.5
  },
  {
    id: 'f2-south-america',
    floorIndex: 2,
    label: 'South American Peoples',
    description: 'Mexico & Central America',
    x: 50, y: 22,
    duration: 2
  },
  {
    id: 'f2-coner',
    floorIndex: 2,
    label: 'corner',
    description: 'corner',
    x: 40, y: 24,
    duration: 2
  },
  {
    id: 'f2-birds',
    floorIndex: 2,
    label: 'Birds of the World',
    description: 'Birds of the World Hall',
    x: 40, y: 51,
    duration: 2
  },
  {
    id: 'f2-asian-people',
    floorIndex: 2,
    label: 'Asian Peoples',
    description: 'Gardner D. Stout Hall of Asian Peoples',
    x: 40, y: 68,
    duration: 2
  },
  {
    id: 'f2-asian-mammals',
    floorIndex: 2,
    label: 'Asian Mammals',
    description: 'Viewing Asian Mammals',
    x: 50, y: 80,
    duration: 1.5,
    pauseDuration: 1000
  },
  {
    id: 'f2-african-mammals',
    floorIndex: 2,
    label: 'African Mammals',
    description: 'Akeley Hall of African Mammals',
    x: 61, y: 67,
    duration: 2,
    pauseDuration: 1500
  },
  {
    id: 'f2-bigbang',
    floorIndex: 2,
    label: 'Big Bang Theater',
    description: 'Rose Center / Big Bang Theater',
    x: 75, y: 67,
    duration: 2
  },
  {
    id: 'f2-stairs',
    floorIndex: 2,
    label: 'Stairs',
    description: 'Taking stairs to Floor 3',
    x: 68, y: 70,
    duration: 2
  },

  // --- FLOOR 3 ---
  {
    id: 'f3-start',
    floorIndex: 3,
    label: 'Arrival Floor 3',
    description: 'Arriving on 3rd Floor',
    x: 68, y: 70,
    duration: 0.5
  },
  {
    id: 'f3-african-upper',
    floorIndex: 3,
    label: 'African Mammals (Upper)',
    description: 'Upper view of African Mammals',
    x: 62, y: 60,
    duration: 1.5
  },
  {
    id: 'f3-na-birds',
    floorIndex: 3,
    label: 'North American Birds',
    description: 'Heading North: NA Birds',
    x: 47, y: 50,
    duration: 2
  },
  {
    id: 'f3-primates',
    floorIndex: 3,
    label: 'Primates',
    description: 'Hall of Primates',
    x: 38, y: 50,
    duration: 1.5
  },
  {
    id: 'f3-corner',
    floorIndex: 3,
    label: 'corner',
    description: 'coner',
    x: 41, y: 75,
    duration: 1.5
  },
  {
    id: 'f3-reptiles',
    floorIndex: 3,
    label: 'Reptiles & Amphibians',
    description: 'Reptiles and Amphibians',
    x: 47, y: 78,
    duration: 2
  },
  {
    id: 'f3-stair',
    floorIndex: 3,
    label: 'stair',
    description: ' to Floor 4',
    x: 58, y: 76,
    duration: 1.5
  },

  // --- FLOOR 4 ---
  {
    id: 'f4-start',
    floorIndex: 4,
    label: 'Arrival Floor 4',
    description: 'Arriving on 4th Floor',
    x: 58, y: 76,
    duration: 0.5
  },
  {
    id: 'f4-saurischian',
    floorIndex: 4,
    label: 'Saurischian Dinosaurs',
    description: 'T-Rex and Saurischian Dinosaurs',
    x: 60, y: 65,
    duration: 2
  },
  {
    id: 'f4-vertebrate',
    floorIndex: 4,
    label: 'Vertebrate Origins',
    description: 'Hall of Vertebrate Origins',
    x: 50, y: 50,
    duration: 2.5
  },
  {
    id: 'f4-orientation',
    floorIndex: 4,
    label: 'Orientation Center',
    description: 'Wallach Orientation Center',
    x: 37, y: 50,
    duration: 1.5
  },
  {
    id: 'f4-advanced-mammals',
    floorIndex: 4,
    label: 'Advanced Mammals',
    description: 'Milstein Hall of Advanced Mammals',
    x: 37, y: 72,
    duration: 1.5
  },
  {
    id: 'f4-primitive',
    floorIndex: 4,
    label: 'Primitive Mammals',
    description: 'Primitive Mammals',
    x: 37, y: 80,
    duration: 1.5
  },
  {
    id: 'f4- Ornithischian Dinosaurs',
    floorIndex: 4,
    label: 'Ornithischian Dinosaurs',
    description: 'Ornithischian Dinosaurs',
    x: 47, y: 80,
    duration: 1.5
  },
];