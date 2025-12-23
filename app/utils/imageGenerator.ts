export const generateGameImages = (): Record<string, string> => {
  const images: Record<string, string> = {};

  // Building icons (16 images)
  const buildings = [
    'townhall', 'warehouse', 'granary', 'lumbermill', 'claypit', 'ironmine',
    'cropland', 'barracks', 'market', 'embassy', 'smithy', 'stable',
    'workshop', 'academy', 'wall', 'rally'
  ];

  buildings.forEach((building, index) => {
    const color = getBuildingColor(building);
    images[building] = generateBuildingSVG(building, color, index);
  });

  // Unit icons (8 images)
  const units = ['infantry', 'cavalry', 'siege', 'scouts', 'hero', 'merchant', 'spy', 'settler'];
  units.forEach((unit, index) => {
    images[unit] = generateUnitSVG(unit, index);
  });

  // Resource icons (5 images)
  const resources = ['wood', 'clay', 'iron', 'crop', 'gold'];
  resources.forEach((resource, index) => {
    images[resource] = generateResourceSVG(resource, index);
  });

  // Map terrain (8 images)
  const terrains = ['grass', 'forest', 'mountain', 'water', 'desert', 'snow', 'swamp', 'hills'];
  terrains.forEach((terrain, index) => {
    images[terrain] = generateTerrainSVG(terrain, index);
  });

  // UI elements (8 images)
  images['quest-complete'] = generateIconSVG('check-circle', '#22c55e', 0);
  images['quest-incomplete'] = generateIconSVG('circle', '#94a3b8', 1);
  images['attack'] = generateIconSVG('sword', '#ef4444', 2);
  images['defense'] = generateIconSVG('shield', '#3b82f6', 3);
  images['speed'] = generateIconSVG('zap', '#eab308', 4);
  images['research'] = generateIconSVG('book', '#8b5cf6', 5);
  images['trade'] = generateIconSVG('arrows', '#10b981', 6);
  images['alliance'] = generateIconSVG('users', '#f59e0b', 7);

  // Additional game elements (5 images)
  images['banner'] = generateBannerSVG();
  images['crown'] = generateCrownSVG();
  images['medal'] = generateMedalSVG();
  images['trophy'] = generateTrophySVG();
  images['flag'] = generateFlagSVG();

  return images;
};

const getBuildingColor = (building: string): string => {
  const colorMap: Record<string, string> = {
    townhall: '#8b4513',
    warehouse: '#a0522d',
    granary: '#daa520',
    lumbermill: '#228b22',
    claypit: '#cd853f',
    ironmine: '#696969',
    cropland: '#9acd32',
    barracks: '#dc143c',
    market: '#ffa500',
    embassy: '#4169e1',
    smithy: '#2f4f4f',
    stable: '#8b4513',
    workshop: '#cd5c5c',
    academy: '#483d8b',
    wall: '#708090',
    rally: '#ff6347',
  };
  return colorMap[building] || '#8b4513';
};

const generateBuildingSVG = (building: string, color: string, seed: number): string => {
  const shapes = generateBuildingShape(building, color, seed);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="grad${seed}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${darkenColor(color)};stop-opacity:1" />
        </linearGradient>
      </defs>
      ${shapes}
    </svg>
  `)}`;
};

const generateBuildingShape = (building: string, color: string, seed: number): string => {
  switch (building) {
    case 'townhall':
      return `
        <rect x="20" y="40" width="60" height="50" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <polygon points="50,10 80,40 20,40" fill="${color}" stroke="#000" stroke-width="2"/>
        <rect x="40" y="60" width="20" height="30" fill="#654321"/>
        <circle cx="50" cy="30" r="5" fill="#ffd700"/>
      `;
    case 'barracks':
      return `
        <rect x="15" y="45" width="70" height="45" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <polygon points="50,15 85,45 15,45" fill="${color}" stroke="#000" stroke-width="2"/>
        <rect x="35" y="60" width="12" height="20" fill="#654321"/>
        <rect x="53" y="60" width="12" height="20" fill="#654321"/>
        <line x1="30" y1="35" x2="70" y2="35" stroke="#fff" stroke-width="3"/>
        <line x1="40" y1="35" x2="40" y2="45" stroke="#fff" stroke-width="3"/>
        <line x1="60" y1="35" x2="60" y2="45" stroke="#fff" stroke-width="3"/>
      `;
    case 'market':
      return `
        <rect x="10" y="60" width="80" height="30" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <polygon points="15,60 30,30 70,30 85,60" fill="${color}" stroke="#000" stroke-width="2"/>
        <rect x="25" y="40" width="15" height="20" fill="#8b4513"/>
        <rect x="60" y="40" width="15" height="20" fill="#8b4513"/>
        <circle cx="35" cy="75" r="4" fill="#ffd700"/>
        <circle cx="65" cy="75" r="4" fill="#ffd700"/>
      `;
    case 'warehouse':
      return `
        <rect x="20" y="50" width="60" height="40" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <polygon points="50,20 80,50 20,50" fill="${color}" stroke="#000" stroke-width="2"/>
        <rect x="35" y="65" width="30" height="20" fill="#654321"/>
        <rect x="25" y="60" width="10" height="15" fill="#d2691e"/>
        <rect x="65" y="60" width="10" height="15" fill="#d2691e"/>
      `;
    case 'wall':
      return `
        <rect x="10" y="50" width="15" height="40" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <rect x="30" y="40" width="15" height="50" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <rect x="50" y="35" width="15" height="55" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <rect x="70" y="45" width="15" height="45" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <rect x="5" y="88" width="90" height="8" fill="${darkenColor(color)}" stroke="#000" stroke-width="2"/>
      `;
    default:
      return `
        <rect x="25" y="45" width="50" height="45" fill="url(#grad${seed})" stroke="#000" stroke-width="2"/>
        <polygon points="50,20 75,45 25,45" fill="${color}" stroke="#000" stroke-width="2"/>
        <rect x="42" y="65" width="16" height="25" fill="#654321"/>
      `;
  }
};

const generateUnitSVG = (unit: string, seed: number): string => {
  const shapes = generateUnitShape(unit, seed);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      ${shapes}
    </svg>
  `)}`;
};

const generateUnitShape = (unit: string, seed: number): string => {
  switch (unit) {
    case 'infantry':
      return `
        <circle cx="50" cy="25" r="12" fill="#ffe4c4" stroke="#000" stroke-width="2"/>
        <rect x="40" y="37" width="20" height="30" fill="#b22222" stroke="#000" stroke-width="2"/>
        <line x1="40" y1="45" x2="25" y2="55" stroke="#ffe4c4" stroke-width="4"/>
        <line x1="60" y1="45" x2="75" y2="55" stroke="#ffe4c4" stroke-width="4"/>
        <line x1="45" y1="67" x2="40" y2="90" stroke="#4169e1" stroke-width="5"/>
        <line x1="55" y1="67" x2="60" y2="90" stroke="#4169e1" stroke-width="5"/>
        <rect x="70" y="35" width="8" height="35" fill="#696969" stroke="#000" stroke-width="1"/>
        <polygon points="78,35 82,30 82,40" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
      `;
    case 'cavalry':
      return `
        <ellipse cx="50" cy="65" rx="25" ry="15" fill="#8b4513" stroke="#000" stroke-width="2"/>
        <rect x="42" y="50" width="16" height="20" fill="#b22222" stroke="#000" stroke-width="2"/>
        <circle cx="50" cy="35" r="10" fill="#ffe4c4" stroke="#000" stroke-width="2"/>
        <rect x="30" y="70" width="5" height="20" fill="#654321" stroke="#000" stroke-width="1"/>
        <rect x="45" y="70" width="5" height="20" fill="#654321" stroke="#000" stroke-width="1"/>
        <rect x="50" y="70" width="5" height="20" fill="#654321" stroke="#000" stroke-width="1"/>
        <rect x="65" y="70" width="5" height="20" fill="#654321" stroke="#000" stroke-width="1"/>
        <line x1="30" y1="45" x2="20" y2="55" stroke="#ffe4c4" stroke-width="4"/>
        <polygon points="15,45 25,50 20,58" fill="#696969" stroke="#000" stroke-width="1"/>
      `;
    case 'siege':
      return `
        <rect x="20" y="60" width="60" height="25" fill="#654321" stroke="#000" stroke-width="2"/>
        <circle cx="30" cy="87" r="8" fill="#2f4f4f" stroke="#000" stroke-width="2"/>
        <circle cx="50" cy="87" r="8" fill="#2f4f4f" stroke="#000" stroke-width="2"/>
        <circle cx="70" cy="87" r="8" fill="#2f4f4f" stroke="#000" stroke-width="2"/>
        <rect x="35" y="35" width="30" height="25" fill="#8b4513" stroke="#000" stroke-width="2"/>
        <polygon points="50,10 65,35 35,35" fill="#a0522d" stroke="#000" stroke-width="2"/>
        <circle cx="50" cy="45" r="8" fill="#2f4f4f"/>
        <rect x="46" y="20" width="8" height="20" fill="#696969"/>
      `;
    case 'scouts':
      return `
        <circle cx="50" cy="30" r="12" fill="#ffe4c4" stroke="#000" stroke-width="2"/>
        <rect x="40" y="42" width="20" height="25" fill="#228b22" stroke="#000" stroke-width="2"/>
        <line x1="40" y1="50" x2="25" y2="60" stroke="#ffe4c4" stroke-width="4"/>
        <line x1="60" y1="50" x2="75" y2="60" stroke="#ffe4c4" stroke-width="4"/>
        <line x1="45" y1="67" x2="42" y2="85" stroke="#654321" stroke-width="5"/>
        <line x1="55" y1="67" x2="58" y2="85" stroke="#654321" stroke-width="5"/>
        <polygon points="50,20 55,10 60,20" fill="#228b22" stroke="#000" stroke-width="1"/>
        <circle cx="20" cy="40" r="10" fill="#ffd700" opacity="0.3"/>
      `;
    default:
      return `
        <circle cx="50" cy="50" r="30" fill="#4169e1" stroke="#000" stroke-width="2"/>
        <text x="50" y="60" font-size="30" text-anchor="middle" fill="#fff" font-weight="bold">?</text>
      `;
  }
};

const generateResourceSVG = (resource: string, seed: number): string => {
  const shapes = generateResourceShape(resource);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      ${shapes}
    </svg>
  `)}`;
};

const generateResourceShape = (resource: string): string => {
  switch (resource) {
    case 'wood':
      return `
        <rect x="35" y="20" width="30" height="60" fill="#8b4513" stroke="#654321" stroke-width="2"/>
        <ellipse cx="50" cy="20" rx="15" ry="8" fill="#a0522d" stroke="#654321" stroke-width="2"/>
        <line x1="40" y1="30" x2="40" y2="70" stroke="#654321" stroke-width="1"/>
        <line x1="50" y1="30" x2="50" y2="70" stroke="#654321" stroke-width="1"/>
        <line x1="60" y1="30" x2="60" y2="70" stroke="#654321" stroke-width="1"/>
        <circle cx="45" cy="40" r="2" fill="#654321"/>
        <circle cx="55" cy="55" r="2" fill="#654321"/>
      `;
    case 'clay':
      return `
        <path d="M 30 80 Q 30 60 40 50 L 40 30 Q 50 20 60 30 L 60 50 Q 70 60 70 80 Z" fill="#cd853f" stroke="#8b6f47" stroke-width="2"/>
        <ellipse cx="50" cy="80" rx="20" ry="8" fill="#a0826d"/>
        <line x1="35" y1="60" x2="65" y2="60" stroke="#8b6f47" stroke-width="1"/>
        <line x1="38" y1="50" x2="62" y2="50" stroke="#8b6f47" stroke-width="1"/>
      `;
    case 'iron':
      return `
        <polygon points="50,15 70,40 65,75 35,75 30,40" fill="#696969" stroke="#2f4f4f" stroke-width="2"/>
        <polygon points="50,20 65,40 60,70 40,70 35,40" fill="#a9a9a9" stroke="#2f4f4f" stroke-width="1"/>
        <line x1="40" y1="45" x2="60" y2="45" stroke="#2f4f4f" stroke-width="1"/>
        <line x1="42" y1="55" x2="58" y2="55" stroke="#2f4f4f" stroke-width="1"/>
        <line x1="44" y1="65" x2="56" y2="65" stroke="#2f4f4f" stroke-width="1"/>
        <circle cx="50" cy="35" r="3" fill="#d3d3d3"/>
      `;
    case 'crop':
      return `
        <line x1="50" y1="80" x2="50" y2="40" stroke="#9acd32" stroke-width="4"/>
        <ellipse cx="50" cy="30" rx="10" ry="15" fill="#f0e68c" stroke="#daa520" stroke-width="2"/>
        <ellipse cx="45" cy="25" rx="8" ry="12" fill="#f0e68c" stroke="#daa520" stroke-width="1"/>
        <ellipse cx="55" cy="25" rx="8" ry="12" fill="#f0e68c" stroke="#daa520" stroke-width="1"/>
        <path d="M 50 40 Q 40 45 35 55" stroke="#228b22" stroke-width="2" fill="none"/>
        <path d="M 50 50 Q 60 55 65 65" stroke="#228b22" stroke-width="2" fill="none"/>
        <ellipse cx="30" cy="60" rx="5" ry="8" fill="#32cd32"/>
        <ellipse cx="68" cy="70" rx="5" ry="8" fill="#32cd32"/>
      `;
    case 'gold':
      return `
        <circle cx="50" cy="50" r="25" fill="#ffd700" stroke="#daa520" stroke-width="3"/>
        <circle cx="50" cy="50" r="20" fill="#ffed4e" stroke="#daa520" stroke-width="2"/>
        <text x="50" y="62" font-size="35" font-weight="bold" text-anchor="middle" fill="#daa520">G</text>
        <circle cx="35" cy="35" r="5" fill="#ffffe0" opacity="0.7"/>
      `;
    default:
      return '';
  }
};

const generateTerrainSVG = (terrain: string, seed: number): string => {
  const shapes = generateTerrainShape(terrain, seed);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      ${shapes}
    </svg>
  `)}`;
};

const generateTerrainShape = (terrain: string, seed: number): string => {
  switch (terrain) {
    case 'grass':
      return `
        <rect width="100" height="100" fill="#90ee90"/>
        <circle cx="20" cy="30" r="3" fill="#228b22"/>
        <circle cx="45" cy="25" r="3" fill="#228b22"/>
        <circle cx="70" cy="35" r="3" fill="#228b22"/>
        <circle cx="30" cy="60" r="3" fill="#228b22"/>
        <circle cx="60" cy="55" r="3" fill="#228b22"/>
        <circle cx="80" cy="70" r="3" fill="#228b22"/>
        <path d="M 0 80 Q 25 75 50 80 T 100 80 L 100 100 L 0 100 Z" fill="#7cfc00"/>
      `;
    case 'forest':
      return `
        <rect width="100" height="100" fill="#228b22"/>
        <polygon points="25,60 20,75 30,75" fill="#006400"/>
        <polygon points="25,50 15,60 35,60" fill="#228b22"/>
        <polygon points="25,40 10,50 40,50" fill="#2e8b57"/>
        <polygon points="70,65 65,80 75,80" fill="#006400"/>
        <polygon points="70,55 60,65 80,65" fill="#228b22"/>
        <polygon points="70,45 55,55 85,55" fill="#2e8b57"/>
        <polygon points="50,70 45,85 55,85" fill="#006400"/>
        <polygon points="50,60 40,70 60,70" fill="#228b22"/>
      `;
    case 'mountain':
      return `
        <rect width="100" height="100" fill="#d3d3d3"/>
        <polygon points="50,10 80,90 20,90" fill="#696969" stroke="#2f4f4f" stroke-width="2"/>
        <polygon points="50,10 65,90 35,90" fill="#808080"/>
        <polygon points="50,10 50,50 35,90" fill="#a9a9a9"/>
        <polygon points="30,60 45,30 60,60 50,90 40,90" fill="#778899"/>
        <polygon points="50,10 55,25 50,30 45,25" fill="#ffffff"/>
      `;
    case 'water':
      return `
        <rect width="100" height="100" fill="#4682b4"/>
        <ellipse cx="30" cy="40" rx="15" ry="8" fill="#5f9ea0" opacity="0.5"/>
        <ellipse cx="70" cy="50" rx="20" ry="10" fill="#5f9ea0" opacity="0.5"/>
        <ellipse cx="45" cy="70" rx="18" ry="9" fill="#5f9ea0" opacity="0.5"/>
        <path d="M 10 30 Q 20 25 30 30 T 50 30" stroke="#87ceeb" stroke-width="2" fill="none"/>
        <path d="M 40 55 Q 50 50 60 55 T 80 55" stroke="#87ceeb" stroke-width="2" fill="none"/>
        <path d="M 20 75 Q 30 70 40 75 T 60 75" stroke="#87ceeb" stroke-width="2" fill="none"/>
      `;
    case 'desert':
      return `
        <rect width="100" height="100" fill="#f4a460"/>
        <ellipse cx="35" cy="70" rx="25" ry="15" fill="#daa520" opacity="0.3"/>
        <ellipse cx="70" cy="60" rx="20" ry="12" fill="#daa520" opacity="0.3"/>
        <circle cx="30" cy="40" r="2" fill="#cd853f"/>
        <circle cx="60" cy="35" r="2" fill="#cd853f"/>
        <circle cx="80" cy="75" r="2" fill="#cd853f"/>
        <path d="M 20 80 Q 30 75 40 80" stroke="#daa520" stroke-width="1" fill="none"/>
        <path d="M 55 85 Q 65 80 75 85" stroke="#daa520" stroke-width="1" fill="none"/>
      `;
    case 'snow':
      return `
        <rect width="100" height="100" fill="#fffafa"/>
        <circle cx="25" cy="30" r="8" fill="#f0f8ff" opacity="0.7"/>
        <circle cx="60" cy="40" r="6" fill="#f0f8ff" opacity="0.7"/>
        <circle cx="80" cy="25" r="7" fill="#f0f8ff" opacity="0.7"/>
        <circle cx="40" cy="65" r="9" fill="#f0f8ff" opacity="0.7"/>
        <circle cx="70" cy="70" r="7" fill="#f0f8ff" opacity="0.7"/>
        <path d="M 30 50 L 32 55 L 28 55 Z" fill="#b0e0e6"/>
        <path d="M 65 55 L 67 60 L 63 60 Z" fill="#b0e0e6"/>
        <circle cx="20" cy="75" r="3" fill="#add8e6"/>
      `;
    case 'swamp':
      return `
        <rect width="100" height="100" fill="#556b2f"/>
        <ellipse cx="40" cy="60" rx="30" ry="20" fill="#2f4f4f" opacity="0.6"/>
        <ellipse cx="70" cy="40" rx="25" ry="15" fill="#2f4f4f" opacity="0.6"/>
        <rect x="25" y="30" width="4" height="25" fill="#654321"/>
        <rect x="60" y="50" width="4" height="30" fill="#654321"/>
        <rect x="80" y="60" width="4" height="20" fill="#654321"/>
        <circle cx="27" cy="28" r="8" fill="#6b8e23"/>
        <circle cx="62" cy="48" r="8" fill="#6b8e23"/>
        <circle cx="82" cy="58" r="8" fill="#6b8e23"/>
      `;
    case 'hills':
      return `
        <rect width="100" height="100" fill="#9acd32"/>
        <ellipse cx="30" cy="70" rx="25" ry="20" fill="#8fbc8f"/>
        <ellipse cx="70" cy="65" rx="30" ry="25" fill="#8fbc8f"/>
        <ellipse cx="50" cy="55" rx="20" ry="15" fill="#90ee90"/>
        <path d="M 0 75 Q 20 65 40 75 T 80 75 T 100 75" fill="#7cfc00" opacity="0.7"/>
        <circle cx="35" cy="60" r="2" fill="#228b22"/>
        <circle cx="65" cy="55" r="2" fill="#228b22"/>
      `;
    default:
      return '<rect width="100" height="100" fill="#ddd"/>';
  }
};

const generateIconSVG = (icon: string, color: string, seed: number): string => {
  const shapes = generateIconShape(icon, color);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      ${shapes}
    </svg>
  `)}`;
};

const generateIconShape = (icon: string, color: string): string => {
  switch (icon) {
    case 'check-circle':
      return `
        <circle cx="50" cy="50" r="40" fill="${color}" stroke="#000" stroke-width="3"/>
        <polyline points="30,50 45,65 70,35" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
      `;
    case 'circle':
      return `
        <circle cx="50" cy="50" r="40" fill="none" stroke="${color}" stroke-width="4"/>
      `;
    case 'sword':
      return `
        <rect x="42" y="60" width="16" height="15" fill="#8b4513" stroke="#000" stroke-width="2"/>
        <rect x="45" y="20" width="10" height="45" fill="${color}" stroke="#000" stroke-width="2"/>
        <polygon points="50,10 60,20 40,20" fill="#c0c0c0" stroke="#000" stroke-width="2"/>
        <rect x="40" y="55" width="20" height="8" fill="#daa520" stroke="#000" stroke-width="2"/>
      `;
    case 'shield':
      return `
        <path d="M 50 10 L 80 25 L 80 50 Q 80 80 50 90 Q 20 80 20 50 L 20 25 Z" fill="${color}" stroke="#000" stroke-width="3"/>
        <path d="M 50 20 L 70 30 L 70 50 Q 70 70 50 80 Q 30 70 30 50 L 30 30 Z" fill="#fff" opacity="0.3"/>
        <polygon points="50,35 55,45 65,47 57,54 59,65 50,59 41,65 43,54 35,47 45,45" fill="#ffd700"/>
      `;
    case 'zap':
      return `
        <polygon points="50,10 35,50 50,50 40,90 75,40 55,40 70,10" fill="${color}" stroke="#000" stroke-width="2"/>
        <polygon points="50,15 40,45 50,45 42,75 65,40 55,40 65,15" fill="#fff" opacity="0.5"/>
      `;
    case 'book':
      return `
        <rect x="25" y="20" width="50" height="65" fill="${color}" stroke="#000" stroke-width="2"/>
        <rect x="30" y="25" width="40" height="55" fill="#fff" opacity="0.3"/>
        <line x1="50" y1="25" x2="50" y2="80" stroke="#000" stroke-width="2"/>
        <line x1="35" y1="35" x2="45" y2="35" stroke="#000" stroke-width="1"/>
        <line x1="35" y1="45" x2="45" y2="45" stroke="#000" stroke-width="1"/>
        <line x1="55" y1="35" x2="65" y2="35" stroke="#000" stroke-width="1"/>
        <line x1="55" y1="45" x2="65" y2="45" stroke="#000" stroke-width="1"/>
      `;
    case 'arrows':
      return `
        <line x1="20" y1="50" x2="80" y2="50" stroke="${color}" stroke-width="4"/>
        <polygon points="75,50 65,45 65,55" fill="${color}"/>
        <line x1="80" y1="50" x2="20" y2="50" stroke="${color}" stroke-width="4" transform="translate(0, 15)"/>
        <polygon points="25,65 35,60 35,70" fill="${color}"/>
      `;
    case 'users':
      return `
        <circle cx="35" cy="35" r="12" fill="${color}" stroke="#000" stroke-width="2"/>
        <circle cx="65" cy="35" r="12" fill="${color}" stroke="#000" stroke-width="2"/>
        <path d="M 15 70 Q 15 50 35 50 Q 55 50 55 70" fill="${color}" stroke="#000" stroke-width="2"/>
        <path d="M 45 70 Q 45 50 65 50 Q 85 50 85 70" fill="${color}" stroke="#000" stroke-width="2"/>
      `;
    default:
      return '<circle cx="50" cy="50" r="30" fill="#ccc"/>';
  }
};

const generateBannerSVG = (): string => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect x="15" y="10" width="4" height="80" fill="#654321"/>
      <path d="M 19 10 L 85 10 L 85 60 L 52 50 L 19 60 Z" fill="#dc143c" stroke="#8b0000" stroke-width="2"/>
      <polygon points="52,25 55,35 65,36 57,43 59,53 52,48 45,53 47,43 39,36 49,35" fill="#ffd700"/>
    </svg>
  `)}`;
};

const generateCrownSVG = (): string => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path d="M 20 60 L 25 30 L 35 45 L 50 25 L 65 45 L 75 30 L 80 60 Z" fill="#ffd700" stroke="#daa520" stroke-width="2"/>
      <rect x="20" y="60" width="60" height="15" fill="#ffd700" stroke="#daa520" stroke-width="2"/>
      <circle cx="25" cy="25" r="5" fill="#ff0000"/>
      <circle cx="50" cy="20" r="5" fill="#ff0000"/>
      <circle cx="75" cy="25" r="5" fill="#ff0000"/>
      <circle cx="35" cy="40" r="3" fill="#4169e1"/>
      <circle cx="65" cy="40" r="3" fill="#4169e1"/>
    </svg>
  `)}`;
};

const generateMedalSVG = (): string => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polygon points="35,10 40,30 35,50 50,40 65,50 60,30 65,10 50,20" fill="#4169e1"/>
      <circle cx="50" cy="65" r="25" fill="#ffd700" stroke="#daa520" stroke-width="3"/>
      <circle cx="50" cy="65" r="20" fill="#ffed4e"/>
      <text x="50" y="75" font-size="25" font-weight="bold" text-anchor="middle" fill="#daa520">1</text>
    </svg>
  `)}`;
};

const generateTrophySVG = (): string => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path d="M 35 25 L 35 40 Q 35 50 45 50 L 45 70 L 55 70 L 55 50 Q 65 50 65 40 L 65 25" fill="#ffd700" stroke="#daa520" stroke-width="2"/>
      <rect x="30" y="20" width="40" height="8" fill="#ffd700" stroke="#daa520" stroke-width="2"/>
      <rect x="40" y="70" width="20" height="5" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <rect x="35" y="75" width="30" height="8" fill="#8b4513" stroke="#654321" stroke-width="2"/>
      <path d="M 25 25 Q 20 25 20 35 Q 20 42 25 42" fill="none" stroke="#daa520" stroke-width="3"/>
      <path d="M 75 25 Q 80 25 80 35 Q 80 42 75 42" fill="none" stroke="#daa520" stroke-width="3"/>
    </svg>
  `)}`;
};

const generateFlagSVG = (): string => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect x="20" y="10" width="4" height="80" fill="#654321"/>
      <path d="M 24 10 L 75 10 Q 80 25 75 40 L 24 40 Z" fill="#ff6347" stroke="#dc143c" stroke-width="2"/>
      <polygon points="50,20 52,26 58,27 53,31 54,37 50,33 46,37 47,31 42,27 48,26" fill="#ffd700"/>
    </svg>
  `)}`;
};

const darkenColor = (color: string): string => {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
  const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
  const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
