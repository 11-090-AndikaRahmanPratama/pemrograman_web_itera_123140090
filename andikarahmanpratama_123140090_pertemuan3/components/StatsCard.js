"use client";

export default function StatsCard({ title, value, icon, color, textColor }) {
  return (
    <div
      className={`${color} rounded-lg p-6 border border-slate-200 dark:border-slate-700`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor}`}>{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
