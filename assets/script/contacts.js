let myContacts = [];
let contactIds = [];

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
      myContacts = [];
      contactIds = [];

      for (let firebaseId in responseAsJson) {
        myContacts.push(responseAsJson[firebaseId]);
        contactIds.push(firebaseId);
      }
    } else {
      console.log('Keine Kontakte in der Datenbank gefunden');
      myContacts = [];
      contactIds = [];
    }

    console.log('Geladene Kontakte:', myContacts);
    console.log('Firebase IDs:', contactIds);
  } catch (error) {
    console.error('Fehler beim Laden der Kontakte:', error);
    myContacts = [];
    contactIds = [];
  }
}

async function initContacts() {
  await fetchDataJson();
  renderContacts();
}

function renderContacts() {
  console.log('myContacts:', myContacts);
  let contentRef = document.getElementById('contactContent');
  let html = '';
  for (let index = 0; index < myContacts.length; index++) html += getNoteTemplateContact(index);
  contentRef.innerHTML = html;
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
    let userName = document.getElementById('newContactName').value;
    let userMail = document.getElementById('newContactMail').value;
    let userPhone = document.getElementById('newContactPhone').value;

    if (!userName || !userMail || !userPhone) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    let nameParts = userName.split(' ');
    let givenName = nameParts[0] || ' ';
    let surName = nameParts.slice(1).join(' ') || '';

    let newContact = {
        givenName: givenName,
        surname: surName,
        mail: userMail,
        phone: userPhone
    };

  myContacts.push(newContact);

  saveToFirebase(newContact);
  renderContacts();
  closeOverlay();
}

async function saveToFirebase(contact) {
  try {
    let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

        console.log('Kontakt erfolgreich gespeichert');

        await fetchDataJson();
        renderContacts();
        
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
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

async function deleteContact(index) {
    try {
        let firebaseId = contactIds[index];
        
        if (!firebaseId) {
            console.error('Firebase-ID nicht gefunden für Index:', index);
            return false;
        }
        
        let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users/${firebaseId}.json`;
        let response = await fetch(url, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        myContacts.splice(index, 1);
        contactIds.splice(index, 1);
        
        renderContacts();
        closeOverlay();
        document.getElementById('contactDetails').innerHTML = '';
        
        console.log('Kontakt erfolgreich gelöscht');
        return true;
        
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
        return false;
    }
}

async function updateContact(index) {
  let contactName = document.getElementById('editContactName').value;
  let contactMail = document.getElementById('editContactMail').value;
  let contactPhone = document.getElementById('editContactPhone').value;

  if (!contactName || !contactMail || !contactPhone) {
    alert('Bitte alle Felder ausfüllen!');
    return;
  }

    let nameParts = contactName.split(' ');
    let givenName = nameParts[0] || ' ';
    let surname = nameParts.slice(1).join(' ') || '';

  let updatedContact = {
    givenName: givenName,
    surname: surname,
    mail: contactMail,
    phone: contactPhone,
  };

  try {
    let firebaseId = contactIds[index];

    if (!firebaseId) {
      console.error('Firebase-ID nicht gefunden für Index:', index);
      console.log('Verfügbare contactIds:', contactIds);
      console.log('Gesuchter Index:', index);
      return;
    }

    console.log('Aktualisiere Kontakt mit Firebase-ID:', firebaseId);

    let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users/${firebaseId}.json`;
    let response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    myContacts[index] = updatedContact;

    renderContacts();
    openDetails(index);
    closeOverlay();

    console.log('Kontakt erfolgreich aktualisiert');
  } catch (error) {
    console.error('Fehler beim Aktualisieren:', error);
    alert('Fehler beim Speichern der Änderungen!');
  }
}
