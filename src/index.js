import "./normalize.css";
import "./style.css";
import { createNewProjectForm, deleteNewProjectForm, createNewTaskForm, deleteNewTaskForm,
         createProjectCard, createTasksSubcards, showAllProjectCards,
         createCurrentProjectCard, buildCurrentProjects, addTaskCompleteClass, 
         addProjectCompleteClass, removeTaskCard} from "./DOMManipulation.js";

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
    addDeleteProjectButtonEvent(currentProjects.length - 1);
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
  allProjects.forEach(button => button.addEventListener('click', createCurrentProjectCard));
}

export function addCompleteProjectButtonEvent(index) {
  document.querySelector(`.complete-project-button-${index}`).addEventListener('click', projectCompleteButtonAction, true);
}

export function removeCompleteProjectButtonEvent(index) {
  document.querySelector(`.complete-project-button-${index}`).removeEventListener('click', projectCompleteButtonAction, true);
}

export function addCompleteTaskButtonEvent() {
  document.querySelector(`.complete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskCompleteButtonAction);
}

export function addDeleteProjectButtonEvent(index) {
  document.querySelector(`.delete-project-button-${index}`).addEventListener('click', projectDeleteButtonAction, true);
}

export function removeDeleteProjectButtonEvent(index) {
  document.querySelector(`.delete-project-button-${index}`).removeEventListener('click', projectDeleteButtonAction, true);
}

export function addDeleteTaskButtonEvent() {
  document.querySelector(`.delete-task-button-${this.dataset.project}-${this.dataset.index}`).addEventListener('click', taskDeleteButtonAction);
}

function projectCompleteButtonAction() {
  currentProjects[this.dataset.index].complete = true;
  addProjectCompleteClass(this.dataset.index);
  finishedProjects.push(currentProjects[this.dataset.index]);
  currentProjects.splice(this.dataset.index, 1);
  buildCurrentProjects();
  showAllProjectCards();
}

function projectDeleteButtonAction() {
  currentProjects.splice(this.dataset.index, 1);
  buildCurrentProjects();
  showAllProjectCards();
}

function taskCompleteButtonAction() {
  currentProjects[this.dataset.project].tasks[this.dataset.index].complete = true;
  addTaskCompleteClass(this.dataset.project, this.dataset.index);
}

function taskDeleteButtonAction() {
  currentProjects[this.dataset.project].tasks.splice(this.dataset.index, 1);
  removeTaskCard(this.dataset.project);
}

showAllProjectCards();