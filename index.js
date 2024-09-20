let tasks_list = [];
add_button = document.querySelector("#add-button");
delete_button = document.querySelector("#delete-button");
input_task = document.querySelector("#input-task");
output_task = document.querySelector(".output-task");
index = 0;

function checkDeleteButton() {
    const completed_task = tasks_list.some(task => task.completed);
    delete_button.disabled = !completed_task;
    console.log(completed_task);
}

function adding_task() {

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

        // Ajout du gestionnaire d'évévenement pour la checkbox
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
        output_task.append(new_task);
        output_task.append(new_task_label);
        input_task.value = "";

        index++;
        console.log(tasks_list)


    } else {
        alert("Complete the input !");
    }
    
}


// Traiter le cas des suppression : Mettre à jours les index
function delete_task() {

    // On retourne une nouvelle liste de tâches ne contenant pas les tâches accompli
    const undone_task = tasks_list.filter(tasks_list => tasks_list.completed != true);
    console.log(undone_task);
    // for (let i = 0; i < tasks_list.length; i++) {
    //     if (tasks_list[i].completed) {
    //         console.log("Indice : ", tasks_list[i])
    //         console.log("avant", tasks_list)
    
    //         tasks_list.splice(tasks_list[i], 2);
    //         console.log("après", tasks_list)
    //     }


    // }
}

add_button.addEventListener("click", adding_task);
delete_button.addEventListener("click", delete_task);
