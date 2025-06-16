let selectedContacts = [];
let urgentButton = document.getElementById('urgent');
let mediumButton = document.getElementById('medium');
let lowButton = document.getElementById('low');

let contacts = [
  { name: 'John Doe', initials: 'JD' },
  { name: 'Jane Smith', initials: 'JS' },
  { name: 'Alice Johnson', initials: 'AJ' },
  { name: 'Bob Brown', initials: 'BB' },
];

function initAddTask() {
  setPriority('medium');
}

function togglePriority(priority) {
  let priorities = ['urgent', 'medium', 'low'];
  priorities.forEach((id) => {
    let btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });
  let selectedBtn = document.getElementById(priority);
  selectedBtn.classList.add('active');
  setPriority(priority);
}

function setPriority(priority) {
  let urgentButton = document.getElementById('urgent');
  let mediumButton = document.getElementById('medium');
  let lowButton = document.getElementById('low');
  urgentButton.classList.remove('urgent');
  mediumButton.classList.remove('medium');
  lowButton.classList.remove('low');
  if (priority === 'urgent') urgentButton.classList.add('urgent');
  if (priority === 'medium') mediumButton.classList.add('medium');
  if (priority === 'low') lowButton.classList.add('low');
}

function toggleCustomDropdown() {
  document.getElementById('category-dropdown-options').classList.toggle('hidden');
  toggleArrowRotation('category-selected-arrow');
}

function assignedToDropdown(searchTerm = '') {
  let contactsRef = document.getElementById('assigned-to-dropdown-options');
  if (searchTerm === '') {
    contactsRef.classList.toggle('hidden');
    toggleArrowRotation('assigned-to-arrow');
  } else {
    contactsRef.classList.remove('hidden');
  }
  let html = '';
  let lowerSearch = searchTerm.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(lowerSearch)) {
      const checked = selectedContacts.includes(i) ? 'checked' : '';
      html += `
        <div class="assigned-contacts" id="contacts">
          <div class="user-dropdown">
            <div class="user-name-dropdown">
              <span>${contacts[i].initials}</span>
            </div>
            <div>
              <p>${contacts[i].name}</p>
            </div>
          </div>
          <div>
            <input type="checkbox" class="checkbox" ${checked} onclick="toggleContactSelection(${i}, event)">
          </div>
        </div>
      `;
    }
  }
  contactsRef.innerHTML = html;
}

function selectCustomOption(element) {
  let categoryDropdown = document.getElementById('category-dropdown-selected');
  let p = categoryDropdown.querySelector('p');
  p.textContent = element.textContent;
  let dropdownOptions = document.getElementById('category-dropdown-options');
  dropdownOptions.classList.add('hidden');w
}

function addFormValidation(formId) {
  let form = document.getElementById(formId);
  form.addEventListener('submit', function (event) {
    let inputs = this.querySelectorAll('input:not([name="add-task-input3"]):not([type="checkbox"]), textarea');
    let allFilled = true;
    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });
    if (!allFilled) {
      event.preventDefault();
    }
  });
}

function showContactsAddTask() {
  const container = document.getElementById('show-contacts-add-task');
  container.classList.remove('d-none');
  let html = '';
  for (let i = 0; i < selectedContacts.length; i++) {
    const contact = contacts[selectedContacts[i]];
    html += `
      <div class="contact-items">
        <h3>${contact.initials}</h3>
      </div>
    `;
  }
  container.innerHTML = html;
}

function toggleContactSelection(index) {
  let pos = selectedContacts.indexOf(index);
  if (pos === -1) {
    selectedContacts.push(index);
  } else {
    selectedContacts.splice(pos, 1);
  }
  showContactsAddTask();
}

function toggleArrowRotation(arrowId) {
  let arrow = document.getElementById(arrowId);
  if (arrow) {
    arrow.style.transform = arrow.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}

function validateAddTaskForm() {
  let send = true;
  checkTitle();
  checkDate();
  checkCategory();
  return send;
}

function checkTitle() {
  let input1 = document.querySelector('input[name="add-task-input1"]');
  let input1Warning = document.getElementById('add-task-input1-warning');
  if (!input1.value.trim()) {
    input1.classList.add('input-error');
    input1Warning.classList.remove('d-none');
  }
}

function checkDate() {
  let input2 = document.querySelector('input[name="add-task-input2"]');
  let input2Warning = document.getElementById('add-task-input2-warning');
  if (!input2.value.trim()) {
    input2.classList.add('input-error');
    input2Warning.classList.remove('d-none');
  }
}

function checkCategory() {
  let category = document.getElementById('category-dropdown-selected');
  let categoryWarning = document.getElementById('category-dropdown-warning');
  let categoryText = category.querySelector('p').textContent.trim();
  if (categoryText === 'Select a task category' || categoryText === '') {
    category.classList.add('input-error');
    categoryWarning.classList.remove('d-none');
  }
}

function closeAssignedToDropdown() {
  let dropdown = document.getElementById('assigned-to-dropdown-options');
  dropdown.classList.add('hidden');
  toggleArrowRotation('assigned-to-arrow');
}

function eventBubbling(event) {
  event.stopPropagation();
}

function closeError(inputId, warningId) {
  let input = document.getElementById(inputId) || document.querySelector(`[name="${inputId}"]`);
  let warning = document.getElementById(warningId);
  if (input) input.classList.remove('input-error');
  if (warning) warning.classList.add('d-none');
}

function pushSubtaskInput(event) {
  let input = document.getElementById('add-task-input4');
  let container = document.getElementById('subtasks-container');
  if (!event.key || event.key === 'Enter') {
    if (event.key === 'Enter') event.preventDefault();
    if (input.value.trim()) {
      let div = document.createElement('div');
      div.className = 'subtask-item';
      div.textContent = input.value.trim();
      container.appendChild(div);
      input.value = '';
    }
  }
}

function preventEnterSubmit(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    return false;
  }
}
