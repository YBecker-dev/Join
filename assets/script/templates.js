function getTaskOverlay(task, taskId, trueTaskId) {
  let categoryInfo = backgroundColorTitle(task);
  let categoryText = categoryInfo.categoryText;
  let categoryClass = categoryInfo.categoryClass;

  return `
    <div class="overlay-position" id="${trueTaskId}">
      <div class="overlay-header">
        <div class="task-type">
        <p class="p-Tag ${categoryClass}">${categoryText}</p>
        </div>
        <div class="close-icon" onclick="toggleBoardOverlay()">
          <!--<img src="../img/icon/close.png" >-->
          <img src="/assets/img/icon/close.png" >
        </div>                
      </div>
      <img src="/assets/img/icon/move-to.png" id="DropDownBtn" class="moveTo" onclick="showDropDown(${trueTaskId})">
      <div class="task-overlay d-none" id="drop-down" onclick="showDropDown(${trueTaskId})">  
        <section class="selection " onclick="preventBubbling(event)">
          <div onclick="changeTaskStatusMobilToDo(${trueTaskId}, '${taskId}')" id="todo-mobil-${trueTaskId}" class="option ">To Do</div>
          <div onclick="changeTaskStatusMobilInProgress(${trueTaskId}, '${taskId}')" id="inProgress-mobil-${trueTaskId}" class="option">In Progress</div>
          <div onclick="changeTaskStatusMobilAwaitFeedback(${trueTaskId}, '${taskId}')" id="awaitFeedback-mobil-${trueTaskId}" class="option">Await Feetback</div>
          <div onclick="changeTaskStatusMobilDone(${trueTaskId}, '${taskId}')" id="done-mobil-${trueTaskId}" class="option">Done</div>
        </section>
      </div>
      <div class="overlay-titel">
        <h1>${task.title || ''}</h1>
      </div>
      <div class="overlay-description-flex${!task.description ? ' d-none' : ''}">
        <p class="p-Tag text-allign">${task.description || ''}</p>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag">Due date:</p>
        <p class="p-Tag">${task.date || ''}</p>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag">Priority:</p>
        <div class="overlay-priority">
          ${overlayPriority(task)}
        </div>
      </div>
      <div class="assigned-to">
        <p class="p-Tag">Assigned To:</p>
        <div class="overlay-peoples">
            ${getAssignedContactsHtml(task, 'overlay')}
        </div>
      </div>
      <div class="overlay-subtasks">
        <p class="p-Tag">Subtasks:</p>
        ${showSubtasksInOverlay(task, taskId)}
      </div>
      <div class="overlay-edit-wrapper">
        <div class="overlay-edit">
          <div class="overlay-edit-content">
            <div class="trashImg" onclick="deleteTaskFromFirebase('${task.addTaskId}'); toggleBoardOverlay()">
             <img src="../img/icon/trash.png" alt="trash">
             <p class="p-Tag">Delete</p>
           </div>
          </div>
          <div class="overlay-seperator"></div>
          <div class="overlay-edit-content">
            <div class="editImg" onclick="editTask('${taskId}')">
              <img src="../img/icon/add_task_icon/subtasks/edit.png" alt="edit">
              <p class="p-Tag">Edit</p>
            </div>
          </div>
        </div>
      </div>    
    </div>
  `;
}

function getInnerTaskOverlay() {
  return `
        <div class="help-mobil" onclick="window.location.href='/assets/html/MPA-architecture/help.html'" id="help-mobil">
          <p>Help</p>
        </div>
        <div class="section1" onclick="window.location.href='/assets/html/MPA-architecture/legal-notice_MPA.html'"  id="legalNotice">
            <p> Legal Notice</p>
        </div>
        <div class="section1" onclick="window.location.href='/assets/html/MPA-architecture/privacy-policy_MPA.html'"  id="privacyPolicy">
            <p>Privacy Policy</p>
        </div>
        <div class="section1" onclick="handleLogOut(event)"  id="logOut">
            <a href="/index.html">Log out</a>
        </div>
  
  `;
}

function contactsOverlayTemplate(initials, name, color) {
  return `
        <div class="peoples-info">
          <div class="initials" style="background-color: ${color};">
            <p class="p-Tag">${initials}</p>
          </div>
          <div class="people-name">
            <p class="p-Tag">${name}</p>
          </div>
        </div>
      `;
}

function overlaySubtaskHtml(subtask, subtaskIndex, taskId) {
  return `
    <div class="subtask-info subtask-item">
      <div class="overlay-checkbox">
       <input class="checkbox" type="checkbox" ${
         subtask.status === 'checked' ? 'checked' : ''
       } onchange="toggleSubtaskDone('${taskId}', ${subtaskIndex})"/>
      </div>
      <div class="task-description">
        <li class="p-Tag">${subtask.text}</li>
      </div>
    </div>`;
}

function getLogOutMenu() {
  return `
      <div class="help-mobil" onclick="window.location.href='/assets/html/help.html'" id="help-mobil">
          <p>Help</p>
      </div>
      <div class="section1" onclick="window.location.href='/assets/html/legal-notice_internal.html'"  id="legalNotice">
          <p> Legal Notice</p>
      </div>
      <div class="section1" onclick="window.location.href='/assets/html/privacy-policy_internal.html'"  id="privacyPolicy">
          <p>Privacy Policy</p>
      </div>
      <div class="section1" onclick="handleLogOut(event)"  id="logOut">
          <a href="/index.html">Log out</a>
      </div>
    `;
}
let trueTaskId;

function boardHtmlTemplate(
  taskId,
  categoryClass,
  categoryText,
  titleText,
  descriptionText,
  assignedContact,
  priorityImg,
  progressBar,
  addTaskId
) {
  trueTaskId = addTaskId;
  return `
    <div class="board-task-container rotateTask" id="task-${addTaskId}"  onclick="toggleBoardOverlay('${taskId}','${trueTaskId}')" ondragstart="startDragging('${taskId}')" draggable="true"> 
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
      </div>
      </div>
    `;
}

function progressbarHtml(percent, doneCount, totalCount) {
  return `
    <div class="board-task-subtasks-row">
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percent}%;"></div>
      </div>
      <span class="progress-bar-text">${doneCount}/${totalCount} Subtasks</span>
      <span class="subtask-tooltip">${doneCount} von ${totalCount} Subtask${totalCount === 1 ? '' : 's'} erledigt</span>
    </div>
  `;
}

function pushSubtaskInputHTML(text) {
  return `
    <div class="subtask-item">
      <span><li>${text}</li></span>
      <div class="subtask-actions">
        <img src="../img/icon/add_task_icon/subtasks/edit.png" onclick="editSubtask(this)" />
        <div class="subtask-wrapper"></div>
        <img src="../img/icon/add_task_icon/subtasks/delete.png" onclick="deleteSubtask(this)" />
      </div>
    </div>
  `;
}

function editSubtaskInputHTML(oldText) {
  return `
<div class="input-with-icons">
  <input id="subtask-edit-input" type="text" class="edit-subtask-input input-border-none" value="${oldText}"
         onkeydown="saveSubtaskEdit(event, this)">
  <img class="hover-icon" onclick="deleteSubtask(this)" src="../img/icon/add_task_icon/subtasks/delete.png">
  <div class="subtask-wrapper-edit"></div>
  <img class="hover-icon" onclick="saveSubtaskEdit(event, this)" src="../img/icon/add_task_icon/subtasks/check.png">
</div>
  `;
}

function showSaveCancelIconsHtml() {
  return `
      <img class="hover-icon" src="../img/icon/add_task_icon/subtasks/clear.png" onclick="clearSubtaskInput()">
      <div class="subtask-wrapper"></div>
      <img class="hover-icon" id="submit-subtask" onclick="pushSubtaskInput(event)" src="../img/icon/add_task_icon/subtasks/check.png">
    `;
}

function saveSubtaskEditHTML(newText) {
  return `
    <span><li>${newText}</li></span>
    <div class="subtask-actions">
      <img src="../img/icon/add_task_icon/subtasks/edit.png" onclick="editSubtask(this)" />
      <div class="subtask-wrapper"></div>
      <img src="../img/icon/add_task_icon/subtasks/delete.png" onclick="deleteSubtask(this)" />
    </div>
  `;
}

function assignedToDropdownHTML(contacts, i, checked) {
  let isChecked = checked === 'checked';
  let checkedClass = isChecked ? 'checked-assigned-to' : '';
  return `
    <div class="assigned-contacts ${checkedClass}" id="assigned-contact-${i}" onclick="onContactCheckboxClick(${i}, this)">
      <div class="user-dropdown ${checkedClass}" id="user-dropdown-${i}">
        <div class="user-name-dropdown ${checkedClass}" style="background-color: ${contacts[i].color} !important;">
          <span>${contacts[i].initials}</span>
        </div>
        <div id="user-name-dropdown-${i}" class="user-name-label ${checkedClass}">
          <p>${contacts[i].name}</p>
        </div>
      </div>
      <div>
        <input type="checkbox" class="checkbox dropdown-checkbox" ${checked} onclick="eventBubbling(event); onContactCheckboxClick(${i}, this)">
      </div>
    </div>
  `;
}

function getEmptyDragArea(noTaskText) {
  return `
    <div class="empty-task-box">
      <span class="no-task-text">No task ${noTaskText}</span>
    </div>
  `;
}

function noteNoTaskFounded() {
  return `
    <div class="no-result">
        <h3>Keine Ergebnisse gefunden</h3>
    </div>
  `;
}
function overlayPriority(task) {
  if (task.priority) {
    return `
      <p class="p-Tag padding-priority">
        <img src="/assets/img/icon/priority/${task.priority.toLowerCase()}.png" alt="">
      </p>
    `;
  } else {
    return `<p class="p-Tag padding-priority">-</p>`;
  }
}

function showContactsAddTaskHtml(contact) {
  return `
    <div class="contact-items" style="background-color:${contact.color};">
      <span class="initials-span">${contact.initials}</span>
    </div>
  `;
}

function editTaskHtml(task, taskId) {
  return `
    <div class="overlay-section">
    <div class="overlay-header-edit">
     <img class="close-icon" src="/assets/img/icon/close.png" alt="Close" onclick="toggleBoardOverlay('${taskId}')" />
     </div>
    <form id="edit-task-form" onsubmit="saveEditedTask(event, '${taskId}'); return false;">
      <div class="input-group edittask add-task">
        <span>Title</span>
        <input onclick="showError('add-task-input1-warning', 'edit-title')" oninput="showError('add-task-input1-warning', 'edit-title');" id="edit-title" type="text" value="${
          task.title || ''
        }" required>
        <span id="add-task-input1-warning" class="input-warning d-none">This field is required</span>
      </div>
      <div class="input-group edittask add-task">
        <span>Description</span>
        <div class="input-textarea-edit">
          <textarea id="edit-description" name="add-task-textarea" placeholder="Enter a Description">${
            task.description || ''
          }</textarea>
          <span class="input-icon-edit">
            <img src="/assets/img/icon/add_task_icon/textarea.png" alt="" />
          </span>
        </div>
      </div>
      <div class="input-group edittask add-task date">
        <span>Due Date <span class="required-star">*</span></span>
        <div class="date-input-container date-input-edit">
          <input id="edit-date" type="text" placeholder="DD/MM/YYYY" min="" max="31/12/2035" name="add-task-input2" onclick="showError('add-task-input2-warning', 'edit-date')" oninput="showError('add-task-input2-warning', 'edit-date'); sanitizeAndValidateDate(this)"
            value="${task.date || ''}"/>
          <span>
            <img class="date-icon-edit" src="/assets/img/icon/add_task_icon/event.png" alt="" />
          </span>
        </div>
        <span id="add-task-input2-warning" class="input-warning d-none">This field is required</span>
      </div>
      <div class="priority priority-edit">
        <span>Priority</span>
        <div class="priority-buttons priority-buttons-edit">
          <button type="button" id="edit-urgent" class="add-task-button${
            task.priority === 'Urgent' ? ' active urgent' : ''
          }" onclick="togglePriority('Urgent', 'edit-');">
            Urgent <img src="/assets/img/icon/priority/urgent.png" alt="" />
          </button>
          <button type="button" id="edit-medium" class="add-task-button${
            task.priority === 'Medium' ? ' active medium' : ''
          }" onclick="togglePriority('Medium', 'edit-');">
            Medium <img src="/assets/img/icon/priority/medium.png" alt="" />
          </button>
          <button type="button" id="edit-low" class="add-task-button${
            task.priority === 'Low' ? ' active low' : ''
          }" onclick="togglePriority('Low', 'edit-');">
            Low <img src="/assets/img/icon/priority/low.png" alt="" />
          </button>
        </div>
      </div>
      <div class="add-task">
       <span>Assigned to</span>
       <div id="assigned-to-dropdown">
        <div id="assigned-to-dropdown-selected" onclick="eventBubbling(event)">
          <input
            id="add-task-input3" name="add-task-input3" type="text" placeholder="Select a contact"  oninput="assignedToDropdown(this.value)" onclick="handleDropdown('assigned-to-dropdown-options', 'assigned-to-arrow', 'open'); assignedToDropdown(this.value)">
          <div
            class="assigned-arrow" onclick="handleDropdown('assigned-to-dropdown-options', 'assigned-to-arrow', 'toggle'); assignedToDropdown(document.getElementById('add-task-input3').value);">
            <img
              class="hover-icon" id="assigned-to-arrow" src="/assets/img/icon/add_task_icon/dropdown_menu/arrow_drop_downaa.png" alt="">
          </div>
         </div>
         <div id="assigned-to-dropdown-options" class="hidden custom-dropdown-options custom-dropdown-options-edit" onclick="eventBubbling(event)">
         </div>
         <div class="show-contacts-add-task" id="show-contacts-add-task"></div>
       </div>
      </div>
      <div class="input-group edittask add-task subtask-edit">
        <span>Subtasks</span>
        <div class="subtask-edit-container">
          <input class="add-task-input-edit"
            id="add-task-input4"
            oninput="onSubtaskInputChange()"
            onkeydown="onSubtaskInputKeydown(event)"
            name="add-task-input4"
            type="text"
            placeholder="Add new subtask"/>
          <span class="subtasks-icon" id="subtasks-icon">
            <img
              class="hover-icon"
              src="/assets/img/icon/add_task_icon/plus.png"
              alt="Add"
              onclick="pushSubtaskInput(event)"/>
          </span>
        </div>
      </div>
      <div id="subtasks-container" class="subtasks-container"></div>
    </form>
    <div class="create-clear-buttons-edit">
      <button type="submit" class="ok-button" form="edit-task-form">OK <img src="/assets/img/icon/add_task_icon/buttons/create_task.png" /></button>
    </div>
  `;
}
