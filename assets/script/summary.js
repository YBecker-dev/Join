//const BASE_URL_TASKS_AND_USERS = 'https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/';

 async function initSummary() {
  // Initialize summary page elements and functionality here
  await checkTasks()
}


let taskID;
let taskKey;
let taskObjekt;
const statusArray = [];
const priorityArray = [];
let todoCount = 0
let inProgressCount = 0
let awaitFeedbackCount = 0
let doneCount = 0
let urgentCount = 0
async function checkTasks() {

  console.log('chekck_task --> connect');
  try{
    let response = await fetch(BASE_URL_TASKS_AND_USERS+".json");
    if(response.ok){
      const responseObject = await response.json();
      //console.log(responseObject);// Objekete 
      if(responseObject){
        let dataBaseKey = Object.keys(responseObject);
        //console.log(dataBaseKey);
        for(i = 0; i < dataBaseKey.length; i++){
          taskID = dataBaseKey[0];
          taskKey = Object.keys(responseObject[taskID]);//Task Keys 
          taskObjekt = Object.values(responseObject[taskID]);
        }
        //console.table(taskKey);
        //console.table(taskObjekt);
        for(z=0; z< taskObjekt.length; z++){
          //console.log(taskObjekt[z].status);
          //console.log(taskObjekt[z].priority);
          statusArray.push(taskObjekt[z].status)
          priorityArray.push(taskObjekt[z].priority);
           
        }
        console.table(priorityArray);
        statusCount();
        processPriority(); 
      }
    }

  }catch(error){
    console.error(error)
  }
}
function processPriority(){
  priorityArray.forEach(element =>{
    if(element === 'Urgent'){
      urgentCount ++;
    }
  })
  //console.log(urgentCount)
  includePriorityToSummery(urgentCount);
}

function includePriorityToSummery(urgentCount){
  let urgent = document.getElementById('task_urgent');
  urgent.innerText = urgentCount
}
function statusCount(){  
  statusArray.forEach(element => {
    if(element === 'todo'){
      todoCount ++;
    }
    else if(element === 'inProgress'){
      inProgressCount++;
    }
    else if(element === 'done'){
      doneCount++
    }
    else if(element === 'awaitFeedback'){
      awaitFeedbackCount++;
    }
   
  });
   //console.log( todoCount);
   //console.log('Anzahl inProgress ',inProgressCount);
   //console.log('Anzahl awaitFeedback ',awaitFeedbackCount);
   //console.log('Anzahl dones ',doneCount);
   //console.log(statusArray.length);
   includeTaskCountToSummery(todoCount,inProgressCount,awaitFeedbackCount,doneCount);
}

function includeTaskCountToSummery(todoCount,inProgressCount,awaitFeedbackCount,doneCount){
  let todo = document.getElementById('task_to_do');
  let inProgress = document.getElementById('task_in_progress');
  let awaitFeedback = document.getElementById('task_awaiting_feedback');
  let done = document.getElementById('task_done');
  let tasksInBoard = document.getElementById('task_in_board');
  todo.innerText = todoCount;
  inProgress.innerText = inProgressCount;
  awaitFeedback.innerText = awaitFeedbackCount;
  done.innerText = doneCount;
  tasksInBoard.innerText = statusArray.length
}