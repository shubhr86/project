let tasks= [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML=`
        
          <input type="checkbox" id="${task.id}" ${task.done ?'checked': ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />
    
    `;
    tasksList.append(li);
}

function renderList(){
    tasksList.innerHTML=' ';
    for (let i=0; i<tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML= tasks.length;
}


function toggleTask (taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId
    });
    if (task.length >0){
        const currentTask= task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('could not toggle the task');
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    });
    tasks =newTasks;
    renderList();
    showNotification('Task Deleted Successfully');
}

function addTask(task){
    if (task){
        tasks.push(task); // adding into array
        renderList();
        showNotification('Task Added Successfully');
        return;
    }
    showNotification('Task Can not be added');
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e) {
    if (e.key === 'Enter'){
        const text= e.target.value;

        if (!text){
            // Error Handling. If user just hit enter, not type anything.
            showNotification('Task Text Can not be Empty');
            return;
        }
        const task={
            text,
            id:Date.now().toString(),
            done:false
        }
        e.target.value='';
        addTask(task);
    }
}

function handleClickListner(e){
    const target =e.target;
   console.log(target);
    
    if(target.className=='delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
    } else if(target.className =='custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
function initialiseApp(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);

    document.addEventListener('click', handleClickListner);
}
initialiseApp();