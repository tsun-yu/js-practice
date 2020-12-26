const slr = (name) => document.querySelector(name);

const sendBtn = slr("#send");
const input = slr("#input");
const todolist = slr("#todolist");

const todos = [];

const addTodo = () => {
  // {id:number , text:string, completed:false}
  const todosItems = { id: +new Date(), text: input.value, completed: false };
  todos.unshift(todosItems);
  // console.log("todosItems.id", todosItems.id);
  input.value = ``;
};
const completedToggle = () => {};
const display = () => {
  const displayTodolist = todos.map((value) =>
    value.completed
      ? `<li><del>${value.text}</del><button>completed</button></li>`
      : `<li>${value.text}<button id="${value.id}">completed</button></li>`
  );
  todolist.innerHTML = displayTodolist.join("");
};

sendBtn.addEventListener("click", () => {
  addTodo();
  display();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
    display();
  }
});
