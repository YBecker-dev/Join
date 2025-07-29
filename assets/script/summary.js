async function initSummary() {
  showMainContentIfWideScreen();
  setGreetingText();
  showGreetingMessagebyLogin();
  await checkTasks();
  initFrameworkFunctions();
  await upcomingDeadline();
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
      if (responseObject) {
        let dataBaseKey = Object.keys(responseObject);
        for (i = 0; i < dataBaseKey.length; i++) {
          taskID = dataBaseKey[0];
          taskKey = Object.keys(responseObject[taskID]);
          taskObjekt = Object.values(responseObject[taskID]);
        }
        for (z = 0; z < taskObjekt.length; z++) {
          statusArray.push(taskObjekt[z].status);
          priorityArray.push(taskObjekt[z].priority);
        }
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
/**
 * load Board.html if the User clicks a Task
 */
let loadBoard = () => {
  window.location.href = '/assets/html/board.html';
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
/**
 * display Username Or Guest at the Greeting Message at Desktpot Version
 * @returns logged User name
 */
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
/**
 * checks the availabilty of the local storage
 * @returns flase
 */
function isLocalStorageAvailable() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Sets a monthly interval on the 16th day
 */
function parseCustomDate(dateStr) {
  let parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  return null;
}

async function upcomingDeadline() {
  let deadlineElement = document.getElementById('deadline');
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json');
  let tasks = await response.json();
  let urgentTasks = [];
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  findTasksInSummary(tasks, urgentTasks, today);
  if (urgentTasks.length > 0) {
    showUrgentDate(urgentTasks, deadlineElement);
  } else {
    deadlineElement.innerText = 'No deadline';
  }
}

function findTasksInSummary(tasks, urgentTasks, today) {
  if (tasks) {
    let keys = Object.keys(tasks);
    for (let i = 0; i < keys.length; i++) {
      let task = tasks[keys[i]];
      if (task.priority === 'Urgent' && task.date) {
        let taskDate = parseCustomDate(task.date);
        if (!taskDate) taskDate.setHours(0, 0, 0, 0);
        if (taskDate >= today) {
          urgentTasks.push(taskDate);
        }
      }
    }
  }
}

function showUrgentDate(urgentTasks, deadlineElement) {
  urgentTasks.sort((a, b) => a - b);
  let nextDeadline = urgentTasks[0];
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  deadlineElement.innerText = nextDeadline.toLocaleDateString('en-US', options);
}
