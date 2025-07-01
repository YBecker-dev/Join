// Contact Overview
function getNoteTemplateContact(index) {
  let contact = myContacts[index];

  return  ` 
            <div onclick="openDetails(${index})" class="person">
              <p class="initial">${getInitials(contact.givenName, contact.surname)}</p>
            <div>
                <h4>${contact.givenName} ${contact.surname}</h4>
                <p><a class="mail">${contact.mail}</a></p>
              </div>
            </div>  
          `;
}

// Contact view
function getNoteTemplateContactDetails(indexDetails) {
  let contact = myContacts[indexDetails];

  return  `
            <div class="namesDetails">
              <div class="contactInformations">
                <p class="initialOverlay">${getInitials(contact.givenName, contact.surname)}</p>
                <div>
                  <h3 class="infoNames">${contact.givenName} ${contact.surname}</h3>
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
                <a class="mail" href="mailto:${contact.mail}">${contact.mail}</a>
                <h4>Phone</h4>
                <a class="phone" href="tel:${contact.phone}">${contact.phone}</a>
              </div>
            </div>
  `;
}

// add new Contact 
function getNoteTemplateAddNewContact() {
  return `
    <div class="newContactOverlay" onclick="event.stopPropagation()">
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
            <img class="profileImg" src="../img/icon/profile.png" alt="profile Image">
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
          <button onclick="saveToLocalstorage()" class="create-button">Create contact<img class="save-close" src="../img/icon/save.png" alt=""></button>
        </div>
      </div>
    </div>
  `;
}

// edit Contact
function getNoteTemplateEditContact(index) {
  let contact = myContacts[index] || {};

  return `
    <div class="editContactOverlay" onclick="event.stopPropagation()">
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
            <img class="profileImg" src="../img/icon/profile.png" alt="profile Image">
          </div>
          <div>
            <div class="addNewContactDiv" onclick="event.stopPropagation()">
              <input id="editContactName" class="addNewContact" type="text" placeholder="Name" value="${contact.givenName || ''} ${contact.surname || ''}" required onclick="event.stopPropagation()">
              <img class="addNewContactIcon" src="../img/icon/person.png" alt="Person Icon">
            </div> 
            <div class="addNewContactDiv" onclick="event.stopPropagation()">
              <input id="editContactMail" class="addNewContact" type="email" placeholder="Email" value="${contact.mail || ''}" required onclick="event.stopPropagation()">
              <img class="addNewContactIcon" src="../img/icon/mail.png" alt="Email Icon">
            </div> 
            <div class="addNewContactDiv" onclick="event.stopPropagation()">
              <input id="editContactPhone" class="addNewContact" type="tel" placeholder="Phone" value="${contact.phone || ''}" required onclick="event.stopPropagation()">
              <img class="addNewContactIcon" src="../img/icon/phone.png" alt="phone Icon">
            </div>               
          </div>                 
        </div>
        <div class="accept">
          <button onclick="deleteContact(${index})" class="clear-button">Delete</button>
          <button onclick="updateContact(${index})" class="create-button">Save changes<img class="save-close" src="../img/icon/save.png" alt=""></button>
        </div>
      </div> 
    </div>
  `;
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
            ${getAssignedToHTML(task)}
        </div>
      </div>
      <div class="overlay-subtasks">
        <p class="p-Tag">Subtasks:</p>
        ${showSubtasksInOverlay(task, taskId)}
      </div>
      <div class="overlay-edit-wrapper">
        <div class="overlay-edit">
          <div class="overlay-edit-content">
            <div class="trashImg" onclick="deleteTaskFromFirebase('${taskId}')">
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
                <div class="section1" onclick="preventBubbling(event)"  id="logOut">
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

function pushSubtaskInputHTML(text, checked = false) {
  return `
    <div class="subtask-item">
      <input type="checkbox" ${checked ? 'checked' : ''}>
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
  return `
        <div class="assigned-contacts" id="assigned-contact-${i}" onclick="onContactCheckboxClick(${i}, this)">
          <div class="user-dropdown" id="user-dropdown-${i}">
            <div class="user-name-dropdown " style="background-color: ${contacts[i].color};">
              <span >${contacts[i].initials}</span>
            </div>
            <div id="user-name-dropdown-${i}">
              <p>${contacts[i].name}</p>
            </div>
          </div>
          <div>
            <input type="checkbox" class="checkbox" ${checked} onclick="eventBubbling(event); onContactCheckboxClick(${i}, this)">
          </div>
        </div>
      `;
}

function getEmptyDragArea(noTaskText){
  return `
    <div class="empty-task-box">
      <span class="no-task-text">No task ${noTaskText}</span>
    </div>
  `
}

