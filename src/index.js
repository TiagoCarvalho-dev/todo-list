import "./normalize.css";
import "./style.css";
import { createNewProjectForm } from "./DOMManipulation.js";

const currentProjects = [];
const finishedProjects = [];

class Project {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }
}

document.querySelector('.new-project-button').addEventListener('click', createNewProjectForm);
