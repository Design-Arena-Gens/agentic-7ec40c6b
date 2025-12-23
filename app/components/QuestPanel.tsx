import { Quest } from '../types';

interface QuestPanelProps {
  quests: Quest[];
}

export const QuestPanel = ({ quests }: QuestPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
        <span>📋</span>
        <span>المهام</span>
      </h2>

      <div className="space-y-4">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`border-2 rounded-lg p-4 transition ${
              quest.completed
                ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50'
                : 'border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-2xl mt-1">
                {quest.completed ? '✅' : '⏳'}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-bold text-lg mb-1 ${
                    quest.completed ? 'text-green-900 line-through' : 'text-amber-900'
                  }`}
                >
                  {quest.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">{quest.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-purple-700">🎁 المكافأة:</span>
                  <span className="text-purple-900">{quest.reward}</span>
                </div>
                {quest.completed && (
                  <div className="mt-2 text-green-700 font-bold text-sm">
                    ✨ تم إكمال المهمة!
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h4 className="font-bold mb-2 text-blue-900 flex items-center gap-2">
          <span>💡</span>
          <span>نصيحة</span>
        </h4>
        <p className="text-sm text-blue-800">
          أكمل المهام للحصول على مكافآت قيمة! المهام الجديدة تظهر مع تقدمك في اللعبة.
        </p>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
        <div className="text-sm text-purple-900 font-bold">
          المهام المكتملة: {quests.filter((q) => q.completed).length} / {quests.length}
        </div>
        <div className="mt-2 bg-purple-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-500"
            style={{
              width: `${(quests.filter((q) => q.completed).length / quests.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
