let tasks_list = []; // tasks_list: {id: string, name: string, completed: boolean}[]

let add_button = document.querySelector("#add-button"); // add_button: HTMLButtonElement | null
let delete_button = document.querySelector("#delete-button"); // delete_button: HTMLButtonElement | null
let input_task = document.querySelector("#input-task"); // input_task: HTMLInputElement | null
let output_task = document.querySelector(".output-task"); // output_task: HTMLElement | null
let GLOBAL_INDEX = 0; // index: number

function checkDeleteButton() { // checkDeleteButton(): void
    const completed_task = tasks_list.some(task => task.completed); // completed_task: boolean
    // retourn vrai s'il y'a au moins 1 conditions valide
    delete_button.disabled = !completed_task;
}

function adding_task() { // adding_task(): void

    if (input_task.value != "") {
        const task_container = document.createElement("div");

        const new_task = document.createElement("input");
        new_task.type = "checkbox";
        new_task.id = GLOBAL_INDEX;

        const new_task_label = document.createElement("label");
        new_task_label.textContent = input_task.value;
        new_task_label.setAttribute("for", GLOBAL_INDEX); // Ajout du "for" pour lier le label à la checkbox
        
        // Ajoute un gestionnaire de clic sur l'ensemble du conteneur pour trigger la checkbox
        task_container.addEventListener("click", () => {
            new_task.checked = !new_task.checked; // Toggle de la checkbox
            
            // Met à jour le statut de la tâche dans la liste
            for (let i = 0; i < tasks_list.length; i++) {
                if (tasks_list[i].id == new_task.id) {
                    tasks_list[i].completed = new_task.checked;
                }
            }
            checkDeleteButton();
        });

        // On stock les nouvelles tâches crées dans le tableau
        tasks_list.push({
            id: new_task.id,
            name: new_task_label.textContent,
            completed: false
        });

        
        console.log("adding task :", tasks_list);
        task_container.append(new_task);
        task_container.append(new_task_label);
        output_task.append(task_container);

        input_task.value = "";
        GLOBAL_INDEX++;

    } else {
        alert("Complete the input !");
    }
    
    
}


// Traiter le cas des suppression : Mettre à jours les index
function delete_task() { // delete_task(): void
    output_task.textContent = "";
    const undone_task = tasks_list.filter(tasks_list => tasks_list.completed != true); // return : liste de tâches
    console.log("Liste actuelle :", tasks_list);
    for (let index = 0; index < undone_task.length; index++) {
        // On crée un nouveau tableau contenant uniquement les tâches non effectuées
        const update_task_container = document.createElement("div");
        const update_task = document.createElement("input");
        update_task.type = "checkbox";
        
        // On met à jour les bons index du tableau
        update_task.id = index; 
        undone_task[index].id = index;

        const update_task_label = document.createElement("label");
        update_task_label.textContent = undone_task[index].name;

        // Réattribuer le gestionnaire d'événements pour la nouvelle tâche (on rentre ici après avoir supprimé au moins 1 fois)
        update_task_container.addEventListener("click", () => {
            // Point important : La checkbox est coché visuellement mais cet événement est nécessaire
            // pour que le back soit à jour égalements
            // On rentre ici après avoir supprimé au moins une fois
            update_task.checked = !update_task.checked;
            for (let i = 0; i < tasks_list.length; i++) {
                if (tasks_list[i].id == update_task.id) {
                    tasks_list[i].completed = update_task.checked;
                }
            }
            checkDeleteButton();  
        });

        update_task_container.append(update_task);
        update_task_container.append(update_task_label);
        output_task.append(update_task_container);

        // On prend le dernier index de la boucle + 1 (ou la dernière longueur du tableau undone_task)
        // Pour préserver la suite logique des prochaines tâches ajoutés
        GLOBAL_INDEX = undone_task.length;

    }
    
    if (undone_task == 0) { GLOBAL_INDEX = 0}
    tasks_list = undone_task;
    // On désactive à nouveau le bouton après avoir supprimé les tâches accomplies
    checkDeleteButton();
    console.log("Après suppréssion", tasks_list);
    // Le bouton supprime tout le monde car tout le monde à le même index
}

add_button.addEventListener("click", adding_task);
delete_button.addEventListener("click", delete_task);
