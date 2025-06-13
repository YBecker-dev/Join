const BASE_URL = "https://authenticationprototyp-default-rtdb.europe-west1.firebasedatabase.app/"

function init() {
  const logo = document.getElementById('start-logo');
  const headerLogo = document.querySelector('.main-header-logo');
  logo.classList.remove('preload');

  if (!sessionStorage.getItem('logoAnimated')) {
    logo.classList.add('logo-zoom');
    setTimeout(() => {
      logo.classList.remove('logo-zoom');
      headerLogo.classList.add('fade-out');
      sessionStorage.setItem('logoAnimated', 'true');
    }, 900);
  } else {
    logo.classList.remove('logo-zoom');
    headerLogo.classList.add('fade-out');
  }
}

function loginUser(event){
  checkUser(event);
}

async function checkUser(event){
  event.preventDefault();
  let mail = document.getElementById('email');
  let password = document.getElementById('password');
  try{
    let response = await fetch(BASE_URL+".json")
    if(response.ok){
      //console.log(response)
      const userDataObject = await response.json();
      if(userDataObject){
        const userKey = Object.keys(userDataObject);
        for(i = 0; i< userKey.length; i++){
          const userID = userKey[i];
          const userObjekt = userDataObject[userID];
          //console.log(userObjekt);
          //console.log(userID)
          if(mail.value == userObjekt.mail && password.value == userObjekt.password){
            console.log('User gefunden')
            window.location.href = "assets/html/summary.html";
            resetForm();
          }else{
            console.log('User nicht gefunden oder Eingaben falsch');
            document.getElementById('login-failed').classList.remove('d-none');
            resetForm();
          }
        }
      }
    }

  }catch(error){
    console.error(error);
  }
  

}

let resetForm = () => document.getElementById("login-form").reset()