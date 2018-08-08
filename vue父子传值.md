## 1. 理解 Vue : 视图层
## 2. 基于 Vue 创建一个简单的项目
  ### a. npm  install --global vue-cli 安装vue
  ### b. vue init webpack vue-demo vue基于webpack的模块项目
  ### c. cd vue-demo 进入vue-demo文件夹
  ### d. npm intall / yarn 安装packjson.json中依赖的node_modules
  ### e. npm run dev
## 3. Vue 生命周期
## 4. mode: 'history' 带#号的hash模式
## 5. Vue 结构简单介绍，Vue执行顺序
```
  export default {
    props: { // 单项数据绑定， 当父组件的数据发生变化, 将传递给子组件
    },
    data () {
      return { // 声明变量
        msg: 'hello'
      }
    },
    components: { // 引入子组件
    },
    computed: { // 引入store里的一些数据: session ...
      ...mapGetters({
      })
    },
    methods: { // 方法
      init () {
      }
    },
    created () { // 钩子函数： Vue实例生成后调用
    },
    mounted () { // 当页面加载完成之后执行，一般用作初始化数据
    }
  }
  ```
## 6. 传值
   ### a. 父传子 子组件通过props接受父组件的参数
   ### b. 子传父 子组件通过emit触发父组件的方法
   ### c. 非父子组件
   ### //bus.js
   ```
   import Vue from 'vue'
   export default new Vue()
   ```
