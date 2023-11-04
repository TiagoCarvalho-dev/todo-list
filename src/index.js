import "./normalize.css";
import "./style.css";
import { createTasksSubCards, showAllProjectCards, buildCurrentAndCompleteProjects, 
         toggleTaskCompleteClass, removeTaskCard, projectsCounter, toggleProjectCompleteClass, 
         addCompleteProjectsButtonEvent, createCurrentProjectNewTaskButton, removeNewTaskButton, 
         createFilteredProjectCards, removeAllProjectCards, createFilteredTasksSubCards, 
         noProjectsAvailableText, nothingToDoTodayText } from "./DOMManipulation.js";

let currentProjects = [];
let finishedProjects = [];

export function getCurrentProjects() { return currentProjects }
export function getFinishedProjects() { return finishedProjects }

function sortProjects() {
  currentProjects.sort((a,b) => a.name.localeCompare(b.name));
  finishedProjects.sort((a,b) => a.name.localeCompare(b.name));
}

class Project {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }

  tasks = [];
  complete = false;
}

class Task {
  constructor(name, date, time, priority) {
    this.name = name;
    this.date = date;
    this.time = time;
    this.priority = priority;
  }

  complete = false;
}

document.querySelector('.all-current-button').addEventListener('click',() => {
  sortProjects();
  showAllProjectCards('incomplete');
});

document.querySelector('.new-project-button').addEventListener('click', () => {
  document.querySelector('#new-project-dialog').showModal();
});

document.querySelector('.cancel-project-button').addEventListener('click', () => {
  document.querySelector('#new-project-dialog').close();
  document.querySelector('.new-project-form').reset();
});

document.querySelector('.create-project-button').addEventListener('click', () => {
  createNewProjectButtonEvent();
  document.querySelector('.new-project-form').reset();
});

function createNewProjectButtonEvent() {
    if(!document.querySelector('#project-name').value) {
      const fillAllProjectInformationDialog = document.querySelector('#fill-all-project-information-alert');
      fillAllProjectInformationDialog.showModal();
      document.querySelector('.ok-button-project-information-alert').onclick = () => {
        fillAllProjectInformationDialog.close();
      }
      return
    }

    for(let i = 0; i < currentProjects.length; i++) {
      if(document.querySelector('#project-name').value.toLowerCase() === currentProjects[i].name.toLowerCase()) {
        const existingProjectNameDialog = document.querySelector('#existing-name-alert');
        existingProjectNameDialog.showModal();
        document.querySelector('.ok-button-existing-name').onclick = () => {
          existingProjectNameDialog.close();
        }
      return
      }
    }

    let newProject;
    newProject = new Project(document.querySelector('#project-name').value, document.querySelector('input[name="priority-project"]:checked').value);
    currentProjects.push(newProject);
    sortProjects();
    updateLocalStorage();
    showAllProjectCards('incomplete');
    buildCurrentAndCompleteProjects();
    projectsCounter();
}

document.querySelector('.cancel-task-button').addEventListener('click', () => {
  document.querySelector('#new-task-dialog').close();
  document.querySelector('.new-task-form').reset();
});

document.querySelector('.create-task-button').addEventListener('click', () => {
  createNewTaskButtonEvent();
  document.querySelector('.new-task-form').reset();
});

function createNewTaskButtonEvent() {
    if(!document.querySelector('#task-name').value ||
       !document.querySelector('#task-date').value ||
       !document.querySelector('#task-time').value) {
      const fillAllTaskInformationDialog = document.querySelector('#fill-all-task-information-alert');
      fillAllTaskInformationDialog.showModal();
      document.querySelector('.ok-button-task-information-alert').onclick = () => {
        fillAllTaskInformationDialog.close();
      }
      return
    }

    let newTask;
    newTask = new Task(document.querySelector('#task-name').value, new Date(new Date(document.querySelector('#task-date').value).getTime() - new Date(document.querySelector('#task-date').value).getTimezoneOffset() * -60000), 
                       document.querySelector('#task-time').value, document.querySelector('input[name="priority-task"]:checked').value);
    currentProjects[document.querySelector('.chosen-project').dataset.index].tasks.push(newTask);
    updateLocalStorage();
    createTasksSubCards(newTask.name, newTask.date, newTask.time, newTask.priority, document.querySelector('.chosen-project').dataset.index, 
                        currentProjects[document.querySelector('.chosen-project').dataset.index].tasks.length - 1, 'incomplete');
    removeNewTaskButton(document.querySelector('.chosen-project').dataset.index);
    createCurrentProjectNewTaskButton(currentProjects[document.querySelector('.chosen-project').dataset.index].name, document.querySelector('.chosen-project').dataset.index);
}

document.querySelector('.all-complete-button').addEventListener('click', () => {
  sortProjects();
  showAllProjectCards('complete');
});

export function projectCompleteButtonAction() {
  if(document.querySelector(`.project-card-${this.dataset.index} > .tasks-sub-cards`).firstChild) {
    if(!document.querySelector(`.project-card-${this.dataset.index}`).classList.contains('project-complete')) {
      for(let i = 0; i < currentProjects[this.dataset.index].tasks.length; i++) {
        if(!currentProjects[this.dataset.index].tasks[i].complete) {
          document.querySelector('#complete-all-tasks-alert').showModal();
          document.querySelector('.ok-button-tasks-alert').onclick = () => document.querySelector('#complete-all-tasks-alert').close();
          return
        }
      }
    }
  }

  const confirmCompleteProjectDialog = document.querySelector('#confirm-complete-project');
  const confirmIncompleteProjectDialog = document.querySelector('#confirm-incomplete-project');

  if(this.parentNode.parentNode.classList.contains('project-complete')) {
    confirmIncompleteProjectDialog.showModal();
    document.querySelector('.yes-button-incomplete-project').onclick = () => {
      finishedProjects[this.dataset.index].complete = false;
      toggleProjectCompleteClass(this.dataset.index, 'remove');
      currentProjects.push(finishedProjects[this.dataset.index]);
      finishedProjects.splice(this.dataset.index, 1);
      sortProjects();
      updateLocalStorage();
      addCompleteProjectsButtonEvent();
      buildCurrentAndCompleteProjects();
      projectsCounter();
      showAllProjectCards('complete');
      confirmIncompleteProjectDialog.close();
    }
    document.querySelector('.no-button-incomplete-project').onclick = () => {
      confirmIncompleteProjectDialog.close();
    }
  } else {
    confirmCompleteProjectDialog.showModal();
    document.querySelector('.yes-button-complete-project').onclick = () => {
      currentProjects[this.dataset.index].complete = true;
      toggleProjectCompleteClass(this.dataset.index, 'add');
      finishedProjects.push(currentProjects[this.dataset.index]);
      currentProjects.splice(this.dataset.index, 1);
      sortProjects();
      updateLocalStorage();
      addCompleteProjectsButtonEvent();
      buildCurrentAndCompleteProjects();
      projectsCounter();
      showAllProjectCards('incomplete');
      confirmCompleteProjectDialog.close();
    }
    document.querySelector('.no-button-complete-project').onclick = () => {
      confirmCompleteProjectDialog.close();
    }
  }
}

export function projectDeleteButtonAction() {
  const confirmDeleteProjectDialog = document.querySelector('#confirm-delete-project');
  confirmDeleteProjectDialog.showModal();
  document.querySelector('.yes-button-delete-project').onclick = () => {
    if(this.parentNode.parentNode.classList.contains('project-complete')) {
      finishedProjects.splice(this.dataset.index, 1);
      sortProjects();
      updateLocalStorage();
      buildCurrentAndCompleteProjects();
      projectsCounter();
      showAllProjectCards('complete');
      confirmDeleteProjectDialog.close();
    } else {
      currentProjects.splice(this.dataset.index, 1);
      sortProjects();
      updateLocalStorage();
      buildCurrentAndCompleteProjects();
      projectsCounter();
      showAllProjectCards('incomplete');
      confirmDeleteProjectDialog.close();
    }
  }
  document.querySelector('.no-button-delete-project').onclick = () => {
    confirmDeleteProjectDialog.close();
  }
}

export function taskCompleteButtonAction() {
  const confirmTaskCompleteDialog = document.querySelector('#confirm-complete-task');
  const confirmTaskIncompleteDialog = document.querySelector('#confirm-incomplete-task');

  if(this.parentNode.parentNode.classList.contains('task-complete')) {
    confirmTaskIncompleteDialog.showModal();
    document.querySelector('.yes-button-incomplete-task').onclick = () => {
      currentProjects[this.dataset.project].tasks[this.dataset.index].complete = false;
      updateLocalStorage();
      toggleTaskCompleteClass(this.dataset.project, this.dataset.index, 'remove');
      confirmTaskIncompleteDialog.close();
    }
    document.querySelector('.no-button-incomplete-task').onclick = () => {
      confirmTaskIncompleteDialog.close();
    }
  } else {
    confirmTaskCompleteDialog.showModal();
    document.querySelector('.yes-button-complete-task').onclick = () => {
      currentProjects[this.dataset.project].tasks[this.dataset.index].complete = true;
      updateLocalStorage();
      toggleTaskCompleteClass(this.dataset.project, this.dataset.index, 'add');
      confirmTaskCompleteDialog.close();
    }
    document.querySelector('.no-button-complete-task').onclick = () => {
      confirmTaskCompleteDialog.close();
    }
  }
}

export function taskDeleteButtonAction() {
  const confirmDeleteTaskDialog = document.querySelector('#confirm-delete-task');
  confirmDeleteTaskDialog.showModal();
  document.querySelector('.yes-button-delete-task').onclick = () => {
    currentProjects[this.dataset.project].tasks.splice(this.dataset.index, 1);
    updateLocalStorage();
    removeTaskCard(currentProjects[this.dataset.project].name, this.dataset.project);
    confirmDeleteTaskDialog.close();
  }
  document.querySelector('.no-button-delete-task').onclick = () => {
    confirmDeleteTaskDialog.close();
  }
}

document.querySelector('.today-button').addEventListener('click', filterTodayProjects);

function filterTodayProjects() {
  removeAllProjectCards();
  const mainSectionProjects = [];
  for(let i = 0; i < currentProjects.length; i++) {
    for(let j = 0; j < currentProjects[i].tasks.length; j++) {
      if(currentProjects[i].tasks[j].date.getTime() === new Date().setHours(0, 0, 0, 0)) {
        const filteredProject = mainSectionProjects.filter(project => project.name === currentProjects[i].name);
        if(filteredProject.length > 0) {
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          removeNewTaskButton(i);
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
        } else {
          createFilteredProjectCards(currentProjects[i].name, currentProjects[i].priority, i, 'incomplete');
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
          mainSectionProjects.push(currentProjects[i]);
        }
      }
    }
  }
  if(!document.querySelector('.main-section').firstChild) {
    nothingToDoTodayText();
  }
}

document.querySelector('.next-seven-days-button').addEventListener('click', filterNextSevenDaysProjects);

function filterNextSevenDaysProjects() {
  removeAllProjectCards();
  const mainSectionProjects = [];
  for(let i = 0; i < currentProjects.length; i++) {
    for(let j = 0; j < currentProjects[i].tasks.length; j++) {
      if((currentProjects[i].tasks[j].date.getTime() - new Date().setHours(0, 0, 0, 0)) < 518400001 &&
         (currentProjects[i].tasks[j].date.getTime() - new Date().setHours(0, 0, 0, 0)) >= 0) {
        const filteredProject = mainSectionProjects.filter(project => project.name === currentProjects[i].name);
        if(filteredProject.length > 0) {
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          removeNewTaskButton(i);
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
        } else {
          createFilteredProjectCards(currentProjects[i].name, currentProjects[i].priority, i, 'incomplete');
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
          mainSectionProjects.push(currentProjects[i]);
        }
      }
    }
  }
  if(!document.querySelector('.main-section').firstChild) {
    noProjectsAvailableText();
  }
}

document.querySelector('.filters-button').addEventListener('click', () => {
  document.querySelector('.filters-container').classList.toggle('hidden');
  if(document.querySelector('#selected-filter').value === 'date') {
    document.querySelector('.date-container').classList.remove('hidden');
  } else {
    document.querySelector('.priority-container').classList.remove('hidden');
  }
  document.querySelector('#selected-filter').addEventListener('change', () => {
    if(document.querySelector('#selected-filter').value === 'date') {
      document.querySelector('.date-container').classList.remove('hidden');
      document.querySelector('.priority-container').classList.add('hidden');
    } else {
      document.querySelector('.date-container').classList.add('hidden');
      document.querySelector('.priority-container').classList.remove('hidden');
    }
  });
});

document.querySelector('.confirm-date-button').addEventListener('click', confirmDateButtonEvent);

function confirmDateButtonEvent() {
  removeAllProjectCards();
  const mainSectionProjects = [];
  for(let i = 0; i < currentProjects.length; i++) {
    for(let j = 0; j < currentProjects[i].tasks.length; j++) {
      if(currentProjects[i].tasks[j].date.getTime() === 
         new Date(new Date(document.querySelector('#selected-date').value).getTime() - new Date(document.querySelector('#selected-date').value).getTimezoneOffset() * -60000).getTime()) {
        const filteredProject = mainSectionProjects.filter(project => project.name === currentProjects[i].name);
        if(filteredProject.length > 0) {
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          removeNewTaskButton(i);
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
        } else {
          createFilteredProjectCards(currentProjects[i].name, currentProjects[i].priority, i, 'incomplete');
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
          mainSectionProjects.push(currentProjects[i]);
        }
      }
    }
  }
  if(!document.querySelector('.main-section').firstChild) {
    noProjectsAvailableText();
  }
}

document.querySelector('.confirm-priority-button').addEventListener('click', confirmPriorityButtonEvent);

function confirmPriorityButtonEvent() {
  removeAllProjectCards();
  const mainSectionProjects = [];
  for(let i = 0; i < currentProjects.length; i++) {
    for(let j = 0; j < currentProjects[i].tasks.length; j++) {
      if(currentProjects[i].tasks[j].priority === document.querySelector('input[name="priority-filter"]:checked').value) {
        const filteredProject = mainSectionProjects.filter(project => project.name === currentProjects[i].name);
        if(filteredProject.length > 0) {
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          removeNewTaskButton(i);
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
        } else {
          createFilteredProjectCards(currentProjects[i].name, currentProjects[i].priority, i, 'incomplete');
          createFilteredTasksSubCards(currentProjects[i].tasks[j].name, currentProjects[i].tasks[j].date, currentProjects[i].tasks[j].time, 
                                      currentProjects[i].tasks[j].priority, i, j, 'incomplete');
          createCurrentProjectNewTaskButton(currentProjects[i].name, i);
          mainSectionProjects.push(currentProjects[i]);
        }
      }
    }
  }
  if(!document.querySelector('.main-section').firstChild) {
    noProjectsAvailableText();
  }
}

export function convertTimeToMilliseconds(time) {
  let splitTime = time.split(':');
  let hoursToSeconds = splitTime[0] * 3600;
  let minutesToSeconds = splitTime[1] * 60;
  return (hoursToSeconds + minutesToSeconds) * 1000;
}

function updateLocalStorage() {
  localStorage.setItem('currentProjects', JSON.stringify(currentProjects));
  localStorage.setItem('finishedProjects', JSON.stringify(finishedProjects));
}

function openingPage() {
  if(localStorage.getItem('currentProjects')) {
    currentProjects = JSON.parse(localStorage.getItem('currentProjects'));
    finishedProjects = JSON.parse(localStorage.getItem('finishedProjects'));
    for(let i = 0; i < currentProjects.length; i++) {
      for(let j = 0; j < currentProjects[i].tasks.length; j++) {
        console.log(currentProjects[i].tasks[j].date);
        currentProjects[i].tasks[j].date = new Date(currentProjects[i].tasks[j].date);
      }
    }
    filterTodayProjects();
    buildCurrentAndCompleteProjects();
    projectsCounter();
  } else {
    filterTodayProjects();
    buildCurrentAndCompleteProjects();
    projectsCounter();
  }
}

openingPage();