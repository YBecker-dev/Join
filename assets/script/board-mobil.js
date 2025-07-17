function showDropDown(){
    let dropdown_menu = document.getElementById('selection')
    dropdown_menu.classList.toggle('d-none');

}

function dropDownMobil(){
    checkTaskArea();
    //let todoArea = document.getElementById('todo');
    //let toDoRef = document.getElementById('ToDo');
    //let tasks = document.getElementsByClassName('board-task-container');
    ////let inProgressRef = document.getElementById('InProgress');
    ////let awaitFeedbackRef = document.getElementById('AwaitFeedback');
    ////let doneRef = document.getElementById('Done');
    //let dropdown = document.getElementById('selection');
    //let choosenValue = dropdown.value;
    //console.log('folgendes wurde ausgewählt'+choosenValue);
}

function checkTaskArea(){
    let todoArea = document.getElementById('todo');
    let tasksToDo = todoArea.querySelectorAll('board-task-container');
    let inProgressArea = document.getElementById('inProgress');
    let awaitFeedbackArea = document.getElementById('awaitFeedback');
    let doneArea = document.getElementById('done');
   

    if(tasksToDo){
        console.log(tasksToDo.length);
        return true;
    }
}