<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>vue学习</h2>
  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: '欢迎学习vue技术456！'
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
