add_button = document.querySelector("#add-button");
input_task = document.querySelector("#input-task");
output_task = document.querySelector(".output-task");
index = 0;
function adding_task() {

    if (input_task.value != "") {
        const new_task = document.createElement("input");
        new_task.type = "checkbox";
        new_task.id = index;

        const new_task_label = document.createElement("label");
        new_task_label.textContent = input_task.value;

        output_task.append(new_task);
        output_task.append(new_task_label);
        input_task.value = "";

        index++;

    } else {
        alert("Complete the input !");
    }
    
}

// Traiter le cas des suppression : Mettre à jours les index

add_button.addEventListener("click", adding_task);