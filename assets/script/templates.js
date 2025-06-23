
// Contact Overview
function getNoteTemplateContact(index) {
    let contact = myContacts[index];

    return  `<div onclick="openDetails(${index})" class="person">
                <p class="initial">${getInitials(contact.givenName, contact.surname)}</p>
                <div>
                    <h4>${contact.givenName} ${contact.surname}</h4>
                    <p><a class="mail">${contact.mail}</a></p>
                </div>
            </div>`;
}

// add new Contact
function getNoteTemplateAddNewContact() {

    return  `<div class="newContactOverlay">
                <div class="headDiv">
                    <img class="contactLogo" src="../img/Logo/Logo_white.png" alt="Logo_white">
                    <p class="addHeadline">Add contact</p>
                    <p class="addTastText">Tasks are better with a team!</p>
                    <div class="line"></div>
                </div>

                 <div class="editDiv">
                    <div class="closeDiv">
                        <img onclick="closeOverlay" class="close" src="../img/icon/close.png" alt="Close-Button">
                    </div>
                            
                    <div class="profilDiv">
                        <div>
                            <img class="profileImg" src="../img/icon/profile.png" alt="profile Image">
                        </div>
                        <div>
                            <div class="addNewContactDiv">
                                <input class="addNewContact" type="" placeholder="Name" required>
                                <img class="addNewContactIcon" src="../img/icon/person.png" alt="Person Icon">
                            </div> 
                            <div class="addNewContactDiv">
                                <input class="addNewContact" type="email" placeholder="Email" required>
                                <img class="addNewContactIcon" src="../img/icon/mail.png" alt="Email Icon">
                            </div> 
                            <div class="addNewContactDiv">
                                <input class="addNewContact" type="tel" placeholder="Phone" required>
                                <img class="addNewContactIcon" src="../img/icon/phone.png" alt="phone Icon">
                            </div> 
                        </div>           
                    </div>
                    <div class="accept">
                        <button onclick="closeOverlay" class="clear-button">Cancel<img class="save-close" src="../img/icon/close.png" alt="Close-Button"></button>
                        <button onclick="saveToLocalstorage" class="create-button">Create contact<img class="save-close" src="../img/icon/save.png" alt=""></button>
                    </div>
                </div>
            </div>`;
}


// Contact view
function getNoteTemplateContactDetails(indexDetails) {
    let contact = myContacts[indexDetails];

    return  `<div class="contactOverlay">
                <div class="contactInformations">
                    <p class="initialOverlay">${getInitials(contact.givenName, contact.surname)}</p>
                    <div>
                        <p class="namesDetail">${contact.givenName} ${contact.surname}</p>
                        <div class="contactIcons">
                            <div onclick="openContactOverlay()">
                                <img class="editIcon" src="../img/icon/edit.png" alt="pencil">
                                <span class="editText">edit</span>
                            </div>
                            <div onclick="deleteContact()">
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
        <p class="p-Tag">${task.description || ''}</p>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag">Due date:</p>
        <p class="p-Tag">${task.date || ''}</p>
      </div>
      <div class="overlay-description-flex">
        <p class="p-Tag">Priority:</p>
        <div class="overlay-priority">
          <p class="p-Tag">${task.priority || ''} <img src="../img/icon/priority/${task.priority}.png" alt=""></p>
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
        ${showSubtasksInOverlay(task)}
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
            <div class="editImg">
              <img src="../img/icon/edit.png" alt="edit">
              <p class="p-Tag">Edit</p>
            </div>
          </div>
        </div>
      </div>    
    </div>
  `;
}

function contactsOverlayTemplate(initials, name) {
  return `
        <div class="peoples-info">
          <div class="initials">
            <p class="p-Tag">${initials}</p>
          </div>
          <div class="people-name">
            <p class="p-Tag">${name}</p>
          </div>
        </div>
      `;
}

function overlaySubtaskHtml(subtask) {
  return `
       <div class="subtask-info">
           <div class="overlay-checkbox">
              <input class="checkbox" type="checkbox"/>
           </div>
           <div class="task-description">
              <p class="p-Tag">${subtask}</p>
           </div>
       </div>`;
}

function getLogOutMenu() {
  return `
       <div class="section1" onclick="preventBubbling(event)"  id="legalNotice">
                    <a href="#"> Legal Notice</a>
                </div>
                <div class="section1" onclick="preventBubbling(event)"  id="privacyPolicy">
                    <a href="#">Privacy Policy</a>
                </div>
                <div class="section1" onclick="preventBubbling(event)"  id="logOut">
                    <a href="/index.html">Log out</a>
                </div>
    
    `;
}
