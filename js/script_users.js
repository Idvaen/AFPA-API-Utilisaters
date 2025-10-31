    "use strict";

    let affiche_btn = document.getElementById("btn-afficher");
    affiche_btn.addEventListener("click", getListUsers);

    let add_btn = document.getElementById("btn-add");
    add_btn.addEventListener("click", addUser);

    // let change_btn = document.getElementById("btn-change");
    // change_btn.addEventListener("click", changeUser);

    // let del_btn = document.getElementById("btn-del");
    // del_btn.addEventListener("click", delUser);

    let affiche_table = document.getElementById("t-body");
    let id_input = document.getElementById("id");
    let nom_input = document.getElementById("nom");
    let prenom_input = document.getElementById("prenom");
    let email_input = document.getElementById("email");

    // let add_user = {
    //     "id": id_input.value,
    //     "nom": nom_input.value,
    //     "prenom": prenom_input.value,
    //     "email": email_input.value
    // };

    const URL = "http://fbrc.esy.es/DWWM22053/Api/api.php/users";

    // getListUsers(URL);

    // const USER = {
    //     id: "20",
    //     nom: "Ivan",
    //     prenom: "Den",
    //     email: "iva@den.com"
    // };

    // addUser(URL, USER);
    // getListUsers(URL);



    // MES FONCTIONS -------------------------
    function getListUsers() {
        let requestOptions = {
            method: "GET" // par défaut
        };
        
        
        fetch(URL, requestOptions)
            .then((response) => response.json())
            .then(function (data) {
                console.log("La requête GET a abouti avec la réponse JSON : ", data.users.records);
                for(let i in data.users.records){
                    console.log(data.users.records[i]);
                    affiche_table.innerHTML += `<tr class=""><td scope="row">${data.users.records[i][0]}</td><td scope="row">${data.users.records[i][1]}</td><td scope="row">${data.users.records[i][2]}</td><td scope="row">${data.users.records[i][3]}</td></tr>`
                }
            })
            .catch(function (error) {
                console.log("La requête GET a échoué : ", error);
            });
    }
    

    function addUser() {
        let requestOptions = {
            method: "POST",
            body: JSON.stringify(add_user)
        };

        fetch(URL, requestOptions)
            .then((response) => response.text())
            .then((data) => {
                console.log("La requête POST a abouti avec la réponse JSON : ", data);
                return data;
            })
            .catch((error) => {
                console.log("La requête POST a échoué : ", error);
                return -1;
            });
    }
    

    // SUPPRIME UNE user
//     let requestOptions = {
//         method: "DELETE",
//     };

//     fetch(URL + "/", requestOptions)
//         .then((response) => response.text())
//         .then((data) => {
//             console.log("La requête DELETE a abouti avec la réponse JSON : ", data);
//         })
//         .catch((error) => {
//             console.log("La requête DELETE a échoué : ", error);
//         });

// getListUsers(URL);


    // MODIFIE UNE user
    // let userMAJ = {
    //     marque: "Peugeot 208",
    //     couleur:"rouge",
    //     cylindree: 90
    // };
    
    // let requestOptions = {
    //     method: "PUT",
    //     body: JSON.stringify(userMAJ)
    // };

    // fetch(URL + "/100000057", requestOptions)
    //     .then((response) => response.text())
    //     .then(function (data) {
    //         console.log("La requête PUT a abouti avec la réponse JSON : ", data);
    //     })
    //     .catch(function (error) {
    //         console.log("La requête PUT a échoué : ", error);
    //     });


// for(let i = 100000015; i < 100000052; i++) {
//     del(i);
// }

// function del(iduser) {
//     requestOptions = {
//         method: "DELETE",
//     };

//     fetch(URL + "/" + iduser, requestOptions)
//         .then((response) => response.text())
//         .then((data) => {
//             console.log("La requête DELETE a abouti avec la réponse JSON : ", data);
//         })
//         .catch((error) => {
//             console.log("La requête DELETE a échoué : ", error);
//         });
// }