# Aplikasi Manajemen Buku Pribadi

Aplikasi web untuk mengelola koleksi buku pribadi. Anda bisa menambahkan, mengedit, menghapus, mencari, dan memfilter buku berdasarkan status pembacaan.

## Fitur

- Menambah buku baru dengan judul, penulis, dan status
- Edit informasi buku
- Hapus buku dari koleksi
- Cari buku berdasarkan judul atau penulis
- Filter buku berdasarkan status (Dimiliki, Sedang Dibaca, Ingin Dibeli)
- Lihat statistik koleksi buku

## Status Buku

- **Sudah Dimiliki** - Buku yang sudah Anda miliki
- **Sedang Dibaca** - Buku yang sedang Anda baca
- **Ingin Dibeli** - Buku yang ingin Anda beli

## Teknologi

- **React** - Menggunakan useState, useEffect, Context API
- **Next.js** - Framework React dengan App Router
- **Tailwind CSS** - Untuk styling
- **localStorage** - Untuk menyimpan data buku
- **Dark Mode** - Didukung dengan Tailwind CSS

## Struktur Folder

```
app/
├── page.js           # Halaman utama
├── stats/page.js     # Halaman statistik
├── layout.js         # Layout root
└── globals.css       # Global styles

components/
├── BookForm.js       # Form tambah/edit buku
├── BookList.js       # Daftar buku
├── BookCard.js       # Kartu buku individual
├── BookFilter.js     # Filter status
├── SearchBar.js      # Search
└── StatsCard.js      # Kartu statistik

context/
└── BookContext.js    # Context global

hooks/
├── useLocalStorage.js # Custom hook localStorage
└── useBookStats.js   # Custom hook statistik
```

## Setup

### Install dependencies

```bash
npm install
```

### Jalankan aplikasi

```bash
npm run dev
```

Buka http://localhost:3000 di browser Anda.

### Build untuk production

```bash
npm run build
npm start
```

### 3. Menggunakan Aplikasi

#### Menambah Buku

1. Klik tombol "Tambah Buku" di halaman utama
2. Isi form dengan informasi buku:
   - **Judul buku** (wajib diisi)
   - **Nama penulis** (wajib diisi)
   - **Status buku** - pilih salah satu:
     - Sudah Dimiliki
     - Sedang Dibaca
     - Ingin Dibeli
3. Klik tombol "Simpan Buku"

#### Mengedit Buku

1. Klik tombol "Edit" pada kartu buku yang ingin diubah
2. Form akan muncul dengan data buku yang sudah ada
3. Ubah informasi yang diperlukan
4. Klik "Update Buku"

#### Menghapus Buku

1. Klik tombol "Hapus" pada kartu buku
2. Dialog konfirmasi akan muncul
3. Klik "OK" untuk mengonfirmasi penghapusan

#### Mencari Buku

1. Gunakan kolom pencarian di bagian atas halaman
2. Ketik judul atau nama penulis buku
3. Hasil akan difilter secara real-time
4. Klik tombol "✕" untuk membersihkan pencarian

#### Memfilter Berdasarkan Status

1. Klik tombol filter sesuai status yang ingin dilihat:
   - "Semua Buku" - melihat semua buku
   - "Sudah Dimiliki" - hanya buku yang dimiliki
   - "Sedang Dibaca" - hanya buku yang sedang dibaca
   - "Ingin Dibeli" - hanya buku yang ingin dibeli
2. Hasil akan difilter secara otomatis

#### Melihat Statistik

1. Klik tombol "Statistik" di kanan atas halaman utama
2. Lihat ringkasan koleksi buku dengan:
   - Total buku yang dikumpulkan
   - Jumlah buku per status
   - Persentase untuk setiap status

## Fitur React yang Digunakan

### 1. useState Hook

\`\`\`javascript
// Mengelola state lokal komponen
const [books, setBooks] = useLocalStorage('books', [])
const [selectedStatus, setSelectedStatus] = useState('all')
const [searchQuery, setSearchQuery] = useState('')
const [errors, setErrors] = useState({})
\`\`\`

**Penjelasan**: Hook useState digunakan untuk membuat dan mengelola state lokal di komponen React. Perubahan state akan trigger re-render otomatis.

### 2. useEffect Hook

\`\`\`javascript
// Menjalankan side effects
useEffect(() => {
const item = window.localStorage.getItem(key)
if (item) {
setStoredValue(JSON.parse(item))
}
setIsMounted(true)
}, [key])
\`\`\`

**Penjelasan**: Hook useEffect digunakan untuk menjalankan kode setelah component render. Dependency array [key] memastikan effect hanya berjalan saat key berubah.

### 3. Context API

\`\`\`javascript
// BookContext.js - Membuat context global
export const BookContext = createContext()

// app/page.js - Menggunakan context
<BookContext.Provider value={{ books, setBooks }}>
{/_ Child components dapat mengakses books dan setBooks _/}
</BookContext.Provider>
\`\`\`

**Penjelasan**: Context API digunakan untuk menghindari prop drilling. Data bisa diakses langsung di komponen mana pun tanpa passing props layer demi layer.

### 4. Custom Hooks

#### useLocalStorage Hook

\`\`\`javascript
// Mengelola data di localStorage dengan lebih mudah
const [books, setBooks] = useLocalStorage('books', [])

// Ini akan:
// 1. Baca data dari localStorage saat mount
// 2. Update state saat data berubah
// 3. Simpan ke localStorage otomatis saat setValue dipanggil
\`\`\`

**Penjelasan**: Custom hook menggabungkan useState dan useEffect untuk membuat abstraksi yang reusable. Setiap perubahan state akan otomatis disimpan ke localStorage.

#### useBookStats Hook

\`\`\`javascript
// Menghitung statistik buku
const stats = useBookStats(books)

// Mengembalikan object:
// {
// total: 5, // Total semua buku
// owned: 2, // Buku yang dimiliki
// reading: 1, // Buku yang sedang dibaca
// toRead: 2 // Buku yang ingin dibeli
// }
\`\`\`

**Penjelasan**: Custom hook ini pure function yang menghitung statistik dari array buku. Hook ini tidak memiliki side effects, hanya transformasi data.

### 5. Reusable Components

#### BookForm

- Komponen form untuk menambah dan edit buku
- Menerima props: onAdd, onCancel, initialData, errors
- Menampilkan error message jika validasi gagal
- Digunakan di app/page.js

#### BookList

- Komponen untuk menampilkan daftar buku dalam grid
- Menerima props: books, onDelete, onEdit
- Menampilkan pesan kosong jika tidak ada buku
- Di-reuse di app/page.js

#### BookCard

- Komponen individual untuk satu buku
- Menampilkan judul, penulis, status
- Tombol edit dan delete
- Warna badge berdasarkan status

#### BookFilter

- Komponen filter dengan tombol status
- Menerima props: selectedStatus, onChange
- 4 pilihan filter: Semua/Dimiliki/Dibaca/Ingin Dibeli
- Styling berubah untuk filter yang aktif

#### SearchBar

- Komponen input pencarian
- Tombol clear otomatis muncul saat ada input
- Real-time filtering

#### StatsCard

- Komponen reusable untuk menampilkan statistik
- Customizable: title, value, icon, color, textColor
- Digunakan di halaman stats untuk 4 kartu statistik

## Error Handling

Aplikasi memiliki validasi form yang comprehensive:

- **Judul Buku** - Error jika kosong: "Judul buku harus diisi"
- **Penulis** - Error jika kosong: "Penulis harus diisi"
- **Status** - Error jika tidak dipilih: "Status harus dipilih"
- **Konfirmasi Hapus** - Dialog untuk mencegah penghapusan tak disengaja
- **Input Validation** - Validasi real-time dengan error messages di bawah input

Error ditampilkan dengan:

- Border merah pada input field yang error
- Pesan error merah di bawah input
- Focus ring merah saat input di-focus

## Dokumentasi Kode

Setiap komponen dan hook dilengkapi dengan:

- **JSDoc Comments** - Menjelaskan fungsi, params, dan return value
- **Inline Comments** - Untuk logika yang kompleks
- **Struktur Kode Clean** - Mengikuti best practices React
- **Naming Convention** - Nama file dan variabel yang jelas dan konsisten

Contoh JSDoc:
\`\`\`javascript
/\*\*

- Custom Hook untuk mengelola localStorage
- @param {string} key - Kunci untuk menyimpan di localStorage
- @param {any} initialValue - Nilai awal jika belum ada
- @returns {[any, Function]} - [value, setValue]
  \*/
  export function useLocalStorage(key, initialValue) { ... }
  \`\`\`

## Testing dengan React Testing Library

Aplikasi dapat ditest dengan React Testing Library. Berikut contoh test cases:

### Test untuk BookForm Component

\`\`\`javascript
import { render, screen, fireEvent } from '@testing-library/react'
import BookForm from '@/components/BookForm'

describe('BookForm', () => {
// Test 1: Render form dengan semua fields
test('should render form with all fields', () => {
const mockOnAdd = jest.fn()
const mockOnCancel = jest.fn()
render(
<BookForm 
        onAdd={mockOnAdd} 
        onCancel={mockOnCancel} 
        errors={{}} 
      />
)

    expect(screen.getByLabelText(/Judul Buku/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument()

})

// Test 2: Tampilkan error message jika title kosong
test('should show error message for empty title', () => {
const errors = { title: 'Judul buku harus diisi' }
render(
<BookForm 
        onAdd={jest.fn()} 
        onCancel={jest.fn()} 
        errors={errors} 
      />
)
expect(screen.getByText(/Judul buku harus diisi/i)).toBeInTheDocument()
})

// Test 3: Call onAdd saat submit
test('should call onAdd when form submitted', () => {
const mockOnAdd = jest.fn()
render(
<BookForm 
        onAdd={mockOnAdd} 
        onCancel={jest.fn()} 
        errors={{}} 
      />
)

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Test Book' }
    })
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Test Author' }
    })
    fireEvent.click(screen.getByText(/Simpan Buku/i))

    expect(mockOnAdd).toHaveBeenCalled()

})

// Test 4: Call onCancel saat klik batal
test('should call onCancel when cancel button clicked', () => {
const mockOnCancel = jest.fn()
render(
<BookForm 
        onAdd={jest.fn()} 
        onCancel={mockOnCancel} 
        errors={{}} 
      />
)
fireEvent.click(screen.getByText(/Batal/i))
expect(mockOnCancel).toHaveBeenCalled()
})

// Test 5: Pre-fill form saat edit
test('should pre-fill form with initial data', () => {
const initialData = {
id: '1',
title: 'Existing Book',
author: 'Existing Author',
status: 'reading'
}
render(
<BookForm 
        onAdd={jest.fn()} 
        onCancel={jest.fn()} 
        initialData={initialData}
        errors={{}} 
      />
)
expect(screen.getByDisplayValue('Existing Book')).toBeInTheDocument()
expect(screen.getByDisplayValue('Existing Author')).toBeInTheDocument()
})
})
\`\`\`

### Test untuk BookFilter Component

\`\`\`javascript
describe('BookFilter', () => {
// Test 1: Render semua filter buttons
test('should render all filter buttons', () => {
render(<BookFilter selectedStatus="all" onChange={jest.fn()} />)
expect(screen.getByText(/Semua Buku/i)).toBeInTheDocument()
expect(screen.getByText(/Sudah Dimiliki/i)).toBeInTheDocument()
expect(screen.getByText(/Sedang Dibaca/i)).toBeInTheDocument()
expect(screen.getByText(/Ingin Dibeli/i)).toBeInTheDocument()
})

// Test 2: Highlight button yang dipilih
test('should highlight selected filter', () => {
const { container } = render(
<BookFilter selectedStatus="owned" onChange={jest.fn()} />
)
const selectedButton = screen.getByText(/Sudah Dimiliki/i).closest('button')
expect(selectedButton).toHaveClass('bg-blue-600')
})

// Test 3: Call onChange saat filter diklik
test('should call onChange when filter clicked', () => {
const mockOnChange = jest.fn()
render(<BookFilter selectedStatus="all" onChange={mockOnChange} />)
fireEvent.click(screen.getByText(/Sudah Dimiliki/i))
expect(mockOnChange).toHaveBeenCalledWith('owned')
})
})
\`\`\`

### Test untuk useLocalStorage Hook

\`\`\`javascript
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

describe('useLocalStorage', () => {
// Test 1: Initialize dengan initial value
test('should initialize with initial value', () => {
const { result } = renderHook(() => useLocalStorage('test', []))
expect(result.current[0]).toEqual([])
})

// Test 2: Update localStorage saat setValue dipanggil
test('should update localStorage when setValue called', () => {
const { result } = renderHook(() => useLocalStorage('test', []))

    act(() => {
      result.current[1]([{ id: 1, title: 'Test' }])
    })

    expect(JSON.parse(localStorage.getItem('test'))).toEqual([
      { id: 1, title: 'Test' }
    ])

})

// Test 3: Read dari localStorage saat mount
test('should read from localStorage on mount', () => {
const testData = [{ id: 1, title: 'Test' }]
localStorage.setItem('test', JSON.stringify(testData))

    const { result } = renderHook(() => useLocalStorage('test', []))
    expect(result.current[0]).toEqual(testData)

})
})
\`\`\`

### Test untuk useBookStats Hook

\`\`\`javascript
describe('useBookStats', () => {
// Test 1: Hitung statistik dengan benar
test('should calculate stats correctly', () => {
const books = [
{ id: 1, status: 'owned' },
{ id: 2, status: 'reading' },
{ id: 3, status: 'toRead' },
{ id: 4, status: 'owned' }
]

    const { result } = renderHook(() => useBookStats(books))

    expect(result.current).toEqual({
      total: 4,
      owned: 2,
      reading: 1,
      toRead: 1
    })

})

// Test 2: Return 0 untuk array kosong
test('should return 0 for empty array', () => {
const { result } = renderHook(() => useBookStats([]))

    expect(result.current).toEqual({
      total: 0,
      owned: 0,
      reading: 0,
      toRead: 0
    })

})
})
\`\`\`

## Penyimpanan Data

Aplikasi menggunakan \`localStorage\` browser untuk menyimpan data secara persistent:

### Struktur Data

\`\`\`javascript
// Format data yang disimpan di localStorage
{
"books": [
{
"id": "1701234567890",
"title": "Clean Code",
"author": "Robert C. Martin",
"status": "reading" // 'owned', 'reading', atau 'toRead'
},
{
"id": "1701234567891",
"title": "The Pragmatic Programmer",
"author": "David Thomas",
"status": "owned"
}
]
}
\`\`\`

### Fitur localStorage

- Data disimpan dengan key \`"books"\`
- Format: JSON array of book objects
- Data persisten meskipun browser ditutup
- Auto-saved setiap kali ada perubahan
- Unique ID menggunakan timestamp: Date.now().toString()

## Dark Mode

Aplikasi mendukung dark mode dengan menggunakan class \`dark:\` dari Tailwind CSS:

\`\`\`javascript

<div className="bg-white dark:bg-slate-800">
  <p className="text-slate-900 dark:text-white">Text</p>
</div>
\`\`\`

Dark mode akan mengikuti preferensi sistem jika menggunakan next-themes.

## Responsive Design

Aplikasi fully responsive untuk semua ukuran layar:

- **Mobile First Approach** - Design dimulai dari mobile
- **Breakpoints**:
  - sm: 640px (tablet kecil)
  - md: 768px (tablet)
  - lg: 1024px (desktop)
- **Optimal Display**:
  - Mobile: Single column
  - Tablet: 2 columns
  - Desktop: 3 columns (untuk grid buku)

Contoh responsive grid:
\`\`\`javascript

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {books.map(book => <BookCard key={book.id} book={book} />)}
</div>
\`\`\`

## Browser Compatibility

- Chrome (versi 90+)
- Firefox (versi 88+)
- Safari (versi 14+)
- Edge (versi 90+)

Requirements:

- localStorage support (built-in di semua browser modern)
- JavaScript enabled
- ES6+ support

## License

Aplikasi ini dibuat untuk pembelajaran React dan State Management.

---
