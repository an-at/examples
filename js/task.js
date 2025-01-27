class Task{
  constructor() {
    this.id = null;
    this.text = '';
    this.isCompleted = false;
  }

  markAsCompleted(){
    this.isCompleted = true;
  }
}
