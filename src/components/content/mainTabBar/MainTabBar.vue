<template>
  <tab-bar>
    <tab-bar-item v-for="item in xiaBiao" :key="item.index" :path="item.path" :activeColor="item.activeColor">
      <img slot="item-icon" :src="item.imgSrc" alt="" />
      <img slot="item-icon-active" :src="item.imgSrcActive" alt="" />
      <div slot="item-text" >{{ item.Text }}</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>


import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {
      xiaBiao: [
        {
          index: 0,
          imgSrc: require("assets/img/tabbar/home.svg"),
          imgSrcActive: require("assets/img/tabbar/home_active.svg"),
          Text: "首页",
          path: '/home',
          activeColor: "deeppink"
        },
        {
          index: 1,
          imgSrc: require("assets/img/tabbar/category.svg"),
          imgSrcActive: require("assets/img/tabbar/category_active.svg"),
          Text: "分类",
          path: '/category',
          activeColor: "deeppink"
        },
        {
          index: 2,
          imgSrc: require("assets/img/tabbar/shopcart.svg"),
          imgSrcActive: require("assets/img/tabbar/shopcart_active.svg"),
          Text: "购物车",
          path: '/cart',
          activeColor: "deeppink"
        },
        {
          index: 3,
          imgSrc: require("assets/img/tabbar/profile.svg"),
          imgSrcActive: require("assets/img/tabbar/profile_active.svg"),
          Text: "我的",
          path: '/profile',
          activeColor: "deeppink"
        },
      ],
    };
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
</style>