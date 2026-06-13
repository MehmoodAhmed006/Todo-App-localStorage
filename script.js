const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('delBtn');
const completeBtn = document.getElementById('markCompleteBtn');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


addBtn.addEventListener('click', function(){
    if(input.value.trim() !== "") {
        taskList.innerHTML += `<li> ${input.value} </li>`;
        input.value = "";
    }
});


deleteBtn.addEventListener('click', function(){
    if(taskList.lastElementChild) {
        taskList.lastElementChild.remove();
    }
});

    //Mark Completed

    let selectedTask = null;

    taskList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        
        // Remove 'selected' visual from the old task
        if (selectedTask) {
            selectedTask.classList.remove('selected');
        }
        
        // Save the new task and add the 'selected' visual
        selectedTask = event.target;
        selectedTask.classList.add('selected');
    }
});

    completeBtn.addEventListener('click', function() {
    if (selectedTask) {
        // Toggle the green background and line-through
        selectedTask.classList.toggle('done'); 
        
        // Remove the selection highlight since we are done with it
        selectedTask.classList.remove('selected');
        selectedTask = null; 
    } else {
        alert("Please click on a task text first to select it!");
    }
});