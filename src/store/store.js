import {makeAutoObservable} from "mobx";

class CreateStore {
    columns = [{
        id: 1,
        name: "Work",
        tasks: [{id: Math.random().toString(16).slice(2), name: "task 1"}, {
            id: Math.random().toString(16).slice(2),
            name: "task 2"
        }, {id: Math.random().toString(16).slice(2), name: "task 3"}]
    }, {
        id: 2,
        name: "Will Work",
        tasks: [{id: Math.random().toString(16).slice(2), name: "task 4"}, {
            id: Math.random().toString(16).slice(2),
            name: "task 5"
        }, {id: Math.random().toString(16).slice(2), name: "task 6"}]
    }];

    currentColumn = null;
    currentTask = null;
    taskValue = "";

    constructor() {
        makeAutoObservable(this)
    }

    installColumns = (col) => {
        this.columns = col;
    }

    installCurrentColumn = (col) => {
        this.currentColumn = col;
    }

    installCurrentTask = (task) => {
        this.currentTask = task;
    }

    changeNameColumn = (e, id) => {
        this.columns = this.columns.map((column) => column.id === id ? {...column, name: e.target.value} : {...column});
    }

    addColumn = () => {
        this.columns.push({
            id: Math.random(),
            name: "New column",
            tasks: []
        })
    }

    setTaskValue = (e) => {
        this.taskValue = e.target.value
    }

    keyDownHandler = (e, colId) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.columns.map((column) => column.id === colId
                ? (column.tasks.push({
                    id: Math.random().toString(16).slice(2),
                    name: this.taskValue
                }), this.taskValue = "")
                : column
            )
        }
    }

    addTaskToColumn = (e, colId) => {
        this.columns.map((column) => column.id === colId
            ? (column.tasks.push({
                id: Math.random().toString(16).slice(2),
                name: this.taskValue
            }), this.taskValue = "")
            : column
        )
    }

    deleteTask = (colId, taskId) => {
        this.columns = this.columns.map((column) => column.id === colId
            ? {...column, tasks: column.tasks.filter((task) => task.id !== taskId)}
            : column
        )
    }

    changeTask = (e, colId, taskId) => {
        this.columns.map((column) => column.id === colId
        ? column.tasks.map((task) => task.id === taskId
            ? task.name = e.target.value
            : null)
        : null)
    }
}

export const store = new CreateStore();