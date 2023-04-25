import { EventListener } from "./EventListener";
import { Task } from "./Task";
import { TaskCollection } from "./TaskCollection";
export class TaskDo {
    eventListener: EventListener

    constructor() {
        this.eventListener = new EventListener();
    }

    addTaskTodoEvent(): void {
        const task_element: HTMLElement = document.getElementById('add_task_button') as HTMLElement
        this.eventListener.add(
            'button_trigger',
            'click',
            task_element,
            this.copyElement
        );
    }

    copyElement(event:Event): void  {
        // event時は読み込み時とちがうためthis.task_area_selectorではよみこまれない
        const task_input_element: HTMLInputElement = document.getElementById('add_task_area') as HTMLInputElement
        //const to_do_task_element:HTMLElement = document.querySelector('#to_do_task_copy li')!.cloneNode(true) as HTMLElement;
        const inputed_task:string = task_input_element!.value;
        const task: Task = new Task(inputed_task)
        const tasks: TaskCollection = new TaskCollection();
        this.hogehoge
        this.render
    }

    hogehoge():void {
        console.log('aaaaa')
    }

    render(task: Task): void {
        const taskEl = document.createElement('div')
        const spanEl = document.createElement('span')
        const deleteButton = document.createElement('button')

        taskEl.id = task.id
        taskEl.classList.add('task-item')
        spanEl.textContent = task.title
        deleteButton.textContent = '削除'

        taskEl.append(spanEl, deleteButton)
        console.log(taskEl)
    }
}