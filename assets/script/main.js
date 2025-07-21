let contacts = [];
let BASE_URL_TASKS_AND_USERS = 'https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/';

async function loadContacts() {
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'users.json');
  let data = await response.json();
  contacts = [];
  if (data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let id = keys[i];
      let user = data[id];
      contacts.push({
        id: id,
        name: user.name,
        initials: user.initials,
        email: user.email,
        phone: user.phone,
        color: user.color,
      });
    }
  }
}

//async function loadContent(page) {
//  let response = await fetch(page);
//  let html = await response.text();
//  displayUserInitials();
//  document.getElementById('main-content').innerHTML = html;
//
//  if (page === 'add_task.html') {
//    await initAddTask();
//    changeColorbyHtmlLinks(document.getElementById('sidebar-add-task'));
//  } else if (page === 'contacts.html') {
//    initContacts();
//    changeColorbyHtmlLinks(document.getElementById('sidebar-contacts'));
//  } else if (page === 'board.html') {
//    await initBoard();
//    changeColorbyHtmlLinks(document.getElementById('sidebar-board'));
//  } else if (page === 'summary_user.html') {
//    await initSummary();
//    changeColorbyHtmlLinks(document.getElementById('sidebar-summary'));
//  } else if (page === 'privacy-policy.html') {
//    changeColorbyHtmlLinks(document.getElementById('sidebar-privacy-policy'));
//  } else if (page === 'legal-notice.html') {
//    changeColorbyHtmlLinks(document.getElementById('sidebar-legal-notice'));
//  } else if (page === 'help.html') {
//  }
//}

/**
 * load the logged user name from local storage and precessed
 * the string to the Initials
 */
//function displayUserInitials() {
//  // Sehr Fehleranfällig !!!
//  let userInitials = document.getElementById('userInitials');
//  let userName = JSON.parse(localStorage.getItem('announcedUser'));
//  if (userName !== 'Guest Guest') {
//    let firstinitial = userName.slice(0, 1);
//    let searchposition = userName.search(' ');
//    let secondinitial = userName.slice(searchposition + 1, searchposition + 2);
//    let initials = firstinitial.concat(secondinitial);
//    userInitials.innerText = initials;
//  } else {
//    userInitials.innerText = 'G';
//  }
//}

function toggleLogOutOverlay() {
  let logOutRef = document.getElementById('overlay-logout');
  let menuContent = document.getElementById('logout-overlay-content');
  logOutRef.classList.toggle('d-none');
  if (!menuContent.classList.contains('d-none')) {
    menuContent.innerHTML = getLogOutMenu();
  }
}
/**
 * Delete local Storage before the logged-in user is logged out
 * @param {a Tag} event
 */
function handleLogOut(event) {
  event.preventDefault();
  resetAnnouncedUserStorage();
  window.location.href = '/index.html';
}

let resetAnnouncedUserStorage = () => {
  localStorage.removeItem('announcedUser');
};

function changeColorbyHtmlLinks(element) {
  document.querySelectorAll('.sidebar-links').forEach((sidebarLink) => {
    sidebarLink.classList.remove('active');
  });
  element.classList.add('active');
}

function toggleMoveToOverlay(){
  let moveToRef = document.getElementById('selection');
  moveToRef.classList.toggle('d-none');
  
}