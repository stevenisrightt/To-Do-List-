export class Task{
    constructor(title, description, deadline){
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.isDone = false;
        this.deadline = deadline;
    }
}