import {Item} from './item.js';
import {Project} from './project.js';
import {createProjectDOM, validateName} from './projectDOM.js';
import {createOpenProjectDOM, createItemDOM} from './openProjectDOM.js'
import {projectsToJSON, JSONToProjects} from './serialize.js';

let projects = [];

let addProjBtn = document.querySelector("#addProjBtn");
addProjBtn.addEventListener("click", clickAdd);
let addProjTextField = document.querySelector("#addProjText");
addProjTextField.addEventListener("keyup", pressEnter);

function getOpenProject(projects) {
    let openProjects = projects.filter(proj => proj.isOpen()); // should return array size 0 or 1, not more
    if (openProjects.length === 0) return null;
    if (openProjects.length > 1) {
        window.alert("More than one project is open!"); // should never happen, really just here for debugging
        return null;
    }
    return openProjects[0];
}

function clickAdd() { // add project button
    let text = addProjTextField.value;
    if (validateName(projects, text.toLowerCase().trim())) {
        addProject(text);
        addProjTextField.value = "";
    }
    addProjTextField.focus();
}

function pressEnter(event) {
    if (event.key === "Enter") clickAdd();
}

function addProject(name) {
    let project = Project(name);
    projects.push(project);
    createProjectDOM(projects, project);

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage

    return project;
}

function addItem(title, date, desc, priority, projectName) {
    let openProject = getOpenProject(projects);
    if (!openProject) {
        window.alert("There is no open project to add the item to.");
        return null;
    }
    // validation done in form
    let item = Item(title, date, desc, priority, openProject.getName());
    openProject.addItem(item);
    createItemDOM(projects, openProject, item);

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage

    return item;
}

function submitItem(event) {
    event.preventDefault(); // stop form refreshing
    let title = document.querySelector("#addTitle");
    let date = document.querySelector("#addDate");
    let desc = document.querySelector("#addDesc");
    let priority = document.querySelector("#addPriority");

    addItem(title.value, date.value, desc.value, priority.value);

    title.value = "";
    date.value = "";
    desc.value = "";
}

function addDefault() { // opens default project and items
    let defaultProject = addProject("Default Project");
    defaultProject.toggleOpen();
    if (getOpenProject(projects)) {
        createOpenProjectDOM(projects);
    addItem("example 1", "2021-02-01", "random description", "Medium");
    addItem("example 2", "2020-02-01", "desc random too", "High");
    }
    localStorage.setItem("projects", projectsToJSON(projects));
}




let addItemForm = document.querySelector("#addItemForm");
addItemForm.addEventListener("submit", submitItem);

let storage = localStorage.getItem("projects");
 if (!storage) {
    addDefault();
 }
else {
    projects = JSONToProjects(storage);
    projects.forEach(project => createProjectDOM(projects, project));
    if (getOpenProject(projects)) createOpenProjectDOM(projects);
}




export {getOpenProject};