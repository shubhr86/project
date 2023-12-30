let tasks= [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


// fetch from API
// function fetchTodos(){
//     // GET request
//     fetch('https://jsonplaceholder.typicode.com/todos') // return promise
//     .then (function (response){
//     return response.json();
//     }).then(function(data){ // again return promise
//         tasks = data.slice(0,10);
//         renderList();
//     })
//     .catch (function(error){
//         console.log('error', error);
//     })
// }

// Using async
async function fetchTodos(){
        // GET request
        try{
        const response= await fetch('https://jsonplaceholder.typicode.com/todos') // return promise
        const data = await response.json();
        tasks=data.slice(0,10);
        renderList();
        } catch(error){
            console.log(error);
        }
    }


function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML=`
        
          <input type="checkbox" id="${task.id}" ${task.completed ?'checked': ''} class="custom-checkbox">
          <label for="${task.id}">${task.tittle}</label>
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
        return task.id === Number(taskId)
    });
    if (task.length >0){
        const currentTask= task[0];

        currentTaskcompleted = !currentTaskcompleted;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('could not toggle the task');
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== Number(taskId)
    });
    tasks =newTasks;
    renderList();
    showNotification('Task Deleted Successfully');
}

function addTask(task){
    if (task){
        // fetch('https://jsonplaceholder.typicode.com/todos', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json',
        //     },
        //     body: JSON.stringify(task),
       // }) // return promise
            // .then (function (response){
            // return response.json();
            // }).then(function(data){ // again return promise
            //    console.log(data)
            //    tasks.push(task); // adding into array
            //    renderList();
            //    showNotification('Task Added Successfully');
             
            // })
            // .catch (function(error){
            //     console.log('error', error);
            // })
        


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
            tittle: text,
            id:Date.now(),
            completed:false
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
    fetchTodos();
    addTaskInput.addEventListener('keyup', handleInputKeypress);

    document.addEventListener('click', handleClickListner);
}
initialiseApp();