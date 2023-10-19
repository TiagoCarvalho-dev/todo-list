import "./normalize.css";
import "./style.css";
import { createNewProjectForm, deleteNewProjectForm, createNewTaskForm, deleteNewTaskForm,
         createProjectCard, createTasksSubcards } from "./DOMManipulation.js";

const currentProjects = [];
const finishedProjects = [];

function getCurrentProjects() {
  return currentProjects;
}

export { getCurrentProjects }

class Project {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }

  tasks = [];
  finishedTasks = [];
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
    let newProject;
    if(document.querySelector('#low-priority').checked) {
      newProject = new Project(document.querySelector('#project-name').value, document.querySelector('#low-priority').value);
    } else if(document.querySelector('#medium-priority').checked) {
      newProject = new Project(document.querySelector('#project-name').value, document.querySelector('#medium-priority').value);
    } else if(document.querySelector('#high-priority').checked) {
      newProject = new Project(document.querySelector('#project-name').value, document.querySelector('#high-priority').value);
    }
    currentProjects.push(newProject);
    createProjectCard(newProject.name, newProject.priority);
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
    if(!document.querySelector('#chosen-project').value || 
       !document.querySelector('#task-date').value || 
       !document.querySelector('#task-time').value) {
      console.log('Select a valid project');
    } else {
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
      createTasksSubcards(newTask.name, newTask.date, newTask.time, newTask.priority);
      deleteNewTaskForm();
    }
  });
}