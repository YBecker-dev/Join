let myContacts = [];
let newContacts = [];
let currentSelectedIndex = null;

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
      myContacts = [];
      newContacts = [];
    }
  } catch (error) {
    console.error('Fehler beim Laden der Kontakte:', error);
    myContacts = [];
    newContacts = [];
  }
}

function getInitials(name) {
  if (!name) return '??';
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

async function initContacts() {
  await loadContacts();
  renderContacts();
  initFrameworkFunctions();
  changeColorbyHtmlLinks(document.getElementById('sidebar-contacts'));
}

function renderContacts() {
  let contentRef = document.getElementById('contactContent');
  let groupedContacts = groupContactsByInitial(myContacts);
  let html = '';
  let initials = Object.keys(groupedContacts).sort();

  for (let index = 0; index < initials.length; index++) {
    let initial = initials[index];
    html += ` <div class="agenda">
                <div class="agenda-category"><p>${initial}</p></div>
                <div class="agenda-line"></div>
              </div>`;
    for (let i = 0; i < groupedContacts[initial].length; i++) {
      let contactIndex = groupedContacts[initial][i];
      html += getNoteTemplateContact(contactIndex);
    }
  }
  contentRef.innerHTML = html;
}

function groupContactsByInitial(contacts) {
  let groups = {};
  for (let i = 0; i < contacts.length; i++) {
    let name = contacts[i].name || '';
    let initial = name.charAt(0).toUpperCase();
    if (!groups[initial]) groups[initial] = [];
    groups[initial].push(i);
  }
  let sortedGroups = {};
  Object.keys(groups)
    .sort()
    .forEach((key) => {
      sortedGroups[key] = groups[key];
    });
  return sortedGroups;
}

function changeContactColorIfSelected(index, isSelected) {
  let openDetails = document.querySelector(`[onclick*="openDetails(${index})"]`);
  if (openDetails) {
    if (isSelected) {
      openDetails.classList.add('active');
    } else {
      openDetails.classList.remove('active');
    }
  }
}

function openDetails(index) {
  let allContacts = document.querySelectorAll('.person');
  let details = document.getElementById('contactDetails');
  if (currentSelectedIndex === index) {
    closeContactDetails(allContacts, details);
    return;
  }
  allContacts.forEach((contact) => contact.classList.remove('active'));
  details.classList.remove('show');
  details.classList.add('hide');
  currentSelectedIndex = index;
  setanimation(details, index);
}

function closeContactDetails(allContacts, details) {
  allContacts.forEach((contact) => contact.classList.remove('active'));
  details.classList.remove('show');
  details.classList.add('hide');
  setTimeout(() => {
    details.innerHTML = '';
  }, 300);
  currentSelectedIndex = null;
}

function setanimation(details, index) {
  setTimeout(() => {
    details.innerHTML = getNoteTemplateContactDetails(index);
    details.classList.remove('hide');
    setTimeout(() => {
      details.classList.add('show');
      setTimeout(() => {
        changeContactColorIfSelected(index, true);
      }, 300);
    }, 10);
  }, 20);
}

function toggleContactOverlay() {
  let overlayRef = document.getElementById('add-new-contact');
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
    initials: getInitials(userName),
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
  let overlayRef = document.getElementById('add-new-contact');
  let contentOverlayRef = document.getElementById('edit-contact');
  overlayRef.classList.add('d-none');
  contentOverlayRef.classList.add('d-none');
  overlayRef.innerHTML = '';
  contentOverlayRef.innerHTML = '';
}

function openEditOverlay(index) {
  let contentOverlayRef = document.getElementById('edit-contact');
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
      method: 'DELETE',
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
  let contactName = document.getElementById('editContactName').value.trim();
  let contactMail = document.getElementById('editContactMail').value.trim();
  let contactPhone = document.getElementById('editContactPhone').value.trim();

  if (!contactName || !contactMail || !contactPhone) {
    return;
  }
  let updatedContact = {
    name: contactName,
    email: contactMail,
    phone: contactPhone,
    color: myContacts[index].color,
    initials: getInitials(contactName),
  };
  try {
    let firebaseId = newContacts[index];
    if (!firebaseId) {
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
      return;
    }

    await loadContacts();
    renderContacts();
    openDetails(index);
    closeOverlay();
  } catch (error) {
    return;
  }
}
