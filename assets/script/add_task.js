selectedContacts = [];
let lastValidDate = '';
let lastDateLength = 0;
let urgentButton = document.getElementById('urgent');
let mediumButton = document.getElementById('medium');
let lowButton = document.getElementById('low');

async function initAddTask() {
  selectedContacts = [];
  await loadContacts();
  initFrameworkFunctions();
  setPriority('medium');
  addFormValidation('add-task-form');
  document.addEventListener('click', function () {
    handleDropdown('assigned-to-dropdown-options', 'assigned-to-arrow', 'close');
    handleDropdown('category-dropdown-options', 'category-selected-arrow', 'close');
    clearAssignedTo();
  });
  dateInputMinDate();
}

function dateInputMinDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${dd}/${mm}/${yyyy}`;
  const dateInput = document.getElementById('date');
  dateInput.setAttribute('min', minDate);
  dateInput.value = minDate;
}

function handleDropdown(dropdownId, arrowId, action = 'toggle') {
  let dropdown = document.getElementById(dropdownId);
  let arrow = arrowId ? document.getElementById(arrowId) : null;
  if (!dropdown) return;
  if (action === 'open') return setDropdownState(dropdownId, arrow, true);
  if (action === 'close') return setDropdownState(dropdownId, arrow, false);
  toggleDropdown(dropdown, dropdownId, arrow);
}

function togglePriority(priority, prefix = '') {
  let ids = [prefix + 'urgent', prefix + 'medium', prefix + 'low'];
  for (let i = 0; i < ids.length; i++) {
    let btn = document.getElementById(ids[i]);
    if (btn) btn.classList.remove('active', 'urgent', 'medium', 'low');
  }
  let selectedBtn = document.getElementById(prefix + priority.toLowerCase());
  if (selectedBtn) selectedBtn.classList.add('active', priority.toLowerCase());
  if (!prefix) setPriority(priority);
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

function assignedToDropdown(searchTerm = '') {
  let contactsRef = document.getElementById('assigned-to-dropdown-options');
  if (!contactsRef || !Array.isArray(contacts)) return;
  let html = getDropdownHTML(searchTerm);
  contactsRef.innerHTML = html;
  let filllicker = contactsRef.querySelector('.filllicker-assigned-to');
  if (filllicker) {
    filllicker.style.padding = contactsRef.classList.contains('show') ? '5px' : '0';
  }
  animatedSearch(contactsRef, searchTerm);
}

function getDropdownHTML(searchTerm) {
  let html = `<div class="filllicker-assigned-to"></div>`;
  let lowerSearch = searchTerm.trim().toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    html += getContactDropdownHTML(i, lowerSearch);
  }
  return html;
}

function getContactDropdownHTML(i, lowerSearch) {
  if (!contacts[i] || !contacts[i].name) return '';
  let name = contacts[i].name.trim().toLowerCase();
  if (lowerSearch === '' || name.startsWith(lowerSearch)) {
    let checked = selectedContacts.includes(i) ? 'checked' : '';
    return assignedToDropdownHTML(contacts, i, checked);
  }
  return '';
}

function onContactCheckboxClick(i, checkbox) {
  changeColorIfItsChecked(i, checkbox.checked);
  toggleContactSelection(i);
  checkCheckbox(checkbox);
}

function selectCustomOption(element) {
  let categoryDropdown = document.getElementById('category-dropdown-selected');
  if (!categoryDropdown) return;
  let p = categoryDropdown.querySelector('p');
  if (p) p.textContent = element.textContent;
  handleDropdown('category-dropdown-options', 'category-selected-arrow', 'close');
}

// send formular data to Firebase when all checks are passed
function addFormValidation(formId) {
  let form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function (event) {
    if (!areAllInputsFilled(this)) {
      event.preventDefault();
    }
  });
}

function areAllInputsFilled(form) {
  let inputs = form.querySelectorAll('input:not([name="add-task-input3"]):not([type="checkbox"]), textarea');
  return checkInputsFilled(inputs);
}

function validateAddTaskForm() {
  if (!isFormValid()) return false;
  handleValidForm();
  return false;
}

function isFormValid() {
  return checkTitle() && checkDate() && checkCategory();
}

function handleValidForm() {
  saveTaskToFirebase();
  showWrapperCreateTask();
  setTimeout(() => {
    closeCreateTask();
    window.location.href = 'board.html';
  }, 1000);
}

function showWrapperCreateTask() {
  let wrapper = document.getElementById('wrapper-create-task-section');
  if (wrapper) {
    wrapper.classList.remove('d-none');
  }
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

  // Prüfe Format DD/MM/YYYY
  const value = input2.value.trim();
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    input2.classList.add('input-error');
    if (input2Warning) input2Warning.classList.remove('d-none');
    return false;
  }

  // Prüfe, ob es ein echtes Datum ist
  const [day, month, year] = value.split('/').map(Number);
  const dateObj = new Date(year, month - 1, day);
  if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
    input2.classList.add('input-error');
    if (input2Warning) input2Warning.classList.remove('d-none');
    return false;
  }

  input2.classList.remove('input-error');
  if (input2Warning) input2Warning.classList.add('d-none');
  return true;
}

function checkCategory() {
  let categoryDropdownSelectedRef = document.getElementById('category-dropdown-selected');
  let categoryWarningRef = document.getElementById('category-dropdown-warning');
  if (!categoryDropdownSelectedRef) return false;
  let categoryText = getCategoryTextFromDropdown(categoryDropdownSelectedRef);
  if (categoryText === 'Select a task category') {
    showCategoryError(categoryDropdownSelectedRef, categoryWarningRef);
    return false;
  }
  return true;
}

function showError(errorId, inputId, isCategory) {
  let warningElement = document.getElementById(errorId);
  let inputElement = document.getElementById(inputId);
  if (!warningElement || !inputElement) return;
  let fieldIsEmpty = isCategory ? isCategoryFieldEmpty(inputElement) : isInputEmpty(inputElement);
  toggleWarning(warningElement, fieldIsEmpty);
}

function pushSubtaskInput(event) {
  let input = document.getElementById('add-task-input4');
  let container = document.getElementById('subtasks-container');
  if (!input || !container) return;
  if (!event.key || event.key === 'Enter') {
    if (event.key === 'Enter') event.preventDefault();
    if (input.value.trim()) {
      container.innerHTML += pushSubtaskInputHTML(input.value.trim());
      input.value = '';
      showPlusIcon();
    }
  }
}

function clearAllTaskFields() {
  clearAssignedTo();
  clearSubtaskInput();
  clearInputTexts();
  clearWarningMessages();
  clearCategory();
  showPlusIcon();
  clearSubtaskElements();
  clearCheckedContacts();
  subtasks = [];
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
      <img src="/assets/img/icon/add_task_icon/plus.png" alt="Add" onclick="pushSubtaskInput(event)">
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
  inputElement = inputElement.closest('.input-with-icons').querySelector('input');
  if (!inputElement) return;
  let newText = inputElement.value;
  let subtaskItem = inputElement.closest('.subtask-item-edit');
  if (!subtaskItem) return;
  let subtaskDiv = buildSubtaskDiv(newText);
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

function enableCreateTaskButton(dateInput) {
  let title = document.getElementById('title');
  let date = dateInput || document.getElementById('date') 
  let categorySelected = document.getElementById('category-dropdown-selected');
  let button = document.getElementById('create-task-button');
  if (!title || !date || !categorySelected || !button) return;
  sanitizeAndValidateDate(date);
  let categoryText = getCategoryTextFromSelected(categorySelected);
  let allFilled = areAllFieldsFilled(title, date, categoryText);
  button.disabled = !allFilled;
}

function sanitizeAndValidateDate(date) {
  date.value = date.value.replace(/[A-Za-z]/g, '');
  autoInsertSlashes(date);
  validateAndCorrectDate(date);
}

async function saveTaskToFirebase() {
  let taskData = await buildTaskData();
  await postTaskToServer(taskData);
}

function animateDropdown(animateDropdownId, open = true) {
  if (open) {
    openDropdownWithAnimation(animateDropdownId);
  } else {
    closeDropdownWithAnimation(animateDropdownId);
  }
}

function animatedSearch(contactsRef, searchTerm) {
  if (!contactsRef.classList.contains('show')) return;
  contactsRef.classList.remove('expanded');
  let maxDropdownHeight = 305;
  let contentHeight = contactsRef.scrollHeight;
  if (searchTerm.trim() !== '' && contentHeight < maxDropdownHeight) {
    contactsRef.style.maxHeight = contentHeight + 'px';
    contactsRef.style.overflowY = 'hidden';
  } else {
    contactsRef.style.maxHeight = maxDropdownHeight + 'px';
    contactsRef.style.overflowY = 'auto';
  }
  contactsRef.classList.add('expanded');
}

function handleCategoryOptionClick(event, optionElement) {
  eventBubbling(event);
  selectCustomOption(optionElement);
  enableCreateTaskButton();
  showError('category-dropdown-warning', 'category-dropdown-selected', true);
}
