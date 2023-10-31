import "./normalize.css";
import "./style.css";
import { createTasksSubCards, showAllProjectCards, buildCurrentAndCompleteProjects, 
         toggleTaskCompleteClass, removeTaskCard, projectsCounter, 
         toggleProjectCompleteClass, addCompleteProjectsButtonEvent, createCurrentProjectNewTaskButton, 
         removeNewTaskButton } from "./DOMManipulation.js";

const currentProjects = [];
const finishedProjects = [];

export function getCurrentProjects() { return currentProjects }
export function getFinishedProjects() { return finishedProjects }

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
  showAllProjectCards('incomplete');
});

document.querySelector('.new-project-button').addEventListener('click', () => {
  document.querySelector('#new-project-dialog').showModal();
});

document.querySelector('.cancel-project-button').addEventListener('click', () => {
  document.querySelector('#new-project-dialog').close();
});

document.querySelector('.create-project-button').addEventListener('click', () => {
  createNewProjectButtonEvent();
});

function createNewProjectButtonEvent() {
    if(!document.querySelector('#project-name').value) return console.log('Please insert a project name.');

    let newProject;
    if(document.querySelector('#low-priority').checked) {
      newProject = new Project(document.querySelector('#project-name').value, document.querySelector('#low-priority').value);
    } else if(document.querySelector('#medium-priority').checked) {
      newProject = new Project(document.querySelector('#project-name').value, document.querySelector('#medium-priority').value);
    } else if(document.querySelector('#high-priority').checked) {
      newProject = new Project(document.querySelector('#project-name').value, document.querySelector('#high-priority').value);
    }
    currentProjects.push(newProject);
    showAllProjectCards('incomplete');
    buildCurrentAndCompleteProjects();
    projectsCounter();
}

document.querySelector('.cancel-task-button').addEventListener('click', () => {
  document.querySelector('#new-task-dialog').close();
});

document.querySelector('.create-task-button').addEventListener('click', () => {
  createNewTaskButtonEvent();
});

function createNewTaskButtonEvent() {
    if(!document.querySelector('#task-name').value) return console.log('Select valid name');
    if(!document.querySelector('#task-date').value) return console.log('Select valid date');
    if(!document.querySelector('#task-time').value) return console.log('Select valid time');

    let newTask;
    if(document.querySelector('#low-priority').checked) {
      newTask = new Task(document.querySelector('#task-name').value, document.querySelector('#task-date').value, 
                         document.querySelector('#task-time').value, document.querySelector('#low-priority').value);
    } else if(document.querySelector('#medium-priority').checked) {
      newTask = new Task(document.querySelector('#task-name').value, document.querySelector('#task-date').value, 
                         document.querySelector('#task-time').value, document.querySelector('#medium-priority').value);
    } else if(document.querySelector('#high-priority').checked) {
      newTask = new Task(document.querySelector('#task-name').value, document.querySelector('#task-date').value, 
                         document.querySelector('#task-time').value, document.querySelector('#high-priority').value);
    }
    currentProjects[document.querySelector('.chosen-project').dataset.index].tasks.push(newTask);
    createTasksSubCards(newTask.name, newTask.date, newTask.time, newTask.priority, document.querySelector('.chosen-project').dataset.index, 
                        currentProjects[document.querySelector('.chosen-project').dataset.index].tasks.length - 1, 'incomplete');
    removeNewTaskButton(document.querySelector('.chosen-project').dataset.index);
    createCurrentProjectNewTaskButton(currentProjects[document.querySelector('.chosen-project').dataset.index].name, document.querySelector('.chosen-project').dataset.index);
}

document.querySelector('.all-complete-button').addEventListener('click', () => {
  showAllProjectCards('complete');
});

export function projectCompleteButtonAction() {
  if(document.querySelector(`.project-card-${this.dataset.index} > .tasks-sub-cards`).firstChild) {
    if(!document.querySelector(`.project-card-${this.dataset.index}`).classList.contains('project-complete')) {
      for(let i = 0; i < currentProjects[this.dataset.index].tasks.length; i++) {
        if(!currentProjects[this.dataset.index].tasks[i].complete) return console.log('finish all tasks first');
      }
    }
  }
    
  if(this.parentNode.parentNode.classList.contains('project-complete')) {
    finishedProjects[this.dataset.index].complete = false;
    toggleProjectCompleteClass(this.dataset.index, 'remove');
    currentProjects.push(finishedProjects[this.dataset.index]);
    finishedProjects.splice(this.dataset.index, 1);
    addCompleteProjectsButtonEvent();
    buildCurrentAndCompleteProjects();
    projectsCounter();
    showAllProjectCards('complete');
  } else {
    currentProjects[this.dataset.index].complete = true;
    toggleProjectCompleteClass(this.dataset.index, 'add');
    finishedProjects.push(currentProjects[this.dataset.index]);
    currentProjects.splice(this.dataset.index, 1);
    addCompleteProjectsButtonEvent();
    buildCurrentAndCompleteProjects();
    projectsCounter();
    showAllProjectCards('incomplete');
  }
}

export function projectDeleteButtonAction() {
  if(this.parentNode.parentNode.classList.contains('project-complete')) {
    finishedProjects.splice(this.dataset.index, 1);
    buildCurrentAndCompleteProjects();
    projectsCounter();
    showAllProjectCards('complete');
  } else {
    currentProjects.splice(this.dataset.index, 1);
    buildCurrentAndCompleteProjects();
    projectsCounter();
    showAllProjectCards('incomplete');
  }
}

export function taskCompleteButtonAction() {
  if(this.parentNode.parentNode.classList.contains('task-complete')) {
    currentProjects[this.dataset.project].tasks[this.dataset.index].complete = false;
    toggleTaskCompleteClass(this.dataset.project, this.dataset.index, 'remove');
  } else {
    currentProjects[this.dataset.project].tasks[this.dataset.index].complete = true;
    toggleTaskCompleteClass(this.dataset.project, this.dataset.index, 'add');
  }
}

export function taskDeleteButtonAction() {
  currentProjects[this.dataset.project].tasks.splice(this.dataset.index, 1);
  removeTaskCard(currentProjects[this.dataset.project].name, this.dataset.project);
}

showAllProjectCards('incomplete');