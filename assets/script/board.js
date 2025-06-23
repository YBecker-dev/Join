let currentDraggedTaskId = null;

async function initBoard() {
  await loadContacts();
  await pushTasksInBoard();
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

function removeAllHighlights() {
  removeHighlight('todo');
  removeHighlight('inProgress');
  removeHighlight('awaitFeedback');
  removeHighlight('done');
}

if (typeof removeAllHighlights === 'function') {
  document.addEventListener('dragend', removeAllHighlights);
}

function preventBubbling(event) {
  event.stopPropagation();
}

function startDragging(taskId) {
  currentDraggedTaskId = taskId;
}

async function moveTo(newStatus) {
  if (!currentDraggedTaskId) return;
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + currentDraggedTaskId + '.json');
  let task = await response.json();
  if (!task) return;
  task.status = newStatus;
  await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + currentDraggedTaskId + '.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  await pushTasksInBoard();
  currentDraggedTaskId = null;
}

async function pushTasksInBoard() {
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json');
  let data = await response.json();
  if (!data) return;

  document.getElementById('todo').innerHTML = '';
  document.getElementById('inProgress').innerHTML = '';
  document.getElementById('awaitFeedback').innerHTML = '';
  document.getElementById('done').innerHTML = '';

  let entries = Object.entries(data);

  for (let i = 0; i < entries.length; i++) {
    let taskId = entries[i][0];
    let task = entries[i][1];

    let categoryInfo = backgroundColorTitle(task);
    let categoryText = categoryInfo.categoryText;
    let categoryClass = categoryInfo.categoryClass;

    let titleText = '';
    if (task.title) titleText = task.title;

    let descriptionText = '';
    if (task.description) descriptionText = task.description;

    let assignedContact = '';
    if (Array.isArray(task.assignedTo)) {
      for (let contactIndex = 0; contactIndex < task.assignedTo.length; contactIndex++) {
        let userId = task.assignedTo[contactIndex];
        let contact = findContactById(contacts, userId);
        if (contact) {
          let displayInitials = contact.initials;
          assignedContact += `<span class="board-contact-name" style="background-color:${contact.color}">${displayInitials}</span>`;
        }
      }
    }

    let priorityImg = showPriorityImg(task);
    let progressBar = progressBarSubtasks(task);

    let div = document.createElement('section');
    div.innerHTML = boardHtmlTemplate(
      taskId,
      categoryClass,
      categoryText,
      titleText,
      descriptionText,
      assignedContact,
      priorityImg,
      progressBar
    );
    dragandDropboard(task, div);
  }
}

function showPriorityImg(task) {
  let priorityImg = '';
  if (task.priority === 'Urgent') {
    priorityImg = '<img src="../img/icon/priority/urgent.png" alt="Urgent" class="priority-img">';
  } else if (task.priority === 'Medium') {
    priorityImg = '<img src="../img/icon/priority/medium.png" alt="Medium" class="priority-img">';
  } else if (task.priority === 'Low') {
    priorityImg = '<img src="../img/icon/priority/low.png" alt="Low" class="priority-img">';
  }
  return priorityImg;
}

function progressBarSubtasks(task) {
  let doneCount = 0;
  let totalCount = 0;
  let progressBar = '';
  if (Array.isArray(task.subtasks)) {
    totalCount = task.subtasks.length;
    for (let subtaskIndex = 0; subtaskIndex < task.subtasks.length; subtaskIndex++) {
      if (typeof task.subtasks[subtaskIndex] === 'object' && task.subtasks[subtaskIndex].done) {
        doneCount++;
      }
    }
    let percent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;
    progressBar = progressbarHtml(percent, doneCount, totalCount);
  }
  return progressBar;
}

function dragandDropboard(task, div) {
  if (task.status === 'todo') {
    document.getElementById('todo').appendChild(div);
  } else if (task.status === 'inProgress') {
    document.getElementById('inProgress').appendChild(div);
  } else if (task.status === 'awaitFeedback') {
    document.getElementById('awaitFeedback').appendChild(div);
  } else if (task.status === 'done') {
    document.getElementById('done').appendChild(div);
  }
}

async function deleteTaskFromFirebase(taskId) {
  await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json', {
    method: 'DELETE',
  });
  location.reload();
}

async function toggleBoardOverlay(taskId) {
  let overlayRef = document.getElementById('overlayBoard');
  let overlay_content = document.getElementById('overlay-content-loader');
  overlayRef.classList.toggle('d-none');

  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json');
  let task = await response.json();
  if (!task) return;

  overlay_content.innerHTML = getTaskOverlay(task, taskId);
}

function findContactById(contacts, id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return contacts[i];
    }
  }
  return null;
}

function getContactInitialsAndName(userId) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === userId) {
      return {
        initials: contacts[i].initials,
        name: contacts[i].name,
        color: contacts[i].color,
      };
    }
  }
}

function getAssignedToHTML(task) {
  let html = '';
  if (task.assignedTo && task.assignedTo.length > 0 && contacts && contacts.length > 0) {
    for (let i = 0; i < task.assignedTo.length; i++) {
      let userId = task.assignedTo[i];
      let contactData = getContactInitialsAndName(userId);
      html += contactsOverlayTemplate(contactData.initials, contactData.name, contactData.color);
    }
  }
  return html;
}

function showSubtasksInOverlay(task) {
  let html = '';
  if (task.subtasks && task.subtasks.length > 0) {
    for (let i = 0; i < task.subtasks.length; i++) {
      let subtask = task.subtasks[i];
      let title = '';
      title = subtask;
      html += overlaySubtaskHtml(title);
    }
  } else {
    html = '<p class="p-Tag">Keine Subtasks</p>';
  }
  return html;
}

function backgroundColorTitle(task) {
  let categoryText = '';
  let categoryClass = '';
  if (task.category) {
    categoryText = task.category;
    if (task.category === 'User Story') {
      categoryClass = 'category-user-story';
    } else if (task.category === 'Technical Task') {
      categoryClass = 'category-technical-task';
    }
  }
  return { categoryText: categoryText, categoryClass: categoryClass };
}
