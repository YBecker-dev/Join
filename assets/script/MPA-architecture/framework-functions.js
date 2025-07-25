
function initFrameworkFunctions(){
  displayUserInitials();
}




// test
function displayUserInitials() {
  // Sehr Fehleranfällig !!!
  try{
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
  }catch(error){
    if(error instanceof TypeError && error.message.includes("Cannot read properties of null (reading 'slice')")){
      console.warn('Unautorisierter Zugriff oder fehlende Nutzerdaten erfasst. Leite zum Login um');
      redirectLogin();
    }else{
      throw error;
    }
  }
  
}

let loadHelp =() =>{
  window.location.href = "/assets/html/MPA-architecture/help.html"
}

function redirectLogin(){
  let timeout;
  timeout = setTimeout(window.location.href = "/index.html", 2000);
}