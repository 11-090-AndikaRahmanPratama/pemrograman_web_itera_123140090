"use client";

export default function BookCard({ book, onDelete, onEdit }) {
  const statusConfig = {
    owned: {
      label: "Sudah Dimiliki",
      color:
        "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    },
    reading: {
      label: "Sedang Dibaca",
      color:
        "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    },
    toRead: {
      label: "Ingin Dibeli",
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
    },
  };

  const status = statusConfig[book.status] || statusConfig.owned;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className={`px-6 py-3 ${status.color}`}>
        <span className="text-sm font-semibold">{status.label}</span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
          oleh <span className="font-semibold">{book.author}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
                onDelete(book.id);
              }
            }}
            className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
