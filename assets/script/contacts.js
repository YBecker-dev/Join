let myContacts = [];

async function fetchDataJson() {
    try {
        let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let responseAsJson = await response.json();
        console.log('Firebase Response:', responseAsJson);

        if (responseAsJson) {
            if (Array.isArray(responseAsJson)) {
                myContacts = responseAsJson;
            } else {
                myContacts = Object.values(responseAsJson);
            }
        } else {
            console.log('Keine Kontakte in der Datenbank gefunden');
            myContacts = [];
        }

        console.log('Geladene Kontakte:', myContacts);
        
    } catch (error) {
        console.error('Fehler beim Laden der Kontakte:', error);
        myContacts = [];
    }
}

async function initContacts() {
    await fetchDataJson();
    renderContacts();
    // openDetails(); 
    renderNewContact();
}

function renderContacts() {
    let contentRef = document.getElementById('contactContent');
    let html = '';

        for (let index = 0; index < myContacts.length; index++) 
            html += getNoteTemplateContact(index);

    contentRef.innerHTML = html;
}

function getInitials(first, last) {
    if (!first || !last) return '??';
    return first[0].toUpperCase() + last[0].toUpperCase();
}

function openDetails(index) {
    
    let details = document.getElementById('contactDetails');
    details.innerHTML = getNoteTemplateContactDetails(index);
}

function toggleContactOverlay() {
    console.log('connect');
    let overlayRef = document.getElementById('overlayContact');
    if (overlayRef.classList.contains('d-none')) {
        overlayRef.classList.remove('d-none');
        overlayRef.innerHTML = getNoteTemplateAddNewContact();
    } else {
        overlayRef.classList.add('d-none');
        overlayRef.innerHTML = ''; 
    }
}

function saveToLocalstorage() {
    let contactName = document.getElementById('newContactName').value;
    let contactMail = document.getElementById('newContactMail').value;
    let contactPhone = document.getElementById('newContactPhone').value;

    if (!contactName || !contactMail || !contactPhone) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    let nameParts = contactName.split(' ');
    let givenName = nameParts[0] || '';
    let surname = nameParts.slice(1).join(' ') || '';

    let newContact = {
        givenName: givenName,
        surname: surname,
        mail: contactMail,
        phone: contactPhone
    };

    myContacts.push(newContact);

    saveToFirebase(newContact);
    renderContacts();
    closeOverlay();
}

function handleOverlayClick(event) {
    if (event.target.classList.contains('overlay-background')) {
        closeOverlay();
    }
  }

async function saveToFirebase(contact) {
    try {
        let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Kontakt erfolgreich gespeichert');
        
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
    }
}

function addnewContact() {
    saveToLocalstorage();
}

function toggleEditOverlay() {
    let editOverlayRef = document.getElementById('editContactOverlay');
    
    if (editOverlayRef.classList.contains('d-none')) {
        editOverlayRef.classList.remove('d-none');
        editOverlayRef.innerHTML = getNoteTemplateEditContact();
    } else {
        editOverlayRef.classList.add('d-none');
        editOverlayRef.innerHTML = ''; 
    }
}

function closeOverlay() {
    let overlayRef = document.getElementById('overlayContact');
    let contentOverlayRef = document.getElementById('editContactOverlay');
    
    overlayRef.classList.add('d-none');
    contentOverlayRef.classList.add('d-none');
    overlayRef.innerHTML = '';
    contentOverlayRef.innerHTML = '';
}

function openEditOverlay(index) {
    let contentOverlayRef = document.getElementById('editContactOverlay');
    contentOverlayRef.classList.remove('d-none');
    contentOverlayRef.innerHTML = getNoteTemplateEditContact(index);
}

function deleteContact(index) {
        myContacts.splice(index, 1);
        renderContacts();
        document.getElementById('contactDetails').innerHTML = '';
    }

function updateContact(index) {
    let contactName = document.getElementById('editContactName').value;
    let contactMail = document.getElementById('editContactMail').value;
    let contactPhone = document.getElementById('editContactPhone').value;

    if (!contactName || !contactMail || !contactPhone) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    let nameParts = contactName.split(' ');
    let givenName = nameParts[0] || '';
    let surname = nameParts.slice(1).join(' ') || '';

    myContacts[index] = {
        givenName: givenName,
        surname: surname,
        mail: contactMail,
        phone: contactPhone
    };

    renderContacts();
    openDetails(index);
    closeOverlay();
}