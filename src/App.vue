<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="ass">{{num}}</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
   return{
     num:1
   }
  },
  methods:{
    ass(){
      this.num=this.num+1;
      console.log(6666);
  alert(555)
console.log(777);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
