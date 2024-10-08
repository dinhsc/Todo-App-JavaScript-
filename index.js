let tasks_list = []; // tasks_list: {id: string, name: string, completed: boolean}[]
let complete_tasks_list = [];

let add_button = document.querySelector("#add-button"); // add_button: HTMLButtonElement | null
let delete_button = document.querySelector("#delete-button"); // delete_button: HTMLButtonElement | null
let input_task = document.querySelector("#input-task"); // input_task: HTMLInputElement | null
let output_task = document.querySelector(".output-task"); // output_task: HTMLElement | null
let TASKS_LEFT = 0; // index: number

let items_left = document.querySelector(".items-left");
let filters = document.querySelector(".filters");
let all_tasks = document.querySelector("#all-tasks");
let active_tasks = document.querySelector("#active-tasks");
let comp_tasks = document.querySelector("#completed-tasks");

function updateDeleteButton() { // checkDeleteButton(): void
    const completed_task = tasks_list.some(task => task.completed); // completed_task: boolean
    // retourn vrai s'il y'a au moins 1 conditions valide
    delete_button.disabled = !completed_task;
}



function renderTasks(taskList) {
    output_task.textContent = "";

    // On boucle sur la longueur de la liste entrante
    for (let index = 0; index < taskList.length; index++) {

        // 0: Object { id: 0, name: "ds", completed: false }

        // 1: Object { id: 1, name: "dsfg", completed: false }

        // 2: Object { id: 2, name: "zz", completed: false }

        const container = document.createElement("div");

        const new_task = document.createElement("input");
        new_task.type = "checkbox";
        new_task.id = index;
        new_task.checked = taskList[index].completed; // Définir l'état de la checkbox en fonction de la tâche
        
        // IMPORTANT : Ne pas oublier de remettre à jour les indexs de tasks_list après suppréssion + ajout
        taskList[index].id = index;
        const task_label = document.createElement("label");
        // En prenant "tasks_list" actuelle
        task_label.textContent = taskList[index].name;
        task_label.setAttribute("for", index);

        // On met à jour le style des tâches complété (en dehors de l'évent "click" de container pour trigger l'update)
        // Si on ne le met pas ici, les tâches complété n'auront pas le changement de style (car trigger uniquement avec l'évent "click")
        updateTaskStyle(task_label, taskList[index].completed)

        container.addEventListener("click", () => {
            new_task.checked = !new_task.checked;
            // Pour trigger le bouton "Delete"
            taskList[index].completed = new_task.checked;

            // updateActiveTask()
            updateTaskStyle(task_label, taskList[index].completed)
            updateDeleteButton();
        });
        

        container.append(new_task);
        container.append(task_label);
        output_task.append(container);

    }

    TASKS_LEFT = taskList.filter(task => !task.completed).length;
    updateItemsLeft();
    updateDeleteButton();
}

function addTask() { // adding_task(): void
    if (input_task.value != "") {
        // On stock les nouvelles tâches crées dans le tableau
        tasks_list.push({
            id: TASKS_LEFT,
            name: input_task.value,
            completed: false
        });

        input_task.value = "";

        renderTasks(tasks_list);
        console.log("Tâches restantes : ", tasks_list);

    } else {
        alert("Complete the input !");
    }
}


// Traiter le cas des suppression : Mettre à jours les index
function deleteTask() { // delete_task(): void
    const undone_task = tasks_list.filter(tasks_list => tasks_list.completed != true); // return : liste de tâches active
    const task_done = tasks_list.filter(task => task.completed);

    // On met à jour tasks_list pour l'utiliser dans renderTasks
    // On affichera uniquement les tâches non complétés
    tasks_list = undone_task;
    renderTasks(undone_task);

    for (let index = 0; index < task_done.length; index++) {
        complete_tasks_list.push({
            id: complete_tasks_list.length,
            name: task_done[index].name,
            completed: true
        });
    }
    console.log("Tâches accomplies : ", complete_tasks_list);
}

function updateActiveTask() {
    for (let i = 0; i < complete_tasks_list; i++) {
        console.log("ICI", complete_tasks_list[i].completed)
    }
}
function updateItemsLeft() { items_left.textContent = `${TASKS_LEFT} items left` }

function updateTaskStyle(taskLabel, completed) { taskLabel.classList.toggle("tasks-done", completed); }


add_button.addEventListener("click", addTask);
delete_button.addEventListener("click", deleteTask);
all_tasks.addEventListener("click", () => {
    updateStyleManagement(all_tasks);
    const all_tasks_list = tasks_list.concat(complete_tasks_list);
    renderTasks(all_tasks_list);
})
active_tasks.addEventListener("click", () => { 
    updateStyleManagement(active_tasks);
    renderTasks(tasks_list); 
});
comp_tasks.addEventListener("click", () => {
    console.log("COMPLETE", complete_tasks_list);
    updateStyleManagement(comp_tasks);
    renderTasks(complete_tasks_list);

});

function updateStyleManagement(selectedFilter) {
    // Récupère tous les éléments enfants de l'élément "filters"
    const filterElements = filters.children;
    // Boucle sur tous les éléments de filtres et réinitialise leur couleur
    for (let i = 0; i < filterElements.length; i++) {
        filterElements[i].style.color = "#7d7f96"; // Réinitialise la couleur
    }

    // Applique la couleur bleue uniquement à l'élément sélectionné
    selectedFilter.style.color = "#3867c5";
}


// Prochaines tâches à faire : 
// Corriger les problèmes avec tasks_list


// Ancienne version :

// function adding_task() { // adding_task(): void

//     if (input_task.value != "") {

//         // Création d'un nouveau composant
//         const task_container = document.createElement("div");
//         const new_task = document.createElement("input");
//         new_task.type = "checkbox";
//         new_task.id = TASKS_LEFT;

//         const new_task_label = document.createElement("label");
//         new_task_label.textContent = input_task.value;
//         new_task_label.setAttribute("for", TASKS_LEFT); // Ajout du "for" pour lier le label à la checkbox
        
//         // Ajoute un gestionnaire de clic sur l'ensemble du conteneur pour trigger la checkbox
//         task_container.addEventListener("click", () => {
//             new_task.checked = !new_task.checked; // Toggle de la checkbox
            
//             // Met à jour le statut de la tâche dans la liste
//             for (let i = 0; i < tasks_list.length; i++) {
//                 if (tasks_list[i].id == new_task.id) {
//                     tasks_list[i].completed = new_task.checked;
//                 }
//             }
//             checkDeleteButton();
//         });

//         // On stock les nouvelles tâches crées dans le tableau
//         tasks_list.push({
//             id: new_task.id,
//             name: new_task_label.textContent,
//             completed: false
//         });
        
//         console.log("adding task :", tasks_list);
//         task_container.append(new_task);
//         task_container.append(new_task_label);
//         output_task.append(task_container);

//         input_task.value = "";
//         TASKS_LEFT++;
//         updateItemsLeft()

//     } else {
//         alert("Complete the input !");
//     }
    
    
// }


// // Traiter le cas des suppression : Mettre à jours les index
// function delete_task() { // delete_task(): void
//     output_task.textContent = "";
//     const undone_task = tasks_list.filter(tasks_list => tasks_list.completed != true); // return : liste de tâches
//     console.log("Liste actuelle :", tasks_list);
//     for (let index = 0; index < undone_task.length; index++) {
//         // On crée un nouveau tableau contenant uniquement les tâches non effectuées
//         const update_task_container = document.createElement("div");
//         const update_task = document.createElement("input");
//         update_task.type = "checkbox";
        
//         // On met à jour les bons index du tableau
//         update_task.id = index; 
//         undone_task[index].id = index;

//         const update_task_label = document.createElement("label");
//         update_task_label.textContent = undone_task[index].name;

//         // Réattribuer le gestionnaire d'événements pour la nouvelle tâche (on rentre ici après avoir supprimé au moins 1 fois)
//         update_task_container.addEventListener("click", () => {
//             // Point important : La checkbox est coché visuellement mais cet événement est nécessaire
//             // pour que le back soit à jour égalements
//             // On rentre ici après avoir supprimé au moins une fois
//             update_task.checked = !update_task.checked;
//             for (let i = 0; i < tasks_list.length; i++) {
//                 if (tasks_list[i].id == update_task.id) {
//                     tasks_list[i].completed = update_task.checked;
//                 }
//             }
//             checkDeleteButton();  
//         });

//         update_task_container.append(update_task);
//         update_task_container.append(update_task_label);
//         output_task.append(update_task_container);

//         // On prend le dernier index de la boucle + 1 (ou la dernière longueur du tableau undone_task)
//         // Pour préserver la suite logique des prochaines tâches ajoutés
//         TASKS_LEFT = undone_task.length;
//     }
    
//     if (undone_task == 0) { TASKS_LEFT = 0}
//     tasks_list = undone_task;
//     // On désactive à nouveau le bouton après avoir supprimé les tâches accomplies
//     checkDeleteButton();
//     updateItemsLeft()
//     console.log("Après suppréssion", tasks_list);
// }