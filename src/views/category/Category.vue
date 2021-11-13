<template>
  <div class="wrapper">
    <div class="content">
    
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //console.log(document.querySelector(".wrapper"));
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 2,
    });
    this.scroll.on("scroll", (postion) => {
      console.log(postion);
    });
  },
  created() {
    //this.scroll = new BScroll(".content", {});
  },
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
}
</style>