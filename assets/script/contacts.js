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
      contacts = [];
      contactIds = [];

      for (let firebaseId in responseAsJson) {
        contacts.push(responseAsJson[firebaseId]);
        contactIds.push(firebaseId);
      }
    } else {
      console.log('Keine Kontakte in der Datenbank gefunden');
      contacts = [];
      contactIds = [];
    }

    console.log('Geladene Kontakte:', contacts);
    console.log('Firebase IDs:', contactIds);
  } catch (error) {
    console.error('Fehler beim Laden der Kontakte:', error);
    contacts = [];
    contactIds = [];
  }
}

async function initContacts() {
  await loadContacts();
  renderContacts();
}

function renderContacts() {
  let contentRef = document.getElementById('contactContent');
  let html = '';
  for (let index = 0; index < contacts.length; index++) html += getNoteTemplateContact(index);
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

async function saveToFirebase() {
  let contactName = document.getElementById('newContactName').value.trim();
  let contactMail = document.getElementById('newContactMail').value.trim();
  let contactPhone = document.getElementById('newContactPhone').value.trim();

  if (!contactName || !contactMail || !contactPhone) {
    alert('Bitte alle Felder ausfüllen!');
    return;
  }

  let initials = getInitials(contactName);
  let color = getRandomColor();

  let newContact = {
    name: contactName,
    initials: initials,
    email: contactMail,
    phone: contactPhone,
    color: color,
  };

  try {
    let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users.json`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
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

async function deleteContactById(firebaseId) {
  if (!firebaseId) {
    console.error('Firebase-ID fehlt!');
    return false;
  }
  let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/users/${firebaseId}.json`;
  let response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  await fetchDataJson();
  renderContacts();
  document.getElementById('contactDetails').innerHTML = '';

  console.log('Kontakt erfolgreich gelöscht');
  return true;
}

async function updateContact(index) {
  let contactName = document.getElementById('editContactName').value.trim();
  let contactMail = document.getElementById('editContactMail').value.trim();
  let contactPhone = document.getElementById('editContactPhone').value.trim();

  if (!contactName || !contactMail || !contactPhone) {
    alert('Bitte alle Felder ausfüllen!');
    return;
  }

  let initials = getInitials(contactName);

  let updatedContact = {
    name: contactName,
    initials: initials,
    email: contactMail,
    phone: contactPhone,
    color: contacts[index].color
  };

  try {
    let firebaseId = contactIds[index];

    if (!firebaseId) {
      console.error('Firebase-ID nicht gefunden für Index:', index);
      console.log('Verfügbare contactIds:', contactIds);
      console.log('Gesuchter Index:', index);
      return;
    }

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

    contacts[index] = updatedContact;

    renderContacts();
    openDetails(index);
    closeOverlay();

    console.log('Kontakt erfolgreich aktualisiert');
  } catch (error) {
    console.error('Fehler beim Aktualisieren:', error);
    alert('Fehler beim Speichern der Änderungen!');
  }
}
