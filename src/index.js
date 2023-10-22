import "./normalize.css";
import "./style.css";
import { createNewProjectForm, deleteNewProjectForm, createNewTaskForm, deleteNewTaskForm,
         createProjectCard, createTasksSubcards, showAllProjectCards,
         createCurrentProjectCard, buildCurrentProjects } from "./DOMManipulation.js";

const currentProjects = [];
const finishedProjects = [];

export function getCurrentProjects() {
  return currentProjects;
}

class Project {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }

  tasks = [];
  finishedTasks = [];
  complete = false;

  changeCompleteStatus() {
    this.complete ? this.complete = false : this.complete = true;
  }
}

class Task {
  constructor(name, date, time, priority) {
    this.name = name;
    this.date = date;
    this.time = time;
    this.priority = priority;
  }

  complete = false;

  changeCompleteStatus() {
    this.complete ? this.complete = false : this.complete = true;
  }
}

document.querySelector('.home-button').addEventListener('click',() => {
  showAllProjectCards();
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
    createProjectCard(newProject.name, newProject.priority, currentProjects.length - 1);
    addCompleteProjectButtonEvent(currentProjects.length - 1);
    buildCurrentProjects();
    addCurrentProjectsButtonEvent();
    deleteNewProjectForm();
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
    createTasksSubcards(newTask.name, newTask.date, newTask.time, newTask.priority, document.querySelector('#chosen-project').value, 
                        currentProjects[document.querySelector('#chosen-project').value].tasks.length - 1);
    deleteNewTaskForm();
  });
}

export function addCurrentProjectsButtonEvent() {
  const allProjects = document.querySelectorAll('.current-projects > button');
  allProjects.forEach(button => button.addEventListener('click', createCurrentProjectCard, true));
}

export function addCompleteProjectButtonEvent(index) {
  document.querySelector(`.complete-project-button-${index}`).addEventListener('click', completeButtonAction, true);
}

export function removeCompleteProjectButtonEvent(index) {
  document.querySelector(`.complete-project-button-${index}`).removeEventListener('click', completeButtonAction, true);
}

function completeButtonAction() {
  finishedProjects.push(currentProjects[this.dataset.index]);
  currentProjects.splice(this.dataset.index, 1);
  buildCurrentProjects();
  showAllProjectCards();
}

showAllProjectCards();