function Project(_name) {
    let name = _name;
    let items = [];
    let open = false;
    const getName = () => name;
    const getItems = () => items;
    const isOpen = () => open;
    const setName = _name => name = _name;
    const addItem = item => items.push(item);
    const removeItem = item => {
        let index = items.indexOf(item);
        if (index > -1) items.splice(items.indexOf(item), 1);
    }
    const emptyItems = () => items = [];
    const toggleOpen = () => open = !open
    return {getName, getItems, isOpen, setName, addItem, removeItem, emptyItems, toggleOpen};
}

function getProject(projects, name) {
    let i;
    for (i = 0; i < projects.length; ++i) {
        let proj = projects[i];
        if (proj.getName() === name) return proj;
    }
    return null; // project not found
}

function removeProject(projects, project) {
    let i = projects.indexOf(project);
    if (i > -1) projects.splice(i, 1);
}

export {Project, getProject, removeProject};