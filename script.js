
class Task {
constructor(text, done = false) {
this.id = Date.now();
this.text = text;
this.done = done;
}
}

class ToDoApp {
constructor() {

this.input = document.getElementById("taskInput");
this.addBtn = document.getElementById("addBtn");
this.list = document.getElementById("taskList");
this.filter = document.getElementById("filter");
this.error = document.querySelector("#error");

this.taskItems = document.getElementsByClassName("task-item");

this.tasks = [];

this.load();
this.render();


this.addBtn.addEventListener("click", () => this.addTask());
this.filter.addEventListener("change", () => this.render());
}

addTask() {
const text = this.input.value.trim();


if (!text) {
this.error.textContent = "Pole nie może być puste.";
return;
}
this.error.textContent = "";

const task = new Task(text);
this.tasks.push(task);

this.save();
this.render();

this.input.value = "";
}

toggle(id) {
const t = this.tasks.find(task => task.id === id);
t.done = !t.done;
this.save();
this.render();
}

remove(id) {
this.tasks = this.tasks.filter(task => task.id !== id);
this.save();
this.render();
}

render() {
this.list.innerHTML = "";

const filter = this.filter.value;

this.tasks
.filter(t => filter === "all" ||
(filter === "done" && t.done) ||
(filter === "open" && !t.done))
.forEach(task => {
const li = document.createElement("li");
li.className = "task-item";

const span = document.createElement("span");
span.textContent = task.text;
if (task.done) span.classList.add("done");
span.addEventListener("click", () => this.toggle(task.id));

const del = document.createElement("button");
del.textContent = "X";
del.addEventListener("click", () => this.remove(task.id));

li.appendChild(span);
li.appendChild(del);
this.list.appendChild(li);
});
}

save() {
localStorage.setItem("tasks", JSON.stringify(this.tasks));
}

load() {
const data = localStorage.getItem("tasks");
if (data) {
const arr = JSON.parse(data);
this.tasks = arr.map(t => new Task(t.text, t.done));
}
}
}

document.addEventListener("DOMContentLoaded", () => new ToDoApp());