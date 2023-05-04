import {v4 as uuid} from 'uuid';

export enum TaskStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE'
}

export class Task {
    readonly id:string
    title: string 
    status: TaskStatus

    constructor(title: string) {
        this.id = uuid()
        this.title = title
        this.status = TaskStatus.TODO
    }

    public update = (properties: { title?: string; status?: TaskStatus }): void => {
        this.title = properties.title || this.title
        this.status = properties.status || this.status
    }
}