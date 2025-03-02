import { ToDoList } from "../classes/ToDoList.js";
// Sign Up
export function isAlreadySignedIn(name){
    if(localStorage.getItem("usersTab") != null){
        const usersTab = JSON.parse(localStorage.getItem("usersTab"));
        console.log(usersTab);
        for(const user of usersTab){
            if(name == user.username){
                return true;
            }
        }
    }
    
    return false;
}

export function isLoggedIn() {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser !== null && currentUser.trim() !== "";
}


export function setupNavBar() {
    const navBar = document.getElementById("navBar");
    if(navBar){
        if (isLoggedIn()) {
            navBar.innerHTML = `
            <div class="px-6 py-3 flex justify-between items-center">
                <a href="./index.html" class="text-lg font-semibold text-gray-800 hover:text-blue-600">
                    ToDoList
                </a>
                <a href="./logOut.html" class="text-gray-600 hover:text-red-500 transition">
                    Log Out
                </a>
            </div>

            `;
        } else {
            navBar.innerHTML = `
            <div class="px-6 py-3 flex justify-between items-center">
                <a href="./index.html" class="text-lg font-semibold text-gray-800 hover:text-blue-600">
                    ToDoList
                </a>
                <a href="./logIn.html" class="text-gray-600 hover:text-red-500 transition">
                    Log In
                </a>
                <a href="./signUp.html" class="text-gray-600 hover:text-red-500 transition">
                    Sign Up
                </a>
            </div>

            `;
        }
    } else {
         console.error("L'élément #navBar n'existe pas dans le DOM !");
    }
}

export function addTask(task){
    const currentUser = localStorage.getItem("currentUser");
    let toDoList = JSON.parse(localStorage.getItem(currentUser + " toDoList"));
    if(toDoList == null){
        toDoList = new ToDoList(currentUser, new Array());
    }
    toDoList.taskList.push(task);
    localStorage.setItem(currentUser + " toDoList", JSON.stringify(toDoList));
}