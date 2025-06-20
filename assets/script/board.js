


let todos =[
    {
        'id': 0,
        'titel': 'Test1',
        'status': 'todo'
    },
    {
        'id': 1,
        'titel': 'Test2',
        'status': 'todo'
    },
    {
        'id': 2,
        'titel': 'Test3',
        'status': 'inProgress'
    },

];

let currentDraggedElement;

function initBoard(){
    checkToDo();
    checkInProgress();
    checkAwaitFeedback();
    checkDone();
   
}
function toggleBoardOverlay(){
    console.log('connect');
    let overlayRef = document.getElementById('overlayBoard');
    let overlay_content = document.getElementById('overlay-content-loader')
    overlayRef.classList.toggle('d-none');
    if(!overlayRef.classList.contains('d-none')){
        overlay_content.innerHTML= getTaskOverlay();
    }
}
function moveTo(newStatus){
    // suche im Array nach dem Task mit der passenden Id unabhängig vom Index
    let checkTask = todos.find(task => task.id == currentDraggedElement);
    if(checkTask){
        checkTask.status = newStatus; // Ändere den Status
        console.log(checkTask.status) 
    }else{
        console.warn('Task mit der Id'+currentDraggedElement+' wurde nicht gefunden');
    }
   
    initBoard();
}
function checkToDo(){
    let doing = todos.filter(todo => todo.status == 'todo') // filtere ale tasks mit status todo aus dem array
    //console.log(doing);
    document.getElementById('todo').innerHTML='';
    for(index = 0; index < doing.length; index++){
        const element = doing[index];
        console.log(element.titel +' mit der ID '+element.id+' befindet sich im Status '+element.status)
        document.getElementById('todo').innerHTML += renderTodo(element);
    
    }     
}
let renderTodo =(element) =>
    {return `<div class="task-body" draggable="true" onclick="toggleBoardOverlay()" ondragstart="startDragging(${element.id})">
                <h1>${element.titel}</h1>
            </div>`}

function startDragging(id){
    currentDraggedElement=id;
    //console.log(currentDraggedElement);
}


function checkInProgress(){
    let doing = todos.filter(todo =>todo.status == 'inProgress') // filtere ale tasks mit status todo aus dem array
   
    document.getElementById('inProgress').innerHTML='';
    for(index = 0; index < doing.length; index++){
        const element = doing[index];
        console.log(element.titel +' mit der ID '+element.id+' befindet sich im Status '+element.status)
        document.getElementById('inProgress').innerHTML += renderTodo(element);

    }
}
function checkAwaitFeedback(){
    let doing = todos.filter(todo =>todo.status == 'awaitFeedback') // filtere ale tasks mit status todo aus dem array
    document.getElementById('awaitFeedback').innerHTML='';
    for(index = 0; index < doing.length; index++){
        const element = doing[index];
        console.log(element.titel +' mit der ID '+element.id+' befindet sich im Status '+element.status)
        document.getElementById('awaitFeedback').innerHTML += renderTodo(element);

    }
}
function checkDone(){
    let doing = todos.filter(todo =>todo.status == 'done') // filtere ale tasks mit status todo aus dem array
    document.getElementById('done').innerHTML='';
    for(index = 0; index < doing.length; index++){
        const element = doing[index];
        console.log(element.titel +' mit der ID '+element.id+' befindet sich im Status '+element.status)
        document.getElementById('done').innerHTML += renderTodo(element);

    }
}
function allowDrop(ev) {
    ev.preventDefault();
}
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

