const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('delBtn');
const completeBtn = document.getElementById('markCompleteBtn');
const saveBtn = document.getElementById('saveBtn');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeSelect = document.getElementById('themeSelect');

let selectedTask = null;

if (localStorage.getItem('myTodoList')) {
    taskList.innerHTML = localStorage.getItem('myTodoList');
}

// Load and Apply Saved Theme Configuration
const cachedTheme = localStorage.getItem('myAppTheme') || 'default';
document.documentElement.setAttribute('data-theme', cachedTheme);
themeSelect.value = cachedTheme;


themeSelect.addEventListener('change', function(e) {
    const activeTheme = e.target.value;
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('myAppTheme', activeTheme);
});



// Add New Task Action
addBtn.addEventListener('click', function(){
    if(input.value.trim() !== "") {
        taskList.innerHTML += `<li>${input.value.trim()}</li>`;
        input.value = "";
    }
});

// Remove Last Added Task Action (Undo)
deleteBtn.addEventListener('click', function(){
    if(taskList.lastElementChild) {
        taskList.lastElementChild.remove();
        selectedTask = null; // System safety cleanup
    }
});

// Task Selector Event Listener (Using Delegation)
taskList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        // Toggle selection logic cleaner setup
        if (selectedTask) {
            selectedTask.classList.remove('selected');
        }
        selectedTask = event.target;
        selectedTask.classList.add('selected');
    }
});

// Toggle Task Complete Lifecycle Method
completeBtn.addEventListener('click', function() {
    if (selectedTask) {
        selectedTask.classList.toggle('done'); 
        selectedTask.classList.remove('selected');
        selectedTask = null; // Clean active state tracking
    } else {
        alert("Please click on a task text first to select it!");
    }
});

// Sync Tasks Data to LocalStorage Container
saveBtn.addEventListener('click', function() {
    // Save karne se pehle temporary configuration highlight clear karna zarori hai
    if (selectedTask) {
        selectedTask.classList.remove('selected');
        selectedTask = null;
    }
    
    localStorage.setItem('myTodoList', taskList.innerHTML);
    alert("Tasks are saved on your device! 🎉");
});