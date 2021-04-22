// functions to turn projects and items into JSON for localStorage
import {Item} from './item.js';
import {Project} from './project.js';

function projectsToJSON(projects) {
    return JSON.stringify(projects.map(project => projectToJSON(project)));
}

function JSONToProjects(string) {
    return JSON.parse(string).map(projectJSON => JSONToProject(projectJSON));
}

function projectToJSON(project) {
    let name = project.getName();
    let items = project.getItems().map(item => itemToJSON(item));
    let open = project.isOpen();
    return JSON.stringify({name, items, open});
}

function JSONToProject(string) {
    let obj = JSON.parse(string);
    let items = obj.items.map(itemJSON => JSONToItem(itemJSON));

    let project = Project(obj.name);
    items.forEach(item => project.addItem(item));
    if (obj.open) project.toggleOpen();

    return project;
}

function itemToJSON(item) {
    let title = item.getTitle();
    let date = item.getDate();
    let description = item.getDescription();
    let priority = item.getPriority();
    let done = item.isDone();

    return JSON.stringify({title, date, description, priority, done});
}

function JSONToItem(string) {
    let obj = JSON.parse(string);
    let item = Item(obj.title, obj.date, obj.description, obj.priority);
    if (obj.done) item.toggleDone();

    return item;
}

export {projectsToJSON, JSONToProjects};