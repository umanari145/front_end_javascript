import {Task} from 'Task'

export class TaskCollection {

    private tasks: Task[] = [];

    public add = (task:Task):void => {
        this.tasks.push(task);
    }

    public find = (taskId:string) => {
        return this.tasks.find((task:Task) => {
            return task.id === taskId
        })
    }

    public delete = (taskId:string) => {
        return this.tasks.filter((task:Task) => {
            return task.id !== taskId
        })
    }

    public update = (task:Task) => {
        this.tasks = this.tasks.map((item:Task) => {
            if (item.id == task.id) {
                return task
            } else {
                return item 
            }
        })
        console.log(this.tasks)
    }
}