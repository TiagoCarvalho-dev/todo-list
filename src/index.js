import "./normalize.css";
import "./style.css";
import { createNewProjectForm, deleteNewProjectForm, createNewTaskForm, deleteNewTaskForm,
         createProjectCard, createTasksSubcards, addToCurrentProjects, showAllProjectCards,
         removeAllProjectCards } from "./DOMManipulation.js";

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

//TESTS!!

const project1 = new Project('NAME1', 'PRIORITY1');
const task1 = new Task('TASK1', 'DATE1', 'TIME1', 'PRIORITY1');
const task2 = new Task('TASK2', 'DATE2', 'TIME2', 'PRIORITY2');
project1.tasks.push(task1);
project1.tasks.push(task2);

const project2 = new Project('NAME2', 'PRIORITY2');
const task3 = new Task('TASK3', 'DATE3', 'TIME3', 'PRIORITY3');
const task4 = new Task('TASK4', 'DATE4', 'TIME4', 'PRIORITY4');
project2.tasks.push(task3);
project2.tasks.push(task4);


const project3 = new Project('NAME3', 'PRIORITY3');
const task5 = new Task('TASK5', 'DATE5', 'TIME5', 'PRIORITY5');
const task6 = new Task('TASK6', 'DATE6', 'TIME6', 'PRIORITY6');
project3.tasks.push(task5);
project3.tasks.push(task6);

currentProjects.push(project1);
currentProjects.push(project2);
currentProjects.push(project3);

//TESTS!!

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
    addToCurrentProjects(newProject.name, newProject.priority);
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

showAllProjectCards();