//the centre panel of the page
import {getOpenProject} from './index.js';
import {createOpenItemDOM, toggleOpenItem} from './openItemDOM.js'
import {projectsToJSON} from './serialize.js';

const itemsDOM = document.querySelector("#items"); // div that contains each item
const projName = document.querySelector("#openProjName")

function createOpenProjectDOM(projects) {
    let openProject = getOpenProject(projects);
    if (!openProject) return null; // there is no open project
    clearItemsDOM();
    changeNameDOM(openProject.getName());

    let items = openProject.getItems();
    items.forEach(item => createItemDOM(projects, openProject, item));
}

function changeNameDOM(name) {
    projName.textContent = name;
}

function createItemDOM(projects, openProject, item) {
    let itemDOM = document.createElement("div");
    itemDOM.classList.add("item");

    let checkbox = createCheckbox(projects, item, itemDOM);
    let title = createTitle(item);
    let date = createDate(item);
    let priority = createPriority(projects, item);
    let buttons = createButtons(projects, item, itemDOM);
    let openItem = createOpenItemDOM(projects, item, itemDOM)

    itemDOM.appendChild(checkbox);
    itemDOM.appendChild(title);
    itemDOM.appendChild(date);
    itemDOM.appendChild(priority);
    itemDOM.appendChild(buttons);
    itemDOM.appendChild(openItem);

    itemsDOM.appendChild(itemDOM);

    return itemDOM;
}

function createCheckbox(projects, item, itemDOM) {
    let check = document.createElement("input");
    check.type = "checkbox";
    check.checked = item.isDone();
    if (item.isDone()) itemDOM.classList.add("itemDone"); // when retrieved from localStorage, tint is item is done

    check.addEventListener("change", () => clickCheckbox(projects, item, itemDOM));
    return check;
}

function clickCheckbox(projects, item, itemDOM) {
    item.toggleDone();
    if (item.isDone()) itemDOM.classList.add("itemDone");
    else itemDOM.classList.remove("itemDone");

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
}

function createTitle(item) {
    let title = document.createElement("h2");
    title.classList.add("itemTitle");
    title.textContent = item.getTitle();
    return title;
}

function createDate(item) {
    let date = document.createElement("h2");
    date.classList.add("itemDate");
    date.textContent = item.getDate();
    return date;
}

function createPriority(projects, item) {
    let priority = document.createElement("select");
    priority.classList.add("priority");

    let high = document.createElement("option");
    high.value = "High";
    high.textContent = "High";

    let medium = document.createElement("option");
    medium.value = "Medium";
    medium.textContent = "Medium";

    let low = document.createElement("option");
    low.value = "Low";
    low.textContent = "Low";

    priority.appendChild(high);
    priority.appendChild(medium);
    priority.appendChild(low);
    priority.value = item.getPriority();

    priority.addEventListener("change", () => {
        item.setPriority(priority.value);
        localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
    });

    return priority;
}


function createButtons(projects, item, itemDOM) {
    let openProject = getOpenProject(projects); // already checked in createOpenProjectDOM

    let div = document.createElement("div");
    div.classList.add("itemBtns");

    let edit = document.createElement("button");
    edit.classList.add("editItem");
    edit.textContent = "Open/Edit";
    edit.addEventListener("click", () => clickEditItem(item, itemDOM));

    let del = document.createElement("button");
    del.classList.add("deleteItem");
    del.textContent = "Delete";
    del.addEventListener("click", () => clickDeleteItem(projects, item, itemDOM));

    div.appendChild(edit);
    div.appendChild(del);
    return div;
}

function clickEditItem(item, itemDOM) { // open and close the expanded info section
    toggleOpenItem(item, itemDOM);
}

function clickDeleteItem(projects, item, itemDOM) {
    let openProject = getOpenProject(projects); // already checked in createOpenProjectDOM
    openProject.removeItem(item);
    clearItemDOM(itemDOM);

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
}

function clearItemDOM(itemDOM) { // clear a single item from DOM
    itemsDOM.removeChild(itemDOM);
}

function clearItemsDOM() { // clear all items from DOM
    while (itemsDOM.lastChild) itemsDOM.removeChild(itemsDOM.lastChild);
}

function clearOpenProjectDOM() {
    projName.textContent = "";
    clearItemsDOM();
}


export {createOpenProjectDOM, createItemDOM, changeNameDOM, clearOpenProjectDOM};