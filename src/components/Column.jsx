import Task from "./Task";
import {useState} from "react";
import {Observer, observer} from "mobx-react-lite";
import {store} from "../store/store";

const Column = ({
                    item,
                    dragStartHandler,
                    dropHandler,
                    dropCardHandler,
                    dragOverHandler,
                    changeNameColumn,
                    dragOverCardHandler,
                    dragLeaveHandler
                }) => {

    const [isCreating, setIsCreating] = useState(false);
    const {taskValue, setTaskValue, addTaskToColumn, keyDownHandler} = store;

    const newTask = () => {
        setIsCreating(!isCreating);
    }


    return (
        <div key={item.id}
             className="board bg-blue-100 text-gray-900 w-80 p-2 pl-4 mx-1 rounded-xl"
             onDrop={event => dropCardHandler(event, item)} onDragOver={event => dragOverCardHandler(event)}>
            <input
                className="mb-2 p-1 rounded bg-transparent border-0 cursor-pointer focus:bg-amber-50 focus:cursor-auto"
                value={item.name}
                onChange={(e) => changeNameColumn(e, item.id)}/>
            <ul>
                {item.tasks.map((task) => (
                    <Task key={task.id}
                          task={task}
                          item={item}
                          dragStartHandler={dragStartHandler}
                          dragOverHandler={dragOverHandler}
                          dragLeaveHandler={dragLeaveHandler}
                          dropHandler={dropHandler}/>
                ))}
            </ul>

            {isCreating
                ? <Observer>
                    {() => (<textarea className="w-full rounded-md p-2" value={taskValue} placeholder="Enter a new task..."
                                      onChange={(e) => setTaskValue(e)}
                                      onKeyDown={(e) => keyDownHandler(e, item.id)}></textarea>)}
                </Observer>
                : null}

            {!isCreating
                ? <button className="bg-gray-900 text-amber-200 w-full rounded-xl mt-2 hover:bg-gray-800"
                          onClick={newTask}>+ Add task
                </button>
                : <div className="flex">
                    <button className="bg-gray-900 text-amber-200 w-full rounded-xl mt-2 hover:bg-gray-800 mr-1"
                            onClick={(e) => addTaskToColumn(e, item.id)}>Add
                    </button>
                    <button className="bg-gray-900 text-amber-200 w-full rounded-xl mt-2 hover:bg-gray-800"
                            onClick={newTask}>
                        Close
                    </button>
                </div>}
        </div>
    )
}

export default observer(Column);