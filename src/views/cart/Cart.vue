<template>
  <div id="cart" class="cart">
    <nav-bar class="cart-nav"
      ><template #center>购物车({{ cartLength }})</template>></nav-bar
    >
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar @cartBuy="cartBuy" />
    <toast :message="message" :isShow="isShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import Toast from "components/common/toast/Toast.vue";
import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Toast,
  },
  data() {
    return {
      isShow: false,
      message: "请选择商品",
    };
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  methods: {
    cartBuy() {
      if (!this.totalCount) {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  /* 为了在使用原生滚动时，导航栏不随着内容滚动 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>
