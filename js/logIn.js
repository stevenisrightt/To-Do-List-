import { isAlreadySignedIn, setupNavBar } from "./tools.js";
const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
    setupNavBar();
});

export function logIn(username, password){
    if(isAlreadySignedIn(form.elements.username.value) == true){
        const usersTab = JSON.parse(localStorage.getItem("usersTab"));
        const user = usersTab.find(user => user.username == username);
        if(user.password == password){
            localStorage.setItem("currentUser", user.username);

            return true;
        }
    }
    return false
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    if(logIn(form.elements.username.value, form.elements.password.value) == true){
        window.location.href = "index.html";
    }else{
        alert("Cet utilisateur n'existe pas ou le mot de passe est erroné");
    }
})