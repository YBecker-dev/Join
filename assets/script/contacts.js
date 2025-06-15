let myContacts = [  
    {
        "givenName": "Gabi",
        "surname": "Schuster",
        "mail": "gabischuster@gmail.com",
        "phone": "+49123456789"
    },
    {
        "givenName": "Holger",
        "surname": "Arnold",
        "mail": "holgerarnold@gmail.com",
        "phone": "+49123455690"
    },
    {
        "givenName": "Michaela",
        "surname": "Klein",
        "mail": "michaelaklein@gmail.com",
        "phone": "+49123455681"
    },  
];

function init() {
    renderContacts();
    openContactOverlayContactsOverlay();
}

function renderContacts() {
    let myContactsContentRef = document.getElementById('contactContent');

    for (let i = 0; i < myContacts.length; i++) {
        myContactsContentRef.innerHTML += getNoteTemplateContact(i);
    }
}

function getInitials(first, last) {
    return first[0].toUpperCase() + last[0].toUpperCase();
}

function openContactOverlay() {

}