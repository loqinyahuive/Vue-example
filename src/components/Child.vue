<template>
  <div class="child">
    Child: {{msg}}
    <button @click="childClick">Change Msg</button>
    <button @click="changeShow">change show</button>
  </div>
</template>

<script>
import bus from '../bus.js'
export default {
  name: 'Child',
  props: {
    msg: {
      type: String
    }
  },
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    childClick () {
      this.$emit('changeMsg', 'child')
    },
    changeShow () {
      bus.$emit('setIsShow');
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
