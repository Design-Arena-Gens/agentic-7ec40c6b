'use client';

import { useState, useEffect } from 'react';
import { GameState } from './types';
import { GameHeader } from './components/GameHeader';
import { ResourceBar } from './components/ResourceBar';
import { BuildingGrid } from './components/BuildingGrid';
import { MapView } from './components/MapView';
import { ArmyPanel } from './components/ArmyPanel';
import { MarketPanel } from './components/MarketPanel';
import { ResearchPanel } from './components/ResearchPanel';
import { QuestPanel } from './components/QuestPanel';
import { generateGameImages } from './utils/imageGenerator';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    resources: {
      wood: 500,
      clay: 500,
      iron: 500,
      crop: 500,
      gold: 100,
    },
    production: {
      wood: 10,
      clay: 10,
      iron: 10,
      crop: 10,
    },
    buildings: [
      { id: 1, type: 'townhall', level: 1, name: 'قاعة المدينة', position: 0 },
      { id: 2, type: 'warehouse', level: 1, name: 'المستودع', position: 1 },
      { id: 3, type: 'granary', level: 1, name: 'مخزن الحبوب', position: 2 },
      { id: 4, type: 'lumbermill', level: 1, name: 'مصنع الأخشاب', position: 3 },
      { id: 5, type: 'claypit', level: 1, name: 'حفرة الطين', position: 4 },
      { id: 6, type: 'ironmine', level: 1, name: 'منجم الحديد', position: 5 },
      { id: 7, type: 'cropland', level: 1, name: 'أرض المحاصيل', position: 6 },
      { id: 8, type: 'barracks', level: 0, name: 'الثكنات', position: 7 },
      { id: 9, type: 'market', level: 0, name: 'السوق', position: 8 },
      { id: 10, type: 'embassy', level: 0, name: 'السفارة', position: 9 },
      { id: 11, type: 'smithy', level: 0, name: 'الحداد', position: 10 },
      { id: 12, type: 'stable', level: 0, name: 'الإسطبل', position: 11 },
      { id: 13, type: 'workshop', level: 0, name: 'ورشة العمل', position: 12 },
      { id: 14, type: 'academy', level: 0, name: 'الأكاديمية', position: 13 },
      { id: 15, type: 'wall', level: 0, name: 'السور', position: 14 },
      { id: 16, type: 'rally', level: 0, name: 'نقطة التجمع', position: 15 },
    ],
    army: {
      infantry: 0,
      cavalry: 0,
      siege: 0,
      scouts: 0,
    },
    research: {
      attack: 0,
      defense: 0,
      speed: 0,
    },
    quests: [
      { id: 1, title: 'بناء الثكنات', description: 'قم ببناء الثكنات لتدريب الجنود', reward: 'خشب: 200, طين: 200', completed: false },
      { id: 2, title: 'تدريب 5 جنود', description: 'قم بتدريب 5 جنود مشاة', reward: 'ذهب: 50', completed: false },
      { id: 3, title: 'ترقية المستودع', description: 'قم بترقية المستودع إلى المستوى 2', reward: 'حديد: 150', completed: false },
    ],
    selectedView: 'village',
    images: {},
  });

  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const generatedImages = generateGameImages();
    setImages(generatedImages);
    setGameState(prev => ({ ...prev, images: generatedImages }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        resources: {
          wood: Math.min(prev.resources.wood + prev.production.wood / 60, 10000),
          clay: Math.min(prev.resources.clay + prev.production.clay / 60, 10000),
          iron: Math.min(prev.resources.iron + prev.production.iron / 60, 10000),
          crop: Math.min(prev.resources.crop + prev.production.crop / 60, 10000),
          gold: prev.resources.gold,
        },
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.production]);

  const upgradeBuilding = (buildingId: number) => {
    const building = gameState.buildings.find(b => b.id === buildingId);
    if (!building) return;

    const cost = calculateUpgradeCost(building);

    if (
      gameState.resources.wood >= cost.wood &&
      gameState.resources.clay >= cost.clay &&
      gameState.resources.iron >= cost.iron &&
      gameState.resources.crop >= cost.crop
    ) {
      setGameState(prev => ({
        ...prev,
        resources: {
          wood: prev.resources.wood - cost.wood,
          clay: prev.resources.clay - cost.clay,
          iron: prev.resources.iron - cost.iron,
          crop: prev.resources.crop - cost.crop,
          gold: prev.resources.gold,
        },
        buildings: prev.buildings.map(b =>
          b.id === buildingId ? { ...b, level: b.level + 1 } : b
        ),
        production: updateProduction(prev.buildings, buildingId),
      }));

      checkQuests();
    }
  };

  const calculateUpgradeCost = (building: any) => {
    const baseCost = {
      wood: 100,
      clay: 100,
      iron: 100,
      crop: 100,
    };

    const multiplier = Math.pow(1.5, building.level);
    return {
      wood: Math.floor(baseCost.wood * multiplier),
      clay: Math.floor(baseCost.clay * multiplier),
      iron: Math.floor(baseCost.iron * multiplier),
      crop: Math.floor(baseCost.crop * multiplier),
    };
  };

  const updateProduction = (buildings: any[], upgradedId: number) => {
    const production = { ...gameState.production };
    const building = buildings.find(b => b.id === upgradedId);

    if (building) {
      switch (building.type) {
        case 'lumbermill':
          production.wood = 10 * (building.level + 1);
          break;
        case 'claypit':
          production.clay = 10 * (building.level + 1);
          break;
        case 'ironmine':
          production.iron = 10 * (building.level + 1);
          break;
        case 'cropland':
          production.crop = 10 * (building.level + 1);
          break;
      }
    }

    return production;
  };

  const trainUnit = (unitType: 'infantry' | 'cavalry' | 'siege' | 'scouts', count: number) => {
    const costs: Record<string, any> = {
      infantry: { wood: 50, clay: 30, iron: 40, crop: 20, gold: 0 },
      cavalry: { wood: 100, clay: 150, iron: 200, crop: 50, gold: 0 },
      siege: { wood: 500, clay: 300, iron: 400, crop: 100, gold: 0 },
      scouts: { wood: 30, clay: 20, iron: 10, crop: 10, gold: 0 },
    };

    const totalCost = {
      wood: costs[unitType].wood * count,
      clay: costs[unitType].clay * count,
      iron: costs[unitType].iron * count,
      crop: costs[unitType].crop * count,
    };

    if (
      gameState.resources.wood >= totalCost.wood &&
      gameState.resources.clay >= totalCost.clay &&
      gameState.resources.iron >= totalCost.iron &&
      gameState.resources.crop >= totalCost.crop
    ) {
      setGameState(prev => ({
        ...prev,
        resources: {
          wood: prev.resources.wood - totalCost.wood,
          clay: prev.resources.clay - totalCost.clay,
          iron: prev.resources.iron - totalCost.iron,
          crop: prev.resources.crop - totalCost.crop,
          gold: prev.resources.gold,
        },
        army: {
          ...prev.army,
          [unitType]: prev.army[unitType] + count,
        },
      }));

      checkQuests();
    }
  };

  const researchTech = (techType: 'attack' | 'defense' | 'speed') => {
    const cost = {
      wood: 200 * (gameState.research[techType] + 1),
      clay: 200 * (gameState.research[techType] + 1),
      iron: 300 * (gameState.research[techType] + 1),
      crop: 100 * (gameState.research[techType] + 1),
      gold: 50 * (gameState.research[techType] + 1),
    };

    if (
      gameState.resources.wood >= cost.wood &&
      gameState.resources.clay >= cost.clay &&
      gameState.resources.iron >= cost.iron &&
      gameState.resources.crop >= cost.crop &&
      gameState.resources.gold >= cost.gold
    ) {
      setGameState(prev => ({
        ...prev,
        resources: {
          wood: prev.resources.wood - cost.wood,
          clay: prev.resources.clay - cost.clay,
          iron: prev.resources.iron - cost.iron,
          crop: prev.resources.crop - cost.crop,
          gold: prev.resources.gold - cost.gold,
        },
        research: {
          ...prev.research,
          [techType]: prev.research[techType] + 1,
        },
      }));
    }
  };

  const tradeResources = (give: any, receive: any) => {
    if (
      gameState.resources.wood >= give.wood &&
      gameState.resources.clay >= give.clay &&
      gameState.resources.iron >= give.iron &&
      gameState.resources.crop >= give.crop
    ) {
      setGameState(prev => ({
        ...prev,
        resources: {
          wood: prev.resources.wood - give.wood + receive.wood,
          clay: prev.resources.clay - give.clay + receive.clay,
          iron: prev.resources.iron - give.iron + receive.iron,
          crop: prev.resources.crop - give.crop + receive.crop,
          gold: prev.resources.gold,
        },
      }));
    }
  };

  const checkQuests = () => {
    setGameState(prev => {
      const updatedQuests = prev.quests.map(quest => {
        if (quest.id === 1 && !quest.completed) {
          const barracks = prev.buildings.find(b => b.type === 'barracks');
          if (barracks && barracks.level > 0) {
            return { ...quest, completed: true };
          }
        }
        if (quest.id === 2 && !quest.completed) {
          if (prev.army.infantry >= 5) {
            return { ...quest, completed: true };
          }
        }
        if (quest.id === 3 && !quest.completed) {
          const warehouse = prev.buildings.find(b => b.type === 'warehouse');
          if (warehouse && warehouse.level >= 2) {
            return { ...quest, completed: true };
          }
        }
        return quest;
      });

      return { ...prev, quests: updatedQuests };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50">
      <GameHeader />
      <ResourceBar resources={gameState.resources} production={gameState.production} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setGameState(prev => ({ ...prev, selectedView: 'village' }))}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              gameState.selectedView === 'village'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
            }`}
          >
            القرية
          </button>
          <button
            onClick={() => setGameState(prev => ({ ...prev, selectedView: 'map' }))}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              gameState.selectedView === 'map'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
            }`}
          >
            الخريطة
          </button>
          <button
            onClick={() => setGameState(prev => ({ ...prev, selectedView: 'army' }))}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              gameState.selectedView === 'army'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
            }`}
          >
            الجيش
          </button>
          <button
            onClick={() => setGameState(prev => ({ ...prev, selectedView: 'market' }))}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              gameState.selectedView === 'market'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
            }`}
          >
            السوق
          </button>
          <button
            onClick={() => setGameState(prev => ({ ...prev, selectedView: 'research' }))}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              gameState.selectedView === 'research'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
            }`}
          >
            البحث
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {gameState.selectedView === 'village' && (
              <BuildingGrid
                buildings={gameState.buildings}
                onUpgrade={upgradeBuilding}
                resources={gameState.resources}
                images={images}
              />
            )}
            {gameState.selectedView === 'map' && <MapView images={images} />}
            {gameState.selectedView === 'army' && (
              <ArmyPanel army={gameState.army} onTrain={trainUnit} resources={gameState.resources} images={images} />
            )}
            {gameState.selectedView === 'market' && (
              <MarketPanel resources={gameState.resources} onTrade={tradeResources} images={images} />
            )}
            {gameState.selectedView === 'research' && (
              <ResearchPanel
                research={gameState.research}
                onResearch={researchTech}
                resources={gameState.resources}
                images={images}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <QuestPanel quests={gameState.quests} />
          </div>
        </div>
      </div>
    </div>
  );
}
