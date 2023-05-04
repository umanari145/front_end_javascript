import dragula from "dragula";
import { Task } from "./Task";

export class TaskRender {

    // この表現でプロパティの宣言も同様に行える
    constructor(
        private readonly todoList: HTMLElement,
        private readonly doingList: HTMLElement
    ) {
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

        this.todoList.append(taskEl);

        return {taskEl, deleteButton}
    }

    // 関数を引数簡単なサンプル
    //public subscribeDragAndDrop = (sampleFunc:() => void) => {
    public subscribeDragAndDrop = (convertStatus:(el:Element) => void) => {
        dragula([this.todoList, this.doingList]).on('drop', (el, target, source, sibling) => {
            convertStatus(el)
        });
    }

    public remove = (task: Task) => {
        console.log(task);
        if (window.confirm(`${task.title}を削除してもよろしいでしょうか？`)) {
            const taskEl = document.getElementById(task.id)! as HTMLElement    
            this.todoList.removeChild(taskEl)    
        }
    }
}