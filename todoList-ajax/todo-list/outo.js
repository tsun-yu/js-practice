//querySelect
const slr = (name) => document.querySelector(name);
const todoItems = slr(".container");
const todoInput = slr("#todoInput");
const send = slr(".send");

//get
const getData = async () => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "http://localhost:3000/todos");
  xhr.onload = () => {
    responseObject = JSON.parse(xhr.responseText);
    todoId = responseObject.length + 1;
    const display = responseObject.map((v) => {
      if (v.address) {
        return `
      <div class="todoItem" id=${v.id}>
        <a href="##" class="delete" id=${v.id}>X</a>
        <div class="todoContent">
          <div class="memo">${v.memo}</div>
          <div class="address">${v.address}</div>
          <div class="time">memo created at: ${new Date(v.createdAt)}</div>
        </div>
      </div>`;
      } else {
        return `
      <div class="todoItem" id=${v.id}>
        <a href="##" class="delete" id=${v.id}>X</a>
        <div class="todoContent">
          <div class="memo">${v.memo}</div>
          <div class="time">memo created at: ${new Date(v.createdAt)}</div>
        </div>
      </div>`;
      }
    });
    todoItems.innerHTML = display.join("");
    deleteBtnEvent();
  };
  xhr.send();
};

//post
const postData = (todo) => {
  const xhr = new XMLHttpRequest();
  xhr.open("post", "http://localhost:3000/todos");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(todo));
};

//delete
const deleteData = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.open("delete", "http://localhost:3000/todos/" + id);
  xhr.send();
};

//delete function
const deleteBtnEvent = () => {
  document.querySelectorAll(".delete").forEach((element) =>
    element.addEventListener("click", (event) => {
      deleteData(event.target.id);
      getData();
    })
  );
};

//input
let todoId = 0;
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (todoInput.value.trim()) {
      const newTodos = {
        id: "___AX" + todoId,
        createdAt: +new Date(),
        memo: todoInput.value,
      };
      postData(newTodos);
      todoInput.value = "";
      getData();
    }
  }
});

send.addEventListener("click", () => {
  if (todoInput.value.trim()) {
    const newTodos = {
      id: "___AX" + todoId,
      createdAt: +new Date(),
      memo: todoInput.value,
    };
    postData(newTodos);
    todoInput.value = "";
    getData();
  }
});

getData();

// text-overflow ellisop
