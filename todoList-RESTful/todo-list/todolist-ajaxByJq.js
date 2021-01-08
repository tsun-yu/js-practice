//querySelect
const slr = (name) => document.querySelector(name);

const todoInput = slr("#todoInput");
const send = slr(".send");

//get
const getData = () => {
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos",
  }).done((result) => {
    todoId = result.length + 1;
    const display = result.map((v) => {
      if (v.address) {
        return `
            <div class="todoItem" id=${v.id}>
              <a href="##" class="delete" id=${v.id}>X</a>
              <div class="todoContent">
                <div class="memo">${v.memo}</div>
                <div class="address">${v.address}</div>
                <div class="time">memo created at: ${new Date(
                  v.createdAt
                ).toLocaleDateString()}</div>
              </div>
            </div>`;
      } else {
        return `
            <div class="todoItem" id=${v.id}>
              <a href="##" class="delete" id=${v.id}>X</a>
              <div class="todoContent">
                <div class="memo">${v.memo}</div>
                <div class="time">memo created at: ${new Date(
                  v.createdAt
                ).toLocaleDateString()}</div>
              </div>
            </div>`;
      }
    });
    $(".container").html(display.join(""));
    deleteBtnEvent();
  });
};

//post
const postData = (data) => {
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/todos",
    data: data,
  });
};

//delete
const deleteData = (id) => {
  $.ajax({
    method: "DELETE",
    url: "http://localhost:3000/todos/" + id,
  });
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
