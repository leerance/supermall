import BackTop from '@/components/content/backtop/BackTop.vue'

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