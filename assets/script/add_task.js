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
  addFormValidation('add-task-form');
  document.addEventListener('click', closeDropdown);
}

function closeDropdown() {
  let contactsRef = document.getElementById('assigned-to-dropdown-options');
  let assignedArrow = document.getElementById('assigned-to-arrow');
  let categoryRef = document.getElementById('category-dropdown-options');
  let categoryArrow = document.getElementById('category-selected-arrow');
  contactsRef.classList.add('hidden');
  categoryRef.classList.add('hidden');
  assignedArrow.style.transform = 'rotate(0deg)';
  categoryArrow.style.transform = 'rotate(0deg)';
  clearAssignedTo();
}

function toggleDropdown(dropdownId, arrowId) {
  let dropdown = document.getElementById(dropdownId);
  let isOpen = !dropdown.classList.contains('hidden');
  if (isOpen) {
    dropdown.classList.add('hidden');
    toggleArrowRotation(arrowId, false);
  } else {
    dropdown.classList.remove('hidden');
    toggleArrowRotation(arrowId, true);
  }
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

function toggleArrowRotation(arrowId, isOpen) {
  let arrow = document.getElementById(arrowId);
  if (arrow) {
    if (isOpen) {
      arrow.style.transform = 'rotate(180deg)';
    } else {
      arrow.style.transform = 'rotate(0deg)';
    }
  }
}

function openDropdown() {
  let dropdown = document.getElementById('assigned-to-dropdown-options');
  dropdown.classList.remove('hidden');
}

function assignedToDropdown(searchTerm = '') {
  let contactsRef = document.getElementById('assigned-to-dropdown-options');
  let html = '';
  let lowerSearch = searchTerm.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(lowerSearch)) {
      const checked = selectedContacts.includes(i) ? 'checked' : '';
      html += `
        <div class="assigned-contacts" onclick="checkCheckbox(this); toggleContactSelection(${i}, event);">
          <div class="user-dropdown">
            <div class="user-name-dropdown">
              <span>${contacts[i].initials}</span>
            </div>
            <div>
              <p>${contacts[i].name}</p>
            </div>
          </div>
          <div>
            <input type="checkbox" class="checkbox" ${checked} onclick="eventBubbling(event); toggleContactSelection(${i}, event);">
          </div>
        </div>
      `;
    }
  }
  contactsRef.innerHTML = html;
}

function checkCheckbox(divElement) {
  let checkbox = divElement.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;
  checkbox.dispatchEvent(new Event('change'));
}

function rotateAssignedToArrowOnInput() {
  let input = document.querySelector('input[name="add-task-input3"]');
  let arrow = document.getElementById('assigned-to-arrow');
  if (input.value.trim()) {
    arrow.style.transform = 'rotate(180deg)';
  } else {
    arrow.style.transform = 'rotate(0deg)';
  }
}

function selectCustomOption(element) {
  toggleDropdown('category-dropdown-options', 'category-selected-arrow');
  let categoryDropdown = document.getElementById('category-dropdown-selected');
  let p = categoryDropdown.querySelector('p');
  p.textContent = element.textContent;
  let dropdownOptions = document.getElementById('category-dropdown-options');
  dropdownOptions.classList.add('hidden');
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
  clearAssignedTo();
}

function validateAddTaskForm() {
  let valid = true;
  if (!checkTitle()) valid = false;
  if (!checkDate()) valid = false;
  if (!checkCategory()) valid = false;

  if (valid) {
    clearFormInputs();
    loadContent('board.html');
    console.log('Form submitted successfully');
    return false;
  } else {
    console.log('Form validation failed');
  }
  return false;
}

function checkTitle() {
  let input1 = document.querySelector('input[name="add-task-input1"]');
  let input1Warning = document.getElementById('add-task-input1-warning');
  if (!input1.value.trim()) {
    input1.classList.add('input-error');
    input1Warning.classList.remove('d-none');
    return false;
  }
  return true;
}

function checkDate() {
  let input2 = document.querySelector('input[name="add-task-input2"]');
  let input2Warning = document.getElementById('add-task-input2-warning');
  if (!input2.value.trim()) {
    input2.classList.add('input-error');
    input2Warning.classList.remove('d-none');
    return false;
  }
  return true;
}

function checkCategory() {
  let category = document.getElementById('category-dropdown-selected');
  let categoryWarning = document.getElementById('category-dropdown-warning');
  let categoryText = category.querySelector('p').textContent.trim();
  if (categoryText === 'Select a task category' || categoryText === '') {
    category.classList.add('input-error');
    categoryWarning.classList.remove('d-none');
    return false;
  }
  return true;
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
      let subtaskDiv = document.createElement('div');
      subtaskDiv.className = 'subtask-item';
      subtaskDiv.innerHTML = `
        <span><li>${input.value.trim()}</li></span>
        <div class="subtask-actions">
          <img src="../img/icon/add_task_icon/subtasks/edit.png" onclick="editSubtask(this)" />
          <div class="subtask-wrapper"></div>
          <img src="../img/icon/add_task_icon/subtasks/delete.png" onclick="deleteSubtask(this)" />
        </div>
      `;
      container.appendChild(subtaskDiv);
      input.value = '';
      showPlusIcon();
    }
  }
}

function preventEnterSubmit(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    return false;
  }
}

function clearFormInputs() {
  clearInputTexts();
  clearWarningMessages();
  clearCategory();
  showPlusIcon();
  clearSubtaskElements();
  clearCheckedContacts();
}

function clearCheckedContacts() {
  let selected = [...selectedContacts];
  for (let i = 0; i < selected.length; i++) {
    toggleContactSelection(selected[i]);
  }
}

function clearAssignedTo() {
  let assignedToInput = document.querySelector('input[name="add-task-input3"]');
  assignedToInput.value = '';
}

function clearSubtaskElements() {
  let container = document.getElementById('subtasks-container');
  container.innerHTML = '';
}

function deleteSubtask(element) {
  let subtaskItem = element.closest('.subtask-item');
  subtaskItem.remove();
}

function showPlusIcon() {
  let iconSpan = document.getElementById('subtasks-icon');
  iconSpan.innerHTML = `
    <img src="../img/icon/add_task_icon/plus.png" alt="Add" onclick="pushSubtaskInput(event)">
  `;
}

function clearInputTexts() {
  let form = document.getElementById('add-task-form');
  form.reset();
  let errors = document.getElementsByClassName('input-error');
  while (errors.length) {
    errors[0].classList.remove('input-error');
  }
}

function clearWarningMessages() {
  let warnings = document.getElementsByClassName('input-warning');
  for (let i = 0; i < warnings.length; i++) {
    warnings[i].classList.add('d-none');
  }
}

function clearCategory() {
  let cat = document.getElementById('category-dropdown-selected');
  if (cat) cat.querySelector('p').textContent = 'Select a task category';
}

function editSubtask(element) {
  let listItem = element.closest('.subtask-item');
  let span = listItem.querySelector('span');
  if (!span) return;
  let oldText = span.textContent.trim();
  span.outerHTML = editSubtaskInputHTML(oldText);;
}

function editSubtaskInputHTML(oldText) {
  return `
    <input type="text" class="edit-subtask-input" value="${oldText}" 
      onkeydown="saveSubtaskEdit(event, this)">
  `;
}

function onSubtaskInputChange() {
  let input = document.getElementById('add-task-input4');
  if (input.value.trim()) {
    showSaveCancelIcons();
  } else {
    showPlusIcon();
  }
}

function showSaveCancelIcons() {
  let iconSpan = document.getElementById('subtasks-icon');
  iconSpan.innerHTML = `
    <img src="../img/icon/add_task_icon/subtasks/clear.png" onclick="clearSubtaskInput()">
    <div class="subtask-wrapper"></div>
    <img id="submit-subtask" src="../img/icon/add_task_icon/subtasks/check.png" onclick="pushSubtaskInput(event)">
  `;
}

function onSubtaskInputKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    pushSubtaskInput(event);
  }
}
