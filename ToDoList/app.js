const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


document.addEventListener('DOMContentLoaded', getLocatToDos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteChek);
filterOption.addEventListener("click", filterToDo);






function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  saveLocatToDos(todoInput.value);
  const compleatedButton = document.createElement("button");
  compleatedButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  compleatedButton.classList.add("complete-btn");
  todoDiv.appendChild(compleatedButton);
  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deletedButton.classList.add("deleted-btn");
  todoDiv.appendChild(deletedButton);
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteChek(e) {
  const item = e.target;
  if (item.classList[0] === "deleted-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocatToDos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocatToDos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocatToDos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocatToDos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  
  const compleatedButton = document.createElement("button");
  compleatedButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  compleatedButton.classList.add("complete-btn");
  todoDiv.appendChild(compleatedButton);
  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deletedButton.classList.add("deleted-btn");
  todoDiv.appendChild(deletedButton);
  todoList.appendChild(todoDiv);
    })

}