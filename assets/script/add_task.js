function initAddTask() {
}

function togglePriority(priority) {
  const urgentButton = document.getElementById('urgent');
  const mediumButton = document.getElementById('medium');
  const lowButton = document.getElementById('low');

  if (priority === 'urgent') {
    urgentButton.classList.toggle('urgent');
    mediumButton.classList.remove('medium');
    lowButton.classList.remove('low');
  } else if (priority === 'medium') {
    urgentButton.classList.remove('urgent');
    mediumButton.classList.toggle('medium');
    lowButton.classList.remove('low');
  } else if (priority === 'low') {
    urgentButton.classList.remove('urgent');
    mediumButton.classList.remove('medium');
    lowButton.classList.toggle('low');
  }
}

function toggleCustomDropdown() {
  document.getElementById('category-dropdown-options').classList.toggle('hidden');
}

function assignedToDropdown() {
  let contactsRef = document.getElementById('assigned-to-dropdown-options');
  contactsRef.classList.toggle('hidden');
  html = '';
  for (let i = 0; i < contacts.length; i++) {
    html += `
      <div class="assigned-contacts" id="contacts">
        <div  class="user-dropdown">
          <div class="user-name-dropdown">
            <span>${contacts[i].initials}</span>
          </div>
          <div>
            <p>${contacts[i].name}</p>
          </div>
        </div>
        <div>
          <input type="checkbox" class="checkbox" oneclick="">
        </div>
      </div>
    `;
  }
  contactsRef.innerHTML = html;
}

function selectCustomOption(element) {
  document.getElementById('category-dropdown-selected').textContent = element.textContent;
  document.getElementById('category-dropdown-options').classList.add('hidden');
}


function addFormValidation(formId) {
  let form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function(event) {
    let inputs = this.querySelectorAll('input, textarea');
    let allFilled = true;
    inputs.forEach(function(input) {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });
    if (!allFilled) {
      event.preventDefault();
      alert('Bitte alle Felder ausfüllen!');
    }
  });
}