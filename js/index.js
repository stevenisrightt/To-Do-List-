import { setupNavBar } from "./tools.js";

const currentUser = localStorage.getItem("currentUser");

document.addEventListener("DOMContentLoaded", () => {
    if (!currentUser || currentUser.trim() === "") {
        window.location.href = "logIn.html";
    }

    setupNavBar();
    document.querySelector("h1").innerText = `${currentUser}'s ToDo List`;

    populateTable();
});

// Remplir le tableau
function populateTable() {
    let taskTable = document.getElementById("taskTable");
    taskTable.innerHTML = "";

    let toDoList = JSON.parse(localStorage.getItem(currentUser + " toDoList")) || { taskList: [] };

    toDoList.taskList.forEach((task, index) => {
        let row = document.createElement("tr");
        row.classList.add("task-row");

        // Si la tâche est terminée, on applique un style différent
        if (task.isDone) {
            row.classList.add("bg-gray-200", "text-gray-500"); // Griser la ligne
        }

        row.innerHTML = `
            <td class="py-3 px-6">${task.title}</td>
            <td class="py-3 px-6">${task.description}</td>
            <td class="py-3 px-6 text-center">
                <input type="checkbox" ${task.isDone ? "checked disabled" : ""} onclick="toggleDone(${task.id})">
            </td>
            <td class="py-3 px-6 text-center">${task.deadline}</td>
            <td class="py-3 px-6 text-center">
                <button class="px-3 py-1 rounded ${task.isDone ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}" 
                        ${task.isDone ? "disabled" : `onclick="deleteTask(${task.id})"`}>
                    Supprimer
                </button>
            </td>
        `;

        taskTable.appendChild(row);
    });

    applySearchFilter(); // Appliquer le filtre de la barre de recherche immédiatement après l'affichage
}

// recherche
document.getElementById("searchInput").addEventListener("input", applySearchFilter);

function applySearchFilter() {
    let filter = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll(".task-row");

    rows.forEach(row => {
        let title = row.cells[0].textContent.toLowerCase();
        let description = row.cells[1].textContent.toLowerCase();

        if (title.includes(filter) || description.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Fonction pour marquer une tâche comme terminée
window.toggleDone = function (taskId) {
    let toDoList = JSON.parse(localStorage.getItem(currentUser + " toDoList")) || { taskList: [] };
    let task = toDoList.taskList.find(t => t.id === taskId);
    
    if (task) {
        task.isDone = true; // Une fois fait, on ne peut plus l'annuler
        localStorage.setItem(currentUser + " toDoList", JSON.stringify(toDoList));
    }

    populateTable(); // Rafraîchir l'affichage après modification
};

// supprimer une tache
window.deleteTask = function (taskId) {
    let toDoList = JSON.parse(localStorage.getItem(currentUser + " toDoList")) || { taskList: [] };
    
    toDoList.taskList = toDoList.taskList.filter(t => t.id !== taskId);
    localStorage.setItem(currentUser + " toDoList", JSON.stringify(toDoList));

    populateTable(); // Rafraîchir le tableau après la suppression
};
