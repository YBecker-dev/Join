function getNoteTemplateContact(index) {
  let contacts = myContacts[index];

  return `<div onclick="openContactOverlay()" class="person">
                <p class="initial">${getInitials(contacts.givenName, contacts.surname)}</p>
                <div>
                    <h4>${contacts.givenName} ${contacts.surname}</h4>
                    <p><a class="mail">${contacts.mail}</a></p>
                </div>
            </div>`;
}

function getNoteTemplateContactOverlay() {

    return `    <div class="contactOverlay">
                    <div class="contactInformations">
                        <p class="initialOverlay">${getInitials(contacts.givenName, contacts.surname)}</p>
                        <div>
                            <p class="nanesDetail">${contacts.givenName} ${contacts.surname}</p>
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
                        <a class="mail" href="mailto:">${contacts.mail}</a>
                        <h4>Phone</h4>
                        <a class="phone" href="tel:">${contacts.phone}</a>
                    </div>
                </div> `
}

function getTaskOverlay(){
    return`     <div class="overlay-position">
                    <div class="overlay-header">
                        <div class="task-type">
                            <p>Inhalt</p>
                        </div>
                        <div class="close-icon">
                            <img src="../img/icon/close.png" >
                        </div>                
                    </div>
                    <div class="overlay-titel">
                        <h1>Kochwelt Page &Recipe Recommender</h1>
                    </div>
                    <div class="overlay-description-flex">
                        <p>Build start page with recipe recommendation.</p>
                    </div>
                    <div class="overlay-description-flex">
                        <p>Due date:</p>
                        <p>10/05/2023</p>
                    </div>
                    <div class="overlay-description-flex">
                        <p>Priority</p>
                        <div class="overlay-priority">
                             <p>medium</p>
                             <img src="../img/icon/priority/Prio media.png">
                        </div>
                    </div>
                    <div class="assigned-to">
                        <p>Assigned To:</p>
                        <div class="overlay-peoples">
                            <div class="peoples-info">
                                <div class="initials">
                                    <p>EM</p>
                                </div>
                                <div class="people-name">
                                    <p>Emmanuel Maurer</p>
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div class="overlay-subtasks">
                        <p>Subtasks</p>
                        <div class="subtask-info">
                            <div class="overlay-checkbox">
                                 <input type="checkbox">
                            </div>
                            <div class="task-description">
                                <p>Implement Recipe Recommendation</p>
                            </div>
                        </div>    
                    </div>
                    <div class="overlay-edit-wrapper">
                        <div class="overlay-edit">
                            <div class="overlay-edit-content">
                                <img src="../img/icon/trash.png">
                                <p>Delete</p>
                            </div>
                            <div class="overlay-seperator"></div>
                            <div class="overlay-edit-content transform-left">
                                <img src="../img/icon/edit.png">
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>    
                </div>
                


    `
}

