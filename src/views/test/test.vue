<template>
  <div id="test">
    aaa
    <input type="text" v-model="message">
    <span v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy!</span>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
export default {
  name:"test",
  data: function () {
    return {
      message: "Copy These Text",
    };
  },
  methods: {
    onCopy: function (e) {
      alert("You just copied: " + e.text);
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
  },
};
</script>

<style>
</style>