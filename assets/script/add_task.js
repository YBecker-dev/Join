function initAddTask() {
  loadContacts(contact);
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

//test
function loadContacts(contact) {
  if (!Array.isArray(contact)) return;
  const select = document.getElementById('assigned-to');
  select.innerHTML = '<option value="">Select contacts to assign</option>';
  for (let i = 0; i < contact.length; i++) {
    const option = document.createElement('option');
    option.value = contact[i].phonenumber;
    option.textContent = contact[i].name + ' (' + contact[i].phonenumber + ')';
    select.appendChild(option);
  }
}

function toggleCustomDropdown() {
  document.getElementById('custom-dropdown-options').classList.toggle('hidden');
}

function selectCustomOption(element) {
  document.getElementById('custom-dropdown-selected').textContent = element.textContent;
  document.getElementById('custom-dropdown-options').classList.add('hidden');
}
