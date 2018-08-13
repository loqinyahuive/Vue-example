<template>
  <div class="hello">
    同级元素: {{isShow}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import bus from '../bus'
import Component from 'vue-class-component'
import Data from '../lib/json/data'
console.log('******** Data', Data)
@Component({
})
export default class HelloWorld extends Vue {
  isShow:any = false
  created () {
    bus.$on('setIsShow', () => {
      this.setIsShow()
    })
  }
  setIsShow () {
    this.isShow = !this.isShow
  }
}
// export default {
//   name: 'HelloWorld',
//   data () {
//     return {
//       isShow: false
//     }
//   },
//   created () {
//     bus.$on('setIsShow', () => {
//       this.setIsShow()
//     })
//   },
//   methods: {
//     setIsShow () {
//       this.isShow = !this.isShow
//     }
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
