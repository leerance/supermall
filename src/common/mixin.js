import BackTop from '@/components/content/backtop/BackTop.vue'
import {POP, NEW, SELL} from "./const";
export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isBackShow: false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
  
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
