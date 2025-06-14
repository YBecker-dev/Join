function getNoteTemplateContact(index) {
    let contact = myContacts[index];
    
    return `<div onclick="openContactOverlay()" class="person">
                <p class="initial">${getInitials(contact.givenName, contact.surname)}</p>
                <div>
                    <h4>${contact.givenName} ${contact.surname}</h4>
                    <p><a class="mail">${contact.mail}</a></p>
                </div>
            </div>`;
}

function getNoteTemplateContactOverlay() {

    return `<div class="contactOverlay">
                    <div class="myNames">
                        <p class="initialOverlay">${getInitials(contact.givenName, contact.surname)}</p>
                        <div>
                            <h3>${contact.givenName} ${contact.surname}</h3>
                            <div class="contactIcons">
                                <div onclick="openContactOverlay()">
                                    <img class="editIcon" src="../img/icon/edit.png" alt="pencil">
                                    <span>edit</span>
                                </div>
                                <div onclick="deleteContact()">
                                    <img class="editIcon" src="../img/icon/trash.png" alt="wastebasket">
                                    <span>delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>Contact Information</p>
                    <p><strong>Email</strong></p>
                    <p><a class="mail" href="mailto:">${contact.mail}</a></p>
                    <p><strong>Phone</strong></p>
                    <p><a class="phone" href="tel:">${contact.phone}</a></p>
                </div>
                        `
}