//querySelector
const slr = (name) => document.querySelector(name);
const sendBtn = slr("#send");
const input = slr("#input");
const todolist = slr("#todolist");
const completedBtn = document.querySelectorAll(".completedBtn");

//存放代辦事項arr
let todos = [];

//新增代辦事項至todos陣列中
const addTodo = () => {
  // {id:number , text:string, completed:false}
  const todosItems = { id: +new Date(), text: input.value, completed: false };
  todos.unshift(todosItems);
  input.value = ``;
};

//切換是否已完成
const completedToggle = (id) =>
  todos.forEach((v) => {
    v.id == +id && (v.completed = !v.completed);
  });
//刪除代辦事項
const deleteItem = (id) => {
  const newTodos = todos.filter((v) => v.id !== +id);
  todos = [...newTodos];
};

//呈現畫面
const display = () => {
  const displayTodolist = todos.map((value) =>
    value.completed
      ? `<li><del>${value.text}</del>
      <button class="btn btn-primary completedBtn" id="${value.id}">completed</button>
      <button class="btn btn-primary deleteBtn" id="${value.id}">delete</button>
      </li>`
      : `<li>${value.text}
      <button class="btn btn-primary completedBtn" id="${value.id}">completed</button>
      <button class="btn btn-primary deleteBtn" id="${value.id}">delete</button>
      </li>`
  );

  todolist.innerHTML = displayTodolist.join("");

  //完成按鈕事件
  document.querySelectorAll(".completedBtn").forEach((element) => {
    element.addEventListener("click", (e) => {
      completedToggle(e.target.id);
      display();
    });
  });
  document.querySelectorAll(".deleteBtn").forEach((element) => {
    element.addEventListener("click", (e) => {
      deleteItem(e.target.id);
      display();
    });
  });
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
