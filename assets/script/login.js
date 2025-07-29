const BASE_URL = 'https://authenticationprototyp-default-rtdb.europe-west1.firebasedatabase.app/';
let passwordInput = document.getElementById('password');
const passwordValue = document.getElementById('password-icon');
let logo;
let headerLogo;
//let announcedUserStorage = [];

// Eventlistner
passwordInput.addEventListener('input', function () {
  let inputValue = this.value.trim();
  if (inputValue === '') {
    passwordValue.src = './assets/img/icon/lock.png';
    passwordValue.classList.remove('eye-icon');
  } else {
    passwordValue.src = './assets/img/icon/hidden.png';
    passwordValue.classList.add('eye-icon');
  }
});

passwordValue.addEventListener('click', function () {
  if (passwordValue.classList.contains('eye-icon')) {
    if (passwordInput.type == 'password') {
      passwordValue.src = './assets/img/icon/show.png';
      passwordInput.type = 'text';
    } else {
      passwordValue.src = './assets/img/icon/hidden.png';
      passwordInput.type = 'password';
    }
  }
});

function setLogoForWidth() {
  if (window.innerWidth <= 1180) {
    logo.src = 'assets/img/logo/logo_white.png';
  } else {
    logo.src = 'assets/img/logo/logo_dark.png';
  }
}

function animateLogo() {
  logo.classList.add('logo-zoom');
  setTimeout(() => {
    logo.classList.remove('logo-zoom');
    logo.src = 'assets/img/logo/logo_dark.png';
    headerLogo.classList.add('fade-out');
  }, 900);
}

function init() {
  logo = document.getElementById('start-logo');
  headerLogo = document.querySelector('.main-header-logo');
  logo.classList.remove('preload');
  setLogoForWidth();
  animateLogo();
}

function loginUser(event) {
  checkUser(event);
}

async function checkUser(event) {
  event.preventDefault();
  let mail = document.getElementById('email');
  let password = document.getElementById('password');
  let findUser = false;
  try {
    let response = await fetch(BASE_URL + '/login' + '.json');
    if (response.ok) {
      const userDataObject = await response.json();
      if (userDataObject) {
        const userKey = Object.keys(userDataObject);
        for (i = 0; i < userKey.length; i++) {
          const userID = userKey[i];
          const userObjekt = userDataObject[userID];
          if (mail.value == userObjekt.mail && password.value == userObjekt.password) {
            findUser = true;
            let announcedUser = userObjekt.name;
            if (userObjekt.surname && userObjekt.surname.trim() !== '') {
              announcedUser += ' ' + userObjekt.surname;
            }
            storeAnnoncedUserName(announcedUser);
            break;
          }
        }
        if (findUser === true) {
          localStorage.setItem('showGreeting', 'true');
          console.log('User gefunden');
          window.location.href = '/assets/html/summery.html';
          resetForm();
        } else {
          console.log('User nicht gefunden oder Eingaben falsch');
          document.getElementById('login-failed').classList.remove('d-none');
          resetForm();
          resetPwIcon();
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

let resetForm = () => document.getElementById('login-form').reset();

let resetPwIcon = () => {
  passwordValue.src = './assets/img/icon/lock.png';
  passwordInput.type = 'password';
  passwordValue.classList.remove('eye-icon');
};

let storeAnnoncedUserName = (announcedUser) => {
  localStorage.setItem('announcedUser', JSON.stringify(announcedUser));
};

function logginAsGuest() {
  let guestUser = 'Guest Guest';
  localStorage.setItem('announcedUser', JSON.stringify(guestUser));
  localStorage.setItem('showGreeting', 'true');
  window.location.href = 'assets/html/summery.html';
}

let PrivacyPolicy = '/assets/html/privacy-policy_external.html';
let LegalNotice = '/assets/html/legal-notice_external.html';

function privacyPolicyMPA() {
  let guestUser = 'Guest Guest';
  console.log(guestUser);
  localStorage.setItem('announcedUser', JSON.stringify(guestUser));
  console.log(JSON.parse(localStorage.getItem('announcedUser')));
  window.location.href = PrivacyPolicy;
}

function legalNoticeMPA() {
  let guestUser = 'Guest Guest';
  console.log(guestUser);
  localStorage.setItem('announcedUser', JSON.stringify(guestUser));
  console.log(JSON.parse(localStorage.getItem('announcedUser')));
  window.location.href = LegalNotice;
}
