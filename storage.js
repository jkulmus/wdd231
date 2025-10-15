// New User Name 

function setUserName() {
    // 1. Get the stored name from localStorage
    const name = localStorage.getItem("todo-user");

    // 2. If a name exists, set it in the header display element
    if (name) {
        document.querySelector(".user").innerText = 'Welcome, ${name}!';

        // Optional: Also set the name i the input field
        document.querySelector("#user").value = name;
    } else {
        // if no name is set, revert to the placeholder text
        document.querySelector(".user").innerText = "[user name here]";
        document.querySelector("#user").value = "[user name here]";
    }
}

function userNameHandler() {
    // 1. Get the name from the input field
    const name = document.querySelector("#user").value.trim();

    // 2. Save the name to localStorage
    if (name && name !== '[user name here]') {
        localStorage.setItem("todo-user", name);
    } else {
        //handle case where user clears the input or submits the placeholder
        localStorage.removeItem("todo-user");
    }

    // 3. Update display on page
    setUserName();
}

// Attach event listener to the button
document.querySelector("#userNameButton").addEventListener("click", userNameHandler);

// Check to see if a user name has been set.. if yes, ten set it in the header
setUserName();

let tasks = [];

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
  // render out the list
  renderTasks(tasks);
}

function removeTask(taskElement) {
  // Notice how we are using taskElement instead of document as our starting point?
  // This will restrict our search to the element instead of searching the whole document.
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );
  taskElement.remove();
}

function completeTask(taskElement) {
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  taskElement.classList.toggle("strike");
  console.log(tasks);
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

// Add your event listeners here
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

// render  the initial list of tasks (if any) when the page loads
renderTasks(tasks);