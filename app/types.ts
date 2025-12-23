export interface Resources {
  wood: number;
  clay: number;
  iron: number;
  crop: number;
  gold: number;
}

export interface Production {
  wood: number;
  clay: number;
  iron: number;
  crop: number;
}

export interface Building {
  id: number;
  type: string;
  level: number;
  name: string;
  position: number;
}

export interface Army {
  infantry: number;
  cavalry: number;
  siege: number;
  scouts: number;
}

export interface Research {
  attack: number;
  defense: number;
  speed: number;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
}

export interface GameState {
  resources: Resources;
  production: Production;
  buildings: Building[];
  army: Army;
  research: Research;
  quests: Quest[];
  selectedView: 'village' | 'map' | 'army' | 'market' | 'research';
  images: Record<string, string>;
}
