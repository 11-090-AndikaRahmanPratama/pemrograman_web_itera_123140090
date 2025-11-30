"use client";

export default function BookFilter({ selectedStatus, onChange }) {
  const filters = [
    { value: "all", label: "Semua Buku" },
    { value: "owned", label: "Sudah Dimiliki" },
    { value: "reading", label: "Sedang Dibaca" },
    { value: "toRead", label: "Ingin Dibeli" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedStatus === filter.value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:border-blue-500"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
