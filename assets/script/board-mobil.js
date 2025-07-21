function showDropDown(trueTaskId){
    findStatusArea(trueTaskId);
    //hideActivStatus(trueTaskId);
    let dropdown_menu = document.getElementById('drop-down')
    dropdown_menu.classList.toggle('d-none');
    
    

}

function findStatusArea(trueTaskId){
    //let choosenTask = document.getElementById(trueTaskId);
    let boardTaskContainer= document.getElementById('task-'+trueTaskId);
    //console.log(choosenTask);
    //console.log(boardTaskContainer);
    //console.log(boardTaskContainer.parentElement)
    let firstParent = boardTaskContainer.parentElement;
    //console.log(firstParent.parentElement)
    let targetParentElement = firstParent.parentElement;
    //console.log(targetParentElement.id);
    let statusID = targetParentElement.id
    //console.log(statusID);
    hideActivStatus(trueTaskId, statusID);  
}

function hideActivStatus(trueTaskId, statusID){
    //console.log(trueTaskId)
    //let targetArea = document.getElementById('todo');
    let targetArea = document.getElementById(statusID);
    let todoDropDown = document.getElementById(statusID+'-mobil-'+trueTaskId)
    //console.log(todoDropDown);
    let sections = targetArea.getElementsByTagName('section');
    let sectionId;
    for(let section  of sections){
        let sectionbodys = section.children;
        for(let sectionbody of sectionbodys){
            //console.log(sectionbody.parentElement);
            let area=sectionbody.parentElement
            //console.log(area.parentElement)
            sectionId = sectionbody.id;
            //console.log(sectionId)
            let filterId = sectionId.slice(5)
            let targetId = Number(filterId);
            if(trueTaskId === targetId){
                //console.log(true);
                todoDropDown.classList.add('d-none');
            }else{
                //console.log(false)
            }
           
        }
    }
    //changeTaskStatusMobil(trueTaskId, statusID);
}

function changeTaskStatusMobilToDo(trueTaskId){
    let overlayRef = document.getElementById('overlayBoard');
    let taskOverlayRef = document.getElementById('overlay-content-loader');
    //let todoRef = document.getElementById('todo-mobil-'+trueTaskId);
    let originalTask = document.getElementById('task-'+trueTaskId);
    let targetArea = document.getElementById('todo');
    let section = document.createElement('section');
    section.appendChild(originalTask);
    targetArea.appendChild(section);
    overlayRef.classList.toggle('visible');
    overlayRef.classList.add('d-none');
    taskOverlayRef.classList.toggle('show');
}

