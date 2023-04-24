import {v4 as uuid} from 'uuid';

enum TaskStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE'
}

class Task {
    readonly id:string
    title: string 
    status: TaskStatus

    constructor(title: string) {
        this.id = uuid()
        this.title = title
        this.status = TaskStatus.TODO
    }
}