<template>
    <div id="app">

        <router-view></router-view>
    </div>


</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import testLayout from "@/components/testLayout";
// import loginPage from "@/components/user/login";

// import {useStore } from "vuex"


import {getServerRSAPK} from "@/interfaces/encry";

export default {
  name: 'App',
  components: {

  }
}
if (localStorage.getItem('server_pk') === null || localStorage.getItem('server_pk') === 'undefined'){
    getServerRSAPK();
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/

}
</style>
