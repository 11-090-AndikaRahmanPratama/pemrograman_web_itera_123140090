# Personal Dashboard - Task Manager

Aplikasi Personal Dashboard sederhana untuk mengelola daftar tugas dengan antarmuka yang interaktif dan responsif menggunakan vanilla JavaScript (ES6+).

## Fitur Utama

### 1. **Manajemen Tugas**

- **Tambah Tugas**: Tambahkan tugas baru dengan judul, deskripsi, prioritas, dan tanggal jatuh tempo
- **Edit Tugas**: Ubah detail tugas yang sudah ada melalui modal dialog interaktif
- **Tandai Selesai**: Centang checkbox untuk menandai tugas sebagai selesai
- **Hapus Tugas**: Hapus tugas individual dengan konfirmasi

### 2. **Filter & Pencarian**

- **Semua**: Tampilkan semua tugas
- **Pending**: Tampilkan hanya tugas yang belum selesai
- **Selesai**: Tampilkan hanya tugas yang sudah selesai
- **Pencarian Real-time**: Cari tugas berdasarkan judul atau deskripsi

### 3. **Statistik Real-time**

- Total jumlah tugas
- Jumlah tugas yang selesai
- Jumlah tugas yang pending (belum dikerjakan)

### 4. **Prioritas Tugas**

- **Prioritas Tinggi**: Ditampilkan dengan warna merah
- **Prioritas Sedang**: Ditampilkan dengan warna kuning (default)
- **Prioritas Rendah**: Ditampilkan dengan warna hijau

### 5. **Penyimpanan Data**

- **localStorage**: Semua data tersimpan secara otomatis di browser lokal
- **Auto-save**: Data otomatis tersimpan setiap kali ada perubahan
- **Persistent Storage**: Data tetap tersimpan meskipun browser ditutup

## Fitur ES6+ yang Diimplementasikan

### 1. **Classes & Constructor**

\`\`\`javascript
class Task {
constructor(id, title, description, priority, dueDate, completed = false) {
this.id = id;
this.title = title;
this.description = description;
this.priority = priority;
this.dueDate = dueDate;
this.completed = completed;
}
}

class TaskManager {
constructor() {
this.tasks = [];
this.loadFromStorage();
}
}
\`\`\`

### 2. **Arrow Functions (5+)**

\`\`\`javascript
// Arrow function untuk toggle complete
const handleToggleComplete = (id) => {
taskManager.toggleTaskComplete(id);
renderTasks();
updateStats();
};

// Arrow function untuk mengedit tugas
const handleEditTask = (id) => { ... };

// Arrow function untuk menghapus tugas
const handleDeleteTask = (id) => { ... };

// Arrow function untuk render tugas
const renderTasks = () => { ... };

// Arrow function untuk update statistik
const updateStats = () => { ... };

// Arrow function untuk format tanggal
const formatDate = (dateString) => { ... };
\`\`\`

### 3. **Template Literals**

\`\`\`javascript
// Template literals untuk rendering dinamis
tasksContainer.innerHTML = tasksToRender.map(task => `

  <div class="task-card ${task.completed ? 'completed' : ''}">
    <div class="task-content">
      <div class="task-header">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          onchange="handleToggleComplete(${task.id})"
        >
        <span class="task-title">${task.title}</span>
      </div>
      ${task.description ? `<p class="task-desc">${task.description}</p>` : ''}
      <div class="task-meta">
        <span class="task-priority ${task.priority}">
          ${task.priority === 'Tinggi' ? "" : task.priority === 'Sedang' ? "" : ""} 
          ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        ${task.dueDate ? `<span class="task-date"> ${formatDate(task.dueDate)}</span>` : ''}
      </div>
    </div>
  </div>
`).join('');
\`\`\`

### 4. **Let & Const (Deklarasi Variabel)**

\`\`\`javascript
const taskManager = new TaskManager(); // Konstanta untuk TaskManager
let currentFilter = 'all'; // Variabel yang dapat berubah untuk filter
let currentSearchQuery = ''; // Variabel untuk query pencarian
let editingTaskId = null; // Variabel untuk tracking ID tugas yang sedang diedit

const addBtn = document.getElementById('addBtn'); // Konstanta untuk DOM element
const tasksContainer = document.getElementById('tasksContainer'); // Konstanta untuk container
\`\`\`

### 5. **Fungsi Asinkron (Async/Await & Promises)**

\`\`\`javascript
// Fungsi yang mengembalikan Promise
const saveTaskAsync = (taskData) => {
return new Promise((resolve) => {
setTimeout(() => {
if (editingTaskId) {
const updatedTask = new Task(
editingTaskId,
taskData.title,
taskData.description,
taskData.priority,
taskData.dueDate,
taskManager.tasks.find(t => t.id === editingTaskId).completed
);
taskManager.updateTask(editingTaskId, updatedTask);
} else {
const newId = Date.now();
const newTask = new Task(newId, taskData.title, taskData.description, taskData.priority, taskData.dueDate, false);
taskManager.addTask(newTask);
}
resolve(true);
}, 300);
});
};

// Menggunakan async/await
taskForm.addEventListener('submit', async (e) => {
e.preventDefault();

const taskData = {
title: document.getElementById('taskTitle').value,
description: document.getElementById('taskDesc').value,
priority: document.getElementById('taskPriority').value,
dueDate: document.getElementById('taskDueDate').value
};

await saveTaskAsync(taskData); // Menunggu Promise selesai

closeTaskModal();
renderTasks();
updateStats();
});
\`\`\`

## Cara Penggunaan

### **Menambah Tugas Baru**

1. Klik tombol "+ Tambah Tugas" di bagian atas halaman
2. Isi form dengan:
   - **Judul Tugas**: Nama atau deskripsi singkat tugas
   - **Deskripsi**: Detail lebih lengkap (opsional)
   - **Prioritas**: Pilih antara Rendah, Sedang, atau Tinggi
   - **Tanggal Target**: Kapan tugas harus diselesaikan
3. Klik "Simpan Tugas" untuk menambahkan

### **Edit Tugas**

1. Pada tugas yang ingin diubah, klik tombol "Edit"
2. Modal akan terbuka dengan data tugas yang dapat diubah
3. Ubah informasi sesuai kebutuhan
4. Klik "Simpan" untuk menyimpan perubahan

### **Menandai Tugas Selesai**

1. Centang checkbox pada tugas yang sudah diselesaikan
2. Tugas akan otomatis ditampilkan dengan gaya faded (semi-transparan)
3. Statistik akan terupdate secara real-time

### **Hapus Tugas**

1. Klik tombol "Hapus" pada tugas yang ingin dihapus
2. Konfirmasi penghapusan pada dialog yang muncul
3. Tugas akan dihapus dan data diperbarui

### **Filter Tugas**

1. Gunakan tombol filter di bawah judul "Daftar Tugas Saya"
2. Pilih salah satu:
   - **Semua**: Menampilkan semua tugas
   - **Pending**: Menampilkan tugas yang belum selesai
   - **Selesai**: Menampilkan tugas yang sudah selesai

### **Pencarian**

1. Gunakan input "Cari tugas..." di sebelah tombol "+ Tambah Tugas"
2. Ketik kata kunci yang ingin dicari
3. Daftar tugas akan disaring berdasarkan judul atau deskripsi

## Struktur File

\`\`\`
project/
├── index.html # File HTML utama
├── app.js # Logika aplikasi (ES6+ JavaScript)
├── styles.css # Styling aplikasi (CSS)
└── README.md # Dokumentasi ini
\`\`\`

### **Penjelasan File:**

- **index.html**: Struktur HTML dengan form modal, container untuk tasks, dan statistik
- **app.js**: Logika aplikasi dengan Class, Arrow Functions, Promises, dan localStorage
- **styles.css**: Styling responsive dengan dark theme dan animasi smooth

## Sistem Penyimpanan Data

Semua data disimpan di **localStorage** browser dengan key `tasks`. Data disimpan dalam format JSON dan otomatis dimuat saat halaman dibuka.

### **Format Data Tersimpan**

\`\`\`json
[
{
"id": 1234567890,
"title": "Belajar ES6+",
"description": "Mempelajari fitur ES6+ seperti arrow functions dan template literals",
"priority": "high",
"dueDate": "2025-12-15",
"completed": false
},
{
"id": 1234567891,
"title": "Membuat Dashboard",
"description": "Membuat personal dashboard dengan vanilla JavaScript",
"priority": "medium",
"dueDate": "2025-12-10",
"completed": true
}
]
\`\`\`

### **Fitur Penyimpanan:**

- ✅ Data otomatis tersimpan di `localStorage.tasks`
- ✅ Data dimuat kembali saat halaman dibuka
- ✅ Setiap operasi (add, update, delete) otomatis menyimpan ke localStorage
- ✅ Tidak ada batasan storage (biasanya 5-10MB per domain)

## Desain & Interface

- **Responsive Design**: Bekerja sempurna di desktop, tablet, dan mobile
- **Modern Dark Theme**: Menggunakan color scheme yang nyaman untuk mata
- **Smooth Animations**: Transisi halus dan animasi untuk interaksi pengguna
- **Color-coded Priority**: Warna berbeda untuk setiap tingkat prioritas
- **Intuitive UI**: Interface yang mudah digunakan dan dipahami
- **Modal Dialog**: Form input dalam modal untuk UX yang lebih baik

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile Browsers

## Keamanan & Best Practices

- **Input Validation**: Validasi form sebelum penyimpanan
- **localStorage Privacy**: Data hanya tersimpan lokal di browser pengguna
- **ES6+ Standards**: Menggunakan standar JavaScript modern terbaru

## Persyaratan ES6+ (Semua Terpenuhi)

- **Classes**: Task dan TaskManager classes dengan constructor
- **Arrow Functions**: Minimal 5+ arrow functions untuk berbagai operasi
- **Template Literals**: Rendering dinamis menggunakan backticks
- **Let & Const**: Deklarasi variabel yang tepat sesuai use case
- **Async/Promises**: Fungsi asinkron dengan Promise dan async/await
- **localStorage**: Penyimpanan data lokal yang persistent

## Pengembangan Lanjutan

Fitur-fitur yang dapat ditambahkan di masa depan:

- Kategori/Tag untuk organisasi tugas
- Notifikasi pengingat untuk tugas
- Grafik statistik dan analytics
- Dark/Light mode toggle
- Cloud sync dengan backend
- Kolaborasi multi-user
- PWA (Progressive Web App) untuk offline access
- Enkripsi data sensitif

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran ES6+ JavaScript.

---
