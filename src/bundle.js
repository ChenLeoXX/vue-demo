import Vue from 'vue'
import './style.css'
import Storage from './storage'
var test = new Vue({
    el:"#app",
    data:{
        newTodo: '',
        todoList: []
    },
    methods: {
        addTodo: function(){
         if(this.newTodo === '') return
         else{
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date().timeFmt(),
                done:false
              })
              this.newTodo = ''
        }
        },
        remove:function(todo){
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index,1)
        },
        fetchItem :function(args){
            console.log('1')
            return Storage.fetch(args) === null ? [] : Storage.fetch(args)
        }
      },
      created(){  //钩子函数当 实例创建时运行
        Date.prototype.timeFmt = function fmt(timeStr){
            var obj = {
             Y:this.getFullYear(timeStr)+ '-',
             M:(this.getMonth(timeStr)+1 >= 10 ? this.getMonth(timeStr)+1+'-': "0"+ (this.getMonth(timeStr)+1)+'-' ),
             D:this.getDate(timeStr) + ' ',
             h: this.getHours(timeStr) + ':',
             m: this.getMinutes(timeStr)+ ':',
             s:this.getSeconds(timeStr)
            } 
            let {Y,M,D,h,m,s} = obj //对象的结构赋值
            return Y+M+D+h+m+s
            }
        //onbeforeunload事件，在窗口关闭之前执行回调函数
        window.onbeforeunload =()=>{ //钩子函数内的事件不要用 function 声明式，this指向会指向事件本身....要用箭头函数让this指向，箭头函数所在作用域的父级上下文。被坑了半个多小时。。。。
            console.log('2')
            let oldData = this.todoList
            let oldItem = this.newTodo
            console.log(oldData,oldItem)
            Storage.save("myTodos",oldData)
            Storage.save("item",oldItem)
        }
        this.newTodo = this.fetchItem('item')
        this.todoList = this.fetchItem('myTodos')
      }
})