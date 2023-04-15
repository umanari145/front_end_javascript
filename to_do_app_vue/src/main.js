const app = {

    methods: {//メソッドを置いておくところ。各メソッドがそれぞれ呼ばれたら、それぞれ実行される。
      add_task() {
        this.unfinished_tasks.push(
            this.task_name,
        )
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
    data() {
      return {
        task_name:'',
        unfinished_tasks:[],
        finished_tasks:[]
      }
    }
  }
  Vue.createApp(app).mount('#app')