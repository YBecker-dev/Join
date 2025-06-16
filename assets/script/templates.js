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