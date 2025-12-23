import { Resources, Production } from '../types';

interface ResourceBarProps {
  resources: Resources;
  production: Production;
}

export const ResourceBar = ({ resources, production }: ResourceBarProps) => {
  return (
    <div className="bg-gradient-to-r from-amber-700 to-amber-600 text-white py-3 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          <ResourceItem
            icon="🪵"
            name="خشب"
            amount={Math.floor(resources.wood)}
            production={production.wood}
            color="bg-amber-800"
          />
          <ResourceItem
            icon="🧱"
            name="طين"
            amount={Math.floor(resources.clay)}
            production={production.clay}
            color="bg-orange-800"
          />
          <ResourceItem
            icon="⚙️"
            name="حديد"
            amount={Math.floor(resources.iron)}
            production={production.iron}
            color="bg-gray-700"
          />
          <ResourceItem
            icon="🌾"
            name="محاصيل"
            amount={Math.floor(resources.crop)}
            production={production.crop}
            color="bg-green-700"
          />
          <ResourceItem
            icon="💰"
            name="ذهب"
            amount={Math.floor(resources.gold)}
            production={0}
            color="bg-yellow-600"
          />
        </div>
      </div>
    </div>
  );
};

interface ResourceItemProps {
  icon: string;
  name: string;
  amount: number;
  production: number;
  color: string;
}

const ResourceItem = ({ icon, name, amount, production, color }: ResourceItemProps) => {
  return (
    <div className={`${color} px-4 py-2 rounded-lg flex items-center gap-2 min-w-[140px]`}>
      <span className="text-2xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs opacity-75">{name}</span>
        <span className="font-bold">{amount.toLocaleString()}</span>
        {production > 0 && (
          <span className="text-xs text-green-300">+{production}/ساعة</span>
        )}
      </div>
    </div>
  );
};
