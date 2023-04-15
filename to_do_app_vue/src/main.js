var vue = new Vue({
    el: '#app',
    components: {
        'main-component': httpVueLoader('./template/main.vue') 
        //他階層にあるなら、('js/components/vc-main-1.vue')の様な指定も可能
    }
});