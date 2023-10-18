import { getCurrentProjects } from "./index.js";

export function createNewProjectForm() {
  const newProjectDiv = document.querySelector('.new-project-form');

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('project-name-container');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'project-name');
  nameLabel.textContent = 'Project Name';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'project-name');
  nameInput.setAttribute('id', 'project-name');
  nameInput.setAttribute('type', 'text');
  
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);

  const priorityDiv = document.createElement('div');
  priorityDiv.classList.add('project-priority-container');

  const legend = document.createElement('legend');
  legend.textContent = 'Priority';

  const radioDiv = document.createElement('div');
  radioDiv.classList.add('project-radio-container');

  const lowPriorityInput = document.createElement('input');
  lowPriorityInput.setAttribute('type', 'radio');
  lowPriorityInput.setAttribute('id', 'low-priority');
  lowPriorityInput.setAttribute('name', 'priority');
  lowPriorityInput.setAttribute('value', 'low-priority');
  lowPriorityInput.checked = true;

  const lowPriorityLabel = document.createElement('label');
  lowPriorityLabel.setAttribute('for', 'low-priority');
  lowPriorityLabel.textContent = 'Low';

  const mediumPriorityInput = document.createElement('input');
  mediumPriorityInput.setAttribute('type', 'radio');
  mediumPriorityInput.setAttribute('id', 'medium-priority');
  mediumPriorityInput.setAttribute('name', 'priority');
  mediumPriorityInput.setAttribute('value', 'medium-priority');
  
  const mediumPriorityLabel = document.createElement('label');
  mediumPriorityLabel.setAttribute('for', 'medium-priority');
  mediumPriorityLabel.textContent = 'Medium';

  const highPriorityInput = document.createElement('input');
  highPriorityInput.setAttribute('type', 'radio');
  highPriorityInput.setAttribute('id', 'high-priority');
  highPriorityInput.setAttribute('name', 'priority');
  highPriorityInput.setAttribute('value', 'high-priority');
  
  const highPriorityLabel = document.createElement('label');
  highPriorityLabel.setAttribute('for', 'high-priority');
  highPriorityLabel.textContent = 'High';

  radioDiv.appendChild(lowPriorityInput);
  radioDiv.appendChild(lowPriorityLabel);
  radioDiv.appendChild(mediumPriorityInput);
  radioDiv.appendChild(mediumPriorityLabel);
  radioDiv.appendChild(highPriorityInput);
  radioDiv.appendChild(highPriorityLabel);

  priorityDiv.appendChild(legend);
  priorityDiv.appendChild(radioDiv);

  const createNewProjectButton = document.createElement('button');
  createNewProjectButton.classList.add('create-new-project-button');
  createNewProjectButton.textContent = 'Create';

  newProjectDiv.appendChild(nameDiv);
  newProjectDiv.appendChild(priorityDiv);
  newProjectDiv.appendChild(createNewProjectButton);
}

export function deleteNewProjectForm() {
  const newProjectForm = document.querySelector('.new-project-form');
  while(newProjectForm.firstChild) {
    newProjectForm.removeChild(newProjectForm.lastChild);
  }
}

export function createNewTaskForm() {
  const newTaskDiv = document.querySelector('.new-task-form');

  const projectDiv = document.createElement('div');
  projectDiv.classList.add('chosen-project-container');

  const projectLabel = document.createElement('label');
  projectLabel.setAttribute('for', 'chosen-project');
  projectLabel.textContent = 'Project';

  const projectSelect = document.createElement('select');
  projectSelect.setAttribute('name', 'chosen-project');
  projectSelect.setAttribute('id', 'chosen-project');

  projectDiv.appendChild(projectLabel);
  projectDiv.appendChild(projectSelect);

  const projectOptionDefault = document.createElement('option');
  projectOptionDefault.setAttribute('value', '');
  projectOptionDefault.textContent = 'Select a project';

  projectSelect.appendChild(projectOptionDefault);

  for(let i = 0; i < getCurrentProjects().length; i++) {
    const projectOption = document.createElement('option');
    projectOption.setAttribute('value', i);
    projectOption.textContent = getCurrentProjects()[i].name;

    projectSelect.appendChild(projectOption);
  }

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('task-name-container');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'task-name');
  nameLabel.textContent = 'Task Name';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'task-name');
  nameInput.setAttribute('id', 'task-name');
  nameInput.setAttribute('type', 'text');
  
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('task-description-container');

  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'task-description');
  descriptionLabel.textContent = 'Description';

  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('name', 'task-description');
  descriptionInput.setAttribute('id', 'task-description');
  descriptionInput.setAttribute('type', 'textarea');

  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(descriptionInput);

  const dateDiv = document.createElement('div');
  dateDiv.classList.add('task-date-container');

  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'task-date');
  dateLabel.textContent = 'Due date';

  const dateInput = document.createElement('input');
  dateInput.setAttribute('name', 'task-date');
  dateInput.setAttribute('id', 'task-date');
  dateInput.setAttribute('type', 'date');

  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(dateInput);

  const priorityDiv = document.createElement('div');
  priorityDiv.classList.add('task-priority-container');

  const legend = document.createElement('legend');
  legend.textContent = 'Priority';

  const radioDiv = document.createElement('div');
  radioDiv.classList.add('task-radio-container');

  const lowPriorityInput = document.createElement('input');
  lowPriorityInput.setAttribute('type', 'radio');
  lowPriorityInput.setAttribute('id', 'low-priority');
  lowPriorityInput.setAttribute('name', 'priority');
  lowPriorityInput.setAttribute('value', 'low-priority');
  lowPriorityInput.checked = true;

  const lowPriorityLabel = document.createElement('label');
  lowPriorityLabel.setAttribute('for', 'low-priority');
  lowPriorityLabel.textContent = 'Low';

  const mediumPriorityInput = document.createElement('input');
  mediumPriorityInput.setAttribute('type', 'radio');
  mediumPriorityInput.setAttribute('id', 'medium-priority');
  mediumPriorityInput.setAttribute('name', 'priority');
  mediumPriorityInput.setAttribute('value', 'medium-priority');
  
  const mediumPriorityLabel = document.createElement('label');
  mediumPriorityLabel.setAttribute('for', 'medium-priority');
  mediumPriorityLabel.textContent = 'Medium';

  const highPriorityInput = document.createElement('input');
  highPriorityInput.setAttribute('type', 'radio');
  highPriorityInput.setAttribute('id', 'high-priority');
  highPriorityInput.setAttribute('name', 'priority');
  highPriorityInput.setAttribute('value', 'high-priority');
  
  const highPriorityLabel = document.createElement('label');
  highPriorityLabel.setAttribute('for', 'high-priority');
  highPriorityLabel.textContent = 'High';

  radioDiv.appendChild(lowPriorityInput);
  radioDiv.appendChild(lowPriorityLabel);
  radioDiv.appendChild(mediumPriorityInput);
  radioDiv.appendChild(mediumPriorityLabel);
  radioDiv.appendChild(highPriorityInput);
  radioDiv.appendChild(highPriorityLabel);

  priorityDiv.appendChild(legend);
  priorityDiv.appendChild(radioDiv);

  const createNewTaskButton = document.createElement('button');
  createNewTaskButton.classList.add('create-new-task-button');
  createNewTaskButton.textContent = 'Create';

  newTaskDiv.appendChild(projectDiv);
  newTaskDiv.appendChild(nameDiv);
  newTaskDiv.appendChild(descriptionDiv);
  newTaskDiv.appendChild(dateDiv);
  newTaskDiv.appendChild(priorityDiv);
  newTaskDiv.appendChild(createNewTaskButton);
}

export function deleteNewTaskForm() {
  const newTaskForm = document.querySelector('.new-task-form');
  while(newTaskForm.firstChild) {
    newTaskForm.removeChild(newTaskForm.lastChild);
  }
}