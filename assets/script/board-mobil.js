function showDropDown(trueTaskId){
    
    //findStatusArea(trueTaskId);
    //hideActivStatus(trueTaskId);
    let dropdown_menu = document.getElementById('drop-down')
    dropdown_menu.classList.toggle('d-none');    
}

function findStatusArea(trueTaskId){
    //let choosenTask = document.getElementById(trueTaskId);
    let boardTaskContainer= document.getElementById('task-'+trueTaskId);
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
}

async function changeTaskStatusMobilToDo(trueTaskId ,taskId){
    let overlayRef = document.getElementById('overlayBoard');
    let taskOverlayRef = document.getElementById('overlay-content-loader');
    let originalTask = document.getElementById('task-'+trueTaskId);
    let targetArea = document.getElementById('todo');
    let section = document.createElement('section');
    section.appendChild(originalTask);
    targetArea.appendChild(section);
    await changeFirebaseStatus(targetArea, taskId);

    overlayRef.classList.toggle('visible');
    overlayRef.classList.add('d-none');
    taskOverlayRef.classList.toggle('show');
}

async function changeTaskStatusMobilInProgress(trueTaskId ,taskId){
    let overlayRef = document.getElementById('overlayBoard');
    let taskOverlayRef = document.getElementById('overlay-content-loader');
    let originalTask = document.getElementById('task-'+trueTaskId);
    let targetArea = document.getElementById('inProgress');
    let section = document.createElement('section');
    section.appendChild(originalTask);
    targetArea.appendChild(section);
    await changeFirebaseStatus(targetArea, taskId);
    overlayRef.classList.toggle('visible');
    overlayRef.classList.add('d-none');
    taskOverlayRef.classList.toggle('show');
}

async function changeTaskStatusMobilAwaitFeedback(trueTaskId ,taskId){
    let overlayRef = document.getElementById('overlayBoard');
    let taskOverlayRef = document.getElementById('overlay-content-loader');
    let originalTask = document.getElementById('task-'+trueTaskId);
    let targetArea = document.getElementById('awaitFeedback');
    let section = document.createElement('section');
    section.appendChild(originalTask);
    targetArea.appendChild(section);
    await changeFirebaseStatus(targetArea, taskId);
    overlayRef.classList.toggle('visible');
    overlayRef.classList.add('d-none');
    taskOverlayRef.classList.toggle('show');
}

async function changeTaskStatusMobilDone(trueTaskId ,taskId){
    let overlayRef = document.getElementById('overlayBoard');
    let taskOverlayRef = document.getElementById('overlay-content-loader');
    let originalTask = document.getElementById('task-'+trueTaskId);
    let targetArea = document.getElementById('done');
    let section = document.createElement('section');
    section.appendChild(originalTask);
    targetArea.appendChild(section);
    await changeFirebaseStatus(targetArea, taskId);
    overlayRef.classList.toggle('visible');
    overlayRef.classList.add('d-none');
    taskOverlayRef.classList.toggle('show');
}

async function changeFirebaseStatus(targetArea, taskId){
    try{
            let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json');
            let data = await response.json();
            if(!data){
                console.log('Probleme beim API abruf')
                return;
            }
            let targetTaskId = taskId;
            let allTasksId = Object.keys(data);
            if(allTasksId.includes(targetTaskId)){ 
                let newStatus = targetArea.id; 
                let newSequence = checkSequenzNr(allTasksId, data)
                console.log(newStatus);
                const statusUpdate = {
                    status : newStatus,
                    sequence : newSequence,
                }
                await updateNewStatus(statusUpdate, targetTaskId);
            }else{
                console.log(false, "Die ID wurde nicht gefunden");
            }
    }catch(error){
        console.error(error)
    }   
}

function checkSequenzNr(allTasksId, data){
    let processingSequenz = [];
    for(s = 0; s < allTasksId.length; s++){
        let test = allTasksId[s];
        processingSequenz.push(data[test].sequence);  
    }
    const maxCount = Math.max(...processingSequenz);
    let newMaxCount = maxCount +1
    processingSequenz=[];
    return(newMaxCount)
}

async function updateNewStatus(statusUpdate, targetTaskId) {
    try{
        const update = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + targetTaskId + '.json', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(statusUpdate),
        });
        if(!update.ok){
            let errorMessage = await update.text();
            console.error(errorMessage);
        }else{
            console.log("Update erfolgreich")
        }
    }catch(error){
        console.error(error);
    }
    window.location.reload();
}
