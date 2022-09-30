const TODO_TEXT = 'todo';
const UPDATE_TEXT = "update";
const getLocalData = () => {
    return localStorage.getItem(TODO_TEXT) ? JSON.parse(localStorage.getItem("todo")) : []
}

const setLocalData = (key, data) => {
    if (key && (data !== null || data !== undefined)) {
        localStorage.setItem(TODO_TEXT, JSON.stringify(data))
    }
}
let arrTodos = [];

const addbtn = document.getElementById('add_btn');
const inp = document.getElementById('todo');
const listContainer = document.getElementById("list_container");

const getNewTodo = (todoName) => {
    if (todoName) {
        return {
            text: todoName,
            isDone: false,
            id: new Date().getTime()
        }
    }
}


// delete todo

const deleteTodo = (id) => {
    console.log("deleted", id);
    if (arrTodos && arrTodos.length) {
        const filteredData = arrTodos.filter(el => el.id !== id);
        setLocalData(TODO_TEXT, filteredData);
        renderTodos();
    }
}


function editTodo(id) {
    if (id) {
        const getMatchingItem = arrTodos.filter(el => el.id === id);
        if (getLocalData.length) {
            inp.value = getMatchingItem[0].text;
            addbtn.innerText = UPDATE_TEXT;
        }
    }
}

function renderTodos() {
    arrTodos = getLocalData(TODO_TEXT);
    listContainer.innerHTML = null;
    if (arrTodos && arrTodos.length) {
        arrTodos.map(todo => {
            const spanConatiner = document.createElement("div");
            const newListItem = document.createElement("span");
            const crossIcon = document.createElement("span");
            const editButton = document.createElement("button");
            crossIcon.textContent = "X ";
            crossIcon.classList.add("crossIcon");
            crossIcon.id = "cross_icon";
            crossIcon.setAttribute('data-id', todo.id);
            crossIcon.click = crossIcon.addEventListener('click', () => deleteTodo(todo.id));
            editButton.textContent = "edit";
            editButton.classList.add('btn', "btn-sm", "btn-primary", "edit_btn");
            editButton.click = document.addEventListener('click', () => editTodo(todo.id));
            spanConatiner.classList.add("span_conatiner");
            spanConatiner.appendChild(crossIcon);
            spanConatiner.appendChild(newListItem);
            spanConatiner.appendChild(editButton);
            newListItem.textContent = todo.text;
            listContainer.appendChild(spanConatiner);
        })
    }
    clearAndFocusInput();
}

const loadTodoOnLoadDocument = () => {
    if (getLocalData(TODO_TEXT).length) {
        renderTodos();
    }
}

function clearAndFocusInput() {
    inp.value = "";
    inp.focus();
}

addbtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (inp.value) {
        if (addbtn.innerText.toLowerCase() !== UPDATE_TEXT.toLowerCase()) {
            const currentTodo = inp.value.trim();
            const newTodoObject = getNewTodo(currentTodo);
            setLocalData(TODO_TEXT, [...getLocalData(TODO_TEXT), newTodoObject]);
        }
        else {

        }
        renderTodos();
    }
})

window.addEventListener('load', loadTodoOnLoadDocument);




