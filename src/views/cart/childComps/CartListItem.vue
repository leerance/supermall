<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="ischecked" @click.native="checkedChange" />
    </div>
    <div class="item-img">
      <img :src="shopinfo.img" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ shopinfo.title }}</div>
      <div class="item-desc">{{ shopinfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ shopinfo.newPrice }}</div>
        <div class="item-count right">x{{ shopinfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  name: "CartListItem",
  props: {
    shopinfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      ischecked: true,
    };
  },
  computed: {
    ...mapGetters(["cartList", "getChecked"]),
  },

  created() {
    this.ischecked = this.$store.getters.getChecked(this.shopinfo.iid);
  },
  methods: {
    checkedChange() {
      this.$store.commit("checkClick", this.shopinfo.iid);
      this.ischecked = this.$store.getters.getChecked(this.shopinfo.iid);
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>