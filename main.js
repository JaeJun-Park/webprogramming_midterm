window.addEventListener('DOMContentLoaded', () => { // The DOMContentLoaded event fires when the intial HTML document has been completly loaded and parsed.

});
let updateTable = () => {
    while (table.firstElementChild) {
        table.firstElementChild.parentElement.removeChild(table.firstElementChild);
    }
    let rows = "";

    let todos = Array.from(todoList.values());
    todos.reverse();

    todos.forEach((todo) => {
        console.log(`${todo.id}, done: ${todo.done}`);
        let done = todo.done ? `<span class="badge bg-success">done</span>` : `<span class="badge bg-danger">not-done</span>`;
        let checked = todo.done ? `<input type="checkbox" data-id="${todo.id}" checked class="form-check-input"></input>` : `<input type="checkbox" data-id="${todo.id}" class="form-check-input"></input>`;
        rows += `<tr>
        <td scope="row">${todo.id}</td>
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td>
            ${done}
        </td>
        <td>
            ${checked};
            <span class="text-danger delete-btn" data-id=${todo.id}><i class="fa fa-trash"></i></span>
         </td>
    </tr>`;
    });
    table.innerHTML = rows;
}

let addTodo = document.querySelector("#add-todo");
let todoTitle = document.querySelector("#todo-title");
let todoDescription = document.querySelector("#todo-description");
let table = document.querySelector("#todo-table");
let errorAlert = document.querySelector("#error-alert");

let todoList = new Map();

document.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target.classList.contains("fa-trash")) {
        let delete_id = Number(event.target.closest('.delete-btn').dataset.id);
        event.target.closest('tr').remove();
        todoList.delete(delete_id);
        updateTable();
    } else if (event.target.classList.contains("form-check-input")) {
        let checked_id = Number(event.target.dataset.id);
        let todo = todoList.get(checked_id);
        todo.done = event.target.checked;
        todoList.set(checked_id, todo);
        updateTable();
    }
});

addTodo.addEventListener("click", () => {

    let todo = {
        title: todoTitle.value,
        description: todoDescription.value,
        done: false,
    };
    if (todo.title) {
        let id = todoList.size + 1;
        todo.id = id;
        todoList.set(id, todo); // 할일담todo객체를 todoList라는 Map객체 저장

        updateTable();

        todoTitle.value = '';
        todoDescription.value = '';
    } else {
        errorAlert.innerText = "At least a todo title is required";
        errorAlert.style.display = "block";
        setTimeout(() => { errorAlert.style.display = "none" }, 3000); // animation처리해주기 
    }

});