// the left panel of the page
import {getOpenProject} from './index.js';
import {removeProject} from './project.js';
import {createOpenProjectDOM, changeNameDOM, clearOpenProjectDOM} from './openProjectDOM.js';
import {projectsToJSON} from './serialize.js';

const projectsDOM = document.querySelector("#projects");

function createProjectDOM(projects, project) {
    let name = project.getName();
    let projectDOM = document.createElement("div");
    projectDOM.id = name; // identify the project by its name
    projectDOM.classList.add("project");

    let nameButton = createName(projects, project);
    let buttons = createButtons(projects, project, projectDOM);

    projectDOM.appendChild(nameButton);
    projectDOM.appendChild(buttons);

    projectsDOM.appendChild(projectDOM);

    return projectDOM;
}

function createName(projects, project) {
    let button = document.createElement("button");
    button.classList.add("projName");
    button.textContent = project.getName();
    button.addEventListener("click", () => clickProject(projects, project));
    return button;
}

function clickProject(projects, project) {
    let openProject = getOpenProject(projects);
    if (openProject) openProject.toggleOpen();

    project.toggleOpen();
    createOpenProjectDOM(projects);

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
}

function createButtons(projects, project, projectDOM) {
    let div = document.createElement("div");
    div.classList.add("projBtns");

    let edit = document.createElement("button");
    edit.classList.add("editProj");
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
        let newName = window.prompt(`Edit ${projectDOM.id} to:`);
    if (newName != null && validateName(projects, newName)) editProject(projects, project, projectDOM, newName);
    })

    let del = document.createElement("button");
    del.classList.add("deleteProj");
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteProject(projects, project, projectDOM));

    div.appendChild(edit);
    div.appendChild(del);

    return div;
}

function editProject(projects, project, projectDOM, newName) {
    editProjectDOM(projectDOM, newName);
    project.setName(newName);
    // if isOpen, edit openProject header
    if (project.isOpen()) changeNameDOM(newName);

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
}

function deleteProject(projects, project, projectDOM) {
    projectDOM.remove();
    removeProject(projects, project);
    // if isOpen, remove from openProject
    if (project.isOpen()) {
        project.toggleOpen();
        project.emptyItems();
        clearOpenProjectDOM();
    }

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
}

function editProjectDOM(projectDOM, name) {
    projectDOM.id = name;
    let h2 = projectDOM.querySelector(".projName");
    h2.textContent = name;
}

function validateName(projects, text) { // validate name for new project being added
    if (!text) {
        window.alert("Please enter a name.");
        return false;
    }
    let names = projects.map(proj => proj.getName().toLowerCase().trim());
    if (names.includes(text)) {
        window.alert("A project with this name already exists.")
        return false;
    }
    return true;

}


export {createProjectDOM, validateName};