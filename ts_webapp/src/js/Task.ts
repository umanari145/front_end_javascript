export class Task {
    task_area_selector: string;
    task_add_selector: string;

    constructor(
        task_area_selector: string,
        task_add_selector: string
    ) {
        this.task_area_selector = task_area_selector;
        this.task_add_selector = task_add_selector;
    }

    addTaskTodoEvent(): void {
        const task_element: HTMLElement = document.getElementById(this.task_add_selector) as HTMLElement
        task_element.addEventListener('click', (event: MouseEvent) => {
            const task_input_element: HTMLInputElement = document.getElementById(this.task_area_selector) as HTMLInputElement
            const inputed_task:string = task_input_element!.value;

            const to_do_task_element:HTMLElement = document.querySelector('#to_do_task_copy li')!.cloneNode(true) as HTMLElement;
            to_do_task_element.querySelector('.to_do_task_label')!.innerHTML = inputed_task;
            
            document.getElementById('to_do_inner_area')!.appendChild(to_do_task_element);
        })
    }
}