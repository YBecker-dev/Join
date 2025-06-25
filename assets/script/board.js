let currentDraggedTaskId = null;

async function initBoard() {
  await loadContacts();
  await pushTasksInBoard();
  document.addEventListener('dragend', removeAllHighlights);
  emptyDragArea();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function toggleHighlight(id, add) {
  let element = document.getElementById(id);
  if (!element) return;
  if (add) {
    element.classList.add('drag-area-highlight');
  } else {
    element.classList.remove('drag-area-highlight');
  }
}

function removeAllHighlights() {
  toggleHighlight('todo', false);
  toggleHighlight('inProgress', false);
  toggleHighlight('awaitFeedback', false);
  toggleHighlight('done', false);
}

function preventBubbling(event) {
  event.stopPropagation();
}

function startDragging(taskId) {
  currentDraggedTaskId = taskId;
  
}

function emptyDragArea(){
  let noTaskText;
  let doneArea = document.getElementById('done');
  let awaitFeedbackArea = document.getElementById('awaitFeedback');
  let inProgressArea = document.getElementById('inProgress');
  let todoArea = document.getElementById('todo');
  if(doneArea.childElementCount === 0){
    noTaskText = 'Done';
    doneArea.innerHTML = getEmptyDragArea(noTaskText);
  }if(awaitFeedbackArea.childElementCount === 0){
    noTaskText = 'Await feedback';
    awaitFeedbackArea.innerHTML = getEmptyDragArea(noTaskText);
  }if(inProgressArea.childElementCount === 0){
    noTaskText = 'In progress';
    inProgressArea.innerHTML = getEmptyDragArea(noTaskText);
  }if(todoArea.childElementCount === 0){
    noTaskText = 'To do';
    todoArea.innerHTML = getEmptyDragArea(noTaskText);
  }
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
  emptyDragArea();
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
    enableDragAndDropBoard(task, div);
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
      if (task.subtasks[subtaskIndex].status === 'checked') {
        doneCount++;
      }
    }
    let percent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;
    progressBar = progressbarHtml(percent, doneCount, totalCount);
  }
  return progressBar;
}

function enableDragAndDropBoard(task, div) {
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
  toggleOverlay(overlayRef);

  overlayRef.classList.remove('d-none');
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json');
  let task = await response.json();
  if (!task) return;
  overlay_content.innerHTML = getTaskOverlay(task, taskId);

  overlayRef.classList.add('visible');
  let contentRender = overlayRef.querySelector('.overlay-content-render');
  if (contentRender) {
    contentRender.classList.add('show');
  }
}

function findContactById(contacts, id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      return contacts[i];
    }
  }
  return null;
}

function toggleOverlay(overlayRef) {
  if (!overlayRef.classList.contains('d-none')) {
    let contentRender = overlayRef.querySelector('.overlay-content-render');
    if (contentRender) {
      contentRender.classList.remove('show');
      contentRender.classList.add('hide');
      overlayRef.classList.remove('visible');
      setTimeout(() => {
        overlayRef.classList.add('d-none');
        contentRender.classList.remove('hide');
      }, 200);
    } else {
      overlayRef.classList.remove('visible');
      overlayRef.classList.add('d-none');
    }
    return;
  }
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

function showSubtasksInOverlay(task, taskId) {
  let html = '';
  let subtasks = task.subtasks;
  if (subtasks && !Array.isArray(subtasks)) {
    subtasks = Object.values(subtasks);
  }
  if (subtasks && subtasks.length > 0) {
    for (let i = 0; i < subtasks.length; i++) {
      let subtask = subtasks[i];
      let text = subtask && subtask.text !== undefined ? subtask.text : subtask;
      let status = subtask && subtask.status !== undefined ? subtask.status : 'unchecked';
      html += overlaySubtaskHtml({ text, status }, i, taskId);
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

async function editTask(taskId) {
  let overlay_content = document.getElementById('overlay-content-loader');
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json');
  let task = await response.json();
  if (!task) return;

  overlay_content.innerHTML = `
    <div class="overlay-section">
    <div class="overlay-header-edit">
     <img class="close-icon" src="../img/icon/close.png" alt="Close" onclick="toggleBoardOverlay('${taskId}')" />
     </div>
    <form id="edit-task-form" onsubmit="saveEditedTask(event, '${taskId}'); return false;">
      <div class="input-group edittask add-task">
        <span>Title</span>
        <input id="edit-title" type="text" value="${task.title || ''}" required>
      </div>
      <div class="input-group edittask add-task">
        <span>Description</span>
        <textarea id="edit-description" name="add-task-textarea" placeholder="Enter a Description">${
          task.description || ''
        }</textarea>
        <span class="input-icon-edit">
          <img src="../img/icon/add_task_icon/textarea.png" alt="" />
        </span>
      </div>
      <div class="input-group edittask add-task date">
        <span>Due Date <span class="required-star">*</span></span>
        <div class="date-input-container date-input-edit">
          <input id="edit-date" type="date" value="${task.date || ''}"/>
          <span>
            <img class="date-icon-edit" src="../img/icon/add_task_icon/event.png" alt="" />
          </span>
        </div>
      </div>
      <div class="priority priority-edit">
        <span>Priority</span>
        <div class="priority-buttons priority-buttons-edit">
          <button type="button" id="edit-urgent" class="add-task-button${
            task.priority === 'Urgent' ? ' active urgent' : ''
          }" onclick="togglePriority('Urgent', 'edit-');">
            Urgent <img src="../img/icon/priority/urgent.png" alt="" />
          </button>
          <button type="button" id="edit-medium" class="add-task-button${
            task.priority === 'Medium' ? ' active medium' : ''
          }" onclick="togglePriority('Medium', 'edit-');">
            Medium <img src="../img/icon/priority/medium.png" alt="" />
          </button>
          <button type="button" id="edit-low" class="add-task-button${
            task.priority === 'Low' ? ' active low' : ''
          }" onclick="togglePriority('Low', 'edit-');">
            Low <img src="../img/icon/priority/low.png" alt="" />
          </button>
        </div>
      </div>
      <div class="add-task">
       <span>Assigned to</span>
       <div id="assigned-to-dropdown">
         <div id="assigned-to-dropdown-selected" class="assigned-to-dropdown-selected-edit" onclick="assignedToDropdown(this.value); eventBubbling(event)">
           <input
             id="add-task-input3"
             name="add-task-input3"
             type="text"
             placeholder="Select a contact"
             oninput="assignedToDropdown(this.value)"
             onclick="openDropdown();"/>
           <div class="assigned-arrow" onclick="toggleDropdown('assigned-to-dropdown-options', 'assigned-to-arrow')">
             <img class="hover-icon" id="assigned-to-arrow" src="../img/icon/add_task_icon/dropdown_menu/arrow_drop_downaa.png" alt=""/>
           </div>
         </div>
         <div id="assigned-to-dropdown-options" class="hidden custom-dropdown-options custom-dropdown-options-edit" onclick="eventBubbling(event)">
         </div>
         <div class="show-contacts-add-task show-contacts-add-task-edit" id="show-contacts-add-task"></div>
       </div>
      </div>
      <div class="input-group edittask add-task subtask-edit">
        <span>Subtasks</span>
        <input class="add-task-input-edit"
          id="add-task-input4"
          oninput="onSubtaskInputChange()"
          onkeydown="onSubtaskInputKeydown(event)"
          name="add-task-input4"
          type="text"
          placeholder="Add new subtask"
          value=""
        />
        <span class="subtasks-icon" id="subtasks-icon">
          <img
            class="hover-icon"
            src="../img/icon/add_task_icon/plus.png"
            alt="Add"
            onclick="pushSubtaskInput(event)"
          />
        </span>
      </div>
      <div id="subtasks-container" class="subtasks-container"></div>
    </form>
    <div class="create-clear-buttons-edit">
      <button type="submit" class="create-button" form="edit-task-form">Save</button>
    </div>
  `;

  let subtasksContainer = document.getElementById('subtasks-container');
  subtasksContainer.innerHTML = '';
  if (task.subtasks && Array.isArray(task.subtasks)) {
    task.subtasks.forEach((subtask) => {
      const text = subtask.text !== undefined ? subtask.text : subtask;
      const checked = subtask.status === 'checked';
      subtasksContainer.innerHTML += pushSubtaskInputHTML(text, checked);
    });
  }

  selectedContacts = [];
  if (task.assignedTo && Array.isArray(task.assignedTo)) {
    for (let i = 0; i < contacts.length; i++) {
      if (task.assignedTo.includes(contacts[i].id)) {
        selectedContacts.push(i);
      }
    }
  }
  showContactsAddTask();
  let input = document.getElementById('add-task-input3');
  if (input) input.value = '';
}

async function saveEditedTask(event, taskId) {
  event.preventDefault();
  let title = document.getElementById('edit-title').value.trim();
  let description = document.getElementById('edit-description').value.trim();
  let date = document.getElementById('edit-date').value;
  let priority = '';
  if (document.getElementById('edit-urgent').classList.contains('active')) priority = 'Urgent';
  if (document.getElementById('edit-medium').classList.contains('active')) priority = 'Medium';
  if (document.getElementById('edit-low').classList.contains('active')) priority = 'Low';

  let assignedTo = [];
  for (let i = 0; i < selectedContacts.length; i++) {
    assignedTo.push(contacts[selectedContacts[i]].id);
  }

  let subtasks = [];
  document.querySelectorAll('#subtasks-container .subtask-item').forEach((item) => {
    const text = item.querySelector('li').textContent.trim();
    const checkbox = item.querySelector('input[type="checkbox"]');
    subtasks.push({
      text: text,
      status: checkbox && checkbox.checked ? 'checked' : 'unchecked',
    });
  });

  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json');
  let oldTask = await response.json();
  let status = oldTask.status || 'todo';
  let category = oldTask.category || '';

  let updatedTask = {
    title,
    description,
    date,
    priority,
    assignedTo,
    subtasks,
    status,
    category,
  };

  await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });

  toggleBoardOverlay(taskId);
  await pushTasksInBoard();
  return false;
}

async function toggleSubtaskDone(taskId, subtaskIndex) {
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json');
  let task = await response.json();
  let subtask = task.subtasks[subtaskIndex];
  if (subtask.status === undefined) {
    subtask.status = 'unchecked';
  }
  subtask.status = subtask.status === 'checked' ? 'unchecked' : 'checked';

  await fetch(BASE_URL_TASKS_AND_USERS + 'tasks/' + taskId + '.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  await pushTasksInBoard();
}


async function openCreateTask() {
  let response = await fetch('../html/add_task.html');
  let html = await response.text();
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  let clearBtn = tempDiv.querySelector('.clear-button');
  if (clearBtn) {
    let cancelBtnHtml = `<button type="button" class="cancel-button" onclick="closeCreateTask()">Cancel <img src="../img/icon/close.png" alt="" class=""></button>`;
    clearBtn.outerHTML = cancelBtnHtml;
  }

  let contentSpace = tempDiv.querySelector('.contentspace-html');
  if (contentSpace) {
    contentSpace.classList.add('content-add-task');
  }
  let overlayBg = document.getElementById('overlay-add-task');
  let overlayContent = document.getElementById('add-task-overlay-content');
  overlayContent.innerHTML =
    `<img onclick="closeCreateTask()" src="../img/icon/close.png" alt="" class="close-overlay-x">` + tempDiv.innerHTML;
  animatedOpeningAddTask(overlayBg, overlayContent);
}

function closeCreateTask() {
  let overlayBg = document.getElementById('overlay-add-task');
  let overlayContent = document.getElementById('add-task-overlay-content');
  overlayContent.classList.remove('show');
  overlayContent.classList.add('hide');
  overlayBg.classList.remove('visible');
  setTimeout(() => {
    overlayBg.classList.add('d-none');
    overlayContent.innerHTML = '';
    overlayContent.classList.remove('hide');
  }, 300);
}

function animatedOpeningAddTask(overlayBg, overlayContent) {
  overlayBg.classList.remove('d-none');
  overlayBg.classList.remove('visible');
  overlayContent.classList.remove('show', 'hide');
  setTimeout(() => {
    overlayBg.classList.add('visible');
    overlayContent.classList.add('show');
  }, 10);
}
