interface MapViewProps {
  images: Record<string, string>;
}

export const MapView = ({ images }: MapViewProps) => {
  const mapSize = 11;
  const centerX = Math.floor(mapSize / 2);
  const centerY = Math.floor(mapSize / 2);

  const terrains = ['grass', 'forest', 'mountain', 'water', 'desert', 'hills'];

  const getTerrain = (x: number, y: number) => {
    if (x === centerX && y === centerY) {
      return 'village';
    }
    const hash = (x * 7 + y * 13) % terrains.length;
    return terrains[hash];
  };

  const getTerrainEmoji = (terrain: string) => {
    const emojiMap: Record<string, string> = {
      grass: '🌿',
      forest: '🌲',
      mountain: '⛰️',
      water: '💧',
      desert: '🏜️',
      hills: '⛰️',
      village: '🏰',
    };
    return emojiMap[terrain] || '🌿';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">خريطة العالم</h2>
      <div className="overflow-auto">
        <div className="inline-block min-w-max">
          {Array.from({ length: mapSize }, (_, y) => (
            <div key={y} className="flex">
              {Array.from({ length: mapSize }, (_, x) => {
                const terrain = getTerrain(x, y);
                const isVillage = x === centerX && y === centerY;

                return (
                  <div
                    key={`${x}-${y}`}
                    className={`w-16 h-16 border border-amber-200 flex flex-col items-center justify-center transition hover:scale-110 cursor-pointer ${
                      isVillage
                        ? 'bg-gradient-to-b from-amber-300 to-amber-400'
                        : 'bg-gradient-to-b from-green-100 to-green-200'
                    }`}
                  >
                    {images[terrain] ? (
                      <img
                        src={images[terrain]}
                        alt={terrain}
                        className="w-12 h-12"
                      />
                    ) : (
                      <span className="text-2xl">{getTerrainEmoji(terrain)}</span>
                    )}
                    <span className="text-xs text-gray-600 mt-1">
                      {x - centerX},{y - centerY}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span>أرض عشبية</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌲</span>
          <span>غابة</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">⛰️</span>
          <span>جبال</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <span>ماء</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🏜️</span>
          <span>صحراء</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🏰</span>
          <span>قريتك</span>
        </div>
      </div>
    </div>
  );
};
