const input = document.querySelector('input');
const addButton = document.querySelector('.add');
const cleanButton = document.querySelector('.clean');
const tasksList = document.querySelector('.list');

const toDoList = new ToDoList();

document.addEventListener('DOMContentLoaded', ()=> {
  toDoList.restoreFromStorage();
  toDoList.render();
})

addButton.addEventListener('click', ()=> {
  toDoList.addTaskToList(input.value);
  toDoList.render();
  input.value = '';
});

cleanButton.addEventListener('click', ()=> {
  toDoList.cleanList();
})

tasksList.addEventListener('click', (elem)=> {
  if (elem.target.type === 'checkbox'){
    toDoList.markTaskAsCompleted(elem);
  }
});

