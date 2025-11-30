"use client";

export default function SearchBar({ query, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari berdasarkan judul atau penulis..."
        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:bg-slate-800 dark:text-white"
      />
      {query && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          ×
        </button>
      )}
    </div>
  );
}
