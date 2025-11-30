"use client";

import { useState, useEffect } from "react";

export default function BookForm({ onAdd, onCancel, initialData, errors }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "owned",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    if (Object.keys(errors).length === 0) {
      setFormData({
        title: "",
        author: "",
        status: "owned",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Judul Buku *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan judul buku"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors dark:bg-slate-700 dark:text-white ${
            errors.title
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Input Penulis */}
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Penulis *
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Masukkan nama penulis"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors dark:bg-slate-700 dark:text-white ${
            errors.author
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
          }`}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author}</p>
        )}
      </div>

      {/* Select Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
        >
          Status *
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors dark:bg-slate-700 dark:text-white ${
            errors.status
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
          }`}
        >
          <option value="owned">Sudah Dimiliki</option>
          <option value="reading">Sedang Dibaca</option>
          <option value="toRead">Ingin Dibeli</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status}</p>
        )}
      </div>

      {/* Tombol Submit dan Cancel */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          {initialData ? "Update Buku" : "Simpan Buku"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-lg transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
