<template>
  <div class="parent">
    Parent: <input v-model="msg" />
    <br />
    <Child :msg="msg" @changeMsg="changeMsg"/>
    <HelloWorld />
  </div>
</template>

<script>
import Child from './Child.vue'
import HelloWorld from './HelloWorld.vue'
export default {
  name: 'Parent',
  components: {
    Child, HelloWorld
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    changeMsg (v) {
      this.msg = v
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
