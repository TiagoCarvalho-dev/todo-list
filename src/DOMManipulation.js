import { getCurrentProjects, addCompleteProjectButtonEvent, removeCompleteProjectButtonEvent, 
         addCurrentProjectsButtonEvent, addCompleteTaskButtonEvent } from "./index.js";

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

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('task-time-container');

  const timeLabel = document.createElement('label');
  timeLabel.setAttribute('for', 'task-time');
  timeLabel.textContent = 'Due time';

  const timeInput = document.createElement('input');
  timeInput.setAttribute('name', 'task-time');
  timeInput.setAttribute('id', 'task-time');
  timeInput.setAttribute('type', 'time');

  timeDiv.appendChild(timeLabel);
  timeDiv.appendChild(timeInput);

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
  newTaskDiv.appendChild(dateDiv);
  newTaskDiv.appendChild(timeDiv);
  newTaskDiv.appendChild(priorityDiv);
  newTaskDiv.appendChild(createNewTaskButton);
}

export function deleteNewTaskForm() {
  const newTaskForm = document.querySelector('.new-task-form');
  while(newTaskForm.firstChild) {
    newTaskForm.removeChild(newTaskForm.lastChild);
  }
}

export function createProjectCard(name, priority, index) {
  if(document.querySelector('.main-section').firstChild === document.querySelector('.no-projects-main-page')) {
    removeAllProjectCards();
  }

  const projectCardDiv = document.createElement('div');
  projectCardDiv.classList.add(`project-card-${index}`);

  const projectSubcardDiv = document.createElement('div');
  projectSubcardDiv.classList.add('project-subcard');

  const projectName = document.createElement('h2');
  projectName.textContent = name;

  const projectPriority = document.createElement('p');
  projectPriority.textContent = priority;

  const completeProjectButton = document.createElement('button');
  completeProjectButton.classList.add(`complete-project-button-${index}`);
  completeProjectButton.dataset.index = index;
  completeProjectButton.textContent = 'DONE';

  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.classList.add(`delete-project-button-${index}`);
  deleteProjectButton.textContent = 'DELETE';

  projectSubcardDiv.appendChild(projectName);
  projectSubcardDiv.appendChild(projectPriority);
  projectSubcardDiv.appendChild(completeProjectButton);
  projectSubcardDiv.appendChild(deleteProjectButton);

  const tasksSubcardsDiv = document.createElement('div');
  tasksSubcardsDiv.classList.add(`tasks-subcards`);

  projectCardDiv.appendChild(projectSubcardDiv);
  projectCardDiv.appendChild(tasksSubcardsDiv);

  document.querySelector('.main-section').appendChild(projectCardDiv);
}

export function createTasksSubcards(name, date, time, priority, project, index) {
  if(!document.querySelector(`.project-card-${project}`)) {
    return
  } else {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add(`task-${index}`);

    const nameDiv = document.createElement('div');

    const taskName = document.createElement('h3');
    taskName.textContent = name;

    const completeTaskButton = document.createElement('button');
    completeTaskButton.classList.add(`complete-task-button-${project}-${index}`);
    completeTaskButton.dataset.project = project;
    completeTaskButton.dataset.index = index;
    completeTaskButton.textContent = 'DONE';

    completeTaskButton.addEventListener('click', addCompleteTaskButtonEvent);

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add(`delete-task-button-${project}-${index}`);
    deleteTaskButton.dataset.project = project;
    deleteTaskButton.dataset.index = index;
    deleteTaskButton.textContent = 'DELETE';

    nameDiv.appendChild(taskName);
    nameDiv.appendChild(completeTaskButton);
    nameDiv.appendChild(deleteTaskButton);

    const detailsDiv = document.createElement('div');

    const taskDate = document.createElement('p');
    taskDate.textContent = date;

    const taskTime = document.createElement('p');
    taskTime.textContent = time;

    const taskPriority = document.createElement('p');
    taskPriority.textContent = priority;

    detailsDiv.appendChild(taskDate);
    detailsDiv.appendChild(taskTime);
    detailsDiv.appendChild(taskPriority);

    taskDiv.appendChild(nameDiv);
    taskDiv.appendChild(detailsDiv);

    document.querySelector(`.project-card-${project} > .tasks-subcards`).appendChild(taskDiv);
  }
}

function noProjectsAvailableText() {
  const noProjectsAvailable = document.createElement('h1');
  noProjectsAvailable.classList.add('no-projects-main-page');
  noProjectsAvailable.textContent = 'NO PROJECTS AVAILABLE';

  document.querySelector('.main-section').appendChild(noProjectsAvailable);
}

export function buildCurrentProjects() {
  removeAllCurrentProjects();

  for(let i = 0; i < getCurrentProjects().length; i++) {
    const projectName = document.createElement('button');
    projectName.setAttribute('value', getCurrentProjects()[i].name);
    projectName.dataset.name = getCurrentProjects()[i].name;
    projectName.dataset.priority = getCurrentProjects()[i].priority;
    projectName.dataset.index = i;
    projectName.textContent = getCurrentProjects()[i].name;

    document.querySelector('.current-projects').appendChild(projectName);
  }
  addCurrentProjectsButtonEvent();
}

function removeAllCurrentProjects() {
  const currentProjectsDiv = document.querySelector('.current-projects');
  currentProjectsDiv.replaceChildren(currentProjectsDiv.firstElementChild);
}

function removeAllProjectCards() {
  const mainDiv = document.querySelector('.main-section');
  while(mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.lastChild);
  }
}

export function showAllProjectCards() {
  removeAllProjectCards();

  if(!document.querySelector('.main-section').firstChild) {
    noProjectsAvailableText();
  }

  for(let i = 0; i < getCurrentProjects().length; i++) {
    createProjectCard(getCurrentProjects()[i].name, getCurrentProjects()[i].priority, i);
    removeCompleteProjectButtonEvent(i);
    addCompleteProjectButtonEvent(i);
    for(let j = 0; j < getCurrentProjects()[i].tasks.length; j++) {
      createTasksSubcards(getCurrentProjects()[i].tasks[j].name, getCurrentProjects()[i].tasks[j].date, 
                          getCurrentProjects()[i].tasks[j].time, getCurrentProjects()[i].tasks[j].priority, i, j);
    }
  }
}

export function createCurrentProjectCard() {
  removeAllProjectCards();

  const selectedProject = getCurrentProjects().filter(project => project.name === this.dataset.name);
  createProjectCard(selectedProject[0].name, selectedProject[0].priority, getCurrentProjects().indexOf(selectedProject[0]));
  addCompleteProjectButtonEvent(getCurrentProjects().indexOf(selectedProject[0]));
  for(let i = 0; i < selectedProject[0].tasks.length; i++) {
    createTasksSubcards(selectedProject[0].tasks[i].name, selectedProject[0].tasks[i].date, selectedProject[0].tasks[i].time, 
                        selectedProject[0].tasks[i].priority, getCurrentProjects().indexOf(selectedProject[0]), i);
  }
}

export function addTaskCompleteClass(project, index) {
  document.querySelector(`.project-card-${project} > .tasks-subcards > .task-${index}`).classList.add('task-complete');
}

export function addProjectCompleteClass(index) {
  document.querySelector(`.project-card-${index}`).classList.add('project-complete');
}