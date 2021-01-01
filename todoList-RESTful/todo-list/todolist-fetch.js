//querySelect
const slr = (name) => document.querySelector(name);
const todoItems = slr(".container");
const todoInput = slr("#todoInput");
const send = slr(".send");

//get
const getDataFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3000/todos");
    if (!response.ok) throw new Error("somthing wrong");
    const data = await response.json();
    todoId = data.length + 1;
    const display = data.map((v) => {
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
    deleteBtnEvent()
  } catch (error) {
    console.log(error);
  }
};

//post
const postDataFromServer = async (todo) => {
  try {
    const response = await fetch(" http://localhost:3000/todos", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("somthing wrong");
  } catch (error) {
    console.log(error);
  }
};

//delete
const deleteDataFromServer = async (id) => {
  try {
    const response = await fetch(" http://localhost:3000/todos/" + id, {
      method: "Delete",
    });
    if (!response.ok) throw new Error("somthing wrong");
  } catch (error) {
    console.log(error);
  }
};

//delete btn
const deleteBtnEvent = () => {
  document.querySelectorAll(".delete").forEach((element) =>
    element.addEventListener("click", async (event) => {
      await deleteDataFromServer(event.target.id);
      await getDataFromServer();
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
      postDataFromServer(newTodos);
      todoInput.value = "";
      getDataFromServer();
    }
  }
});

//send btn
send.addEventListener("click", () => {
  if (todoInput.value.trim()) {
    const newTodos = {
      id: "___AX" + todoId,
      createdAt: +new Date(),
      memo: todoInput.value,
    };
    postDataFromServer(newTodos);
    todoInput.value = "";
    getDataFromServer();
  }
});

getDataFromServer();
