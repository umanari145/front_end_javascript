import { EventListener } from "./EventListener";
import { Task } from "./Task";
import { TaskCollection } from "./TaskCollection";
export class TaskDo {
    eventListener: EventListener
    public taskCollection = new TaskCollection();

    // この表現でプロパティの宣言も同様に行える
    constructor(private readonly todoList: HTMLElement) {
        this.eventListener = new EventListener();
    }

    // アローでかかないとthisで参照できない
    // render(task:Task)
    public render = (task: Task) => {
        const taskEl: HTMLElement = document.createElement('div')
        const spanEl: HTMLElement = document.createElement('span')
        const deleteButton: HTMLElement = document.createElement('button')

        taskEl.id = task.id
        taskEl.classList.add('task-item')
        spanEl.textContent = task.title
        deleteButton.textContent = '削除'
        taskEl.append(spanEl, deleteButton)

        return {taskEl, deleteButton}
    }
}