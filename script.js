const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const greeting = document.getElementById("greeting");
const date = document.getElementById("date");
const time = document.getElementById("time");

function updateWelcome(){

    const now = new Date();

    const hour = now.getHours();

    let message;

    if(hour < 12){
        message = "🌞 Good Morning!";
    }
    else if(hour < 17){
        message = "☀️ Good Afternoon!";
    }
    else if(hour < 20){
        message = "🌇 Good Evening!";
    }
    else{
        message = "🌙 Good Night!";
    }

    greeting.innerHTML = message;

    date.innerHTML = now.toLocaleDateString("en-US",{
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    });

    time.innerHTML = now.toLocaleTimeString();
}

updateWelcome();

setInterval(updateWelcome,1000);

function addTask() {

    if (inputBox.value === "") {
        alert("You must write something!");
    }
    else {

        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {

    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }

}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();