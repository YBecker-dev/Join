let myContacts = [];
let newContacts = [];


async function loadContacts() {
  try {
    let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let responseAsJson = await response.json();

    if (responseAsJson) {
      myContacts = [];
      newContacts = [];
      
      for (let firebaseId in responseAsJson) {
        myContacts.push(responseAsJson[firebaseId]);
        newContacts.push(firebaseId);
      }
    } else {
      // console.log('Keine Kontakte in der Datenbank gefunden');
      myContacts = [];
      newContacts = [];
    }

    console.log('Geladene Kontakte:', myContacts);
    // console.log('Firebase IDs:', newContacts);
    
  } catch (error) {
    console.error('Fehler beim Laden der Kontakte:', error);
    myContacts = [];
    newContacts = [];
  }
}


function getInitials(name) {
  if (!name) return '??';
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}


async function initContacts() {
  await loadContacts();
  renderContacts();
}


function renderContacts() {
  let contentRef = document.getElementById('contactContent');
  let html = '';

  for (let index = 0; index < myContacts.length; index++)
  html += getNoteTemplateContact(index);
  contentRef.innerHTML = html;
}


function openDetails(index) {
  let details = document.getElementById('contactDetails');
  details.innerHTML = getNoteTemplateContactDetails(index);
}


function toggleContactOverlay() {
  console.log('connect');
  let overlayRef = document.getElementById('addNewContactOverlay');
  if (overlayRef.classList.contains('d-none')) {
    overlayRef.classList.remove('d-none');
    overlayRef.innerHTML = getNoteTemplateAddNewContact();
  } else {
    overlayRef.classList.add('d-none');
    overlayRef.innerHTML = '';
  }
}


async function saveToLocalstorage() {
    let userName = document.getElementById('newContactName').value;
    let userEmail = document.getElementById('newContactMail').value;
    let userPhone = document.getElementById('newContactPhone').value;

    if (!userName || !userEmail || !userPhone) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

  let newContact = {
    name: userName,
    email: userEmail,
    phone: userPhone,
    color: getRandomColor(),
    initials: getInitials(userName)
  };
  await saveToFirebase(newContact);
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

    await loadContacts();
    renderContacts();
    closeOverlay();
          
  } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
}


function getRandomColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}


function closeOverlay() {
  let overlayRef = document.getElementById('addNewContactOverlay');
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
    let firebaseId = newContacts[index];
        
    if (!firebaseId) {
      console.error('Firebase-ID nicht gefunden für Index:', index);
      return false;
    }
        
    // let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users/${firebaseId}.json`;
    let response = await fetch(url, {
      method: 'DELETE'
    });
        
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    await loadContacts();
    renderContacts();
    closeOverlay();
    document.getElementById('contactDetails').innerHTML = '';  
    return true;
        
  } catch (error) {
      console.error('Fehler beim Löschen:', error);
      return false;
  }
}


async function updateContact(index) {
  let contactName = document.getElementById('editContactName').value.trim()
  let contactMail = document.getElementById('editContactMail').value.trim();
  let contactPhone = document.getElementById('editContactPhone').value.trim();

  if (!contactName || !contactMail || !contactPhone) {
    alert('Bitte alle Felder ausfüllen!');
    return;
  }
    let updatedContact = {
        name: contactName,
        email: contactMail,
        phone: contactPhone,
        color: myContacts[index].color,
        initials: getInitials(contactName)
    };
    try {
        let firebaseId = newContacts[index];
        if (!firebaseId) {
            console.error('Firebase-ID nicht gefunden für Index:', index);
            console.log('Verfügbare newContacts:', newContacts);
            console.log('Gesuchter Index:', index);
            return;
        }
        // console.log('Aktualisiere Kontakt mit Firebase-ID:', firebaseId);
        
        let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users/${firebaseId}.json`;
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContact)
        });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await loadContacts();
    renderContacts();
    openDetails(index);
    closeOverlay();

    console.log('Kontakt erfolgreich aktualisiert');
  } catch (error) {
    console.error('Fehler beim Aktualisieren:', error);
    alert('Fehler beim Speichern der Änderungen!');
  }
}