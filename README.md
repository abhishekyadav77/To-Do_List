````markdown
# 📝 To-Do List Web Application

A simple and interactive **To-Do List Web Application** built using **HTML5, CSS3, and JavaScript**. The application allows users to create, complete, and delete tasks while automatically saving task data in the browser using the **LocalStorage API**.

The application also includes a dynamic welcome section with a **time-based greeting, current date, real-time clock, and motivational message**.

🔗 **Live Repository:**  
https://github.com/abhishekyadav77/To-Do_List

---

## ✨ Features

### 📋 Task Management
- ➕ Add new tasks
- ✅ Mark tasks as completed
- ❌ Delete tasks
- 🔄 Dynamically update the task list
- 💾 Automatically save tasks using LocalStorage
- 🔃 Restore saved tasks after page refresh

### 👋 Dynamic Welcome Section
- 🌞 Good Morning greeting
- ☀️ Good Afternoon greeting
- 🌇 Good Evening greeting
- 🌙 Good Night greeting
- 📅 Displays the current date
- 🕐 Displays a real-time clock
- 💬 Displays a motivational message

### 🎨 User Interface
- Clean and simple interface
- Modern gradient background
- Interactive task completion indicators
- Hover effects for task deletion
- Responsive layout for different screen sizes

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and layout |
| **CSS3** | Styling, layout, gradients and UI effects |
| **JavaScript (ES6)** | Application logic and DOM manipulation |
| **LocalStorage API** | Persistent task storage |

---

## 🧠 Concepts Implemented

This project demonstrates several important front-end development concepts:

- DOM Manipulation
- Event Handling
- Event Delegation
- Dynamic HTML Element Creation
- JavaScript Functions
- Conditional Statements
- Date and Time APIs
- `setInterval()`
- Browser LocalStorage
- CSS Pseudo-elements
- CSS Flexbox
- Responsive Web Design

---

## 📂 Project Structure

```text
To-Do_List/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│   ├── icon.jpg
│   ├── unchecked-41.png
│   ├── tick.jpg
│   ├── cross.png
│   └── 072120-ToDoList-Blog.png
│
└── README.md
````

---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/abhishekyadav77/To-Do_List.git
```

### 2. Navigate to the project directory

```bash
cd To-Do_List
```

### 3. Run the application

Open `index.html` directly in your web browser.

No backend server, database, or additional dependencies are required.

---

## 💾 How LocalStorage Works

The application uses the browser's **LocalStorage API** to save the current task list.

When a task is:

* Added
* Completed
* Deleted

the application updates the stored task data.

```javascript
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
```

When the application loads, previously saved tasks are restored:

```javascript
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
```

This allows tasks to remain available even after refreshing or reopening the browser.

---

## 🕐 Dynamic Date & Time

The application continuously updates the current date and time using JavaScript's `Date` object.

It also changes the greeting according to the current hour:

```text
Before 12:00 PM  → 🌞 Good Morning!
12:00–4:59 PM    → ☀️ Good Afternoon!
5:00–7:59 PM     → 🌇 Good Evening!
8:00 PM onward   → 🌙 Good Night!
```

The clock is refreshed every second using:

```javascript
setInterval(updateWelcome, 1000);
```

---

## 🎯 Learning Objectives

This project was developed to strengthen practical understanding of:

* Front-end web development
* JavaScript DOM manipulation
* Browser APIs
* LocalStorage
* Event-driven programming
* Dynamic UI updates
* HTML and CSS structuring
* Basic responsive design

---

## 🚀 Future Improvements

Possible future enhancements include:

* ✏️ Edit existing tasks
* 🔎 Search tasks
* 🏷️ Task categories
* ⭐ Task priority levels
* 📅 Due dates
* 📊 Task statistics
* 📈 Progress bar
* 🌙 Dark mode
* 🔔 Task reminders
* 🧹 Clear completed tasks
* 🔍 Filter tasks by All / Active / Completed
* 📱 Further mobile UI improvements

---

## 🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

```bash
git clone https://github.com/abhishekyadav77/To-Do_List.git
```

Create a new branch, make your changes, and submit a pull request.

---

## 📄 License

This project was created for **educational and learning purposes**.

---

## 👨‍💻 Author

**Abhishek Kumar Yadav**

GitHub:
https://github.com/abhishekyadav77

LinkedIn:
https://www.linkedin.com/in/abhishek-kumar-yadav-219950285/

---

⭐ If you found this project useful, consider giving the repository a star!

```
```
