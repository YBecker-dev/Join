const BASE_URL = "https://authenticationprototyp-default-rtdb.europe-west1.firebasedatabase.app/"
let button = document.getElementById('signup-btn');
let checkbox = document.getElementById('accept');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let passwordConfirmInput = document.getElementById('password-confirm');

function init() {
 // handleFormSubmit();
}

//function handleFormSubmit() {
//  const form = document.getElementById('register-form');
//  if (form) {
//    form.addEventListener('submit', formSubmit);
//  }
//}

function successRegister(event) {
  
  if (allFieldsFilledCorrect()) {
    console.log('hier fetchen ? ')
    checkUserOnRegistration(event);
    //
  } else {
    checkAllFields();
    console.log('Formular ist nicht korrekt ausgefüllt!');
  }
}

async function checkUserOnRegistration(event){
  event.preventDefault();
  try{
    let response = await fetch(BASE_URL+"/login"+".json");
    if(response.ok){
      const userDataObject = await response.json();
      let mailAlreadyExist = false;
        if(userDataObject){
            const userkey = Object.keys(userDataObject);
            for(i=0; i< userkey.length; i++){
                const userId = userkey[i]; // Objektindex 
                const userObjekt = userDataObject[userId];
                if(emailInput.value == userObjekt.mail){
                  console.log('Email bereits an ein anderes Konto gebunden')
                  resetForm()
                  mailAlreadyExist=true;
                  break;
                
                }
              }if(!mailAlreadyExist){
                console.log("Mail an kein bestehendes Konto gebunden")
                await addUser();
              }
      }else{
        addUser(); // Für den Fall das die DB keine Einträge enthält
      }
    }
  }catch(error){
    console.error(error);
  }

}

async function addUser(){
  let user = {
    "name": nameInput.value,
    "mail": emailInput.value,
    "password": passwordInput.value
  }
  try{
      let response = await fetch(BASE_URL+"login"+".json",{
        method : "POST",
        headers : {"content-Type":"application/json"},
        body : JSON.stringify(user),
      })
      if(response.ok){
        console.log("Daten wurden verschickt");
        showSuccessMessage();
        resetForm()
      }else{
        console.log("Ein Fehler ist aufgetreten")
      }
  }catch(error){
    console.error(error);
  }
}

let resetForm = () => document.getElementById("register-form").reset()

function showSuccessMessage() {
  let successSection = document.getElementById('success-register-section');
  successSection.classList.remove('d-none');
  setTimeout(() => {
    window.location.href = '../../index.html';
  }, 1500);
}

function allFieldsFilledCorrect() {
  return (
    nameInput.value.length >= 3 &&
    /^[A-Za-zÄÖÜäöüß\s\-]+$/.test(nameInput.value) &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.value) &&
    passwordInput.value.length >= 8 &&
    passwordConfirmInput.value === passwordInput.value &&
    checkbox.checked
  );
}



function formSubmit(event) {
  event.preventDefault();
  if (allFieldsFilledCorrect()) {
    showSuccessMessage();
  } else {
    checkAllFields();
  }
}

function checkAllFields() {
  checkName();
  checkEmail();
  checkPassword();
  checkPasswordConfirm();
  checkCheckbox();
}

function checkName() {
  nameWarning = document.getElementById('name-warning');
  if (nameInput.value.length < 3 || !/^[A-Za-zÄÖÜäöüß\s\-]+$/.test(nameInput.value)) {
    nameInput.classList.add('input-error');
    nameWarning.classList.remove('d-none');
  } else {
    nameInput.classList.remove('input-error');
    nameWarning.classList.add('d-none');
  }
}

function checkEmail() {
  emailWarning = document.getElementById('email-warning');
  if (!/^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/.test(emailInput.value)) {
    emailInput.classList.add('input-error');
    emailWarning.classList.remove('d-none');
  } else {
    emailInput.classList.remove('input-error');
    emailWarning.classList.add('d-none');
  }
}

function checkPassword() {
  passwordWarning = document.getElementById('password-warning');
  if (passwordInput.value.length < 8 || !/[A-ZÄÖÜ]/.test(passwordInput.value)) {
    passwordInput.classList.add('input-error');
    passwordWarning.classList.remove('d-none');
  } else {
    passwordInput.classList.remove('input-error');
    passwordWarning.classList.add('d-none');
  }
}

function checkPasswordConfirm() {
  passwordConfirmWarning = document.getElementById('password-confirm-warning');
  if (passwordConfirmInput.value !== passwordInput.value || !passwordConfirmInput.value) {
    passwordConfirmInput.classList.add('input-error');
    passwordConfirmWarning.classList.remove('d-none');
  } else {
    passwordConfirmInput.classList.remove('input-error');
    passwordConfirmWarning.classList.add('d-none');
  }
}

function checkCheckbox() {
  if (!checkbox.checked) {
    checkbox.classList.add('input-error');
  } else {
    checkbox.classList.remove('input-error');
  }
}
