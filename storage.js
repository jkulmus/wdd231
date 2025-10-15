let tasks = [];

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    // Check if anything was found
    if (storedValue) {
        return JSON.parse(storedValue);
    }
    // if not, return empty array
    return [];
}

function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`
}

function renderTasks(tasks) {
  // get the list element from the DOM
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = "";
  // loop through the tasks array. transform (map) each task object into the appropriate HTML to represent a to-do.
  const html = tasks.map(taskTemplate).join("");
  listElement.innerHTML = html;
}

function newTask() {
  // get the value entered into the #todo input
  const task = document.querySelector("#todo").value;
  // add it to our arrays tasks
  tasks.push({ detail: task, completed: false });
  // Save tasks array to local storage
  setLocalStorage("todos", tasks);
  // render out the list
  renderTasks(tasks);
}

function removeTask(taskElement) {
  // Notice how we are using taskElement instead of document as our starting point?
  // This will restrict our search to the element instead of searching the whole document.
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector("p").innerText
  );
  taskElement.remove();
  // update localStorage with changes
  setLocalStorage("todos", tasks);
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  taskElement.classList.toggle("strike");
  console.log(tasks);
  // update localStorage with changes
  setLocalStorage("todos", tasks);
}

function manageTasks(e) {
  // did they click the delete or complete icon?
  console.log(e.target);
  const parent = e.target.closest("li");
  if (e.target.dataset.action === "delete") {
    removeTask(parent);
  }
  if (e.target.dataset.action === "complete") {
    completeTask(parent);
  }
}

// New User Name Logic
function  setUserName() {
    const name = localStorage.getItem("todo-user");
    const userNameDisplay = document.querySelector(".user");

    if (name) {
        // display friendly welcoming!
        userNameDisplay.innerText = `Welcome, ${name}!`;
    } else {
        // placeholder shows if no name is set
        userNameDisplay.innerText = "[user name here]";
    }
}
function userNameHandler() {
    const name = document.querySelector("#user").value;
    localStorage.setItem("todo-user", name);
    setUserName();
}

function init() {
    // Check for any tasks in localStorage
    tasks = getLocalStorage("todos");
    // Render initial list of tasks (if any) when page loads
    renderTasks(tasks);
    // check if a user name has been set... if yes then set it in the header
    setUserName();
}

// Add your event listeners here
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);
document.querySelector("#userNameButton").addEventListener("click", userNameHandler);

init();