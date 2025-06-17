function loadContent(page) {
  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('main-content').innerHTML = html;

      if (page === 'add_task.html') {
        initAddTask();
      } else if (page === 'contacts.html') {
      } else if (page === 'board.html') {
      } else if (page === 'summary_user.html') {
        initSummary();
      } else if (page === 'privacy-policy.html') {
      } else if (page === 'legal-notice.html') {
      }
    });
}
  