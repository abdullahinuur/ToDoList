// when user clicks open/edit
import {projectsToJSON} from './serialize.js';

function createOpenItemDOM(projects, item, itemDOM) {
    let openItemDOM = document.createElement("div");
    openItemDOM.classList.add("openItem", "closed"); // starts out closed

    let openTitle = createOpenTitle(item);
    let openDate = createOpenDate(item);
    let openDescription = createOpenDescription(item);
    let openButtons = createOpenButtons(projects, item, itemDOM);

    openItemDOM.appendChild(openTitle);
    openItemDOM.appendChild(openDate);
    openItemDOM.appendChild(openDescription);
    openItemDOM.appendChild(openButtons);

    return openItemDOM;
}

function createOpenTitle(item) {
    let label = document.createElement("label");
    let openTitle = document.createElement("input");
    openTitle.type = "text";
    openTitle.classList.add("openTitle");
    openTitle.value = item.getTitle();

    label.textContent = "Title";
    label.appendChild(openTitle);

    return label;
}

function createOpenDate(item) {
    let label = document.createElement("label");
    let openDate = document.createElement("input");
    openDate.type = "date";
    openDate.classList.add("openDate");
    openDate.value = item.getDate();

    label.textContent = "Date";
    label.appendChild(openDate);

    return label;
}

function createOpenDescription(item) {
    let label = document.createElement("label");
    let openDescription = document.createElement("textarea");
    openDescription.classList.add("openDesc");
    openDescription.value = item.getDescription();

    label.textContent = "Description";
    label.appendChild(openDescription);

    return label;
}

function createOpenButtons(projects, item, itemDOM) {
    let openItemButtons = document.createElement("div");
    openItemButtons.classList.add("openItemBtns");

    let saveItem = document.createElement("button");
    saveItem.classList.add("saveItem");
    saveItem.textContent = "Save";
    saveItem.addEventListener("click", () => clickSave(projects, item, itemDOM));

    let cancelItem = document.createElement("button");
    cancelItem.classList.add("cancelItem");
    cancelItem.textContent = "Cancel";
    cancelItem.addEventListener("click", () => toggleOpenItem(item, itemDOM));

    openItemButtons.appendChild(saveItem);
    openItemButtons.appendChild(cancelItem);

    return openItemButtons;
}

function clickSave(projects, item, itemDOM) {
    let newTitle = itemDOM.querySelector(".openTitle").value;
    let newDate = itemDOM.querySelector(".openDate").value;
    let newDescription = itemDOM.querySelector(".openDesc").value;

    item.setTitle(newTitle);
    item.setDate(newDate);
    item.setDescription(newDescription);
    updateDOM(item, itemDOM);

    localStorage.setItem("projects", projectsToJSON(projects)); // update localStorage
}

function updateDOM(item, itemDOM) {
    itemDOM.querySelector(".openTitle").value = item.getTitle();
    itemDOM.querySelector(".openDate").value = item.getDate();
    itemDOM.querySelector(".openDesc").value = item.getDescription();

    itemDOM.querySelector(".itemTitle").textContent = item.getTitle();
    itemDOM.querySelector(".itemDate").textContent = item.getDate();
}

function toggleOpenItem(item, itemDOM) {
    let openItemDOM = itemDOM.querySelector(".openItem");
    updateDOM(item, itemDOM);
    if (openItemDOM.classList.contains("closed")) openItemDOM.classList.remove("closed");
    else openItemDOM.classList.add("closed");
}

export {createOpenItemDOM, toggleOpenItem};