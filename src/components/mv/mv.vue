<!-- mv组件 -->
<template>
  <div class="mv page">
      <mv-list :mvs="mvs" @getMvUrl="getMvUrl"></mv-list>
      <navbar ref="navbar" :title="navTitle" class="mv_navbar" @back="back"></navbar>
      <my-video :mvInfo="mvInfo"></my-video>
  </div>
</template>

<script type='text/ecmascript-6'>
import Navbar from 'components/navbar/navbar'
import { MvModel } from 'api/mv'
import MvList from 'base/mv-list/mv-list'
import MyVideo from 'base/v-video/v-video'
import { mapMutations } from 'vuex'
const mvModel = new MvModel()

export default {
  data () {
    return {
      mvs: [],
      mvInfo: {}
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
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.mvs = []
    next()
  },
  methods: {
    _getVideo (word) {
      mvModel.getMv({ word: encodeURI(word) }).then(res => {
        this.mvs = res.data.mv.list
      })
    },
    getMvUrl (id) {
      mvModel.getMvDetail({ id: id }).then(res => {
        this.mvInfo = res
        console.log(res)
        this.setMvFullScreen(true)
      })
    },
    back () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    ...mapMutations({
      setMvFullScreen: 'SET_MV_FULL_SCREEN'
    })
  },
  components: {
    Navbar,
    MvList,
    MyVideo
  }
}

</script>
<style lang='less' scoped>
.mv_navbar {
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
}
</style>
