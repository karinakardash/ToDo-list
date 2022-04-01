const input = document.getElementById('taskInput');
const deleteBtn = document.getElementById('deleteBtn');
const listOfItem = document.querySelector('.list');
const task = document.getElementsByClassName('list__item');
const taskChecked = document.getElementsByClassName('checked');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function clockTimer() {
const currentDate = new Date();
const time = [currentDate.getHours(),currentDate.getMinutes(),currentDate.getSeconds()];
if(time[0] < 10) {
    time[0] = "0"+ time[0];
};
if(time[1] < 10) {
    time[1] = "0"+ time[1];
};
if(time[2] < 10) {
    time[2] = "0"+ time[2];
};
const currentTime = [time[0],time[1],time[2]].join(':');
const clock = document.getElementById("clock");
clock.innerHTML = currentTime;
let month = document.querySelector(".month");
let day = document.querySelector(".day");
let year = document.querySelector(".year");
const monthArray = ["January","February","March","April,","May","June","July","August","September","October","November","December"];

month.innerHTML = monthArray[currentDate.getMonth()];
day.innerHTML = currentDate.getDate();
year.innerHTML = currentDate.getFullYear();

setInterval(clockTimer, 1000);
}
clockTimer();

const total = document.getElementById('counter__total-count');
const remain = document.getElementById('counter__remaining-count');
const done = document.getElementById('counter__done-count');

function updateCounter() {
    total.innerHTML = task.length;
    done.innerHTML = taskChecked.length;
    remain.innerHTML = (task.length - taskChecked.length);
}
updateCounter();

const totalBtn = document.querySelector(".counter__total");
const remainBtn = document.querySelector(".counter__remaining");
const doneBtn = document.querySelector(".counter__done");

function showTotal(event) {
    for (let i = 0; i < task.length; i++) {
        if (task[i].classList.contains("list__item")) {
            task[i].style.display = "block";
        }  
    }
}
totalBtn.addEventListener("click", showTotal);

function showRemain(event) {
    for (let i = 0; i < task.length; i++) {
        if (task[i].classList.contains("checked")) {
            task[i].style.display = "none";
        } else if (!(task[i].classList.contains("checked"))) {
            task[i].style.display = "block";
        }  
    }
}
remainBtn.addEventListener("click", showRemain);

function showChecked(event) {
    for (let i = 0; i < task.length; i++) {
        if (!(task[i].classList.contains("checked"))) {
            task[i].style.display = "none";
        } else if (task[i].classList.contains("checked")) {
            task[i].style.display = "block";
        }  
    }
}
doneBtn.addEventListener("click", showChecked);

function searchFunction() {
    let searchInputUp = searchInput.value.toUpperCase();

    for (i = 0; i < task.length; i++) {
      let txtValue = task[i].textContent || task[i].innerText;
      if (txtValue.toUpperCase().indexOf(searchInputUp) > -1) {
        task[i].style.display = "";
      } else {
        task[i].style.display = "none";
      }
    }
}
searchBtn.addEventListener("click", () => {
    searchInput.value = "";
    for (i = 0; i < task.length; i++) {
    task[i].style.display = "block";
    }
});

function moveProgressBar() {
    const widthOfWrap = document.querySelector('.progress-wrap').offsetWidth;
    const ratio = taskChecked.length / task.length;
    const widthOfBar = ratio * widthOfWrap;
    const bar = document.querySelector('.progress-bar');
    bar.style.width = widthOfBar + "px";
};
moveProgressBar();

let todos;

if (localStorage.todos === todos) {
    todos = [];
} else {
    todos = JSON.parse(localStorage.getItem('todos'));
    displayTask();
    updateCounter();
    moveProgressBar();
};

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

updateLocalStorage();

function createTask(obj) {
    let li = document.createElement('li');
    li.classList.add('list__item');
    li.setAttribute('id', obj.id);
    li.textContent = obj.text;
    let span = document.createElement("span");
    let icon = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(icon);
    li.appendChild(span);

    if (obj.isChecked) {
        li.classList.add('checked');
    } else {
        li.classList.remove('checked');
    }

    return li;
};

function displayTask() {
    listOfItem.innerHTML = '';

    todos.forEach((item) => {
        listOfItem.appendChild( createTask(item) );
    });
};

function addNewItem() {
    if (input.value.trim() === '') {
        alert('You must write something!')
    } else {
        todos.push( {
            id: Date.now(),
            isChecked: false,
            text: input.value,
        });
        displayTask();
        updateLocalStorage();
        updateCounter();
        moveProgressBar();
        input.value = "";
    }
};

addBtn.addEventListener('click', function() {
    addNewItem();
});

input.addEventListener("keydown", (keyPressed) => {
    if (keyPressed.key === 'Enter') {
        addNewItem();
    }
});

function deleteTask(element) {
    if ( element.target.classList.contains("close") ) {
        let taskItem = element.target.parentElement;
        let taskId = +taskItem.getAttribute("id");
        taskItem.remove();

        todos.forEach((item, index) => {
            if (taskId === item.id) {
                todos.splice(index, 1);
            }
        });

        updateLocalStorage();
        updateCounter();
        moveProgressBar();
    }
};

listOfItem.addEventListener('click', deleteTask);

deleteBtn.addEventListener("click", () => {
    listOfItem.innerHTML = "";
    todos = [];
    const bar = document.querySelector('.progress-bar');
    bar.style.width = 0;
    updateCounter();
    moveProgressBar();
    updateLocalStorage();
});

function checkTask(event) {
    let taskId = +event.target.getAttribute("id");

    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }
        todos.forEach((item) => {
            if (taskId === item.id) {
                item.isChecked = !item.isChecked;
            }
        });
    
        updateLocalStorage();
        updateCounter();
        moveProgressBar();
}
listOfItem.addEventListener("click", checkTask);