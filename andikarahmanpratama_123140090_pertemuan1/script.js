function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

function containsDangerousChars(input) {
  const dangerousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
  ];
  return dangerousPatterns.some((pattern) => pattern.test(input));
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

function isDeadlinePassed(deadline) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate < today;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.lastActionTime = 0;
    this.actionDelay = 300;
    this.loadTasks();
  }

  validateTask(taskData) {
    const errors = [];

    if (!taskData.name || taskData.name.trim() === "") {
      errors.push("Nama tugas tidak boleh kosong");
    } else if (taskData.name.length > 100) {
      errors.push("Nama tugas maksimal 100 karakter");
    } else if (containsDangerousChars(taskData.name)) {
      errors.push("Nama tugas mengandung karakter tidak diizinkan");
    }

    if (!taskData.subject || taskData.subject.trim() === "") {
      errors.push("Mata kuliah tidak boleh kosong");
    } else if (taskData.subject.length > 50) {
      errors.push("Mata kuliah maksimal 50 karakter");
    } else if (containsDangerousChars(taskData.subject)) {
      errors.push("Mata kuliah mengandung karakter tidak diizinkan");
    }

    if (!taskData.deadline || !isValidDate(taskData.deadline)) {
      errors.push("Deadline harus berupa tanggal yang valid");
    } else if (isDeadlinePassed(taskData.deadline)) {
      errors.push("Deadline tidak valid");
    }

    if (taskData.notes && taskData.notes.length > 500) {
      errors.push("Catatan maksimal 500 karakter");
    } else if (taskData.notes && containsDangerousChars(taskData.notes)) {
      errors.push("Catatan mengandung karakter tidak diizinkan");
    }

    return errors;
  }

  addTask(taskData) {
    const now = Date.now();
    if (now - this.lastActionTime < this.actionDelay) {
      return {
        success: false,
        error: "Tunggu sebentar sebelum menambah tugas lagi",
      };
    }
    this.lastActionTime = now;

    const errors = this.validateTask(taskData);
    if (errors.length > 0) {
      return { success: false, error: errors.join(", ") };
    }

    const newTask = {
      id: Date.now(),
      name: sanitizeInput(taskData.name.trim()),
      subject: sanitizeInput(taskData.subject.trim()),
      deadline: taskData.deadline,
      notes: taskData.notes ? sanitizeInput(taskData.notes.trim()) : "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    this.saveTasks();
    return { success: true, task: newTask };
  }

  editTask(id, taskData) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return { success: false, error: "Tugas tidak ditemukan" };
    }

    const errors = this.validateTask(taskData);
    if (errors.length > 0) {
      return { success: false, error: errors.join(", ") };
    }

    task.name = sanitizeInput(taskData.name.trim());
    task.subject = sanitizeInput(taskData.subject.trim());
    task.deadline = taskData.deadline;
    task.notes = taskData.notes ? sanitizeInput(taskData.notes.trim()) : "";

    this.saveTasks();
    return { success: true, task };
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      return { success: true, task };
    }
    return { success: false, error: "Tugas tidak ditemukan" };
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
      return { success: true };
    }
    return { success: false, error: "Tugas tidak ditemukan" };
  }

  saveTasks() {
    try {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }

  loadTasks() {
    try {
      const stored = localStorage.getItem("tasks");
      this.tasks = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(this.tasks)) {
        this.tasks = [];
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
      this.tasks = [];
    }
  }

  getFilteredTasks(statusFilter = "all", subjectFilter = "all") {
    return this.tasks.filter((task) => {
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "incomplete" && !task.completed);

      const subjectMatch =
        subjectFilter === "all" || task.subject === subjectFilter;

      return statusMatch && subjectMatch;
    });
  }

  getSubjects() {
    return [...new Set(this.tasks.map((t) => t.subject))].sort();
  }

  getStats() {
    return {
      total: this.tasks.length,
      completed: this.tasks.filter((t) => t.completed).length,
      incomplete: this.tasks.filter((t) => !t.completed).length,
    };
  }
}

class UIManager {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.currentStatusFilter = "all";
    this.currentSubjectFilter = "all";
    this.initializeElements();
    this.attachEventListeners();
    this.render();
  }

  initializeElements() {
    this.form = document.getElementById("taskForm");
    this.taskNameInput = document.getElementById("taskName");
    this.subjectInput = document.getElementById("subject");
    this.deadlineInput = document.getElementById("deadline");
    this.notesInput = document.getElementById("notes");
    this.charCount = document.getElementById("charCount");
    this.formError = document.getElementById("formError");
    this.tasksList = document.getElementById("tasksList");
    this.filterStatus = document.getElementById("filterStatus");
    this.filterSubject = document.getElementById("filterSubject");
    this.clearFiltersBtn = document.getElementById("clearFilters");
    this.totalTasksEl = document.getElementById("totalTasks");
    this.incompleteTasksEl = document.getElementById("incompleteTasks");
    this.completedTasksEl = document.getElementById("completedTasks");
  }

  attachEventListeners() {
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    this.notesInput.addEventListener("input", (e) => {
      const count = e.target.value.length;
      this.charCount.textContent = `${count}/500 karakter`;
    });

    this.filterStatus.addEventListener("change", (e) => {
      this.currentStatusFilter = e.target.value;
      this.render();
    });

    this.filterSubject.addEventListener("change", (e) => {
      this.currentSubjectFilter = e.target.value;
      this.render();
    });

    this.clearFiltersBtn.addEventListener("click", () => {
      this.currentStatusFilter = "all";
      this.currentSubjectFilter = "all";
      this.filterStatus.value = "all";
      this.filterSubject.value = "all";
      this.render();
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.formError.classList.remove("show");
    this.formError.textContent = "";

    const taskData = {
      name: this.taskNameInput.value,
      subject: this.subjectInput.value,
      deadline: this.deadlineInput.value,
      notes: this.notesInput.value,
    };

    const result = this.taskManager.addTask(taskData);

    if (result.success) {
      this.form.reset();
      this.charCount.textContent = "0/500 karakter";
      this.render();
    } else {
      this.formError.textContent = result.error;
      this.formError.classList.add("show");
    }
  }

  render() {
    this.updateStats();
    this.updateFilterOptions();
    this.renderTasks();
  }

  updateStats() {
    const stats = this.taskManager.getStats();
    this.totalTasksEl.textContent = stats.total;
    this.incompleteTasksEl.textContent = stats.incomplete;
    this.completedTasksEl.textContent = stats.completed;
  }

  updateFilterOptions() {
    const subjects = this.taskManager.getSubjects();
    const currentValue = this.filterSubject.value;

    while (this.filterSubject.options.length > 1) {
      this.filterSubject.remove(1);
    }

    subjects.forEach((subject) => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      this.filterSubject.appendChild(option);
    });

    if (this.filterSubject.querySelector(`option[value="${currentValue}"]`)) {
      this.filterSubject.value = currentValue;
    } else {
      this.filterSubject.value = "all";
      this.currentSubjectFilter = "all";
    }
  }

  renderTasks() {
    const filteredTasks = this.taskManager.getFilteredTasks(
      this.currentStatusFilter,
      this.currentSubjectFilter
    );

    if (filteredTasks.length === 0) {
      this.tasksList.innerHTML =
        '<p class="empty-message">Tidak ada tugas yang sesuai dengan filter.</p>';
      return;
    }

    this.tasksList.innerHTML = filteredTasks
      .map((task) => this.createTaskCard(task))
      .join("");

    this.tasksList.querySelectorAll(".btn-success").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const taskId = parseInt(e.target.dataset.taskId);
        this.handleToggleTask(taskId);
      });
    });

    this.tasksList.querySelectorAll(".btn-warning").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const taskId = parseInt(e.target.dataset.taskId);
        this.handleEditTask(taskId);
      });
    });

    this.tasksList.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const taskId = parseInt(e.target.dataset.taskId);
        this.handleDeleteTask(taskId);
      });
    });
  }

  createTaskCard(task) {
    const isUrgent = isDeadlinePassed(task.deadline);
    const statusClass = task.completed ? "completed" : "";
    const statusBadge = task.completed ? "completed" : "incomplete";
    const statusText = task.completed ? "Selesai" : "Belum Selesai";
    const deadlineBadgeClass = isUrgent ? "urgent" : "normal";
    const deadlineText = isUrgent ? "Sudah Lewat" : formatDate(task.deadline);

    const notesHTML = task.notes
      ? `
            <div class="task-notes">
                <div class="task-notes-label">Catatan:</div>
                <div>${task.notes}</div>
            </div>
        `
      : "";

    return `
            <div class="task-card ${statusClass}">
                <div class="task-header">
                    <div class="task-title">
                        <h3>${task.name}</h3>
                    </div>
                </div>
                <div class="task-meta">
                    <div class="task-meta-item">
                        <strong>Mata Kuliah:</strong>
                        <span>${task.subject}</span>
                    </div>
                    <div class="task-meta-item">
                        <strong>Deadline:</strong>
                        <span class="deadline-badge ${deadlineBadgeClass}">${deadlineText}</span>
                    </div>
                    <div class="task-meta-item">
                        <strong>Status:</strong>
                        <span class="status-badge ${statusBadge}">${statusText}</span>
                    </div>
                </div>
                ${notesHTML}
                <div class="task-actions">
                    <button class="btn btn-small btn-success" data-task-id="${
                      task.id
                    }">
                        ${task.completed ? "Belum Selesai" : "Selesai"}
                    </button>
                    <button class="btn btn-small btn-warning" data-task-id="${
                      task.id
                    }">
                        Edit
                    </button>
                    <button class="btn btn-small btn-danger" data-task-id="${
                      task.id
                    }">
                        Hapus
                    </button>
                </div>
            </div>
        `;
  }

  handleToggleTask(taskId) {
    const result = this.taskManager.toggleTask(taskId);
    if (result.success) {
      this.render();
    }
  }

  handleEditTask(taskId) {
    const task = this.taskManager.tasks.find((t) => t.id === taskId);
    if (task) {
      this.taskNameInput.value = task.name;
      this.subjectInput.value = task.subject;
      this.deadlineInput.value = task.deadline;
      this.notesInput.value = task.notes;
      this.charCount.textContent = `${task.notes.length}/500 karakter`;

      this.taskManager.deleteTask(taskId);

      this.form.scrollIntoView({ behavior: "smooth" });
      this.taskNameInput.focus();

      this.render();
    }
  }

  handleDeleteTask(taskId) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      const result = this.taskManager.deleteTask(taskId);
      if (result.success) {
        this.render();
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();
  const uiManager = new UIManager(taskManager);
});
