import { addTask } from "./tools.js";
import { Task } from "../classes/Task.js";

const form = document.querySelector("form");

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const deadline = form.elements.deadline.value;


    //Vérifications
    if (!deadline) {
        alert("The deadline cannot be empty.");
        return;
    }

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
        alert("The deadline must be in the future.");
        return;
    }

    if(description != null && description.trim() != ""){
        const newTask = new Task(title, description, deadline);

        addTask(newTask);
        window.location.href = "index.html";
    }else{
        alert("The description cannot be empty.")
    }
    
    
});