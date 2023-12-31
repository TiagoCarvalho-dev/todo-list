import { convertTimeToMilliseconds, getCurrentProjects, getFinishedProjects, projectCompleteButtonAction, 
         projectDeleteButtonAction, taskCompleteButtonAction, taskDeleteButtonAction } from "./index.js";
import trash from "./images/trash-can-outline.png";
import check from "./images/check-bold.png";

export function createProjectCard(projectName, projectPriority, projectIndex, projectStatus) {
  if(document.querySelector('.main-section').firstChild === document.querySelector('.no-projects-main-page') ||
      document.querySelector('.main-section').firstChild === document.querySelector('.nothing-to-do-today')) {
    removeAllProjectCards();
  }

  const projectCardDiv = document.createElement('div');
  projectCardDiv.classList.add(`project-card-${projectIndex}`);

  if(projectStatus !== 'incomplete') projectCardDiv.classList.add('project-complete');

  const projectSubCardDiv = document.createElement('div');
  projectSubCardDiv.classList.add('project-sub-card');

  const projectNameH3 = document.createElement('h3');
  projectNameH3.textContent = projectName;

  const projectPriorityP = document.createElement('p');
  projectPriorityP.textContent = projectPriority;

  if(projectPriority === 'Low') {
    projectPriorityP.style.color = 'green';
  }
  
  if(projectPriority === 'Medium') {
    projectPriorityP.style.color = 'orange';
  }
  
  if(projectPriority === 'High') {
    projectPriorityP.style.color = 'red';
  }

  const projectButtonsContainer = document.createElement('div');
  projectButtonsContainer.classList.add('buttons-container');

  const completeProjectButton = document.createElement('button');
  completeProjectButton.classList.add(`complete-project-button-${projectIndex}`);
  completeProjectButton.dataset.index = projectIndex;

  const checkImageProject = document.createElement('img');
  checkImageProject.setAttribute('src', check);
  checkImageProject.setAttribute('alt', 'check-mark');
  checkImageProject.setAttribute('width', '30px');
  checkImageProject.setAttribute('height', 'auto');

  completeProjectButton.appendChild(checkImageProject);

  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.classList.add(`delete-project-button-${projectIndex}`);
  deleteProjectButton.dataset.index = projectIndex;

  const deleteImageProject = document.createElement('img');
  deleteImageProject.setAttribute('src', trash);
  deleteImageProject.setAttribute('alt', 'trash-can');
  deleteImageProject.setAttribute('width', '30px');
  deleteImageProject.setAttribute('height', 'auto');

  deleteProjectButton.appendChild(deleteImageProject);

  projectButtonsContainer.appendChild(completeProjectButton);
  projectButtonsContainer.appendChild(deleteProjectButton);

  projectSubCardDiv.appendChild(projectNameH3);
  projectSubCardDiv.appendChild(projectPriorityP);
  projectSubCardDiv.appendChild(projectButtonsContainer);

  const tasksSubCardsDiv = document.createElement('div');
  tasksSubCardsDiv.classList.add(`tasks-sub-cards`);

  projectCardDiv.appendChild(projectSubCardDiv);
  projectCardDiv.appendChild(tasksSubCardsDiv);

  document.querySelector('.main-section').appendChild(projectCardDiv);
}

export function removeAllProjectCards() {
  const mainDiv = document.querySelector('.main-section');
  while(mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.lastChild);
  }
}

export function createTasksSubCards(taskName, taskDate, taskTime, taskPriority, projectIndex, taskIndex, projectStatus) {
  if(!document.querySelector(`.project-card-${projectIndex}`)) return

  const taskDiv = document.createElement('div');
  taskDiv.classList.add(`task-${taskIndex}`);

  if((projectStatus === 'incomplete' && getCurrentProjects()[projectIndex].tasks[taskIndex].complete) || projectStatus === 'complete') {
    taskDiv.classList.add('task-complete');
  }

  if(((taskDate.getTime() + convertTimeToMilliseconds(taskTime)) - new Date().getTime()) < 0) {
    taskDiv.classList.add('late-task');
  }

  const nameDiv = document.createElement('div');

  const taskNameH4 = document.createElement('h4');
  taskNameH4.classList.add('tasks-name');
  taskNameH4.textContent = taskName;

  nameDiv.appendChild(taskNameH4);

  if(projectStatus === 'incomplete') {
    const nameDivButtonContainer = document.createElement('div');
    nameDivButtonContainer.classList.add('buttons-container');

    const completeTaskButton = document.createElement('button');
    completeTaskButton.classList.add(`complete-task-button-${projectIndex}-${taskIndex}`);
    completeTaskButton.dataset.project = projectIndex;
    completeTaskButton.dataset.index = taskIndex;

    const checkImageTask = document.createElement('img');
    checkImageTask.setAttribute('src', check);
    checkImageTask.setAttribute('alt', 'check-mark');
    checkImageTask.setAttribute('width', '20px');
    checkImageTask.setAttribute('height', 'auto');

    completeTaskButton.appendChild(checkImageTask);

    completeTaskButton.addEventListener('click', addCompleteTaskButtonEvent);

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add(`delete-task-button-${projectIndex}-${taskIndex}`);
    deleteTaskButton.dataset.project = projectIndex;
    deleteTaskButton.dataset.index = taskIndex;

    const deleteImageTask = document.createElement('img');
    deleteImageTask.setAttribute('src', trash);
    deleteImageTask.setAttribute('alt', 'trash-can');
    deleteImageTask.setAttribute('width', '20px');
    deleteImageTask.setAttribute('height', 'auto');

    deleteTaskButton.appendChild(deleteImageTask);

    deleteTaskButton.addEventListener('click', addDeleteTaskButtonEvent);

    nameDivButtonContainer.appendChild(completeTaskButton);
    nameDivButtonContainer.appendChild(deleteTaskButton);

    nameDiv.appendChild(nameDivButtonContainer);
  }
  
  const detailsDiv = document.createElement('div');

  const taskDateP = document.createElement('p');
  taskDateP.classList.add('tasks-date');
  taskDateP.textContent = taskDate.toLocaleDateString();

  const taskTimeP = document.createElement('p');
  taskTimeP.classList.add('tasks-time');
  taskTimeP.textContent = taskTime;

  const taskPriorityP = document.createElement('p');
  taskPriorityP.classList.add('tasks-priority');
  taskPriorityP.textContent = taskPriority;

  if(taskPriority === 'Low') {
    taskPriorityP.style.color = 'green';
    taskPriorityP.classList.add('low-priority-task');
  }
  
  if(taskPriority === 'Medium') {
    taskPriorityP.style.color = 'orange';
    taskPriorityP.classList.add('medium-priority-task');
  }
  
  if(taskPriority === 'High') {
    taskPriorityP.style.color = 'red';
    taskPriorityP.classList.add('high-priority-task');
  }

  detailsDiv.appendChild(taskDateP);
  detailsDiv.appendChild(taskTimeP);
  detailsDiv.appendChild(taskPriorityP);

  taskDiv.appendChild(nameDiv);
  taskDiv.appendChild(detailsDiv);

  document.querySelector(`.project-card-${projectIndex} > .tasks-sub-cards`).appendChild(taskDiv);
}

export function removeTaskCard(projectName, projectIndex) {
  removeAllTasksCards(projectIndex);
  for(let i = 0; i < getCurrentProjects()[projectIndex].tasks.length; i++) {
    createTasksSubCards(getCurrentProjects()[projectIndex].tasks[i].name, getCurrentProjects()[projectIndex].tasks[i].date, 
                        getCurrentProjects()[projectIndex].tasks[i].time, getCurrentProjects()[projectIndex].tasks[i].priority, projectIndex, i, 'incomplete');
  }
  createCurrentProjectNewTaskButton(projectName, projectIndex);
}

function removeAllTasksCards(projectIndex) {
  const taskSubCard = document.querySelector(`.project-card-${projectIndex} > .tasks-sub-cards`);
  while(taskSubCard.firstChild) {
    taskSubCard.removeChild(taskSubCard.lastChild);
  }
}

export function buildCurrentAndCompleteProjects() {
  removeAllCurrentAndCompleteProjects();

  for(let i = 0; i < getCurrentProjects().length; i++) {
    const projectName = document.createElement('button');
    projectName.setAttribute('value', getCurrentProjects()[i].name);
    projectName.dataset.name = getCurrentProjects()[i].name;
    projectName.dataset.priority = getCurrentProjects()[i].priority;
    projectName.dataset.index = i;
    projectName.textContent = getCurrentProjects()[i].name;

    if(getCurrentProjects()[i].priority === 'Low') {
      projectName.classList.add('low-priority-project');
    }
    if(getCurrentProjects()[i].priority === 'Medium') {
      projectName.classList.add('medium-priority-project');
    }
    if(getCurrentProjects()[i].priority === 'High') {
      projectName.classList.add('high-priority-project');
    }
  
    document.querySelector('.current-projects').appendChild(projectName);
  }
  addCurrentProjectsButtonEvent();
  
  for(let j = 0; j < getFinishedProjects().length; j++) {
    const projectName = document.createElement('button');
    projectName.setAttribute('value', getFinishedProjects()[j].name);
    projectName.dataset.name = getFinishedProjects()[j].name;
    projectName.dataset.priority = getFinishedProjects()[j].priority;
    projectName.dataset.index = j;
    projectName.textContent = getFinishedProjects()[j].name;

    if(getFinishedProjects()[j].priority === 'Low') {
      projectName.classList.add('low-priority-project');
    }
    if(getFinishedProjects()[j].priority === 'Medium') {
      projectName.classList.add('medium-priority-project');
    }
    if(getFinishedProjects()[j].priority === 'High') {
      projectName.classList.add('high-priority-project');
    }
  
    document.querySelector('.complete-projects').appendChild(projectName);
  }
  addCompleteProjectsButtonEvent();
}

function removeAllCurrentAndCompleteProjects() {
  const currentProjectsDiv = document.querySelector('.current-projects');
  while(currentProjectsDiv.firstChild) {
    currentProjectsDiv.removeChild(currentProjectsDiv.lastChild);
  }

  const completeProjectsDiv = document.querySelector('.complete-projects');
  while(completeProjectsDiv.firstChild) {
    completeProjectsDiv.removeChild(completeProjectsDiv.lastChild);
  }
}

export function showAllProjectCards(projectStatus) {
  removeAllProjectCards();

  if(!document.querySelector('.main-section').firstChild) noProjectsAvailableText();

  if(projectStatus === 'incomplete') {
    for(let i = 0; i < getCurrentProjects().length; i++) {
      createProjectCard(getCurrentProjects()[i].name, getCurrentProjects()[i].priority, i, projectStatus);
      addCompleteProjectButtonEvent(i);
      addDeleteProjectButtonEvent(i);
      for(let j = 0; j < getCurrentProjects()[i].tasks.length; j++) {
        createTasksSubCards(getCurrentProjects()[i].tasks[j].name, getCurrentProjects()[i].tasks[j].date, 
                            getCurrentProjects()[i].tasks[j].time, getCurrentProjects()[i].tasks[j].priority, i, j, projectStatus);
      }
    }
    createNewTaskButton();
    return
  }
  for(let i = 0; i < getFinishedProjects().length; i++) {
    createProjectCard(getFinishedProjects()[i].name, getFinishedProjects()[i].priority, i, projectStatus);
    addCompleteProjectButtonEvent(i);
    addDeleteProjectButtonEvent(i);
    for(let j = 0; j < getFinishedProjects()[i].tasks.length; j++) {
      createTasksSubCards(getFinishedProjects()[i].tasks[j].name, getFinishedProjects()[i].tasks[j].date, 
                          getFinishedProjects()[i].tasks[j].time, getFinishedProjects()[i].tasks[j].priority, i, j, projectStatus);
    }
  }
}

function createCurrentProjectCard() {
  removeAllProjectCards();

  const selectedProject = getCurrentProjects().filter(project => project.name === this.dataset.name);
  createProjectCard(selectedProject[0].name, selectedProject[0].priority, getCurrentProjects().indexOf(selectedProject[0]), 'incomplete');
  addCompleteProjectButtonEvent(getCurrentProjects().indexOf(selectedProject[0]));
  addDeleteProjectButtonEvent(getCurrentProjects().indexOf(selectedProject[0]));
  for(let i = 0; i < selectedProject[0].tasks.length; i++) {
    createTasksSubCards(selectedProject[0].tasks[i].name, selectedProject[0].tasks[i].date, selectedProject[0].tasks[i].time, 
                        selectedProject[0].tasks[i].priority, getCurrentProjects().indexOf(selectedProject[0]), i, 'incomplete');
  }
  createCurrentProjectNewTaskButton(selectedProject[0].name, getCurrentProjects().indexOf(selectedProject[0]));
}

function createCompleteProjectCard() {
  removeAllProjectCards();

  const selectedProject = getFinishedProjects().filter(project => project.name === this.dataset.name);
  createProjectCard(selectedProject[0].name, selectedProject[0].priority, getFinishedProjects().indexOf(selectedProject[0]), 'complete');
  addCompleteProjectButtonEvent(getFinishedProjects().indexOf(selectedProject[0]));
  addDeleteProjectButtonEvent(getFinishedProjects().indexOf(selectedProject[0]));
  for(let i = 0; i < selectedProject[0].tasks.length; i++) {
    createTasksSubCards(selectedProject[0].tasks[i].name, selectedProject[0].tasks[i].date, selectedProject[0].tasks[i].time, 
                        selectedProject[0].tasks[i].priority, getFinishedProjects().indexOf(selectedProject[0]), i, 'complete');
  }
}

function createNewTaskButton() {
  for(let i = 0; i < getCurrentProjects().length; i++) {
  const taskSubCardsDiv = document.querySelector(`.project-card-${i} > .tasks-sub-cards`);
  const newTaskButton = document.createElement('button');
  newTaskButton.classList.add('new-task-button');
  newTaskButton.textContent = 'NEW TASK';
  newTaskButton.addEventListener('click', () => {
    document.querySelector('#new-task-dialog').showModal();
    document.querySelector('.chosen-project').textContent = getCurrentProjects()[i].name;
    document.querySelector('.chosen-project').dataset.index = i;
  });

  taskSubCardsDiv.appendChild(newTaskButton);
  }
}

export function createCurrentProjectNewTaskButton(projectName, projectIndex) {
  const taskSubCardsDiv = document.querySelector(`.project-card-${projectIndex} > .tasks-sub-cards`);
  const newTaskButton = document.createElement('button');
  newTaskButton.classList.add('new-task-button');
  newTaskButton.textContent = 'NEW TASK';
  newTaskButton.addEventListener('click', () => {
    document.querySelector('#new-task-dialog').showModal();
    document.querySelector('.chosen-project').textContent = projectName;
    document.querySelector('.chosen-project').dataset.index = projectIndex;
  });

  taskSubCardsDiv.appendChild(newTaskButton);
}

export function removeNewTaskButton(projectIndex) {
  const taskSubCardsDiv = document.querySelector(`.project-card-${projectIndex} > .tasks-sub-cards`);
  taskSubCardsDiv.removeChild(taskSubCardsDiv.lastChild.previousSibling);
}

export function noProjectsAvailableText() {
  const noProjectsAvailable = document.createElement('h2');
  noProjectsAvailable.classList.add('no-projects-main-page');
  noProjectsAvailable.textContent = 'NO PROJECTS AVAILABLE';

  document.querySelector('.main-section').appendChild(noProjectsAvailable);
}

export function nothingToDoTodayText() {
  const noProjectsAvailable = document.createElement('h2');
  noProjectsAvailable.classList.add('nothing-to-do-today');
  noProjectsAvailable.textContent = 'NOTHING TO DO TODAY =)';

  document.querySelector('.main-section').appendChild(noProjectsAvailable);
}

export function projectsCounter() {
  document.querySelector('.all-current-button').textContent = `CURRENT (${getCurrentProjects().length})`;
  document.querySelector('.all-complete-button').textContent = `COMPLETE (${getFinishedProjects().length})`;
}

export function toggleTaskCompleteClass(projectIndex, taskIndex, operation) {
  if(operation === 'add') return document.querySelector(`.project-card-${projectIndex} > .tasks-sub-cards > .task-${taskIndex}`).classList.add('task-complete');
  return document.querySelector(`.project-card-${projectIndex} > .tasks-sub-cards > .task-${taskIndex}`).classList.remove('task-complete');
}

export function toggleProjectCompleteClass(projectIndex, operation) {
  if(operation === 'add') return document.querySelector(`.project-card-${projectIndex}`).classList.add('project-complete');
  return document.querySelector(`.project-card-${projectIndex}`).classList.remove('project-complete');
}

export function addCompleteProjectButtonEvent(projectIndex) {
  document.querySelector(`.complete-project-button-${projectIndex}`).addEventListener('click', projectCompleteButtonAction);
}

export function addDeleteProjectButtonEvent(index) {
  document.querySelector(`.delete-project-button-${index}`).addEventListener('click', projectDeleteButtonAction);
}

function addCompleteTaskButtonEvent() {
  document.querySelector(`.complete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskCompleteButtonAction);
}

function addDeleteTaskButtonEvent() {
  document.querySelector(`.delete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskDeleteButtonAction);
}

function addCurrentProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.current-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCurrentProjectCard));
}

export function addCompleteProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.complete-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCompleteProjectCard));
}