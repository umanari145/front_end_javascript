import {Task} from 'Task'

export class TaskCollection {

    private tasks: Task[] = [];

    add(task:Task):void {
        this.tasks.push(task);
    }
}