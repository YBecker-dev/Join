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
    //await fetchContactJson();
    renderMyContacts();

    //openContactOverlayContactsOverlay();
}

async function fetchContactJson() {
    let url = `https:`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let promises = responseAsJson.results.map(contact => fetch(contact.url).then(c => c.json()));
    let contacts = await Promise.all(promises);
    console.log(responseAsJson);

    contacts.push();
}

function renderMyContacts() {
    let myContactsContentRef = document.getElementById('contactContent');

    for (let i = 0; i < myContacts.length; i++) {
        myContactsContentRef.innerHTML += getNoteTemplateContact(i);
    }
}

function getInitials(first, last) {
    return first[0].toUpperCase() + last[0].toUpperCase();
}



function toggleContactOverlay() {
    console.log('connect')
    let overlayRef = document.getElementById('overlayContact');
    let overlay_content = document.getElementById('overlay-contact-content-loader');
    overlayRef.classList.toggle('d-none');
    if(!overlayRef.classList.contains('d-none')){
        overlay_content.innerHTML= getAddContactOverlay();
    }
    
}