// Contact Overview
function getNoteTemplateContact(index) {
  let user = myContacts[index];

  return  ` <div onclick="openDetails(${index}), event.stopPropagation()" class="person">
              <p class="initial">${user.color, user.initials}</p>
              <div>
                <h4>${user.name}</h4>
                <p>
                  <a class="mail">${user.email}</a>
                </p>
              </div>
            </div>`;
}

function getNoteTemplateContactDetails(indexDetails) {
  let user = myContacts[indexDetails];

  return  ` <div class="namesDetails">
              <div class="contactInformations">
                <p class="initialOverlay">${user.color, user.initials}</p>
                <div>
                  <h3 class="infoNames">${user.name}</h3>
                  <div class="contactIcons">
                    <div id="editOverlay" onclick="openEditOverlay(${indexDetails})">
                      <img class="editIcon" src="../img/icon/edit.png" alt="pencil">
                      <span class="editText">edit</span>
                    </div>
                    <div onclick="deleteContact(${indexDetails})">
                      <img class="editIcon" src="../img/icon/trash.png" alt="wastebasket">
                      <span class="editText">delete</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="infoBlock">
                <p>Contact Information</p>
                <h4>Email</h4>
                <a class="mail" href="mailto:${user.email}">${user.email}</a>
                <h4>Phone</h4>
                <a class="phone" href="tel:${user.phone}">${user.phone}</a>
              </div>
            </div>`;
}

// add new Contact 
function getNoteTemplateAddNewContact() {

  return `<div class="newContactOverlay" onclick="event.stopPropagation()">
            <div class="headDiv">
              <img class="contactLogo" src="../img/Logo/Logo_white.png" alt="Logo_white">
              <p class="addHeadline">Add contact</p>
              <p class="addTastText">Tasks are better with a team!</p>
              <div class="line"></div>
            </div>
            <div class="editDiv">
              <div class="closeDiv">
                <img onclick="closeOverlay()" class="close" src="../img/icon/close.png" alt="Close-Button">
              </div>        
              <div class="profilDiv">
                <div>
                  <p id="newContactInitials" class="profileInitials"><img class="profileImg" src="../img/icon/profile.png" alt="profile Image"></p>
                </div>
                <div>
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input id="newContactName" class="addNewContact" type="text" placeholder="Name" required onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/person.png" alt="Person Icon">
                  </div> 
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input id="newContactMail" class="addNewContact" type="email" placeholder="Email" required onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/mail.png" alt="Email Icon">
                  </div> 
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input id="newContactPhone" class="addNewContact" type="tel" placeholder="Phone" required onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/phone.png" alt="phone Icon">
                  </div> 
                </div>           
              </div>
              <div class="accept">
                <button onclick="closeOverlay()" class="clear-button">Cancel<img class="save-close" src="../img/icon/close.png" alt="Close-Button"></button>
                <button onclick="saveToLocalstorage()" class="create-button">Create contact<img class="save-close" src="../img/icon/save.png" alt="saveIcon"></button>
              </div>
            </div>
          </div>`;
}

// edit Contact
function getNoteTemplateEditContact(index) {
  let user = myContacts[index] || {};

  return `  <div class="editContactOverlay" onclick="event.stopPropagation()">
              <div class="headDiv">
                <img class="contactLogo" src="../img/Logo/Logo_white.png" alt="Logo_white">
                <p class="addHeadline">Edit contact</p>
                <div class="line"></div>
              </div>
              <div class="editDiv">
                <div class="closeDiv">
                  <img onclick="closeOverlay()" class="close" src="../img/icon/close.png" alt="Close-Button">
                </div>           
                <div class="profilDiv">
                  <div>
                    <p id="editContactInitials" class="profileInitials">${user.color, user.initials}</p>
                  </div>
                  <div>
                    <div class="addNewContactDiv" onclick="event.stopPropagation()">
                      <input id="editContactName" class="addNewContact" value="${user.name}" required onclick="event.stopPropagation()">
                      <img class="addNewContactIcon" src="../img/icon/person.png" alt="Person Icon">
                    </div> 
                    <div class="addNewContactDiv" onclick="event.stopPropagation()">
                      <input id="editContactMail" class="addNewContact" type="email" value="${user.email}" required onclick="event.stopPropagation()">
                      <img class="addNewContactIcon" src="../img/icon/mail.png" alt="Email Icon">
                    </div> 
                    <div class="addNewContactDiv" onclick="event.stopPropagation()">
                      <input id="editContactPhone" class="addNewContact" type="tel" value="${user.phone}" required onclick="event.stopPropagation()">
                      <img class="addNewContactIcon" src="../img/icon/phone.png" alt="phone Icon">
                    </div>               
                  </div>                 
                </div>
                <div class="accept">
                  <button onclick="deleteContact(${index})" class="clear-button">Delete</button>
                  <button onclick="updateContact(${index})" class="create-button">Save Changes<img class="save-close" src="../img/icon/save.png" alt="hookIcon"></button>
                </div>
              </div> 
            </div>`;
}

function getTaskOverlay(task, taskId) {
  let categoryInfo = backgroundColorTitle(task);
  let categoryText = categoryInfo.categoryText;
  let categoryClass = categoryInfo.categoryClass;

  return `
    <div class="overlay-position">
      <div class="overlay-header">
        <div class="task-type">
        <p class="p-Tag ${categoryClass}">${categoryText}</p>
        </div>
        <div class="close-icon" onclick="toggleBoardOverlay()">
          <img src="../img/icon/close.png" >
        </div>                
      </div>
      <div class="overlay-titel">
        <h1>${task.title || ''}</h1>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag text-allign">${task.description || ''}</p>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag">Due date:</p>
        <p class="p-Tag">${task.date || ''}</p>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag">Priority:</p>
        <div class="overlay-priority">
          <p class="p-Tag padding-priority">${task.priority || ''} <img src="../img/icon/priority/${task.priority}.png" alt=""></p>
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
            <div class="trashImg"  onclick="deleteTaskFromFirebase(${task.addTaskId}); toggleBoardOverlay()">
              <img src="../img/icon/trash.png" alt="trash">
              <p class="p-Tag">Delete</p>
            </div>
          </div>
          <div class="overlay-seperator"></div>
          <div class="overlay-edit-content">
            <div class="editImg" onclick="editTask('${taskId}')">
              <img src="../img/icon/edit.png" alt="edit">
              <p class="p-Tag">Edit</p>
            </div>
          </div>
        </div>
      </div>    
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
       <div class="section1" onclick="loadContent('legal-notice.html')"  id="legalNotice">
                    <p> Legal Notice</p>
                </div>
                <div class="section1" onclick="loadContent('privacy-policy.html')"  id="privacyPolicy">
                    <p>Privacy Policy</p>
                </div>
                <div class="section1" onclick="handleLogOut(event)"  id="logOut">
                    <a href="/index.html">Log out</a>
                </div>
    
    `;
}

function boardHtmlTemplate(
  taskId,
  categoryClass,
  categoryText,
  titleText,
  descriptionText,
  assignedContact,
  priorityImg,
  progressBar
) {
  return `
    <div class="board-task-container" onclick="toggleBoardOverlay('${taskId}')" ondragstart="startDragging('${taskId}')" draggable="true"> 
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

function getEmptyDragArea(noTaskText){
  return `
    <div class="empty-task-box">
      <span class="no-task-text">No task ${noTaskText}</span>
    </div>
  `;
}

