<template>
    <div>
        <div>
            <input type="text" v-model="task_name" placeholder="TODOを入力" id="contents" >
            <input type="button" name="todo" value="追加" id="add_to_btn" v-on:click="add_task">
        </div>
        <div>
            <div>未完了のTODO</div>
            <ul id="unfinished_todo">
                <li v-for="(unfinished_task, index) in unfinished_tasks" :key="index">
                    <span class="text">{{unfinished_task}}</span>
                    <input type="button" name="finish" value="完了" class="finish_button" v-on:click="finish_task(index)">
                    <input type="button" name="delete" value="削除" class="delete_button" v-on:click="delete_task(index)">
                </li>
            </ul>
        </div>
        <div>
            <div>完了したTODO</div>
            <ul id="finished_todo">
                <li v-for="(finished_task, index) in finished_tasks" :key="index">
                    <span class="text">{{finished_task}}</span>
                    <input type="button" name="delete" value="戻る" class="back_button" v-on:click="back_task(index)">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            task_name:'',
            unfinished_tasks:[],
            finished_tasks:[]
        }
    },
    methods: {//メソッドを置いておくところ。各メソッドがそれぞれ呼ばれたら、それぞれ実行される。
        add_task() {
            if (this.task_name === '') {
                alert('タスクが入力されていません')
            } else {
                this.unfinished_tasks.push(
                    this.task_name,
                )
            }
        },
        finish_task(index) {
            this.finished_tasks.push(
                this.unfinished_tasks[index]
            );
            this.unfinished_tasks.splice(index, 1)
        },
        delete_task(index) {
            this.unfinished_tasks.splice(index, 1)
        },
        back_task(index) {
            this.unfinished_tasks.push(
                this.finished_tasks[index]
            );
            this.finished_tasks.splice(index, 1)
        }
    },
}
</script>
