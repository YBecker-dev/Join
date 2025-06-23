let BASE_URL_TASKS = 'https://join-tasks-4a707-default-rtdb.europe-west1.firebasedatabase.app/';

async function loadContent(page) {
  let response = await fetch(page);
  let html = await response.text();
  document.getElementById('main-content').innerHTML = html;

  if (page === 'add_task.html') {
    initAddTask();
  } else if (page === 'contacts.html') {
  } else if (page === 'board.html') {
    await initBoard();
  } else if (page === 'summary_user.html') {
    initSummary();
  } else if (page === 'privacy-policy.html') {
  } else if (page === 'legal-notice.html') {
  } else if (page === 'help.html') {
  }
}

function toggleLogOutOverlay(){
  console.log('check')
  let logOutBoard = document.getElementById('overlay-logout');
  if(logOutBoard.classList.contains('d-none')){
    logOutBoard.classList.remove('d-none')
  }else{
    logOutBoard.classList.add('d-none')
  }
}