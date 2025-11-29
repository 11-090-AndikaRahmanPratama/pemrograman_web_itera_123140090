class Task {
  constructor(id, title, description, priority, dueDate, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.loadFromStorage();
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveToStorage();
  }

  updateTask(id, updatedTask) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveToStorage();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.saveToStorage();
  }

  toggleTaskComplete(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.toggleComplete();
      this.saveToStorage();
    }
  }

  saveToStorage() {
    const data = this.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      completed: task.completed,
    }));
    localStorage.setItem("tasks", JSON.stringify(data));
  }

  loadFromStorage() {
    const data = localStorage.getItem("tasks");
    if (data) {
      const tasks = JSON.parse(data);
      this.tasks = tasks.map(
        (t) =>
          new Task(
            t.id,
            t.title,
            t.description,
            t.priority,
            t.dueDate,
            t.completed
          )
      );
    }
  }

  getTasksByFilter(filter) {
    if (filter === "completed") {
      return this.tasks.filter((t) => t.completed);
    } else if (filter === "pending") {
      return this.tasks.filter((t) => !t.completed);
    }
    return this.tasks;
  }

  searchTasks(query) {
    const lowerQuery = query.toLowerCase();
    return this.tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(lowerQuery) ||
        t.description.toLowerCase().includes(lowerQuery)
    );
  }
}

const taskManager = new TaskManager();
let currentFilter = "all";
let currentSearchQuery = "";
let editingTaskId = null;

const addBtn = document.getElementById("addBtn");
const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");
const tasksContainer = document.getElementById("tasksContainer");
const filterInput = document.getElementById("filterInput");
const filterTabs = document.querySelectorAll(".tab-btn");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const pendingTasksEl = document.getElementById("pendingTasks");

const openAddTaskModal = () => {
  editingTaskId = null;
  document.getElementById("modalTitle").textContent = "Tambah Tugas Baru";
  taskForm.reset();
  taskModal.classList.add("active");
};

const closeTaskModal = () => {
  taskModal.classList.remove("active");
  taskForm.reset();
  editingTaskId = null;
};

const renderTasks = () => {
  const tasksToRender = currentSearchQuery
    ? taskManager.searchTasks(currentSearchQuery)
    : taskManager.getTasksByFilter(currentFilter);

  if (tasksToRender.length === 0) {
    tasksContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">Kosong</div>
        <p>${
          currentSearchQuery
            ? "Tidak ada tugas yang cocok"
            : "Belum ada tugas. Tambahkan tugas pertama Anda!"
        }</p>
      </div>
    `;
    return;
  }

  tasksContainer.innerHTML = tasksToRender
    .map(
      (task) => `
    <div class="task-card ${task.completed ? "completed" : ""}">
      <div class="task-content">
        <div class="task-header">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? "checked" : ""}
            onchange="handleToggleComplete(${task.id})"
          >
          <span class="task-title">${task.title}</span>
        </div>
        ${
          task.description ? `<p class="task-desc">${task.description}</p>` : ""
        }
        <div class="task-meta">
          <span class="task-priority ${task.priority}">
            ${
              task.priority === "Tinggi"
                ? ""
                : task.priority === "Sedang"
                ? ""
                : ""
            } 
            ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          ${
            task.dueDate
              ? `<span class="task-date">${formatDate(task.dueDate)}</span>`
              : ""
          }
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-icon" onclick="handleEditTask(${
          task.id
        })" title="Edit">Edit</button>
        <button class="btn-icon btn-delete" onclick="handleDeleteTask(${
          task.id
        })" title="Hapus">Hapus</button>
      </div>
    </div>
  `
    )
    .join("");
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const updateStats = () => {
  const total = taskManager.tasks.length;
  const completed = taskManager.tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
};

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
          taskManager.tasks.find((t) => t.id === editingTaskId).completed
        );
        taskManager.updateTask(editingTaskId, updatedTask);
      } else {
        const newId = Date.now();
        const newTask = new Task(
          newId,
          taskData.title,
          taskData.description,
          taskData.priority,
          taskData.dueDate,
          false
        );
        taskManager.addTask(newTask);
      }
      resolve(true);
    }, 300);
  });
};

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskData = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDesc").value,
    priority: document.getElementById("taskPriority").value,
    dueDate: document.getElementById("taskDueDate").value,
  };

  await saveTaskAsync(taskData);

  closeTaskModal();
  renderTasks();
  updateStats();
});

const handleToggleComplete = (id) => {
  taskManager.toggleTaskComplete(id);
  renderTasks();
  updateStats();
};

const handleEditTask = (id) => {
  editingTaskId = id;
  const task = taskManager.tasks.find((t) => t.id === id);

  document.getElementById("modalTitle").textContent = "Edit Tugas";
  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDesc").value = task.description;
  document.getElementById("taskPriority").value = task.priority;
  document.getElementById("taskDueDate").value = task.dueDate;

  taskModal.classList.add("active");
};

const handleDeleteTask = (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    taskManager.deleteTask(id);
    renderTasks();
    updateStats();
  }
};

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter;
    currentSearchQuery = "";
    filterInput.value = "";
    renderTasks();
  });
});

filterInput.addEventListener("input", (e) => {
  currentSearchQuery = e.target.value;
  filterTabs.forEach((t) => t.classList.remove("active"));
  renderTasks();
});

addBtn.addEventListener("click", openAddTaskModal);
closeModal.addEventListener("click", closeTaskModal);
cancelBtn.addEventListener("click", closeTaskModal);
taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) closeTaskModal();
});

renderTasks();
updateStats();
