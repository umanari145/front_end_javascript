import { EventListener } from "./EventListener";
import { Task } from "./Task";
import { TaskCollection } from "./TaskCollection";
export class TaskDo {
    eventListener: EventListener

    // この表現でプロパティの宣言も同様に行える
    constructor(private readonly todoList: HTMLElement) {
        this.eventListener = new EventListener();
    }

    addTaskTodoEvent = ():void => {
        const task_element: HTMLElement = document.getElementById('add_task_button') as HTMLElement
        this.eventListener.add(
            'button_trigger',
            'click',
            task_element,
            this.copyElement
        );
    }

    // アローでかかないとthisで参照できない
    // copyElement(task:Task)
    copyElement = (event:Event):void =>  {
        // event時は読み込み時とちがうためthis.task_area_selectorではよみこまれない
        const task_input_element: HTMLInputElement = document.getElementById('add_task_area') as HTMLInputElement
        //const to_do_task_element:HTMLElement = document.querySelector('#to_do_task_copy li')!.cloneNode(true) as HTMLElement;
        const inputed_task:string = task_input_element!.value;
        const task: Task = new Task(inputed_task)
        const taskEl = this.render(task);
        this.todoList.append(taskEl);
    }


    // アローでかかないとthisで参照できない
    // render(task:Task)
    render = (task: Task): HTMLElement => {
        const taskEl: HTMLElement = document.createElement('div')
        const spanEl: HTMLElement = document.createElement('span')
        const deleteButton: HTMLElement = document.createElement('button')
        
        this.eventListener.add(
            task.id,
            'click',
            deleteButton,
            this.removeTask(task)
        )


        taskEl.id = task.id
        taskEl.classList.add('task-item')
        spanEl.textContent = task.title
        deleteButton.textContent = '削除'

        taskEl.append(spanEl, deleteButton)

        return taskEl
    }

    removeTask = (task: Task):void => {
        
    }
}