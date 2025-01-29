class Task{
  constructor(text, id = new Date().getTime(), isCompleted = false) {
    this.text = text;
    this.id = id;
    this.isCompleted = isCompleted;
  }

  markAsCompleted(){
    this.isCompleted = true;
  }
}
