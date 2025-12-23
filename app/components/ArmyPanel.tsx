import { useState } from 'react';
import { Army, Resources } from '../types';

interface ArmyPanelProps {
  army: Army;
  onTrain: (unitType: 'infantry' | 'cavalry' | 'siege' | 'scouts', count: number) => void;
  resources: Resources;
  images: Record<string, string>;
}

export const ArmyPanel = ({ army, onTrain, resources, images }: ArmyPanelProps) => {
  const [trainCounts, setTrainCounts] = useState({
    infantry: 1,
    cavalry: 1,
    siege: 1,
    scouts: 1,
  });

  const unitCosts = {
    infantry: { wood: 50, clay: 30, iron: 40, crop: 20, emoji: '⚔️', name: 'المشاة' },
    cavalry: { wood: 100, clay: 150, iron: 200, crop: 50, emoji: '🐎', name: 'الفرسان' },
    siege: { wood: 500, clay: 300, iron: 400, crop: 100, emoji: '🎯', name: 'آلات الحصار' },
    scouts: { wood: 30, clay: 20, iron: 10, crop: 10, emoji: '🔍', name: 'الكشافة' },
  };

  const canTrain = (unitType: keyof typeof unitCosts, count: number) => {
    const cost = unitCosts[unitType];
    return (
      resources.wood >= cost.wood * count &&
      resources.clay >= cost.clay * count &&
      resources.iron >= cost.iron * count &&
      resources.crop >= cost.crop * count
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">الجيش</h2>

      <div className="mb-6 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg">
        <h3 className="font-bold text-lg mb-3 text-red-900">القوات الحالية</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ArmyCounter emoji="⚔️" label="المشاة" count={army.infantry} image={images.infantry} />
          <ArmyCounter emoji="🐎" label="الفرسان" count={army.cavalry} image={images.cavalry} />
          <ArmyCounter emoji="🎯" label="آلات الحصار" count={army.siege} image={images.siege} />
          <ArmyCounter emoji="🔍" label="الكشافة" count={army.scouts} image={images.scouts} />
        </div>
      </div>

      <h3 className="font-bold text-lg mb-4 text-amber-900">تدريب الوحدات</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(unitCosts) as Array<keyof typeof unitCosts>).map((unitType) => {
          const unit = unitCosts[unitType];
          const count = trainCounts[unitType];
          const totalCost = {
            wood: unit.wood * count,
            clay: unit.clay * count,
            iron: unit.iron * count,
            crop: unit.crop * count,
          };

          return (
            <div
              key={unitType}
              className="border-2 border-amber-200 rounded-lg p-4 bg-gradient-to-b from-amber-50 to-white"
            >
              <div className="flex items-center gap-3 mb-3">
                {images[unitType] ? (
                  <img src={images[unitType]} alt={unit.name} className="w-16 h-16" />
                ) : (
                  <span className="text-4xl">{unit.emoji}</span>
                )}
                <div>
                  <h4 className="font-bold text-amber-900">{unit.name}</h4>
                  <p className="text-xs text-gray-600">الكمية: {count}</p>
                </div>
              </div>

              <div className="mb-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>🪵 خشب:</span>
                  <span className={resources.wood >= totalCost.wood ? 'text-green-600' : 'text-red-600'}>
                    {totalCost.wood}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>🧱 طين:</span>
                  <span className={resources.clay >= totalCost.clay ? 'text-green-600' : 'text-red-600'}>
                    {totalCost.clay}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>⚙️ حديد:</span>
                  <span className={resources.iron >= totalCost.iron ? 'text-green-600' : 'text-red-600'}>
                    {totalCost.iron}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>🌾 محاصيل:</span>
                  <span className={resources.crop >= totalCost.crop ? 'text-green-600' : 'text-red-600'}>
                    {totalCost.crop}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) =>
                    setTrainCounts({
                      ...trainCounts,
                      [unitType]: Math.max(1, parseInt(e.target.value) || 1),
                    })
                  }
                  className="border border-amber-300 rounded px-2 py-1 w-20 text-center"
                />
                <button
                  onClick={() => onTrain(unitType, count)}
                  disabled={!canTrain(unitType, count)}
                  className={`flex-1 py-2 px-4 rounded font-bold transition ${
                    canTrain(unitType, count)
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  تدريب
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ArmyCounterProps {
  emoji: string;
  label: string;
  count: number;
  image?: string;
}

const ArmyCounter = ({ emoji, label, count, image }: ArmyCounterProps) => {
  return (
    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
      {image ? (
        <img src={image} alt={label} className="w-10 h-10" />
      ) : (
        <span className="text-2xl">{emoji}</span>
      )}
      <div>
        <div className="text-xs text-gray-600">{label}</div>
        <div className="font-bold text-lg">{count}</div>
      </div>
    </div>
  );
};
