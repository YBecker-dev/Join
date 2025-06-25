let myContacts = [
  {
    givenName: 'Gabi',
    surname: 'Schuster',
    mail: 'gabischuster@gmail.com',
    phone: '+49123456789',
  },
  {
    givenName: 'Holger',
    surname: 'Arnold',
    mail: 'holgerarnold@gmail.com',
    phone: '+49123455690',
  },
  {
    givenName: 'Michaela',
    surname: 'Klein',
    mail: 'michaelaklein@gmail.com',
    phone: '+49123455681',
  },
  {
    givenName: 'Dennis',
    surname: 'Schmidt',
    mail: 'schmidt-d@gmail.com',
    phone: '+491288996',
  },
  {
    givenName: 'Luisa',
    surname: 'Neubert',
    mail: 'l-neubert@gmail.com',
    phone: '+4912323416',
  },
  {
    givenName: 'Chris',
    surname: 'Müller',
    mail: 'Chrismüller@gmail.com',
    phone: '+4912252525',
  },
];

async function fetchDataJson() {
    let url = `https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app`;
    let response = await fetch(url + 'users.json');
    let responseAsJson = await response.json();

  let promises = responseAsJson.results.map((contacts) => fetch(contacts.url).then((r) => r.json()));
  let allContacts = await Promise.all(promises);
  console.log(responseAsJson);
}

function initContacts() {
    renderContacts();
    openDetails();
}

function renderContacts() {
  let contentRef = document.getElementById('contactContent');
  let html = '';

  for (let index = 0; index < myContacts.length; index++) {
    html += getNoteTemplateContact(index);
  }
  contentRef.innerHTML = html;
}

function getInitials(first, last) {
  return first[0].toUpperCase() + last[0].toUpperCase();
}

function openDetails(index) {
  let details = document.getElementById('contactDetails');
  details.innerHTML = getNoteTemplateContactDetails(index);
}

function openEditOverlay() {
    let contentOverlayRef = document.getElementById('editContactOverlay');
    contentOverlayRef.innerHTML = getNoteTemplateEditContact(index);
    setEvantlistlener = 'click'
}


function toggleContactOverlay() {
    console.log('connect')
    let overlayRef = document.getElementById('overlayContact');
    //let overlay_content = document.getElementById('overlay-contact-content-loader');
    overlayRef.classList.toggle('d-none');
    if(!overlayRef.classList.contains('d-none')){
        overlay_content.innerHTML= getAddContactOverlay();
    }   
}

