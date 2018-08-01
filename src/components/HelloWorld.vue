<template>
  <div class="hello">
    同级元素: {{isShow}}
  </div>
</template>

<script>
import bus from '../bus.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      isShow: false
    }
  },
  created () {
    bus.$on('setIsShow', () => {
      this.setIsShow()
    });
  },
  methods: {
    setIsShow () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
