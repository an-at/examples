const input = document.querySelector('input');
const addButton = document.querySelector('.add');
const cleanButton = document.querySelector('.clean');
const tasksList = document.querySelector('.list');

function initApp(){
  const toDoList = new ToDoList();

  toDoList.restoreFromStorage();
  toDoList.sortList();
  toDoList.render();

  addButton.addEventListener('click', ()=> {
    toDoList.addTaskToList(input.value);
    toDoList.sortList();
    toDoList.render();
    input.value = '';
  });

  cleanButton.addEventListener('click', ()=> {
    toDoList.cleanList();
  })

  tasksList.addEventListener('click', (elem)=> {
    if (elem.target.type === 'checkbox'){
      toDoList.markTaskAsCompleted(elem.target.parentElement.id);
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
