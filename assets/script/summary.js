// MPA Check :-) 

//const BASE_URL_TASKS_AND_USERS = 'https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/';

 async function initSummary() {
  // Initialize summary page elements and functionality hereS
  await checkTasks()
  displayUserName();
  checkTime();
  initFrameworkFunctions()
}

let statusArray = [];
let priorityArray = [];

let taskID;
let taskKey;
let taskObjekt;

let todoCount = 0
let inProgressCount = 0
let awaitFeedbackCount = 0
let doneCount = 0
let urgentCount = 0
/**
 * Load and Process User task data from a Firebase_realtime_database
 * converting the fetch request into a JSON file. Saving the task status and priority
 * in local arrays   
 */
async function checkTasks() {
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
        //console.table(priorityArray);
        statusCount();
        processPriority();
        clearArrays() 
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
  includePriorityToSummery(urgentCount);
}
/**
 * transfer the priority status "urgent" to summery.html to dispklay an overview for 
 * tasks with the "urgent" priority 
 * @param {number} urgentCount 
 */
function includePriorityToSummery(urgentCount){
  let urgent = document.getElementById('task_urgent');
  urgent.innerText = urgentCount
}
/**
 * iterate through the "statusArray" and set for each element containing the specific declaration 
 *  and set the corresponding counter plus one for each target
 */
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
  includeTaskCountToSummery(todoCount,inProgressCount,awaitFeedbackCount,doneCount);
  clearCounter()
}
/**
 * Transfer the actuall counts to summery.html to display an overview of all Tasks
 * 
 * @param {number} todoCount 
 * @param {number} inProgressCount 
 * @param {number} awaitFeedbackCount 
 * @param {number} doneCount 
 */
function includeTaskCountToSummery(todoCount,inProgressCount,awaitFeedbackCount,doneCount){
  let todo = document.getElementById('task_to_do');
  let inProgress = document.getElementById('task_in_progress');
  let awaitFeedback = document.getElementById('task_awaiting_feedback');
  let done = document.getElementById('task_done');
  let tasksInBoard = document.getElementById('task_in_board');
  todo.innerHTML = todoCount;
  inProgress.innerText = inProgressCount;
  awaitFeedback.innerText = awaitFeedbackCount;
  done.innerText = doneCount;
  tasksInBoard.innerText = statusArray.length
}

/**
 * Delete used arrays to prevent an incorrect Summery Presentation
 * after reloadig the summery page
 */
function clearArrays(){
  priorityArray=[];
  statusArray=[];
}
/**
 * Set all counters to = 0 to prevent also an incorect Summery Presentation
 * after realoding the summery page
 */
function clearCounter(){
  todoCount=0
  inProgressCount=0
  awaitFeedbackCount=0
  doneCount=0
  urgentCount=0
}
/**
 * load full name of the logged user from local Storage and displays on Summery.html
 */
function displayUserName(){
  let userGreeting = document.getElementById('userGreeting');
  let userName = document.getElementById('userName');
  let loggedUser = JSON.parse(localStorage.getItem('announcedUser'));
  console.log(loggedUser);
  if(loggedUser === 'Guest Guest'){
    userName.innerText = '';
    userGreeting.innerText ='Good morning'; 
  }else{
    
    userGreeting.innerText = 'Good morning,';
    userName.innerText = loggedUser;
  }
  
}




function checkTime(){
  let userGreeting = document.getElementById('userGreeting');
  const currentTime = new Date();
  let hours = currentTime.getHours();
  // 06:00 bis 11:59
  if(hours >= 6 && hours <12 ){
    userGreeting.innerText = 'Good morning,'
  }
  // 12:00 bis 17:59
  else if(hours >=12 && hours < 18){
    userGreeting.innerText = 'Good afternoon,'
  }
  else{
  //  18:00 bis 05:59
    userGreeting.innerText = 'Good evening,'
  }
}

