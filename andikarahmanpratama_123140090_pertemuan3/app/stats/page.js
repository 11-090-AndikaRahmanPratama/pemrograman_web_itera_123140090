"use client";

import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useBookStats } from "@/hooks/useBookStats";
import StatsCard from "@/components/StatsCard";

export default function Stats() {
  const [books] = useLocalStorage("books", []);
  const stats = useBookStats(books);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Statistik Buku
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Lihat dan analisis koleksi bukuku
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Kembali
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Buku"
            value={stats.total}
            icon=""
            color="bg-blue-50 dark:bg-blue-900"
            textColor="text-blue-700 dark:text-blue-200"
          />
          <StatsCard
            title="Sudah Dimiliki"
            value={stats.owned}
            icon=""
            color="bg-green-50 dark:bg-green-900"
            textColor="text-green-700 dark:text-green-200"
          />
          <StatsCard
            title="Sedang Dibaca"
            value={stats.reading}
            icon=""
            color="bg-orange-50 dark:bg-orange-900"
            textColor="text-orange-700 dark:text-orange-200"
          />
          <StatsCard
            title="Ingin Dibeli"
            value={stats.toRead}
            icon=""
            color="bg-purple-50 dark:bg-purple-900"
            textColor="text-purple-700 dark:text-purple-200"
          />
        </div>

        {books.length > 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Ringkasan Koleksi
            </h2>

            <div className="space-y-4">
              {books.length > 0 && (
                <>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-slate-700 dark:text-slate-300">
                      Total Buku Terkumpul:
                    </span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.total}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <p className="text-green-700 dark:text-green-200 text-sm mb-1">
                        Sudah Dimiliki
                      </p>
                      <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                        {stats.owned}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                        {stats.total > 0
                          ? ((stats.owned / stats.total) * 100).toFixed(0)
                          : 0}
                        %
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
                      <p className="text-orange-700 dark:text-orange-200 text-sm mb-1">
                        Sedang Dibaca
                      </p>
                      <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                        {stats.reading}
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                        {stats.total > 0
                          ? ((stats.reading / stats.total) * 100).toFixed(0)
                          : 0}
                        %
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                      <p className="text-purple-700 dark:text-purple-200 text-sm mb-1">
                        Ingin Dibeli
                      </p>
                      <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                        {stats.toRead}
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">
                        {stats.total > 0
                          ? ((stats.toRead / stats.total) * 100).toFixed(0)
                          : 0}
                        %
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Belum ada buku. Mulai dengan menambahkan buku pertama Anda!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
