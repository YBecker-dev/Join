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
                    <div class="exitBtn-wrapper">
                        <div class="right-exitBtn">
                          <img src="../img/icon/close.png" >
                        </div>
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
                      <button class="cancelBtn transform-left">Cancel X</button>
                      <button class="contactBtn">Create contact <img src="../img/icon/save.png"></button>
                    </div> 
                  </div>
                </div>
                
    
    `
}

