let currentDraggedTaskId = null;

async function initBoard() {
  await pushTasksInBoard();
}

function toggleBoardOverlay() {
  let overlayRef = document.getElementById('overlayBoard');
  let overlay_content = document.getElementById('overlay-content-loader');
  overlayRef.classList.toggle('d-none');
  if (!overlayRef.classList.contains('d-none')) {
    overlay_content.innerHTML = getTaskOverlay();
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

function preventBubbling(event) {
  event.stopPropagation();
}

async function pushTasksInBoard() {
  let response = await fetch(BASE_URL_TASKS + 'tasks.json');
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

    let titleText = '';
    if (task.title) titleText = task.title;

    let descriptionText = '';
    if (task.description) descriptionText = task.description;

    let assignedContact = '';
    if (Array.isArray(task.assignedTo)) {
      for (let contactIndex = 0; contactIndex < task.assignedTo.length; contactIndex++) {
        let name = task.assignedTo[contactIndex];
        assignedContact += `<span class="board-contact-name">${name}</span>`;
      }
    }

    let priorityImg = '';
    if (task.priority === 'Urgent') {
      priorityImg = '<img src="../img/icon/priority/urgent.png" alt="Urgent" class="priority-img">';
    } else if (task.priority === 'Medium') {
      priorityImg = '<img src="../img/icon/priority/medium.png" alt="Medium" class="priority-img">';
    } else if (task.priority === 'Low') {
      priorityImg = '<img src="../img/icon/priority/low.png" alt="Low" class="priority-img">';
    }

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
      progressBar = `
    <div class="board-task-subtasks-row">
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percent}%;"></div>
      </div>
      <span class="progress-bar-text">${doneCount}/${totalCount} Subtasks</span>
    </div>
  `;
    }

    let div = document.createElement('div');
    div.className = 'board-task-container';
    div.onclick = toggleBoardOverlay;
    div.draggable = true;
    div.ondragstart = function () {
      startDragging(taskId);
    };
    div.innerHTML = `
      <div class="board-tasks">
    <p class="${categoryClass}">${categoryText}</p>
        <div class="board-tasks-title-description">
          <p class="board-task-title">${titleText}</p>
          <p class="board-task-description">${descriptionText}</p>
        </div>
        <div class="board-task-subtasks">${progressBar}</div>
        <div class="board-task-assigned-priority">
          <div class="board-task-assigned-contact">${assignedContact}</div>
          ${priorityImg}
        </div>
        <button onclick="deleteTaskFromFirebase('${taskId}')">test delete</button>
      </div>
    `;

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
}

async function deleteTaskFromFirebase(taskId) {
  await fetch(BASE_URL_TASKS + 'tasks/' + taskId + '.json', {
    method: 'DELETE',
  });
  location.reload();
}

function startDragging(taskId) {
  currentDraggedTaskId = taskId;
}

async function moveTo(newStatus) {
  if (!currentDraggedTaskId) return;
  let response = await fetch(BASE_URL_TASKS + 'tasks/' + currentDraggedTaskId + '.json');
  let task = await response.json();
  if (!task) return;
  task.status = newStatus;
  await fetch(BASE_URL_TASKS + 'tasks/' + currentDraggedTaskId + '.json', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  await pushTasksInBoard();
  currentDraggedTaskId = null;
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