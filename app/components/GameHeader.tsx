export const GameHeader = () => {
  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏰</div>
            <div>
              <h1 className="text-3xl font-bold">Travian</h1>
              <p className="text-amber-200 text-sm">لعبة الاستراتيجية الملحمية</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl">⚔️</div>
              <span className="text-xs">معارك</span>
            </div>
            <div className="text-center">
              <div className="text-2xl">🛡️</div>
              <span className="text-xs">دفاع</span>
            </div>
            <div className="text-center">
              <div className="text-2xl">👥</div>
              <span className="text-xs">تحالف</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
