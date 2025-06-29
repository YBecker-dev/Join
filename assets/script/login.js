const BASE_URL = "https://authenticationprototyp-default-rtdb.europe-west1.firebasedatabase.app/"
let passwordInput = document.getElementById('password')
const passwordValue = document.getElementById('password-icon');
//let announcedUserStorage = [];

// Eventlistner 
passwordInput.addEventListener('input', function(){
  let inputValue = this.value.trim();
  if(inputValue === ""){
    passwordValue.src = "./assets/img/icon/lock.png";
    passwordValue.classList.remove('eye-icon');
  }else{
    passwordValue.src = "./assets/img/icon/hidden.png";
    passwordValue.classList.add('eye-icon'); 
  }
})

passwordValue.addEventListener('click', function(){
  if(passwordValue.classList.contains('eye-icon')){
    if(passwordInput.type == "password"){
      passwordValue.src = "./assets/img/icon/show.png"
      passwordInput.type = "text"
    }else{
      passwordValue.src = "./assets/img/icon/hidden.png"
      passwordInput.type = "password"
    } 
  }
})

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
  let findUser = false;
  try{
    let response = await fetch(BASE_URL+"/login"+".json")
    if(response.ok){
      const userDataObject = await response.json();
      if(userDataObject){
        const userKey = Object.keys(userDataObject);
        for(i = 0; i< userKey.length; i++){
          const userID = userKey[i];
          const userObjekt = userDataObject[userID];
          if(mail.value == userObjekt.mail && password.value == userObjekt.password){
            findUser = true;
            //console.log( 'name' , userObjekt.name ,'mail' ,userObjekt.mail );
            const announcedUser = userObjekt.name;
            //console.log(announcedUser);
            storeAnnoncedUserName(announcedUser);
            break;
          }
        }
        if(findUser === true){
            console.log('User gefunden')
            window.location.href = "assets/html/main.html";
            resetForm();
          }else{
            console.log('User nicht gefunden oder Eingaben falsch');
            document.getElementById('login-failed').classList.remove('d-none');
            resetForm();
            resetPwIcon();
          }
      }
    }
  }catch(error){
    console.error(error);
  }
}
let resetForm = () => document.getElementById("login-form").reset()

let resetPwIcon =() => {
  passwordValue.src = "./assets/img/icon/lock.png";
  passwordInput.type="password";
  passwordValue.classList.remove('eye-icon');
};

let storeAnnoncedUserName = (announcedUser) => {
  localStorage.setItem('announcedUser',JSON.stringify(announcedUser));
};

function logginAsGuest(){
  let guestUser = 'Guest Guest';
  console.log(guestUser); 
  localStorage.setItem('announcedUser',JSON.stringify(guestUser));
  console.log(JSON.parse(localStorage.getItem('announcedUser')));
  window.location.href = "assets/html/main.html";
}
