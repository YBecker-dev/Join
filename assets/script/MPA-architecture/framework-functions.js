function initFrameworkFunctions(){
  displayUserInitials();
}

// test
function displayUserInitials() {
  // Sehr Fehleranfällig !!!
  let userInitials = document.getElementById('userInitials');
  let userName = JSON.parse(localStorage.getItem('announcedUser'));
  if (userName !== 'Guest Guest') {
    let firstinitial = userName.slice(0, 1);
    let searchposition = userName.search(' ');
    let secondinitial = userName.slice(searchposition + 1, searchposition + 2);
    let initials = firstinitial.concat(secondinitial);
    userInitials.innerText = initials;
  } else {
    userInitials.innerText = 'G';
  }
}