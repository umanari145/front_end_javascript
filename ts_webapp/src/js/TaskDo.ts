import { EventListener } from "./EventListener";
export class TaskDo {
    task_area_selector: string;
    task_add_selector: string;
    eventListener: EventListener

    constructor(
        task_area_selector: string,
        task_add_selector: string
    ) {
        this.task_area_selector = task_area_selector;
        this.task_add_selector = task_add_selector;
        this.eventListener = new EventListener();
    }

    addTaskTodoEvent(): void {
        const task_element: HTMLElement = document.getElementById(this.task_add_selector) as HTMLElement
        this.eventListener.add(
            this.task_add_selector,
            'click',
            task_element,
            this.copyElement
        );
    }

    copyElement(event:Event): void  {
        // event時は読み込み時とちがうためthis.task_area_selectorではよみこまれない
        const task_input_element: HTMLInputElement = document.getElementById('add_task_area') as HTMLInputElement
        const inputed_task:string = task_input_element!.value;
        const to_do_task_element:HTMLElement = document.querySelector('#to_do_task_copy li')!.cloneNode(true) as HTMLElement;
        to_do_task_element.querySelector('.to_do_task_label')!.innerHTML = inputed_task;
        document.getElementById('to_do_inner_area')!.appendChild(to_do_task_element);
    }
}