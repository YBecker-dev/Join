
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


// edit Contact
function getEditContactOverlay() {

    return  `<div class="newContactOverlay">
                <div class="headDiv">
                    <img class="contactLogo" src="../img/Logo/Logo_white.png" alt="Logo_white">
                    <p class="addHeadline">Add contact</p>
                    <div class="line"></div>
                </div>
                <div class="editDiv">
                    <div onclick="closeContactOverlay" class="closeDiv">
                        <img class="close" src="../img/icon/close.png" alt="Close-Button">
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
                        <button onclick="deleteContact" class="clear-button">Delete</button>
                        <button onclick="saveToLocalStorage" class="create-button">Create contact<img class="save-close" src="../img/icon/save.png" alt=""></button>
                    </div>
                </div>
            </div>`;
}


function getAddContactOverlay(){
    return`     <div class="content-left">
                  <div class="left-logo">
                    <img src="../img/Logo/Logo_white.png">
                  </div>
                    <div class="left-headline">
                      <h1>Add contact</h1>
                      <h4>Tasks are better with a team!</h4>
                      <div class="left-separator">
                        <img src="../img/icon/Vector 5.png" alt="">
                      </div>
                    </div>
                </div>
                <div class="content-right">
                  <div class="section-one-contact">
                      <img src="../img/icon/profile.png">
                   </div>
                  <div class="section-two-contact">
                    <div class="right-exit">
                      <img src="../img/icon/close.png" >
                    </div>
                    <div class="right-input-form">
                      <form>
                        <div class="input-group-contact">
                          <input id="contact-name" type="text" placeholder="Name" >
                          <span class="input-icon-contact"><img src="../img/icon/person.png"></span>
                        </div>
                        <div class="input-group-contact">
                          <input id="contact-mail" type="email" placeholder="Email">
                          <span class="input-icon-contact"><img src="../img/icon/mail.png" alt=""></span>
                        </div>
                        <div class="input-group-contact">
                          <input id="contact-phone" type="tel" placeholder="Phone">
                          <span class="input-icon-contact"><img src="../img/icon/phone.png"></span>
                        </div>
                      </form>
                    </div>
                    <div class="right-buttons">
                      <button class="cancelBtn">Cancel X</button>
                      <button class="contactBtn">Create contact <img src="../img/icon/save.png"></button>
                    </div> 
                  </div>
                </div>
                
    
    `
}

function getTaskOverlay(){
    return`     <div class="overlay-position">
                    <div class="overlay-header">
                        <div class="task-type">
                            <p class="p-Tag">Inhalt</p>
                        </div>
                        <div class="close-icon">
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
                                 <input type="checkbox">
                            </div>
                            <div class="task-description">
                                <p class="p-Tag">Implement Recipe Recommendation</p>
                            </div>
                        </div>    
                    </div>
                    <div class="overlay-edit-wrapper">
                        <div class="overlay-edit">
                            <div class="overlay-edit-content">
                                <img src="../img/icon/trash.png">
                                <p class="p-Tag">Delete</p>
                            </div>
                            <div class="overlay-seperator"></div>
                            <div class="overlay-edit-content transform-left">
                                <img src="../img/icon/edit.png">
                                <p class="p-Tag">Edit</p>
                            </div>
                        </div>
                    </div>    
                </div>
                


    `;
}

