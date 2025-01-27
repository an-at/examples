class ToDoList{
  constructor() {
    this.list = [];
  }

  addTaskToList(text, id = new Date().getTime(), isCompleted = false){
    const task = new Task();
    task.text = text;
    task.id = id;
    task.isCompleted = isCompleted;
    this.list.push(task);

    this.saveToStorage(this.list);
  }

  markTaskAsCompleted(e){
    const taskId = Number(e.target.parentElement.id);
    const taskIndex = this.list.findIndex(item => item.id === taskId);
    this.list[taskIndex].markAsCompleted();
    setTimeout(()=> this.render(), 100);

    this.saveToStorage(this.list);
  }

  render() {
    tasksList.innerHTML = '';
    this.list.sort((itemA, itemB) => itemA.id -itemB.id);
    this.list.sort((itemA, itemB) => {
      if (itemA || itemB){
        let index = itemA.isCompleted ? 1 : -1;
        return index;
      }
    });
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
    tasks.forEach( task => {
      this.addTaskToList(task.text, task.id, task.isCompleted)
    })

  }

  clean(){
    this.list = [];
    localStorage.clear();
    this.render();
  }
}
