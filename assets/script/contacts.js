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
];

async function fetchDataJson() {
    let url = 'https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/';
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


function editContactOverlay() {
    
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

