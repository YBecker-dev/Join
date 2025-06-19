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
    if (task.category) {
      categoryText = task.category;
    }
    let titleText = '';
    if (task.title) {
      titleText = task.title;
    }
    let descriptionText = '';
    if (task.description) {
      descriptionText = task.description;
    }
    let subtasksText = '';
    if (Array.isArray(task.subtasks)) {
      for (let j = 0; j < task.subtasks.length; j++) {
        subtasksText += '- ' + task.subtasks[j] + '<br>';
      }
    }
    let assignedText = '';
    if (Array.isArray(task.assignedTo)) {
      assignedText = task.assignedTo.join(', ');
    }
    let priorityText = '';
    if (task.priority) {
      priorityText = task.priority;
    }
    let div = document.createElement('div');
    div.className = 'board-task-container';
    div.innerHTML = `
      <div class="board-tasks">
        <p class="board-task-category">${categoryText}</p>
        <div class="board-tasks-title-description">
          <p class="board-task-title">${titleText}</p>
          <p class="board-task-description">${descriptionText}</p>
        </div>
        <p class="board-task-subtasks">${subtasksText}</p>
        <p class="board-task-assigned-priority">${assignedText} / ${priorityText}</p>
        <button onclick="deleteTaskFromFirebase('${taskId}')">delete</button>
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
