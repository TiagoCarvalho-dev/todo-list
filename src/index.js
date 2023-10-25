import "./normalize.css";
import "./style.css";
import { createNewProjectForm, deleteNewProjectForm, createNewTaskForm, deleteNewTaskForm,
         createProjectCard, createTasksSubCards, showAllProjectCards,
         createCurrentProjectCard, buildCurrentAndCompleteProjects, addTaskCompleteClass, 
         removeTaskCard, createCompleteProjectCard, projectsCounter, toggleProjectCompleteClass } from "./DOMManipulation.js";

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
  if(document.querySelector('.new-task-form').firstChild) {
    deleteNewTaskForm();
  }

  if(document.querySelector('.new-project-form').firstChild) {
    deleteNewProjectForm();
  } else {
    createNewProjectForm();
    createNewProjectButtonEvent();
  }
});

function createNewProjectButtonEvent() {
  document.querySelector('.create-new-project-button').addEventListener('click', () => {
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
    createProjectCard(newProject.name, newProject.priority, currentProjects.length - 1, 'incomplete');
    addCompleteProjectButtonEvent(currentProjects.length - 1);
    addDeleteProjectButtonEvent(currentProjects.length - 1);
    buildCurrentAndCompleteProjects();
    addCurrentProjectsButtonEvent();
    projectsCounter();
    deleteNewProjectForm();
    showAllProjectCards('incomplete');
  });
}

document.querySelector('.new-task-button').addEventListener('click', () => {
  if(document.querySelector('.new-project-form').firstChild) {
    deleteNewProjectForm();
  }

  if(document.querySelector('.new-task-form').firstChild) {
    deleteNewTaskForm();
  } else {
    createNewTaskForm();
    createNewTaskButtonEvent();
  }
});

function createNewTaskButtonEvent() {
  document.querySelector('.create-new-task-button').addEventListener('click', () => {
    if(!document.querySelector('#chosen-project').value) return console.log('Select valid project');
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
    currentProjects[document.querySelector('#chosen-project').value].tasks.push(newTask);
    createTasksSubCards(newTask.name, newTask.date, newTask.time, newTask.priority, document.querySelector('#chosen-project').value, 
                        currentProjects[document.querySelector('#chosen-project').value].tasks.length - 1, 'incomplete');
    deleteNewTaskForm();
  });
}

document.querySelector('.all-complete-button').addEventListener('click', () => {
  showAllProjectCards('complete');
});

export function addCurrentProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.current-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCurrentProjectCard));
}

export function addCompleteProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.complete-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCompleteProjectCard));
}

export function addCompleteProjectButtonEvent(index) {
  document.querySelector(`.complete-project-button-${index}`).addEventListener('click', projectCompleteButtonAction);
}

export function addCompleteTaskButtonEvent() {
  document.querySelector(`.complete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskCompleteButtonAction);
}

export function addDeleteProjectButtonEvent(index) {
  document.querySelector(`.delete-project-button-${index}`).addEventListener('click', projectDeleteButtonAction);
}

export function addDeleteTaskButtonEvent() {
  document.querySelector(`.delete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskDeleteButtonAction);
}

function projectCompleteButtonAction() {
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

function projectDeleteButtonAction() {
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

function taskCompleteButtonAction() {
  currentProjects[this.dataset.project].tasks[this.dataset.index].complete = true;
  addTaskCompleteClass(this.dataset.project, this.dataset.index);
}

function taskDeleteButtonAction() {
  currentProjects[this.dataset.project].tasks.splice(this.dataset.index, 1);
  removeTaskCard(this.dataset.project);
}

showAllProjectCards('incomplete');