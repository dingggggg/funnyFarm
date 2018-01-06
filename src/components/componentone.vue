<template>
  <div id="Componentone">
    <h1>I am a title.</h1>
    <a> written by {{ author }} </a>
  </div>
</template>

<script type="text/javascript">
/* eslint-disable */
import Vue from 'vue'
//Vue.component('Componentone', {


//});
export default{
  data: function() {
    return {
      author: "xiaoxiaoshu"
    }
  },
  name:'Componentone'
}
/* eslint-disable */
</script>

<style>
</style>
