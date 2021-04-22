
function Item(_title, _date, _description, _priority) {
    let title = _title;
    let date = _date;
    let description = _description;
    let priority = _priority;
    let done = false;
    const getTitle = () => title;
    const getDate = () => date;
    const getDescription = () => description;
    const getPriority = () => priority;
    const isDone = () => done;
    const setTitle = _title => title = _title;
    const setDate = _date => date = _date;
    const setDescription = _description => description = _description;
    const setPriority = _priority => priority = _priority;
    const toggleDone = () => done = !done;
    return {getTitle, getDate, getDescription, getPriority, isDone, setTitle, setDate, setDescription, setPriority, toggleDone};
}

export {Item};