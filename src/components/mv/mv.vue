<!-- mv组件 -->
<template>
  <div class="mv page">
      <navbar ref="navbar" :title="navTitle" class="mv_navbar" @back="back"></navbar>
      <mv-list :mvs="mvs"></mv-list>
  </div>
</template>

<script type='text/ecmascript-6'>
import Navbar from 'components/navbar/navbar'
import { MvModel } from 'api/mv'
import MvList from 'base/mv-list/mv-list'
const mvModel = new MvModel()

export default {
  data () {
    return {
      mvs: []
    }
  },
  computed: {
    navTitle () {
      return this.$route.params.word
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
    // 通过 `vm` 访问组件实例
      vm._getVideo(to.params.word)
    })
  },
  methods: {
    _getVideo (word) {
      mvModel.getMv({ word: encodeURI(word) }).then(res => {
        console.log(res)
        this.mvs = res.data.mv.list
      })
    },
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  },
  components: {
    Navbar,
    MvList
  }
}

</script>
<style lang='less' scoped>
.mv_navbar {
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
}
</style>
