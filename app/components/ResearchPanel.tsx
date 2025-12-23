import { Research, Resources } from '../types';

interface ResearchPanelProps {
  research: Research;
  onResearch: (techType: 'attack' | 'defense' | 'speed') => void;
  resources: Resources;
  images: Record<string, string>;
}

export const ResearchPanel = ({ research, onResearch, resources, images }: ResearchPanelProps) => {
  const techs = [
    {
      type: 'attack' as const,
      name: 'تقنية الهجوم',
      emoji: '⚔️',
      description: 'زيادة قوة هجوم جميع الوحدات',
      bonus: '+10%',
      color: 'red',
    },
    {
      type: 'defense' as const,
      name: 'تقنية الدفاع',
      emoji: '🛡️',
      description: 'زيادة قوة دفاع جميع الوحدات',
      bonus: '+10%',
      color: 'blue',
    },
    {
      type: 'speed' as const,
      name: 'تقنية السرعة',
      emoji: '⚡',
      description: 'زيادة سرعة حركة جميع الوحدات',
      bonus: '+10%',
      color: 'yellow',
    },
  ];

  const calculateResearchCost = (techType: keyof Research) => {
    const level = research[techType];
    return {
      wood: 200 * (level + 1),
      clay: 200 * (level + 1),
      iron: 300 * (level + 1),
      crop: 100 * (level + 1),
      gold: 50 * (level + 1),
    };
  };

  const canResearch = (techType: keyof Research) => {
    const cost = calculateResearchCost(techType);
    return (
      resources.wood >= cost.wood &&
      resources.clay >= cost.clay &&
      resources.iron >= cost.iron &&
      resources.crop >= cost.crop &&
      resources.gold >= cost.gold
    );
  };

  const getColorClasses = (color: string, enabled: boolean) => {
    if (!enabled) return 'bg-gray-300 text-gray-500 cursor-not-allowed';

    const colorMap: Record<string, string> = {
      red: 'bg-red-600 hover:bg-red-700 text-white',
      blue: 'bg-blue-600 hover:bg-blue-700 text-white',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    };
    return colorMap[color] || 'bg-gray-600 hover:bg-gray-700 text-white';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">البحث والتطوير</h2>

      <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
        <h3 className="font-bold text-lg mb-3 text-purple-900">التقنيات الحالية</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TechLevel
            emoji="⚔️"
            label="الهجوم"
            level={research.attack}
            bonus={research.attack * 10}
            image={images.attack}
          />
          <TechLevel
            emoji="🛡️"
            label="الدفاع"
            level={research.defense}
            bonus={research.defense * 10}
            image={images.defense}
          />
          <TechLevel
            emoji="⚡"
            label="السرعة"
            level={research.speed}
            bonus={research.speed * 10}
            image={images.speed}
          />
        </div>
      </div>

      <h3 className="font-bold text-lg mb-4 text-amber-900">تطوير التقنيات</h3>
      <div className="grid grid-cols-1 gap-4">
        {techs.map((tech) => {
          const cost = calculateResearchCost(tech.type);
          const canDo = canResearch(tech.type);
          const currentLevel = research[tech.type];

          return (
            <div
              key={tech.type}
              className="border-2 border-purple-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-indigo-50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {images[tech.type] ? (
                    <img src={images[tech.type]} alt={tech.name} className="w-16 h-16" />
                  ) : (
                    <span className="text-5xl">{tech.emoji}</span>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-lg text-purple-900">{tech.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{tech.description}</p>
                  <p className="text-sm font-bold text-purple-700 mb-3">
                    المستوى الحالي: {currentLevel} | المكافأة: {currentLevel * 10}%
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span>🪵</span>
                      <span className={resources.wood >= cost.wood ? 'text-green-600' : 'text-red-600'}>
                        {cost.wood}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🧱</span>
                      <span className={resources.clay >= cost.clay ? 'text-green-600' : 'text-red-600'}>
                        {cost.clay}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⚙️</span>
                      <span className={resources.iron >= cost.iron ? 'text-green-600' : 'text-red-600'}>
                        {cost.iron}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🌾</span>
                      <span className={resources.crop >= cost.crop ? 'text-green-600' : 'text-red-600'}>
                        {cost.crop}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💰</span>
                      <span className={resources.gold >= cost.gold ? 'text-green-600' : 'text-red-600'}>
                        {cost.gold}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onResearch(tech.type)}
                    disabled={!canDo}
                    className={`w-full md:w-auto py-2 px-6 rounded-lg font-bold transition ${getColorClasses(
                      tech.color,
                      canDo
                    )}`}
                  >
                    بحث المستوى {currentLevel + 1}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
        <h4 className="font-bold mb-2 text-amber-900">📚 معلومات</h4>
        <p className="text-sm text-amber-800">
          التقنيات تمنح مكافآت دائمة لجميع وحداتك. كل مستوى يزيد المكافأة بنسبة 10%. قم بالبحث بحكمة!
        </p>
      </div>
    </div>
  );
};

interface TechLevelProps {
  emoji: string;
  label: string;
  level: number;
  bonus: number;
  image?: string;
}

const TechLevel = ({ emoji, label, level, bonus, image }: TechLevelProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-3">
        {image ? (
          <img src={image} alt={label} className="w-12 h-12" />
        ) : (
          <span className="text-3xl">{emoji}</span>
        )}
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="font-bold text-lg">المستوى {level}</div>
          <div className="text-xs text-green-600">+{bonus}%</div>
        </div>
      </div>
    </div>
  );
};
