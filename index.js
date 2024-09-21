let tasks_list = []; // tasks_list: {id: string, name: string, completed: boolean}[]

let add_button = document.querySelector("#add-button"); // add_button: HTMLButtonElement | null
let delete_button = document.querySelector("#delete-button"); // delete_button: HTMLButtonElement | null
let input_task = document.querySelector("#input-task"); // input_task: HTMLInputElement | null
let output_task = document.querySelector(".output-task"); // output_task: HTMLElement | null
let index = 0; // index: number

function checkDeleteButton() { // checkDeleteButton(): void
    const completed_task = tasks_list.some(task => task.completed); // completed_task: boolean
    // retourn vrai s'il y'a au moins 1 conditions valide
    delete_button.disabled = !completed_task;
}

function adding_task() { // adding_task(): void

    if (input_task.value != "") {
        const new_task = document.createElement("input");
        new_task.type = "checkbox";
        new_task.id = index;

        const new_task_label = document.createElement("label");
        new_task_label.textContent = input_task.value;
        
        // On stock les nouvelles tâches crées dans le tableau
        tasks_list.push({
            id: new_task.id,
            name: new_task_label.textContent,
            completed: false
        });

        // Ajout du gestionnaire d'évévenement pour la checkbox (à déplacer hors de la fct)
        new_task.addEventListener("change", () => {
            // --Manière optimal--
            // const trigger_task = tasks_list.find(t => t.id == new_task.id); 
            // if (trigger_task) {
            //     console.log(`Tâche ${new_task.id} accomplie : ${new_task_label.textContent}`);
            //     trigger_task.completed = new_task.checked;
            // }
            // Manière simple : On parcourt le tableau pour trouver l'indice du tasks_list trigger

            for (let i = 0; i < tasks_list.length; i++) {
                if (tasks_list[i].id == new_task.id) {
                    console.log(`Tâche ${new_task.id} accomplie : ${new_task_label.textContent}`);
                    tasks_list[i].completed = new_task.checked;
                }
            }
            checkDeleteButton();
            
        })
        console.log("adding task :", tasks_list);
        output_task.append(new_task);
        output_task.append(new_task_label);
        input_task.value = "";

        index++;

    } else {
        alert("Complete the input !");
    }
    
    
}


// Traiter le cas des suppression : Mettre à jours les index
function delete_task() { // delete_task(): void
    // console.log("ICI", tasks_list);
    output_task.textContent = "";
    // On retourne une nouvelle liste de tâches ne contenant pas les tâches accompli
    const undone_task = tasks_list.filter(tasks_list => tasks_list.completed != true); // return : liste de tâches
    // console.log("Liste actuelle :", undone_task);
    for (let index = 0; index < undone_task.length; index++) {
        const update_task = document.createElement("input");
        update_task.type = "checkbox";
        update_task.id = index; //undone_task[index].id;
        undone_task[index].id = index;
        const update_task_label = document.createElement("label");
        update_task_label.textContent = undone_task[index].name;

        // Réattribuer le gestionnaire d'événements pour la nouvelle tâche (on rentre ici après avoir supprimé au moins 1 fois)
        update_task.addEventListener("change", () => {
            // (on rentre ici après avoir supprimé au moins 1 fois)
            for (let i = 0; i < tasks_list.length; i++) {
                if (tasks_list[i].id == update_task.id) {
                    tasks_list[i].completed = update_task.checked;
                }
            }
            checkDeleteButton();
            // Point important : La checkbox est coché visuellement mais cet événement est nécessaire
            // pour que le back soit à jour également
        });
        
        output_task.append(update_task);
        output_task.append(update_task_label);
    }
    tasks_list = undone_task;
    // On désactive à nouveau le bouton après avoir supprimé les tâches accomplies
    checkDeleteButton();
    // Le bouton supprime tout le monde car tout le monde à le même index
}

add_button.addEventListener("click", adding_task);
delete_button.addEventListener("click", delete_task);
