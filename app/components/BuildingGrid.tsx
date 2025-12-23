import { Building, Resources } from '../types';

interface BuildingGridProps {
  buildings: Building[];
  onUpgrade: (buildingId: number) => void;
  resources: Resources;
  images: Record<string, string>;
}

export const BuildingGrid = ({ buildings, onUpgrade, resources, images }: BuildingGridProps) => {
  const calculateUpgradeCost = (building: Building) => {
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

  const canUpgrade = (building: Building) => {
    const cost = calculateUpgradeCost(building);
    return (
      resources.wood >= cost.wood &&
      resources.clay >= cost.clay &&
      resources.iron >= cost.iron &&
      resources.crop >= cost.crop
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">مباني القرية</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {buildings.map((building) => {
          const cost = calculateUpgradeCost(building);
          const isUpgradeable = canUpgrade(building);

          return (
            <div
              key={building.id}
              className="border-2 border-amber-200 rounded-lg p-4 hover:border-amber-400 transition bg-gradient-to-b from-amber-50 to-white"
            >
              <div className="flex flex-col items-center">
                {images[building.type] ? (
                  <img
                    src={images[building.type]}
                    alt={building.name}
                    className="w-20 h-20 mb-2"
                  />
                ) : (
                  <div className="w-20 h-20 mb-2 bg-amber-200 rounded-lg flex items-center justify-center text-3xl">
                    🏛️
                  </div>
                )}
                <h3 className="font-bold text-amber-900 text-center text-sm mb-1">
                  {building.name}
                </h3>
                <p className="text-xs text-amber-700 mb-2">
                  المستوى: {building.level}
                </p>

                {building.level === 0 ? (
                  <button
                    onClick={() => onUpgrade(building.id)}
                    disabled={!isUpgradeable}
                    className={`w-full py-2 px-3 rounded font-bold text-sm transition ${
                      isUpgradeable
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    بناء
                  </button>
                ) : (
                  <button
                    onClick={() => onUpgrade(building.id)}
                    disabled={!isUpgradeable}
                    className={`w-full py-2 px-3 rounded font-bold text-sm transition ${
                      isUpgradeable
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    ترقية
                  </button>
                )}

                <div className="mt-2 text-xs text-center space-y-1">
                  <div className="flex justify-between gap-2">
                    <span>🪵 {cost.wood}</span>
                    <span>🧱 {cost.clay}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>⚙️ {cost.iron}</span>
                    <span>🌾 {cost.crop}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
