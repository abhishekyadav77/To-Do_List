const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const greeting = document.getElementById("greeting");
const date = document.getElementById("date");
const time = document.getElementById("time");
const quote = document.getElementById("quote");
const taskCounter = document.getElementById("task-counter");
const filterButtons = document.querySelectorAll(".filter-btn");

// Motivational thoughts shown in the welcome card. Pick a new random one on every load.
const quotes = [
    "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
    "Small daily improvements are the key to staggering long-term results.",
    "Discipline is choosing between what you want now and what you want most.",
    "You don't have to be great to start, but you have to start to be great.",
    "Focus on progress, not perfection.",
    "The secret to getting ahead is getting started.",
    "A little progress each day adds up to big results.",
    "Done is better than perfect.",
    "One task at a time is still moving forward.",
    "Your future is created by what you do today, not tomorrow.",
    "Motivation gets you started. Habit keeps you going.",
    "Every task you finish is proof you can finish the next one too."
];

function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.textContent = quotes[randomIndex];
}

// In-memory task list. Each task: { id, text, completed }
let tasks = [];
let currentFilter = "all"; // "all" | "active" | "completed"

function updateWelcome() {

    const now = new Date();

    const hour = now.getHours();

    let message;

    if (hour < 12) {
        message = "🌞 Good Morning!";
    }
    else if (hour < 17) {
        message = "☀️ Good Afternoon!";
    }
    else if (hour < 20) {
        message = "🌇 Good Evening!";
    }
    else {
        message = "🌙 Good Night!";
    }

    greeting.innerHTML = message;

    date.innerHTML = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    time.innerHTML = now.toLocaleTimeString();
}

updateWelcome();
updateQuote();

setInterval(updateWelcome, 1000);

function addTask() {

    const value = inputBox.value.trim();

    if (value === "") {
        alert("You must write something!");
    }
    else {
        tasks.push({
            id: Date.now().toString(),
            text: value,
            completed: false
        });
    }

    inputBox.value = "";
    saveData();
    render();
}

// Allow pressing Enter to add a task
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveData();
        render();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveData();
    render();
}

function editTask(id, liElement) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Turn the row into an editable input
    liElement.innerHTML = "";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = task.text;
    liElement.appendChild(editInput);
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);

    function commitEdit() {
        const newText = editInput.value.trim();
        // Keep old text if the user clears the field
        task.text = newText === "" ? task.text : newText;
        saveData();
        render();
    }

    editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            commitEdit();
        }
        else if (e.key === "Escape") {
            render(); // cancel edit, discard changes
        }
    });

    editInput.addEventListener("blur", commitEdit);
}

function setFilter(filter) {
    currentFilter = filter;

    filterButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });

    render();
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        setFilter(btn.dataset.filter);
    });
});

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(t => !t.completed);
    }
    if (currentFilter === "completed") {
        return tasks.filter(t => t.completed);
    }
    return tasks;
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    if (total === 0) {
        taskCounter.textContent = "No tasks yet";
    } else {
        taskCounter.textContent = `${completed} of ${total} tasks completed`;
    }
}

function render() {
    listContainer.innerHTML = "";

    const visibleTasks = getFilteredTasks();

    visibleTasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add("checked");
        }

        const textSpan = document.createElement("span");
        textSpan.className = "task-text";
        textSpan.textContent = task.text;
        li.appendChild(textSpan);

        const actions = document.createElement("span");
        actions.className = "task-actions";

        const editBtn = document.createElement("span");
        editBtn.className = "edit-btn";
        editBtn.innerHTML = "\u270e"; // pencil icon
        editBtn.title = "Edit task";
        actions.appendChild(editBtn);

        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.title = "Delete task";
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
        listContainer.appendChild(li);
    });

    updateCounter();
}

listContainer.addEventListener("click", function (e) {

    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
        deleteTask(id);
    }
    else if (e.target.classList.contains("edit-btn")) {
        editTask(id, li);
    }
    else if (e.target.classList.contains("task-text")) {
        toggleTask(id);
    }

}, false);

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const stored = localStorage.getItem("tasks");

    if (stored) {
        tasks = JSON.parse(stored);
    }
    else {
        // Migrate old data format (raw <li> HTML from earlier version), if present
        const legacy = localStorage.getItem("data");
        if (legacy) {
            const temp = document.createElement("ul");
            temp.innerHTML = legacy;
            tasks = Array.from(temp.querySelectorAll("li")).map(li => ({
                id: Date.now().toString() + Math.random().toString(16).slice(2),
                text: li.childNodes[0] ? li.childNodes[0].textContent.trim() : "",
                completed: li.classList.contains("checked")
            }));
            saveData();
            localStorage.removeItem("data");
        }
    }

    render();
}

showTask();