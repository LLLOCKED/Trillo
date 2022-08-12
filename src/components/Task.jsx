import {BsFillTrashFill, BsFillPencilFill, BsEyeFill} from "react-icons/bs";
import {useRef, useState} from "react";

import {observer} from "mobx-react-lite";
import {store} from "../store/store";

const Task = ({task, dragStartHandler, dragOverHandler, dropHandler, dragLeaveHandler, item}) => {

    const {deleteTask, changeTask} = store;
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [isShowInput, setIsShowInput] = useState(false);

    const textAreaRef = useRef(null);

    const mouseOverHandler = () => {
        setIsShowDelete(true)
    }

    const mouseOutHandler = () => {
        setIsShowDelete(false)
    }

    const clickHandler = () => {
        setIsShowInput(!isShowInput)
        const time = setTimeout(() => {
            const area = textAreaRef.current
            area.focus()
            area.setSelectionRange(area.value.length, area.value.length)
        }, 100)

        return () => clearTimeout(time)
    }

    return (
        <li key={task.id}
            onDragStart={event => dragStartHandler(event, item, task)}
            onDragOver={event => dragOverHandler(event)}
            onDragLeave={event => dragLeaveHandler(event)}
            onDrop={event => dropHandler(event, item, task)}
            draggable={true}
        >
            <div className="relative w-full item bg-blue-300 p-2 rounded-xl mb-1"
                 onMouseOver={mouseOverHandler}
                 onMouseOut={mouseOutHandler}
            >
                {!isShowInput ? <span className="break-all">{task.name}</span> :
                    <textarea className="w-full rounded-md p-1" ref={textAreaRef} rows="2" value={task.name} onChange={(e) => changeTask(e, item.id, task.id)}></textarea>}
                {isShowDelete ?
                    <div className="flex absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded-md bg-amber-50/[.70]">
                        {!isShowInput ?
                            <BsFillPencilFill className="text-center fill-cyan-900 mr-2  cursor-pointer"
                                              onClick={clickHandler}/>
                            : <BsEyeFill className="text-center fill-cyan-900 mr-2  cursor-pointer"
                                         onClick={() => setIsShowInput(!isShowInput)}/>
                        }
                        <BsFillTrashFill className="text-center fill-cyan-900  cursor-pointer"
                                         onClick={() => deleteTask(item.id, task.id)}/>
                    </div> : null}
            </div>
        </li>
    );
};

export default observer(Task);