import React from 'react';
import { BoxIcon } from 'lucide-react';
interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: BoxIcon;
  color: 'red' | 'orange' | 'amber';
}
export function DashboardCard({
  title,
  value,
  icon: Icon,
  color
}: DashboardCardProps) {
  const colorStyles = {
    red: 'bg-red-50 text-red-700',
    orange: 'bg-orange-50 text-orange-700',
    amber: 'bg-amber-50 text-amber-700'
  };
  return <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 flex items-center gap-4">
      <div className={`p-4 rounded-full ${colorStyles[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>;
}