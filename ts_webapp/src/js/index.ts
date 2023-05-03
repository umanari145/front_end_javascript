import { EventListener } from "./EventListener";
import { Task } from "./Task";
import { TaskCollection } from "./TaskCollection";
import { TaskDo } from "./TaskDo"

class Application {

    private taskCollection = new TaskCollection()
    private readonly eventListener = new EventListener()
    private todoList: HTMLElement

    private readonly taskDo: TaskDo = new TaskDo(
        document.getElementById('to_do_inner_area') as HTMLElement
    );

    constructor() {
        this.todoList = document.getElementById('to_do_inner_area') as HTMLElement
    }

    public start = (e:Event):void => {
        this.addTaskTodoEvent();
    }

    public addTaskTodoEvent = ():void => {
        const task_element: HTMLElement = document.getElementById('add_task_button') as HTMLElement
        this.eventListener.add(
            'button_trigger',
            'click',
            task_element,
            // () => this.copyElementだとうごかないので注意
            // 補完されている？
            this.copyElement
        );
    }

    private copyElement = (event:Event):void =>  {
        // event時は読み込み時とちがうためthis.task_area_selectorではよみこまれない
        const task_input_element: HTMLInputElement = document.getElementById('add_task_area') as HTMLInputElement
        const inputed_task:string = task_input_element!.value;
        const task: Task = new Task(inputed_task)
        const {taskEl, deleteButton }= this.taskDo.render(task);
        this.todoList.append(taskEl);
        this.taskCollection.add(task)

        this.eventListener.add(
            task.id,
            'click',
            deleteButton,
            () => this.deleteTask(task.id)
          )
    }

    private deleteTask =(taskId:string) => {
        const taskEl = document.getElementById(taskId)! as HTMLElement    
        this.todoList.removeChild(taskEl)
    }
}


window.addEventListener('load', (e:Event) => {
    const app = new Application();
    app.start(e)
})



