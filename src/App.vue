<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style>
@import "assets/css/base.css";
.main-tab-bar {
  z-index: 8;
}
</style>
