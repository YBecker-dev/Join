async function initTestBoard() {
  await pushTasksInBoard();
}

async function pushTasksInBoard() {
  let response = await fetch(BASE_URL_TASKS + 'tasks.json');
  let data = await response.json();
  if (!data) return;

  let entries = Object.entries(data);
  let section = document.querySelector('.board-tasks-section');
  section.innerHTML = '';

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
    section.appendChild(div);
  }
}

async function deleteTaskFromFirebase(taskId) {
  await fetch(BASE_URL_TASKS + 'tasks/' + taskId + '.json', {
    method: 'DELETE',
  });
  location.reload();
}
