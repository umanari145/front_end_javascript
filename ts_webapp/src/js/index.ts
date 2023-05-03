import { TaskDo } from "./TaskDo"


const todoEle: HTMLElement = document.getElementById('to_do_inner_area') as HTMLElement
const task = new TaskDo(
    todoEle
);
// 登録イベントの登録
task.addTaskTodoEvent();
// 削除イベントの登録
