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
  if (contactsRef) contactsRef.classList.add('hidden');
  if (categoryRef) categoryRef.classList.add('hidden');
  if (assignedArrow) assignedArrow.style.transform = 'rotate(0deg)';
  if (categoryArrow) categoryArrow.style.transform = 'rotate(0deg)';
  clearAssignedTo();
}

function toggleDropdown(dropdownId, arrowId) {
  let dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
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
  if (selectedBtn) selectedBtn.classList.add('active');
  setPriority(priority);
}

function setPriority(priority) {
  let urgentButton = document.getElementById('urgent');
  let mediumButton = document.getElementById('medium');
  let lowButton = document.getElementById('low');
  if (urgentButton) urgentButton.classList.remove('urgent');
  if (mediumButton) mediumButton.classList.remove('medium');
  if (lowButton) lowButton.classList.remove('low');
  if (priority === 'urgent' && urgentButton) urgentButton.classList.add('urgent');
  if (priority === 'medium' && mediumButton) mediumButton.classList.add('medium');
  if (priority === 'low' && lowButton) lowButton.classList.add('low');
}

function toggleArrowRotation(arrowId, isOpen) {
  let arrow = document.getElementById(arrowId);
  if (arrow) {
    if (isOpen) {
      arrow.style.transform = 'rotate(180deg)';
      arrow.classList.add('arrow-hover');
    } else {
      arrow.style.transform = 'rotate(0deg)';
      arrow.classList.remove('arrow-hover');
    }
  }
}

function openDropdown() {
  let dropdown = document.getElementById('assigned-to-dropdown-options');
  if (dropdown) dropdown.classList.remove('hidden');
}

function assignedToDropdown(searchTerm = '') {
  let contactsRef = document.getElementById('assigned-to-dropdown-options');
  if (!contactsRef) return;
  let html = '';
  let lowerSearch = searchTerm.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(lowerSearch)) {
      const checked = selectedContacts.includes(i) ? 'checked' : '';
      html += assignedToDropdownHTML(contacts, i, checked);
    }
  }
  contactsRef.innerHTML = html;
}

function checkCheckbox(divElement) {
  let checkbox = divElement.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  }
}

function selectCustomOption(element) {
  toggleDropdown('category-dropdown-options', 'category-selected-arrow');
  let categoryDropdown = document.getElementById('category-dropdown-selected');
  if (!categoryDropdown) return;
  let p = categoryDropdown.querySelector('p');
  if (p) p.textContent = element.textContent;
  let dropdownOptions = document.getElementById('category-dropdown-options');
  if (dropdownOptions) dropdownOptions.classList.add('hidden');
}

function addFormValidation(formId) {
  let form = document.getElementById(formId);
  if (!form) return;
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
  if (!container) return;
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
    saveTaskToFirebase(); 
    clearFormInputs();
    loadContent('testboard.html');
    return false;
  }
  return valid;
}

function checkTitle() {
  let input1 = document.querySelector('input[name="add-task-input1"]');
  let input1Warning = document.getElementById('add-task-input1-warning');
  if (!input1 || !input1.value.trim()) {
    if (input1) input1.classList.add('input-error');
    if (input1Warning) input1Warning.classList.remove('d-none');
    return false;
  }
  return true;
}

function checkDate() {
  let input2 = document.querySelector('input[name="add-task-input2"]');
  let input2Warning = document.getElementById('add-task-input2-warning');
  if (!input2 || !input2.value.trim()) {
    if (input2) input2.classList.add('input-error');
    if (input2Warning) input2Warning.classList.remove('d-none');
    return false;
  }
  return true;
}

function checkCategory() {
  let category = document.getElementById('category-dropdown-selected');
  let categoryWarning = document.getElementById('category-dropdown-warning');
  if (!category) return false;
  let p = category.querySelector('p');
  let categoryText = p ? p.textContent.trim() : '';
  if (categoryText === 'Select a task category' || categoryText === '') {
    category.classList.add('input-error');
    if (categoryWarning) categoryWarning.classList.remove('d-none');
    return false;
  }
  return true;
}

function showError(errorId, inputId, isCategory = false) {
  let warningElement = document.getElementById(errorId);
  let inputElement = document.getElementById(inputId);
  if (!warningElement || !inputElement) return;
  let fieldIsEmpty;
  if (isCategory) {
    let categoryText = '';
    let categoryTextElement = inputElement.querySelector('p');
    if (categoryTextElement) {
      categoryText = categoryTextElement.textContent.trim();
    }
    if (categoryText === '' || categoryText === 'Select a task category') {
      fieldIsEmpty = true;
    } else {
      fieldIsEmpty = false;
    }
  } else {
    if (inputElement.value.trim() === '') {
      fieldIsEmpty = true;
    } else {
      fieldIsEmpty = false;
    }
  }
  if (fieldIsEmpty) {
    warningElement.classList.remove('d-none');
  } else {
    warningElement.classList.add('d-none');
  }
}

function eventBubbling(event) {
  event.stopPropagation();
}

function pushSubtaskInput(event) {
  let input = document.getElementById('add-task-input4');
  let container = document.getElementById('subtasks-container');
  if (!input || !container) return;
  if (!event.key || event.key === 'Enter') {
    if (event.key === 'Enter') event.preventDefault();
    if (input.value.trim()) {
      let subtaskDiv = document.createElement('div');
      subtaskDiv.className = 'subtask-item';
      subtaskDiv.setAttribute('onclick', 'editSubtask(this)');
      subtaskDiv.innerHTML = pushSubtaskInputHTML(input.value.trim());
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

function clearSubtaskInput() {
  let input = document.getElementById('add-task-input4');
  if (input) input.value = '';
}

function clearAssignedTo() {
  let input = document.getElementById('add-task-input3');
  if (input) input.value = '';
}

function clearSubtaskElements() {
  let container = document.getElementById('subtasks-container');
  if (container) container.innerHTML = '';
}

function deleteSubtask(element) {
  let subtaskItem = element.closest('.subtask-item');
  let editSubtaskItem = element.closest('.subtask-item-edit');
  if (subtaskItem) subtaskItem.remove();
  if (editSubtaskItem) editSubtaskItem.remove();
}

function showPlusIcon() {
  let iconSpan = document.getElementById('subtasks-icon');
  if (iconSpan) {
    iconSpan.innerHTML = `
      <img src="../img/icon/add_task_icon/plus.png" alt="Add" onclick="pushSubtaskInput(event)">
    `;
  }
}

function clearInputTexts() {
  let inputText = document.getElementById('add-task-form');
  if (inputText) inputText.reset();
}

function clearWarningMessages() {
  let warnings = document.getElementsByClassName('input-warning');
  for (let i = 0; i < warnings.length; i++) {
    warnings[i].classList.add('d-none');
  }
}

function clearCategory() {
  let category = document.getElementById('category-dropdown-selected');
  if (category) {
    let p = category.querySelector('p');
    if (p) p.textContent = 'Select a task category';
  }
}

function editSubtask(element) {
  let listItem = element.closest('.subtask-item');
  let span = listItem ? listItem.querySelector('span') : null;
  if (!span) return;
  let oldText = span.textContent.trim();

  let newDiv = document.createElement('div');
  if (newDiv) {
    newDiv.className = 'subtask-item-edit';
    newDiv.innerHTML = editSubtaskInputHTML(oldText);
  }

  if (listItem.parentNode) {
    listItem.parentNode.replaceChild(newDiv, listItem);
  }
}

function saveSubtaskEdit(event, inputElement) {
  if (event && event.key && event.key !== 'Enter') return;
  if (!inputElement.value) {
    inputElement = inputElement.closest('.input-with-icons').querySelector('input');
  }
  if (!inputElement) return;

  let newText = inputElement.value;
  let subtaskItem = inputElement.closest('.subtask-item-edit');
  if (!subtaskItem) return;

  let subtaskDiv = document.createElement('div');
  subtaskDiv.setAttribute('onclick', 'editSubtask(this)');
  subtaskDiv.className = 'subtask-item';
  subtaskDiv.innerHTML = saveSubtaskEditHTML(newText);

  subtaskItem.parentNode.replaceChild(subtaskDiv, subtaskItem);
}

function onSubtaskInputChange() {
  let input = document.getElementById('add-task-input4');
  if (input && input.value.trim()) {
    showSaveCancelIcons();
  } else {
    showPlusIcon();
  }
}

function showSaveCancelIcons() {
  let iconSpan = document.getElementById('subtasks-icon');
  if (iconSpan) {
    iconSpan.innerHTML = showSaveCancelIconsHtml();
  }
}

function onSubtaskInputKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    pushSubtaskInput(event);
  }
}

function editSubtaskInputHTML(oldText) {
  return `
<div class="input-with-icons">
  <input id="subtask-edit-input" type="text" class="edit-subtask-input input-border-none" value="${oldText}"
         onkeydown="saveSubtaskEdit(event, this)">
  <img class="hover-icon" onclick="deleteSubtask(this)" src="../img/icon/add_task_icon/subtasks/delete.png">
  <div class="subtask-wrapper-edit"></div>
  <img class="hover-icon" onclick="saveSubtaskEdit(event, this)" src="../img/icon/add_task_icon/subtasks/check.png">
</div>
  `;
}

function showSaveCancelIconsHtml() {
  return `
      <img class="hover-icon" src="../img/icon/add_task_icon/subtasks/clear.png" onclick="clearSubtaskInput()">
      <div class="subtask-wrapper"></div>
      <img class="hover-icon" id="submit-subtask" onclick="pushSubtaskInput(event)" src="../img/icon/add_task_icon/subtasks/check.png">
    `;
}

function saveSubtaskEditHTML(newText) {
  return `
    <span><li>${newText}</li></span>
    <div class="subtask-actions">
      <img src="../img/icon/add_task_icon/subtasks/edit.png" onclick="editSubtask(this)" />
      <div class="subtask-wrapper"></div>
      <img src="../img/icon/add_task_icon/subtasks/delete.png" onclick="deleteSubtask(this)" />
    </div>
  `;
}

function pushSubtaskInputHTML(text) {
  return `
        <span><li>${text}</li></span>
        <div class="subtask-actions">
          <img src="../img/icon/add_task_icon/subtasks/edit.png" onclick="editSubtask(this)" />
          <div class="subtask-wrapper"></div>
          <img src="../img/icon/add_task_icon/subtasks/delete.png" onclick="deleteSubtask(this)" />
        </div>
      `;
}

function assignedToDropdownHTML(contacts, i, checked) {
  return `
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

function enableCreateTaskButton() {
  let title = document.getElementById('title');
  let date = document.getElementById('date');
  let categorySelected = document.getElementById('category-dropdown-selected');
  let button = document.getElementById('create-task-button');
  if (!title || !date || !categorySelected || !button) return;
  let categoryText = '';
  let pElement = categorySelected.querySelector('p');
  if (pElement) {
    categoryText = pElement.textContent.trim();
  } else {
    categoryText = '';
  }
  let categoryChosen = categoryText !== '' && categoryText !== 'Select a task category';
  let allFilled = title.value.trim() !== '' && date.value.trim() !== '' && categoryChosen;
  button.disabled = !allFilled;
}

async function saveTaskToFirebase() {

  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let date = document.getElementById('date').value;

  let categorySelected = document.getElementById('category-dropdown-selected');
  let categoryText = '';
  let pElement = categorySelected.getElementsByTagName('p')[0];
  if (pElement) categoryText = pElement.textContent.trim();

  let subtasks = [];
  document.querySelectorAll('.subtask-item li').forEach(li => subtasks.push(li.textContent));

  let assignedTo = [];
  document.querySelectorAll('.show-contacts-add-task h3').forEach(h3 => assignedTo.push(h3.textContent));

  let priority = '';
  if (document.getElementById('urgent')?.classList.contains('active')) priority = 'Urgent';
  if (document.getElementById('medium')?.classList.contains('active')) priority = 'Medium';
  if (document.getElementById('low')?.classList.contains('active')) priority = 'Low';

  let taskData = {
    title,
    description,
    date,
    category: categoryText,
    subtasks,
    assignedTo,
    priority
  };

  await fetch(BASE_URL_TASKS + "tasks.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData)
  });
}