import Column from "./Column";
import {observer} from "mobx-react-lite";
import {store} from "../store/store";


const Project = () => {
    const {
        columns,
        installColumns,
        currentColumn,
        installCurrentColumn,
        currentTask,
        installCurrentTask,
        changeNameColumn,
        addColumn
    } = store;

    function dragStartHandler(e, col, task) {
        installCurrentTask(task);
        installCurrentColumn(col);
    }

    function dropHandler(event, col, task) {
        event.preventDefault();
        event.stopPropagation()
        const oldTasks = currentColumn.tasks.filter(t => t.id !== currentTask.id);
        const current = {...currentColumn, tasks: oldTasks}

        const indexTask = col.tasks.indexOf(task);

        col.tasks.splice(indexTask + 1, 0, col.id === currentColumn.id ?
            col.tasks.splice(col.tasks.indexOf(currentTask), 1)[0]
            : currentTask)

        const newColumn = {...col, tasks: [...col.tasks]};

        event.target.style.boxShadow = null;

        installColumns(columns.map(c => {
            if (c.id === col.id) {
                return newColumn
            }
            if (c.id === currentColumn.id) {
                return current
            }
            return c;
        }))
    }

    function dragOverHandler(event) {
        event.preventDefault();
        event.target.style.boxShadow = "0 4px 2px -2px gray";
    }

    function dragOverCardHandler(event) {
        event.preventDefault();
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.target.style.boxShadow = null;
    }


    function dropCardHandler(event, col) {
        col.tasks.push(currentTask)

        const oldTasks = currentColumn.tasks.filter(t => t.id !== currentTask.id);
        const current = {...currentColumn, tasks: oldTasks}

        const newColumn = {...col, tasks: [...col.tasks]};

        installColumns(columns.map(c => {
            if (c.id === col.id) {
                return newColumn
            }
            if (c.id === currentColumn.id) {
                return current
            }
            return c;
        }))
    }

    return (
        <div className="flex flex-row items-start overflow-x-auto pb-5">
            <link rel=""/>

            {columns.map((item) => (
                <Column key={item.id}
                        item={item}
                        dropCardHandler={dropCardHandler}
                        dragStartHandler={dragStartHandler}
                        dragOverHandler={dragOverHandler}
                        dragOverCardHandler={dragOverCardHandler}
                        dropHandler={dropHandler}
                        changeNameColumn={changeNameColumn}
                        dragLeaveHandler={dragLeaveHandler}
                />
            ))
            }
            <div className="bg-blue-100 w-80 p-2 rounded-xl flex-shrink-0">
                <button className="bg-gray-900 text-amber-200 w-full rounded-xl p-1" onClick={addColumn}>+ Add column
                </button>
            </div>
        </div>

    )
}

export default observer(Project);