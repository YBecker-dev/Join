
function loadContent(page) {
  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Fehler beim Laden!");
      return response.text();
    })
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
    })
    };
