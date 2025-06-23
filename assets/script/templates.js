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
                            <p class="p-Tag">Inhalt</p>
                        </div>
                        <div class="close-icon" onclick="toggleBoardOverlay()">
                            <img src="../img/icon/close.png" >
                        </div>                
                    </div>
                    <div class="overlay-titel">
                        <h1>Kochwelt Page &Recipe Recommender</h1>
                    </div>
                    <div class="overlay-description-flex">
                        <p class="p-Tag">Build start page with recipe recommendation.</p>
                    </div>
                    <div class="overlay-description-flex">
                        <p class="p-Tag">Due date:</p>
                        <p class="p-Tag">10/05/2023</p>
                    </div>
                    <div class="overlay-description-flex">
                        <p class="p-Tag">Priority</p>
                        <div class="overlay-priority">
                             <p class="p-Tag">medium</p>
                             <img src="../img/icon/priority/Prio media.png">
                        </div>
                    </div>
                    <div class="assigned-to">
                        <p class="p-Tag">Assigned To:</p>
                        <div class="overlay-peoples">
                            <div class="peoples-info">
                                <div class="initials">
                                    <p class="p-Tag">EM</p>
                                </div>
                                <div class="people-name">
                                    <p class="p-Tag">Emmanuel Maurer</p>
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div class="overlay-subtasks">
                        <p class="p-Tag">Subtasks</p>
                        <div class="subtask-info">
                            <div class="overlay-checkbox">
                                 <input class="checkbox" type="checkbox">
                            </div>
                            <div class="task-description">
                                <p class="p-Tag">Implement Recipe Recommendation</p>
                            </div>
                        </div>    
                    </div>
                    <div class="overlay-edit-wrapper">
                        <div class="overlay-edit">
                            <div class="overlay-edit-content">
                                <div class="trashImg"></div>
                                
                                <p class="p-Tag">Delete</p>
                            </div>
                            <div class="overlay-seperator"></div>
                            <div class="overlay-edit-content transform-left">
                                <div class="editImg"></div>
                                
                                <p class="p-Tag">Edit</p>
                            </div>
                        </div>
                    </div>    
                </div>
                


    `
}

function getLogOutMenu(){
    return`     <div class="section1" onclick="preventBubbling(event)"  id="legalNotice">
                    <a href="#"> Legal Notice</a>
                </div>
                <div class="section1" onclick="preventBubbling(event)"  id="privacyPolicy">
                    <a href="#">Privacy Policy</a>
                </div>
                <div class="section1" onclick="preventBubbling(event)"  id="logOut">
                    <a href="/index.html">Log out</a>
                </div>
    
    `
}
