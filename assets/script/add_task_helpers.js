function toggleDropdown(dropdown, dropdownId, arrow) {
  let isOpen = dropdown.classList.contains('show');
  setDropdownState(dropdownId, arrow, !isOpen);
}

function setDropdownState(dropdownId, arrow, open) {
  animateDropdown(dropdownId, open);
  toggleArrowRotation(arrow, open);
  if (open) {
    clearAssignedTo();
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
    html += showContactsAddTaskHtml(contact);
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
    addTaskId: await getNextTaskId(),
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

function handleFirstSlash(value, date) {
  if (value.length > lastDateLength && /^\d{2}$/.test(value)) {
    value += '/';
    date.value = value;
  }
  return value;
}

function handleSecondSlash(value, date) {
  if (value.length > lastDateLength && /^\d{2}\/\d{2}$/.test(value)) {
    value += '/';
    date.value = value;
  }
  return value;
}

function handleDayCorrection(parts, date) {
  if (parts.length >= 1 && parts[0].length === 2) {
    let year = parts.length > 2 ? Number(String(parts[2]).slice(0, 4)) : new Date().getFullYear();
    let month = parts.length > 1 ? Number(String(parts[1]).slice(0, 2)) : new Date().getMonth() + 1;
    let maxDay = new Date(year, month, 0).getDate();
    let day = Number(parts[0]);
    if (day > maxDay) {
      parts[0] = String(maxDay).padStart(2, '0');
      date.value = parts.join('/');
    }
  }
}

function handleMonthCorrection(parts, date) {
  if (parts.length >= 2 && parts[1].length === 2) {
    let month = Number(parts[1]);
    if (month > 12) {
      parts[1] = '12';
      date.value = parts.join('/');
    }
  }
}

function getLimitedDateParts(value) {
  let parts = value.split('/');
  let day = Number(String(parts[0]).slice(0, 2));
  let month = Number(String(parts[1]).slice(0, 2));
  let year = Number(String(parts[2]).slice(0, 4));
  return [day, month, year];
}

function splitDate(val) {
  let parts = val.split('/');
  let day = Number(parts[0]);
  let month = Number(parts[1]);
  let year = Number(parts[2]);
  return [day, month, year];
}

function correctDay(day, month, year) {
  let maxDay = new Date(year, month, 0).getDate();
  let correctedDay = Math.max(1, Math.min(maxDay, day));
  return correctedDay;
}

function correctDateLimits(day, month, year) {
  let inputDate = new Date(year, month - 1, day);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let maxDate = new Date(2035, 11, 31);
  if (inputDate < today) {
    day = today.getDate();
    month = today.getMonth() + 1;
    year = today.getFullYear();
  } else if (inputDate > maxDate) {
    day = 31;
    month = 12;
    year = 2035;
  }
  return [day, month, year];
}

function buildDateString(day, month, year) {
  let d = String(day).padStart(2, '0');
  let m = String(month).padStart(2, '0');
  let y = year;
  let result = `${d}/${m}/${y}`;
  return result;
}

function autoInsertSlashes(date) {
  let value = date.value.replace(/[^\d\/]/g, '');
  value = handleFirstSlash(value, date);
  value = handleSecondSlash(value, date);
  lastDateLength = value.length;
  let parts = value.split('/');
  handleDayCorrection(parts, date);
  handleMonthCorrection(parts, date);
}

function validateAndCorrectDate(date) {
  let value = date.value.replace(/[^\d\/]/g, '');
  if (/^\d{2,}\/\d{2,}\/\d{4,}$/.test(value)) {
    let [day, month, year] = getLimitedDateParts(value);
    day = correctDay(day, month, year);
    month = Math.max(1, Math.min(12, month));
    year = Math.max(1900, Math.min(2035, year));
    let corrected = correctDateLimits(day, month, year);
    date.value = buildDateString(corrected[0], corrected[1], corrected[2]);
  }
}

function openDropdownWithAnimation(animateDropdownId) {
  let dropdown = document.getElementById(animateDropdownId);
  if (!dropdown) return;
  setDropdownPadding(dropdown, true);
  if (dropdown.classList.contains('show') && dropdown.style.maxHeight === '305px') return;
  openDropdownAnimation(dropdown);
}

function closeDropdownWithAnimation(animateDropdownId) {
  let dropdown = document.getElementById(animateDropdownId);
  if (!dropdown) return;
  setDropdownPadding(dropdown, false);
  if (!dropdown.classList.contains('show') && !dropdown.classList.contains('expanded')) return;
  closeDropdownAnimation(dropdown);
}

function closeDropdownAnimation(dropdown) {
  dropdown.classList.remove('show', 'hidden');
  dropdown.classList.add('closing');
  setTimeout(() => {
    dropdown.classList.remove('closing', 'expanded');
    dropdown.classList.add('hidden');
    dropdown.style.maxHeight = '';
    dropdown.style.opacity = '';
  }, 300);
}

function openDropdownAnimation(dropdown) {
  dropdown.classList.add('show', 'expanded');
  dropdown.classList.remove('hidden');
  dropdown.style.maxHeight = '0';
  dropdown.style.opacity = '0';
  setTimeout(() => {
    dropdown.style.maxHeight = '305px';
    dropdown.style.opacity = '1';
  }, 50);
}

function setDropdownPadding(dropdown, open) {
  let filllickerCategory = dropdown.querySelector('.filllicker-category');
  if (filllickerCategory) filllickerCategory.style.padding = open ? '5px' : '0';
  if (!open) {
    let filllickerAssignedTo = dropdown.querySelector('.filllicker-assigned-to');
    if (filllickerAssignedTo) filllickerAssignedTo.style.padding = '0';
  }
}
