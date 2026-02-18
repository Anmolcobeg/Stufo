document.addEventListener("DOMContentLoaded", function () {

  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("stufo_tasks")) || [];

  function saveTasks() {
    localStorage.setItem("stufo_tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.alignItems = "center";
      li.style.marginBottom = "8px";

      const taskText = document.createElement("span");
      taskText.textContent = task;
      taskText.style.cursor = "pointer";

      // Click task → open focus page
      taskText.addEventListener("click", function () {
        localStorage.setItem("currentTask", task);
        window.location.href = "focus.html";
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";

      deleteBtn.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const task = taskInput.value.trim();
    if (task === "") return;

    tasks.push(task);
    saveTasks();
    taskInput.value = "";
    renderTasks();
  }

  addBtn.addEventListener("click", addTask);

  // Press Enter to add
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  renderTasks();
});
