import { useState } from 'react';
import { Resources } from '../types';

interface MarketPanelProps {
  resources: Resources;
  onTrade: (give: Partial<Resources>, receive: Partial<Resources>) => void;
  images: Record<string, string>;
}

export const MarketPanel = ({ resources, onTrade, images }: MarketPanelProps) => {
  const [giveType, setGiveType] = useState<'wood' | 'clay' | 'iron' | 'crop'>('wood');
  const [receiveType, setReceiveType] = useState<'wood' | 'clay' | 'iron' | 'crop'>('clay');
  const [giveAmount, setGiveAmount] = useState(100);

  const resourceOptions = [
    { value: 'wood', label: 'خشب', emoji: '🪵' },
    { value: 'clay', label: 'طين', emoji: '🧱' },
    { value: 'iron', label: 'حديد', emoji: '⚙️' },
    { value: 'crop', label: 'محاصيل', emoji: '🌾' },
  ];

  const exchangeRate = 0.8;
  const receiveAmount = Math.floor(giveAmount * exchangeRate);

  const canTrade = resources[giveType] >= giveAmount;

  const executeTrade = () => {
    if (!canTrade) return;

    const give = { wood: 0, clay: 0, iron: 0, crop: 0, [giveType]: giveAmount };
    const receive = { wood: 0, clay: 0, iron: 0, crop: 0, [receiveType]: receiveAmount };

    onTrade(give, receive);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">السوق</h2>

      <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
        <h3 className="font-bold text-lg mb-3 text-green-900">الموارد الحالية</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {resourceOptions.map((res) => (
            <div key={res.value} className="bg-white p-3 rounded-lg shadow text-center">
              {images[res.value] ? (
                <img
                  src={images[res.value]}
                  alt={res.label}
                  className="w-12 h-12 mx-auto mb-2"
                />
              ) : (
                <span className="text-3xl">{res.emoji}</span>
              )}
              <div className="text-sm text-gray-600">{res.label}</div>
              <div className="font-bold text-lg">
                {Math.floor(resources[res.value as keyof Resources])}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-amber-200 rounded-lg p-6 bg-gradient-to-b from-amber-50 to-white">
        <h3 className="font-bold text-lg mb-4 text-amber-900">تبادل الموارد</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <label className="block font-bold mb-2 text-red-900">أعطي</label>
            <select
              value={giveType}
              onChange={(e) => setGiveType(e.target.value as any)}
              className="w-full border border-amber-300 rounded px-3 py-2 mb-3"
            >
              {resourceOptions.map((res) => (
                <option key={res.value} value={res.value}>
                  {res.emoji} {res.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="10"
              max={Math.floor(resources[giveType])}
              step="10"
              value={giveAmount}
              onChange={(e) => setGiveAmount(Math.max(10, parseInt(e.target.value) || 10))}
              className="w-full border border-amber-300 rounded px-3 py-2"
            />
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <label className="block font-bold mb-2 text-green-900">استلم</label>
            <select
              value={receiveType}
              onChange={(e) => setReceiveType(e.target.value as any)}
              className="w-full border border-amber-300 rounded px-3 py-2 mb-3"
            >
              {resourceOptions.map((res) => (
                <option key={res.value} value={res.value}>
                  {res.emoji} {res.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={receiveAmount}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 mb-2">
            معدل التبادل: 1 : {exchangeRate} (رسوم السوق: %20)
          </div>
          <div className="text-lg font-bold">
            {giveAmount} {resourceOptions.find((r) => r.value === giveType)?.emoji} → {receiveAmount}{' '}
            {resourceOptions.find((r) => r.value === receiveType)?.emoji}
          </div>
        </div>

        <button
          onClick={executeTrade}
          disabled={!canTrade || giveType === receiveType}
          className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition ${
            canTrade && giveType !== receiveType
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {giveType === receiveType ? 'اختر موارد مختلفة' : 'تنفيذ التبادل'}
        </button>

        {!canTrade && giveType !== receiveType && (
          <p className="text-red-600 text-sm text-center mt-2">
            ليس لديك موارد كافية!
          </p>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h4 className="font-bold mb-2 text-blue-900">💡 نصيحة</h4>
        <p className="text-sm text-blue-800">
          يتم فرض رسوم بنسبة 20% على جميع التبادلات. قم بترقية السوق لتقليل الرسوم!
        </p>
      </div>
    </div>
  );
};
