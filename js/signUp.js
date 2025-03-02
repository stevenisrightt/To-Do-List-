import { isAlreadySignedIn, setupNavBar } from "./tools.js";
const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
    setupNavBar();
});

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    //console.log(form.elements.username.value);
    if(isAlreadySignedIn(form.elements.username.value) == true){
        alert("Ce nom est déjà pris par un autre utilisateur.");
    }else{
        if(localStorage.getItem("usersTab") == null){
            localStorage.setItem("usersTab", JSON.stringify([]));
        }
        const newUser = new User(form.elements.username.value, form.elements.password.value);
        let usersTab = JSON.parse(localStorage.getItem("usersTab"));
        usersTab.push(newUser);
        localStorage.setItem("usersTab", JSON.stringify(usersTab));
        localStorage.setItem("currentUser", newUser.username);

        window.location.href = "index.html"; 

    }

});