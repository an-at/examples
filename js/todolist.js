class ToDoList{
  constructor() {
    this.list = [];
  }

  addTaskToList(text, id, isCompleted){
    const task = new Task(text, id, isCompleted);
    this.list.push(task);

    this.saveToStorage(this.list);
  }

  markTaskAsCompleted(id){
    const taskId = Number(id);
    const taskIndex = this.list.findIndex(item => item.id === taskId);
    this.list[taskIndex].markAsCompleted();
    setTimeout(()=> {
      this.sortList();
      this.render()},
      100);

    this.saveToStorage(this.list);
  }

  sortList(){
    this.list.sort((itemA, itemB) => itemA.id -itemB.id);
    this.list.sort((itemA, itemB) => {
      if (itemA || itemB){
        return itemA.isCompleted ? 1 : -1;;
      }
    });
  }

  render() {
    tasksList.innerHTML = '';
    this.list.forEach((task)=> {
      const div = document.createElement('div');
      div.id = task.id;
      div.classList.add('task');

      const taskCheckbox = document.createElement('input');
      taskCheckbox.type = 'checkbox';
      taskCheckbox.checked = task.isCompleted;
      if (taskCheckbox.checked){
        div.classList.add('completed');
      }

      const taskText = document.createElement('span');
      taskText.innerText = task.text;

      div.append(taskCheckbox, taskText);
      tasksList.append(div);
    })
  }

  saveToStorage(list){
    let jsonObj = JSON.stringify(list);
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', jsonObj);
  }

  restoreFromStorage(){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks){
      tasks.forEach( task => {
        this.addTaskToList(task.text, task.id, task.isCompleted);
      });
    }
  }

  cleanList(){
    this.list = [];
    localStorage.removeItem('tasks')
    this.render();
  }
}
