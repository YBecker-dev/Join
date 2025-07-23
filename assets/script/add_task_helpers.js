function setDropdownState(dropdownId, arrow, open) {
  animateDropdown(dropdownId, open);
  toggleArrowRotation(arrow, open);
  if (open) {
    clearAssignedTo();
  }
}

function toggleDropdown(dropdown, dropdownId, arrow) {
  let isOpen = dropdown.classList.contains('show');
  setDropdownState(dropdownId, arrow, !isOpen);
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

function checkCheckbox(divElement) {
  let checkbox = divElement.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
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

function showContactsAddTask() {
  let container = document.getElementById('show-contacts-add-task');
  if (!container) return;
  container.classList.remove('d-none');
  let html = '';
  for (let i = 0; i < selectedContacts.length; i++) {
    const contact = contacts[selectedContacts[i]];
    html += getContactDropdownHTML(contact);
  }
  container.innerHTML = html;
}

function getCategoryTextFromDropdown(dropdownRef) {
  let categoryTextRef = dropdownRef.querySelector('p');
  if (categoryTextRef) {
    return categoryTextRef.textContent.trim();
  }
  return '';
}

function showCategoryError(dropdownRef, warningRef) {
  dropdownRef.classList.add('input-error');
  if (warningRef) warningRef.classList.remove('d-none');
}

function isCategoryFieldEmpty(inputElement) {
  let categoryTextElement = inputElement.querySelector('p');
  let categoryText = '';
  if (categoryTextElement) {
    categoryText = categoryTextElement.textContent.trim();
  }
  if (categoryText === '' || categoryText === 'Select a task category') {
    return true;
  }
  return false;
}

function isInputEmpty(inputElement) {
  if (inputElement.value.trim() === '') {
    return true;
  }
  return false;
}

function toggleWarning(warningElement, fieldIsEmpty) {
  if (fieldIsEmpty) {
    warningElement.classList.remove('d-none');
  } else {
    warningElement.classList.add('d-none');
  }
}

async function buildTaskData() {
  return {
    addTaskId: getNextTaskId(),
    title: getInputValue('title'),
    description: getInputValue('description'),
    date: getInputValue('date'),
    category: getCategoryText(),
    subtasks: getSubtasks(),
    assignedTo: getAssignedTo(),
    priority: getPriority(),
    status: 'todo',
    sequence: await getNextSequence(),
  };
}

async function postTaskToServer(taskData) {
  await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
}

async function getNextTaskId() {
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json');
  let tasks = await response.json();
  let usedIds = [];
  if (tasks) {
    Object.values(tasks).forEach((task) => {
      if (task.addTaskId != null) usedIds.push(task.addTaskId);
    });
  }
  for (let i = 0; i <= usedIds.length; i++) {
    if (!usedIds.includes(i)) return i;
  }
  return usedIds.length;
}

function getInputValue(id) {
  let inputRef = document.getElementById(id);
  return inputRef ? inputRef.value.trim() : '';
}

function getCategoryText() {
  let categoryDropdownSelectedRef = document.getElementById('category-dropdown-selected');
  let categoryTextRef = categoryDropdownSelectedRef ? categoryDropdownSelectedRef.querySelector('p') : null;
  return categoryTextRef ? categoryTextRef.textContent.trim() : '';
}

function getSubtasks() {
  let subtaskItemRefs = document.querySelectorAll('.subtask-item');
  return Array.from(subtaskItemRefs).map((subtaskItemRef) => {
    let subtaskLiRef = subtaskItemRef.querySelector('li');
    return { text: subtaskLiRef ? subtaskLiRef.textContent.trim() : '', status: 'unchecked' };
  });
}

function getAssignedTo() {
  let assignedIds = [];
  for (let i = 0; i < selectedContacts.length; i++) {
    if (contacts[selectedContacts[i]] && contacts[selectedContacts[i]].id) {
      assignedIds.push(contacts[selectedContacts[i]].id);
    }
  }
  return assignedIds;
}

function getPriority() {
  let urgentButtonRef = document.getElementById('urgent');
  let mediumButtonRef = document.getElementById('medium');
  let lowButtonRef = document.getElementById('low');
  if (urgentButtonRef?.classList.contains('active')) return 'Urgent';
  if (mediumButtonRef?.classList.contains('active')) return 'Medium';
  if (lowButtonRef?.classList.contains('active')) return 'Low';
  return '';
}

async function getNextSequence() {
  let sequence = 0;
  let response = await fetch(BASE_URL_TASKS_AND_USERS + 'tasks.json');
  let tasks = await response.json();
  if (tasks) {
    Object.values(tasks).forEach((task) => {
      if (task.sequence != null && task.status === 'todo' && task.sequence >= sequence) {
        sequence = task.sequence + 1;
      }
    });
  }
  return sequence;
}

function getCategoryTextFromSelected(categorySelected) {
  let categoryTextRef = categorySelected.querySelector('p');
  if (categoryTextRef) {
    return categoryTextRef.textContent.trim();
  }
  return '';
}

function areAllFieldsFilled(title, date, categoryText) {
  let categoryChosen = categoryText !== '' && categoryText !== 'Select a task category';
  return title.value.trim() !== '' && date.value.trim() !== '' && categoryChosen;
}

function buildSubtaskDiv(newText) {
  let subtaskDiv = document.createElement('div');
  subtaskDiv.setAttribute('onclick', 'editSubtask(this)');
  subtaskDiv.className = 'subtask-item';
  subtaskDiv.innerHTML = saveSubtaskEditHTML(newText);
  return subtaskDiv;
}

function checkInputsFilled(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value.trim()) {
      return false;
    }
  }
  return true;
}

function preventEnterSubmit(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    return false;
  }
}