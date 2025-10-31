"use strict";

const URL = "http://fbrc.esy.es/DWWM22053/Api/api.php/users";

let affiche_btn = document.getElementById("btn-afficher");
if (affiche_btn) {
    affiche_btn.addEventListener("click", getListUsers);
}

let add_btn = document.getElementById("btn-add");
if (add_btn) {
    add_btn.addEventListener("click", addUser);
}

let change_btn = document.getElementById("btn-change");
if (change_btn) {
    change_btn.addEventListener("click", changeUser);
}

let del_btn = document.getElementById("btn-del");
if (del_btn) {
    del_btn.addEventListener("click", delUser);
}

let del_input_id = document.getElementById("inp-del");
let affiche_table = document.getElementById("t-body");
let id_input = document.getElementById("id");
let nom_input = document.getElementById("nom");
let prenom_input = document.getElementById("prenom");
let email_input = document.getElementById("email");

// MES FONCTIONS -------------------------
function getListUsers() {
    affiche_table.innerHTML = ""

    let requestOptions = {
        method: "GET" // par défaut
    };

    fetch(URL, requestOptions)
        .then((response) => response.json())
        .then(function (data) {
            console.log("La requête GET a abouti avec la réponse JSON : ", data.users.records);
            for (let i in data.users.records) {
                console.log(data.users.records[i]);
                affiche_table.innerHTML += `<tr class=""><td scope="row">${data.users.records[i][0]}</td><td scope="row">${data.users.records[i][1]}</td><td scope="row">${data.users.records[i][2]}</td><td scope="row">${data.users.records[i][3]}</td></tr>`
            }
        })
        .catch(function (error) {
            console.log("La requête GET a échoué : ", error);
        });
}


function addUser() {
    affiche_table.innerHTML = ""
    let requestOptions = {
        method: "POST",
        body: JSON.stringify({
            id: parseInt(id_input.value),
            nom: nom_input.value,
            prenom: prenom_input.value,
            email: email_input.value
        })
    };

    fetch(URL, requestOptions)
        .then((response) => response.text())
        .then((data) => {
            getListUsers();
            console.log("La requête POST a abouti avec la réponse JSON : ", data);
            return data;
        })
        .catch((error) => {
            console.log("La requête POST a échoué : ", error);
            return -1;
        });
}


// SUPPRIME UN user

function delUser() {
    affiche_table.innerHTML = ""
    let requestOptions = {
        method: "DELETE",
    };

    // fetch(URL + "/", requestOptions)
    fetch(URL + "/" + del_input_id.value, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log("La requête DELETE a abouti avec la réponse JSON : ", data);
            del_input_id.value = "";
            getListUsers();
        })
        .catch((error) => {
            console.log("La requête DELETE a échoué : ", error);
        });

}


// MODIFIE UNE user

function changeUser() {
    affiche_table.innerHTML = ""

    let requestOptions = {
        method: "PUT",
        body: JSON.stringify({
            id: parseInt(id_input.value),
            nom: nom_input.value,
            prenom: prenom_input.value,
            email: email_input.value
        })
    };

    fetch(URL + "/" + parseInt(id_input.value), requestOptions)
        .then((response) => response.text())
        .then(function (data) {
            console.log("La requête PUT a abouti avec la réponse JSON : ", data);
            affiche_table.innerHTML = ""
            getListUsers();
        })
        .catch(function (error) {
            console.log("La requête PUT a échoué : ", error);
        });
}