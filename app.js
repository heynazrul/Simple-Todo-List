// Getting all required elements
const inputBox = document.getElementById('inputTodo');
const addBtn = document.getElementById('addTodo');
const todoList = document.querySelector('.todoList');
const pendingTask = document.querySelector('.pendingTask');
const clrBtn = document.querySelector('.footer button');

//add button disabled if inputbox contain no content
inputBox.onkeyup = () => {
  let userData = inputBox.value; //get user entered value

  if (userData.trim() != 0) {
    //if user value is not only spaces
    addBtn.classList.add('active'); //active the add button
  } else {
    addBtn.classList.remove('active'); //unactive the add button
  }
};

showTasks();

// get local storage function
function getLocalStorage() {
  let getLocalStorageValue = localStorage.getItem('New Todo'); //getting localstorage
  if (getLocalStorageValue == null) {
    //if local storage is null
    listArr = []; //creating blank array
  } else {
    listArr = JSON.parse(getLocalStorageValue); //transforming json string to JS object
  }
}

//if user click on the add button or enter in inputfield
function addToDo() {
  let userData = inputBox.value; //get user entered value
  getLocalStorage();
  listArr.push(userData); //adding user data
  localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforming JS object into json string
  showTasks();
}

//trigger add button if user press Enter
inputBox.addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    addBtn.click();
  }
});

//trigger add button when click
addBtn.addEventListener('click', function () {
  addToDo();
  addBtn.classList.remove('active'); //unactive the add button
  inputBox.focus();
});

//function to add task list inside ul
function showTasks() {
  getLocalStorage();
  pendingTask.textContent = listArr.length; //passing the length value of list Array
  if (listArr.length > 0) {
    clrBtn.classList.add('active');
  } else {
    clrBtn.classList.remove('active');
  }
  let listItem = '';
  listArr.forEach((element, index) => {
    listItem += `<li>${element} <span onclick= "deleteTask()";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = listItem; // adding new list item inside ul tag
  inputBox.value = ''; // once task is added leave the input field blank
}

//delete task function
function deleteTask(index) {
  let getLocalStorageValue = localStorage.getItem('New Todo'); //getting localstorage
  listArr = JSON.parse(getLocalStorageValue);
  listArr.splice(index, 1); //delete or remove particular indexed li

  //after removing show updated li of local storage
  localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforming JS object into json string
  showTasks();
}

//delete all task function

clrBtn.onclick = () => {
  listArr = []; //empty array
  //after delete all the li update the local storage
  localStorage.setItem('New Todo', JSON.stringify(listArr)); //transforming JS object into json string
  showTasks();
};
