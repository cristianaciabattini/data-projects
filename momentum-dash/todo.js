// To-do list. The tasks are saved in chrome.storage.local,
// so they are still there when a new tab is opened.
// Each task is an object like: { text: "Study for the exam", done: false }
let todos = [];

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

// Saves the whole list on this computer.
function saveTodos() {
  chrome.storage.local.set({ todos: todos });
}

// Draws the list on the page from the "todos" array.
function renderTodos() {
  todoList.replaceChildren(); // empty the list before drawing it again

  todos.forEach(function (todo, index) {
    const item = document.createElement("li");

    // Checkbox + text inside a <label>, so clicking the text also ticks the box.
    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", function () {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.textContent = todo.text; // textContent shows the text as plain text (safe)
    if (todo.done) {
      text.classList.add("done"); // the CSS class that crosses it out
    }

    label.append(checkbox, text);

    // Small "×" button to delete a task (for example one typed by mistake).
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.title = "Delete task";
    deleteButton.addEventListener("click", function () {
      todos.splice(index, 1); // remove 1 element at position "index"
      saveTodos();
      renderTodos();
    });

    item.append(label, deleteButton);
    todoList.append(item);
  });
}

// Press Enter in the input box to add a new task.
todoInput.addEventListener("keydown", function (event) {
  if (event.key !== "Enter") {
    return;
  }

  const newText = todoInput.value.trim();
  if (newText === "") {
    return; // ignore empty tasks
  }

  todos.push({ text: newText, done: false }); // add at the end of the list
  todoInput.value = "";                        // empty the box
  saveTodos();
  renderTodos();
});

// When the page opens: load the saved tasks (or start with an empty list).
chrome.storage.local.get(["todos"], function (result) {
  todos = result.todos || [];
  renderTodos();
});
