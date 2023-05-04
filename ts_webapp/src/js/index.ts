import { EventListener } from "./EventListener";
import { Task } from "./Task";
import { TaskCollection } from "./TaskCollection";
import { TaskRender } from "./TaskRender"

class Application {

    private taskCollection = new TaskCollection()
    private readonly eventListener = new EventListener()

    private readonly taskRender: TaskRender = new TaskRender(
        document.getElementById('to_do_inner_area') as HTMLElement,
        document.getElementById('doing_inner_area') as HTMLElement
    );

    public start = (e:Event):void => {
        this.addTaskTodoEvent();
        // callback関数のサンプル
        //this.taskRender.subscribeDragAndDrop(this.sampleFunc)
        // 引数はこの段階ではわからないのでいれない(callback内のものをつかので・・・)
        this.taskRender.subscribeDragAndDrop(this.convertStatus)
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
        const {taskEl, deleteButton }= this.taskRender.render(task);
        this.taskCollection.add(task)

        this.eventListener.add(
            task.id,
            'click',
            deleteButton,
            () => this.taskRender.remove(task)
          )
    }

    /**
     * drag時のcallback変数
     */
    private convertStatus = (el:Element):void => {
    }
   

     /** callback関数の簡単なサンプル
    private sampleFunc = ():void => {
        alert('Drag')
    }
    */
}


window.addEventListener('load', (e:Event) => {
    const app = new Application();
    app.start(e)
})



