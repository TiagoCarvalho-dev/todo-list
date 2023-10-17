export function createNewProjectForm() {
  const newProjectDiv = document.querySelector('.new-project-form');

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('project-name-container');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'project-name');
  nameLabel.textContent = 'Project Name';

  const nameInput = document.createElement('input')
  nameInput.setAttribute('name', 'project-name');
  nameInput.setAttribute('id', 'project-name');
  nameInput.setAttribute('type', 'text');
  
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);

  const priorityDiv = document.createElement('div');
  priorityDiv.classList.add('project-priority-container');

  const legend = document.createElement('legend');
  legend.textContent = 'Priority';

  const radioDiv = document.createElement('div');
  radioDiv.classList.add('radio-container');

  const lowPriorityInput = document.createElement('input');
  lowPriorityInput.setAttribute('type', 'radio');
  lowPriorityInput.setAttribute('id', 'low-priority');
  lowPriorityInput.setAttribute('name', 'priority');
  lowPriorityInput.setAttribute('value', 'low-priority');

  const lowPriorityLabel = document.createElement('label');
  lowPriorityLabel.setAttribute('for', 'low-priority');
  lowPriorityLabel.textContent = 'Low';

  const mediumPriorityInput = document.createElement('input');
  mediumPriorityInput.setAttribute('type', 'radio');
  mediumPriorityInput.setAttribute('id', 'medium-priority');
  mediumPriorityInput.setAttribute('name', 'priority');
  mediumPriorityInput.setAttribute('value', 'medium-priority');
  
  const mediumPriorityLabel = document.createElement('label');
  mediumPriorityLabel.setAttribute('for', 'medium-priority');
  mediumPriorityLabel.textContent = 'Medium';

  const highPriorityInput = document.createElement('input');
  highPriorityInput.setAttribute('type', 'radio');
  highPriorityInput.setAttribute('id', 'high-priority');
  highPriorityInput.setAttribute('name', 'priority');
  highPriorityInput.setAttribute('value', 'high-priority');
  
  const highPriorityLabel = document.createElement('label');
  highPriorityLabel.setAttribute('for', 'high-priority');
  highPriorityLabel.textContent = 'High';

  radioDiv.appendChild(lowPriorityInput);
  radioDiv.appendChild(lowPriorityLabel);
  radioDiv.appendChild(mediumPriorityInput);
  radioDiv.appendChild(mediumPriorityLabel);
  radioDiv.appendChild(highPriorityInput);
  radioDiv.appendChild(highPriorityLabel);

  priorityDiv.appendChild(legend);
  priorityDiv.appendChild(radioDiv);

  newProjectDiv.appendChild(nameDiv);
  newProjectDiv.appendChild(priorityDiv);
}