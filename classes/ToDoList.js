export class ToDoList{
    constructor(ownerUserName, taskList){
        this.ownerUserName = ownerUserName;
        this.taskList = taskList;
    }

    AddTask(task){
        this.taskList.push(task);
    }
}