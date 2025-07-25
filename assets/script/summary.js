async function initSummary() {
  showMainContentIfWideScreen();
  setGreetingText();
  showGreetingMessagebyLogin();
  await checkTasks();
  initFrameworkFunctions();
  upcomingDeadline();
  changeColorbyHtmlLinks(document.getElementById('sidebar-summary'));
}

let statusArray = [];
let priorityArray = [];

let taskID;
let taskKey;
let taskObjekt;

let todoCount = 0;
let inProgressCount = 0;
let awaitFeedbackCount = 0;
let doneCount = 0;
let urgentCount = 0;
/**
 * Load and Process User task data from a Firebase_realtime_database
 * converting the fetch request into a JSON file. Saving the task status and priority
 * in local arrays
 */
async function checkTasks() {
  try {
    let response = await fetch(BASE_URL_TASKS_AND_USERS + '.json');
    if (response.ok) {
      const responseObject = await response.json();
      //console.log(responseObject);// Objekete
      if (responseObject) {
        let dataBaseKey = Object.keys(responseObject);
        //console.log(dataBaseKey);
        for (i = 0; i < dataBaseKey.length; i++) {
          taskID = dataBaseKey[0];
          taskKey = Object.keys(responseObject[taskID]); //Task Keys
          taskObjekt = Object.values(responseObject[taskID]);
        }
        //console.table(taskKey);
        //console.table(taskObjekt);
        for (z = 0; z < taskObjekt.length; z++) {
          //console.log(taskObjekt[z].status);
          //console.log(taskObjekt[z].priority);
          statusArray.push(taskObjekt[z].status);
          priorityArray.push(taskObjekt[z].priority);
        }
        //console.table(priorityArray);
        statusCount();
        processPriority();
        clearArrays();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
function processPriority() {
  priorityArray.forEach((element) => {
    if (element === 'Urgent') {
      urgentCount++;
    }
  });
  includePriorityToSummery(urgentCount);
  
}
/**
 * transfer the priority status "urgent" to summery.html to dispklay an overview for
 * tasks with the "urgent" priority
 * @param {number} urgentCount
 */
function includePriorityToSummery(urgentCount) {
  let urgent = document.getElementById('task_urgent');
  urgent.innerText = urgentCount;
}
/**
 * iterate through the "statusArray" and set for each element containing the specific declaration
 *  and set the corresponding counter plus one for each target
 */
function statusCount() {
  statusArray.forEach((element) => {
    if (element === 'todo') {
      todoCount++;
    } else if (element === 'inProgress') {
      inProgressCount++;
    } else if (element === 'done') {
      doneCount++;
    } else if (element === 'awaitFeedback') {
      awaitFeedbackCount++;
    }
  });
  includeTaskCountToSummery(todoCount, inProgressCount, awaitFeedbackCount, doneCount);
  clearCounter();
}
/**
 * Transfer the actuall counts to summery.html to display an overview of all Tasks
 *
 * @param {number} todoCount
 * @param {number} inProgressCount
 * @param {number} awaitFeedbackCount
 * @param {number} doneCount
 */
function includeTaskCountToSummery(todoCount, inProgressCount, awaitFeedbackCount, doneCount) {
  let todo = document.getElementById('task_to_do');
  let inProgress = document.getElementById('task_in_progress');
  let awaitFeedback = document.getElementById('task_awaiting_feedback');
  let done = document.getElementById('task_done');
  let tasksInBoard = document.getElementById('task_in_board');
  todo.innerHTML = todoCount;
  inProgress.innerText = inProgressCount;
  awaitFeedback.innerText = awaitFeedbackCount;
  done.innerText = doneCount;
  tasksInBoard.innerText = statusArray.length;
}

/**
 * Delete used arrays to prevent an incorrect Summery Presentation
 * after reloadig the summery page
 */
function clearArrays() {
  priorityArray = [];
  statusArray = [];
}
/**
 * Set all counters to = 0 to prevent also an incorect Summery Presentation
 * after realoding the summery page
 */
function clearCounter() {
  todoCount = 0;
  inProgressCount = 0;
  awaitFeedbackCount = 0;
  doneCount = 0;
  urgentCount = 0;
}
/**
 * load full name of the logged user from local Storage and displays on Summery.html
 */
function setGreetingText() {
  let userGreeting = document.getElementById('userGreeting');
  let userName = document.getElementById('userName');
  let loggedUser = JSON.parse(localStorage.getItem('announcedUser'));
  if (loggedUser === 'Guest Guest') {
    if (userName) userName.innerText = '';
    userGreeting.innerText = getGreetingTextByHour('!');
  } else {
    userGreeting.innerText = getGreetingTextByHour(',');
    if (userName) userName.innerText = loggedUser;
  }
}

let loadBoard = () => {
  window.location.href = '/assets/html/MPA-architecture/board.html';
};

function showMainContentIfWideScreen() {
  let mainContent = document.querySelector('.main-content');
  if (window.innerWidth > 1440 && mainContent) {
    mainContent.classList.remove('d-none');
  }
}

function showGreetingMessagebyLogin() {
  if (window.innerWidth >= 1440) return;
  let mainContent = document.querySelector('.main-content');
  let showGreeting = false;

  if (isLocalStorageAvailable()) {
    showGreeting = localStorage.getItem('showGreeting') === 'true';
  } else {
    showGreeting = true;
  }
  if (showGreeting) {
    showGreetingMessage();
  } else {
    if (mainContent) mainContent.classList.remove('d-none');
  }
}

function showGreetingMessage() {
  if (window.innerWidth >= 1440) return;
  let loggedUser = JSON.parse(localStorage.getItem('announcedUser'));
  if (loggedUser === 'Guest Guest') {
    showGreetingOverlay('guest');
  } else {
    showGreetingOverlay('user', loggedUser);
  }
}

function showGreetingOverlay(type, userName = '') {
  if (window.innerWidth >= 1440) return;
  let greetingElement = document.getElementById(type === 'guest' ? 'guest-greeting' : 'user-greeting');
  let greetingText = getGreetingTextByHour(type === 'guest' ? '!' : ',');
  if (type === 'user' && userName) {
    greetingText += `<br><h1 class="user-name-greeting">${userName}</h1>`;
  }
  greetingElement.innerHTML = `<h1 class="greeting-text">${greetingText}</h1>`;
  greetingElement.classList.remove('d-none', 'hide');
  let mainContent = document.querySelector('.main-content');
  if (mainContent) mainContent.classList.remove('d-none');
  hideGreetingMessage(greetingElement);
}

function hideGreetingMessage(greetingElement) {
  setTimeout(() => {
    greetingElement.classList.add('hide');
    setTimeout(() => {
      greetingElement.classList.add('d-none');
      greetingElement.classList.remove('hide');
      localStorage.removeItem('showGreeting');
    }, 500);
  }, 3000);
}

function getGreetingTextByHour(punctuation = ',') {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return `Good morning${punctuation}`;
  if (hour >= 12 && hour < 18) return `Good afternoon${punctuation}`;
  return `Good evening${punctuation}`;
}

function isLocalStorageAvailable() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

function upcomingDeadline(){
  let deadline = document.getElementById('deadline');
  const months = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","October","November","Dezember"]; 
  const currentDate = new Date();
  const nextDeadline = new Date(currentDate);
  nextDeadline.setDate(16);
  if(nextDeadline.getTime()< currentDate.getTime()){
    nextDeadline.setMonth(nextDeadline.getMonth()+1);
  }
  let nextDeadlineMonth = months[nextDeadline.getMonth()];
  let nextDeadlineYear = nextDeadline.getFullYear();
  console.log(nextDeadline.getDate());
  console.log('nächste Dedline endet am '+nextDeadlineMonth +' 16, '+nextDeadlineYear);
  let deadlineInfo = nextDeadlineMonth+' 16, '+nextDeadlineYear;
  console.log(deadlineInfo)
  deadline.innerText = deadlineInfo;
}
