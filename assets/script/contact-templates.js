// Contact Overview
function getNoteTemplateContact(index) {
  let user = myContacts[index];

  return  `<div onclick="openDetails(${index}), event.stopPropagation()" class="person">
            <div class="initial" style="background-color: ${user.color}">${user.initials}</div>
            <div>
              <h4>${user.name}</h4>
              <p>
                <a class="mail">${user.email}</a>
              </p>
            </div>
          </div>`;
}

// view Contact
function getNoteTemplateContactDetails(indexDetails) {
  let user = myContacts[indexDetails];

  return  `<div class="namesDetails">

                <div class="contact-headline-mobile">
                    <h2>Contacts</h2>  
                    <span class="team">Better with a team</span>
                    <div class="separating-line-mobile"></div>
                    <img src="../img/icon/Vector.png" alt="arrow back" class="showArrowMobile">
                </div>

            <div class="contactInformations">
              <p class="initialOverlay" style="background-color: ${user.color}">${user.initials}</p>
              <div>
                <h3 class="infoNames">${user.name}</h3>
                <div class="contactIcons">
                  <div class="editOverlay" onclick="openEditOverlay(${indexDetails})">
                    <img class="editIcon" src="../img/icon/add_task_icon/subtasks/edit.png" alt="pencil">
                    <span class="editText">Edit</span>
                  </div>
                  <div class="editOverlay" onclick="deleteContact(${indexDetails})">
                    <img class="editIcon" src="../img/icon/add_task_icon/subtasks/delete.png" alt="wastebasket">
                    <span class="editText">Delete</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="infoBlock">
              <p class="info">Contact Information</p>
              <h4>Email</h4>
              <a class="mail" href="mailto:${user.email}">${user.email}</a>
              <h4>Phone</h4>
              <a class="phone" href="tel:${user.phone}">${user.phone}</a>
            </div>
            <button onclick="showEditOverlayMobile()" id="editContactBtnMobile" class="editContactBtn-mobile">
              <div class="dotted"></div>
              <div class="dotted"></div>
              <div class="dotted"></div>
            </button>
          </div>`;
}

// add new Contact
function getNoteTemplateAddNewContact() {

  return  `<div class="newContactOverlay" onclick="event.stopPropagation()">
            <div class="headDiv">
              <div class="closeDiv">
                <img onclick="closeOverlay()" class="closeMobile" src="../img/icon/close-white.png" alt="Close-Button">
              </div>  
              <img class="contactLogo" src="../img/Logo/Logo_white.png" alt="Logo_white">
              <p class="addHeadline">Add contact</p>
              <p class="addTastText">Tasks are better with a team!</p>
              <div class="line"></div>
            </div>
            <div class="editDiv">
              <div class="closeDiv">
                <img onclick="closeOverlay()" class="close" src="../img/icon/close.png" alt="Close-Button">
              </div>        
              <form action="" class="profilDiv">
                <div>
                  <p id="newContactInitials" class="profileInitials"><img class="profileImg" src="../img/icon/profile.png" alt="profile Image"></p>
                </div>
                <div>
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input type="" value="" placeholder="Name" required id="newContactName" class="addNewContact" onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/person.png" alt="Person Icon">
                  </div> 
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input type="email" value="" placeholder="E-Mail" name="email" required id="newContactMail" class="addNewContact" onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/mail.png" alt="Email Icon">
                  </div> 
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input type="tel" value="" placeholder="Phone" required id="newContactPhone" class="addNewContact" onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/phone.png" alt="phone Icon">
                  </div> 
                </div>           
              </form>
              <div class="accept">
                <button onclick="closeOverlay()" class="clear-button cancel-button">Cancel<img class="save-close" src="../img/icon/close.png" alt="Close-Button"></button>
                <button type="submit" onclick="saveToLocalstorage()" class="create-button">Create contact<img class="save-close" src="../img/icon/save.png" alt="saveIcon"></button>
              </div>
            </div>
          </div>`;
}

// edit Contact
function getNoteTemplateEditContact(index) {
  let user = myContacts[index] || {};

  return ` <div class="newContactOverlay" onclick="event.stopPropagation()">
            <div class="headDiv">
              <div class="closeDiv">
                <img onclick="closeOverlay()" class="closeMobile" src="../img/icon/close-white.png" alt="Close-Button">
              </div>
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
                  <p id="editContactInitials" class="profileInitials" style="background-color: ${user.color}">${user.initials}</p>
                </div>
                <div>
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input id="editContactName" class="addNewContact" type="text" value="${user.name || ''}" required onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/person.png" alt="Person Icon">
                  </div> 
                  <div class="addNewContactDiv" onclick="eventBubbling(event)" id="editContactEmailDiv">
                    <input id="editContactMail" class="addNewContact" type="email" placeholder="Email" required onclick="eventBubbling(event)" value="${
                      user.email || ''
                    }" oninput="validateEmailInput(this)">
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input id="editContactMail" class="addNewContact" type="email" value="${user.email || ''}" required onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/mail.png" alt="Email Icon">
                  </div> 
                  <div class="addNewContactDiv" onclick="eventBubbling(event)" id="editContactPhoneDiv">
                    <input id="editContactPhone" class="addNewContact" type="tel" minlength="10" placeholder="Phone" required onclick="eventBubbling(event)" value="${
                      user.phone || ''
                    }" oninput="validatePhoneInput(this)">
                  <div class="addNewContactDiv" onclick="event.stopPropagation()">
                    <input id="editContactPhone" class="addNewContact" type="tel" value="${user.phone || ''}" required onclick="event.stopPropagation()">
                    <img class="addNewContactIcon" src="../img/icon/phone.png" alt="phone Icon">
                  </div>               
                </div>                 
              </div>
              <div class="accept">
                <button onclick="deleteContact(${index})" class="clear-button">Delete</button>
                <button onclick="updateContact(${index})" class="create-button">Save<img class="save-close" src="../img/icon/save.png" alt="hookIcon"></button>
              </div>
            </div> 
          </div>`;
}
