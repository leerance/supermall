<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControlTop"
      v-show="isShowtabControl"
      class="top-tab-control"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @SwiperImageLoad="SwiperImageLoad"
        :key="home_swiper"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="titles"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top
      @click.native="backTopClick"
      v-show="isShowBackTop"
    ></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: null,
      recommends: null,
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, y: 550, list: [] },
        new: { page: 0, y: 550, list: [] },
        sell: { page: 0, y: 550, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      taboffsetTop: 0,
      isFixed: false,
      isShowtabControl: false,
      saveY: 0,
      home_swiper: 0,
    };
  },
  mounted() {
    //图片加载完成的事件监听
    const refresh = this.debounnce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    setTimeout(() => {
      this.forceRerender();
    }, 400);
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  //销毁事件
  destroyed() {
    console.log("destroyed");
  },
  //进入事件
  activated() {
    this.$refs.scroll.refresh();
    //跳转到指定的Y值
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    console.log("activated");
  },
  //离开事件
  deactivated() {
    //获取当前页面的Y值
    this.saveY = this.$refs.scroll.getScrollY();
    this.$refs.scroll.refresh();
    console.log("deactivated");
  },
  methods: {
    /**
     * 事件监听
     */
    //流行切换时，不能记住上次浏览的地方，简单实现，还是有bug
    //流行，新增，点击事件，切换商品
    tabClick(index) {
      // console.log(this.currentType + "----------" + this.$refs.scroll.scroll.y);
      // this.goods[this.currentType].y = this.$refs.scroll.scroll.y;
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      // console.log(this.currentType + "----------" + this.goods[this.currentType].y);
      //this.$refs.scroll.scrollTo(0, this.goods[this.currentType].y, 0);
      //同步index
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlTop.currentIndex = index;
    },
    //回到顶部
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //显示回到顶部图片，tabcontrol吸顶
    contentScroll(position) {
      //显示回到顶部图片
      this.isShowBackTop = -position.y > 1000 ? true : false;
      this.isShowtabControl = -position.y > this.taboffsetTop ? true : false;
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    debounnce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(func, args);
        }, delay);
      };
    },
    forceRerender() {
      this.home_swiper += 1;
    },
    //吸顶效果
    SwiperImageLoad() {
      //判断什么时候，显示上面的tabControl
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
      this.goods.pop.y = -this.taboffsetTop;
      this.goods.new.y = -this.taboffsetTop;
      this.goods.sell.y = -this.taboffsetTop;
    },
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata()
        .then((res) => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHomeGoods(type) {
      this.goods[type].page += 1;
      getHomeGoods(type, this.goods[type].page)
        .then((res) => {
          // for (let n of res.data.list) {
          //   this.goods[type].list.push(n);
          // }
          this.goods[type].list.push(...res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0px;
  left: 0px;
}
.top-tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
  background-color: white;
}
</style>