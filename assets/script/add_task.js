selectedContacts = [];
let urgentButton = document.getElementById('urgent');
let mediumButton = document.getElementById('medium');
let lowButton = document.getElementById('low');

async function initAddTask() {
  selectedContacts = [];
  await loadContacts();
  setPriority('medium');
  addFormValidation('add-task-form');
  document.addEventListener('click', function () {
    handleDropdown('assigned-to-dropdown-options', 'assigned-to-arrow', 'close');
    handleDropdown('category-dropdown-options', 'category-selected-arrow', 'close');
    clearAssignedTo();
  });
}

function handleDropdown(dropdownId, arrowId, action = 'toggle') {
  let dropdown = document.getElementById(dropdownId);
  let arrow = arrowId ? document.getElementById(arrowId) : null;
  if (!dropdown) return;

  if (action === 'open') {
    openDropdownWithAnimation(dropdownId);
    toggleArrowRotation(arrow, true);
    clearAssignedTo();
  } else if (action === 'close') {
    closeDropdownWithAnimation(dropdownId);
    toggleArrowRotation(arrow, false);
  } else {
    let isOpen = dropdown.classList.contains('show');
    if (isOpen) {
      closeDropdownWithAnimation(dropdownId);
      toggleArrowRotation(arrow, false);
    } else {
      openDropdownWithAnimation(dropdownId);
      toggleArrowRotation(arrow, true);
    }
  }
}

function toggleArrowRotation(arrow, isOpen) {
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

function togglePriority(priority, prefix = '') {
  const ids = [prefix + 'urgent', prefix + 'medium', prefix + 'low'];
  ids.forEach((id) => {
    let btn = document.getElementById(id);
    if (btn) btn.classList.remove('active', 'urgent', 'medium', 'low');
  });
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
  if (!contactsRef) return;
  if (!Array.isArray(contacts)) return;
  let html = '';
  let lowerSearch = searchTerm.trim().toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i] && contacts[i].name) {
      let name = contacts[i].name.trim().toLowerCase();
      if (lowerSearch === '' || name.startsWith(lowerSearch)) {
        let checked = selectedContacts.includes(i) ? 'checked' : '';
        html += assignedToDropdownHTML(contacts, i, checked);
      }
    }
  }
  contactsRef.innerHTML = html;
  animatedSearch(contactsRef, searchTerm);
}

function animatedSearch(contactsRef, searchTerm) {
  if (!contactsRef.classList.contains('show')) return;
  contactsRef.classList.remove('expanded');
  let maxDropdownHeight = 332;
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

function onContactCheckboxClick(i, checkbox) {
  changeColorIfItsChecked(i, checkbox.checked);
  toggleContactSelection(i);
  checkCheckbox(checkbox);
}

function checkCheckbox(divElement) {
  let checkbox = divElement.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  }
}

function changeColorIfItsChecked(i, checked) {
  let userDropdownRef = document.getElementById('user-dropdown-' + i);
  let assignedContactRef = document.getElementById('assigned-contact-' + i);
  let userNameDropdownRef = document.getElementById('user-name-dropdown-' + i);
  if (!userDropdownRef || !assignedContactRef || !userNameDropdownRef) return;

  userDropdownRef.classList.toggle('checked-assigned-to', checked);
  assignedContactRef.classList.toggle('checked-assigned-to', checked);
  userNameDropdownRef.classList.toggle('checked-assigned-to', checked);
}

function selectCustomOption(element) {
  let categoryDropdown = document.getElementById('category-dropdown-selected');
  if (!categoryDropdown) return;
  let p = categoryDropdown.querySelector('p');
  if (p) p.textContent = element.textContent;
  handleDropdown('category-dropdown-options', 'category-selected-arrow', 'close');
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
      <div class="contact-items" style="background-color:${contact.color};">
        <span>${contact.initials}</span>
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
    showWrapperCreateTask();
    setTimeout(() => {
      closeCreateTask();
      loadContent('board.html');
    }, 1000);
    return false;
  }
  return valid;
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

function preventEnterSubmit(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    return false;
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
  document.querySelectorAll('.subtask-item').forEach((item) => {
    let text = item.querySelector('li').textContent.trim();
    subtasks[subtasks.length] = {
      text: text,
      status: 'unchecked',
    };
  });

  let assignedTo = [];
  for (let i = 0; i < selectedContacts.length; i++) {
    assignedTo[assignedTo.length] = contacts[selectedContacts[i]].id;
  }

  let sequence = 0;
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json');
  let tasks = await response.json();
  let usedIds = [];
  if (tasks) {
    let tasksArr = Object.values(tasks);
    for (let i = 0; i < tasksArr.length; i++) {
      let task = tasksArr[i];
      if (task.sequence != null && task.status === 'todo') {
        if (task.sequence >= sequence) {
          sequence = task.sequence + 1;
        }
      }
      if (task.addTaskId != null) {
        usedIds[usedIds.length] = task.addTaskId;
      }
    }
  }

  let addTaskId = 0;
  for (let i = 0; i <= usedIds.length; i++) {
    let found = false;
    for (let j = 0; j < usedIds.length; j++) {
      if (usedIds[j] == i) {
        found = true;
      }
    }
    if (!found) {
      addTaskId = i;
      i = usedIds.length + 1;
    }
  }

  let priority = '';
  if (document.getElementById('urgent')?.classList.contains('active')) priority = 'Urgent';
  if (document.getElementById('medium')?.classList.contains('active')) priority = 'Medium';
  if (document.getElementById('low')?.classList.contains('active')) priority = 'Low';

  let taskData = {
    addTaskId,
    title,
    description,
    date,
    category: categoryText,
    subtasks,
    assignedTo,
    priority,
    status: 'todo',
    sequence: sequence,
  };

  await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
}

function openDropdownWithAnimation(id) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  if (dropdown.classList.contains('show') && dropdown.style.maxHeight === '332px') {
    return;
  }
  dropdown.classList.add('show');
  dropdown.classList.remove('hidden');
  dropdown.style.maxHeight = '0';
  dropdown.style.opacity = '0';
  setTimeout(() => {
    dropdown.style.maxHeight = '332px';
    dropdown.style.opacity = '1';
  }, 50);
}

function closeDropdownWithAnimation(id) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;
  if (!dropdown.classList.contains('show') && !dropdown.classList.contains('expanded')) return;
  dropdown.classList.remove('expanded', 'show', 'hidden');
  dropdown.classList.add('closing');
  setTimeout(() => {
    dropdown.classList.remove('closing');
    dropdown.classList.add('hidden');
    dropdown.style.maxHeight = '';
    dropdown.style.opacity = '';
  }, 300);
}
