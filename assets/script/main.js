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
        color: user.color
      });
    }
  }
}

async function loadContent(page) {
  let response = await fetch(page);
  let html = await response.text();
  document.getElementById('main-content').innerHTML = html;

  if (page === 'add_task.html') {
    await initAddTask();
  } else if (page === 'contacts.html') {
    initContacts();
  } else if (page === 'board.html') {
    await initBoard();
  } else if (page === 'summary_user.html') {
    await initSummary();
  } else if (page === 'privacy-policy.html') {
  } else if (page === 'legal-notice.html') {
  } else if (page === 'help.html') {
  }
}
