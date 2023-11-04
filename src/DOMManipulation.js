import { convertTimeToMilliseconds, getCurrentProjects, getFinishedProjects, projectCompleteButtonAction, 
         projectDeleteButtonAction, taskCompleteButtonAction, taskDeleteButtonAction } from "./index.js";

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

export function createCurrentProjectNewTaskButton(name, index) {
  const taskSubCardsDiv = document.querySelector(`.project-card-${index} > .tasks-sub-cards`);
  const newTaskButton = document.createElement('button');
  newTaskButton.classList.add('new-task-button');
  newTaskButton.textContent = 'NEW TASK';
  newTaskButton.addEventListener('click', () => {
    document.querySelector('#new-task-dialog').showModal();
    document.querySelector('.chosen-project').textContent = name;
    document.querySelector('.chosen-project').dataset.index = index;
  });

  taskSubCardsDiv.appendChild(newTaskButton);
}

export function removeNewTaskButton(index) {
  const taskSubCardsDiv = document.querySelector(`.project-card-${index} > .tasks-sub-cards`);
  taskSubCardsDiv.removeChild(taskSubCardsDiv.lastChild.previousSibling);
}

export function createProjectCard(name, priority, index, status) {
  if(document.querySelector('.main-section').firstChild === document.querySelector('.no-projects-main-page') ||
     document.querySelector('.main-section').firstChild === document.querySelector('.nothing-to-do-today')) {
    removeAllProjectCards();
  }

  const projectCardDiv = document.createElement('div');
  projectCardDiv.classList.add(`project-card-${index}`);

  if(status !== 'incomplete') {
    projectCardDiv.classList.add('project-complete');
  }

  const projectSubCardDiv = document.createElement('div');
  projectSubCardDiv.classList.add('project-sub-card');

  const projectName = document.createElement('h3');
  projectName.textContent = name;

  const projectPriority = document.createElement('p');
  projectPriority.textContent = priority;

  const completeProjectButton = document.createElement('button');
  completeProjectButton.classList.add(`complete-project-button-${index}`);
  completeProjectButton.dataset.index = index;
  completeProjectButton.textContent = 'DONE';

  const deleteProjectButton = document.createElement('button');
  deleteProjectButton.classList.add(`delete-project-button-${index}`);
  deleteProjectButton.dataset.index = index;
  deleteProjectButton.textContent = 'DELETE';

  projectSubCardDiv.appendChild(projectName);
  projectSubCardDiv.appendChild(projectPriority);
  projectSubCardDiv.appendChild(completeProjectButton);
  projectSubCardDiv.appendChild(deleteProjectButton);

  const tasksSubCardsDiv = document.createElement('div');
  tasksSubCardsDiv.classList.add(`tasks-sub-cards`);

  projectCardDiv.appendChild(projectSubCardDiv);
  projectCardDiv.appendChild(tasksSubCardsDiv);

  document.querySelector('.main-section').appendChild(projectCardDiv);
}

export function createTasksSubCards(name, date, time, priority, project, index, status) {
  if(!document.querySelector(`.project-card-${project}`)) {
    return
  } else {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add(`task-${index}`);

    if(status === 'incomplete') {
      if(getCurrentProjects()[project].tasks[index].complete) {
        taskDiv.classList.add('task-complete');
      }
    } else {
      taskDiv.classList.add('task-complete');
    }

    if(((date.getTime() + convertTimeToMilliseconds(time)) - new Date().getTime()) < 0) {
      taskDiv.classList.add('late-task');
    }

    const nameDiv = document.createElement('div');

    const taskName = document.createElement('h4');
    taskName.textContent = name;

    nameDiv.appendChild(taskName);

    if(status === 'incomplete') {
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
  
      deleteTaskButton.addEventListener('click', addDeleteTaskButtonEvent);
  
      nameDiv.appendChild(completeTaskButton);
      nameDiv.appendChild(deleteTaskButton);
    }
    
    const detailsDiv = document.createElement('div');

    const taskDate = document.createElement('p');
    taskDate.textContent = date.toLocaleDateString();

    const taskTime = document.createElement('p');
    taskTime.textContent = time;

    const taskPriority = document.createElement('p');
    taskPriority.textContent = priority;

    detailsDiv.appendChild(taskDate);
    detailsDiv.appendChild(taskTime);
    detailsDiv.appendChild(taskPriority);

    taskDiv.appendChild(nameDiv);
    taskDiv.appendChild(detailsDiv);

    document.querySelector(`.project-card-${project} > .tasks-sub-cards`).appendChild(taskDiv);
  }
}

export function removeTaskCard(projectName, projectIndex) {
  removeAllTasksCards(projectIndex);
  for(let i = 0; i < getCurrentProjects()[projectIndex].tasks.length; i++) {
    createTasksSubCards(getCurrentProjects()[projectIndex].tasks[i].name, getCurrentProjects()[projectIndex].tasks[i].date, 
                        getCurrentProjects()[projectIndex].tasks[i].time, getCurrentProjects()[projectIndex].tasks[i].priority, projectIndex, i, 'incomplete');
  }
  createCurrentProjectNewTaskButton(projectName, projectIndex);
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

export function buildCurrentAndCompleteProjects() {
  removeAllCurrentAndCompleteProjects();

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
  
  for(let j = 0; j < getFinishedProjects().length; j++) {
    const projectName = document.createElement('button');
    projectName.setAttribute('value', getFinishedProjects()[j].name);
    projectName.dataset.name = getFinishedProjects()[j].name;
    projectName.dataset.priority = getFinishedProjects()[j].priority;
    projectName.dataset.index = j;
    projectName.textContent = getFinishedProjects()[j].name;
  
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

export function removeAllProjectCards() {
  const mainDiv = document.querySelector('.main-section');
  while(mainDiv.firstChild) {
    mainDiv.removeChild(mainDiv.lastChild);
  }
}

function removeAllTasksCards(project) {
  const taskSubCard = document.querySelector(`.project-card-${project} > .tasks-sub-cards`);
  while(taskSubCard.firstChild) {
    taskSubCard.removeChild(taskSubCard.lastChild);
  }
}

export function showAllProjectCards(status) {
  removeAllProjectCards();

  if(!document.querySelector('.main-section').firstChild) {
    noProjectsAvailableText();
  }

  if(status === 'incomplete') {
    for(let i = 0; i < getCurrentProjects().length; i++) {
      createProjectCard(getCurrentProjects()[i].name, getCurrentProjects()[i].priority, i, status);
      addCompleteProjectButtonEvent(i);
      addDeleteProjectButtonEvent(i);
      for(let j = 0; j < getCurrentProjects()[i].tasks.length; j++) {
        createTasksSubCards(getCurrentProjects()[i].tasks[j].name, getCurrentProjects()[i].tasks[j].date, 
                            getCurrentProjects()[i].tasks[j].time, getCurrentProjects()[i].tasks[j].priority, i, j, status);
      }
    }
    createNewTaskButton();
  } else {
    for(let i = 0; i < getFinishedProjects().length; i++) {
      createProjectCard(getFinishedProjects()[i].name, getFinishedProjects()[i].priority, i, status);
      addCompleteProjectButtonEvent(i);
      addDeleteProjectButtonEvent(i);
      for(let j = 0; j < getFinishedProjects()[i].tasks.length; j++) {
        createTasksSubCards(getFinishedProjects()[i].tasks[j].name, getFinishedProjects()[i].tasks[j].date, 
                            getFinishedProjects()[i].tasks[j].time, getFinishedProjects()[i].tasks[j].priority, i, j, status);
      }
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

export function createFilteredProjectCards(projectName, projectPriority, projectIndex, status) {
  createProjectCard(projectName, projectPriority, projectIndex, status);
  addCompleteProjectButtonEvent(projectIndex);
  addDeleteProjectButtonEvent(projectIndex);
}

export function createFilteredTasksSubCards(taskName, taskDate, taskTime, taskPriority, projectIndex, taskIndex, status) {
  createTasksSubCards(taskName, taskDate, taskTime, taskPriority, projectIndex, taskIndex, status);
}

export function toggleTaskCompleteClass(project, index, operation) {
  if(operation === 'add') return document.querySelector(`.project-card-${project} > .tasks-sub-cards > .task-${index}`).classList.add('task-complete');
  return document.querySelector(`.project-card-${project} > .tasks-sub-cards > .task-${index}`).classList.remove('task-complete');
}

export function toggleProjectCompleteClass(index, operation) {
  if(operation === 'add') return document.querySelector(`.project-card-${index}`).classList.add('project-complete');
  return document.querySelector(`.project-card-${index}`).classList.remove('project-complete');
}

export function projectsCounter() {
  document.querySelector('.all-current-button').textContent = `Current (${getCurrentProjects().length})`;
  document.querySelector('.all-complete-button').textContent = `Complete (${getFinishedProjects().length})`;
}

function addCurrentProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.current-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCurrentProjectCard));
}

export function addCompleteProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.complete-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCompleteProjectCard));
}

function addCompleteProjectButtonEvent(index) {
  document.querySelector(`.complete-project-button-${index}`).addEventListener('click', projectCompleteButtonAction);
}

function addCompleteTaskButtonEvent() {
  document.querySelector(`.complete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskCompleteButtonAction);
}

function addDeleteProjectButtonEvent(index) {
  document.querySelector(`.delete-project-button-${index}`).addEventListener('click', projectDeleteButtonAction);
}

function addDeleteTaskButtonEvent() {
  document.querySelector(`.delete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskDeleteButtonAction);
}