<template>
  <div class="app"  @touchmove.prevent>
    <navbar :title="title" class="app_navbar">
      <template v-slot:left>
        <img src="./common/images/align-left.png" alt="" @click="trigger">
      </template>
      <template v-slot:middle>
        <search-box @toSearch="toSearch"></search-box>
      </template>
      <template v-slot:right>
        <img src="./common/images/user.png" alt="">
      </template>
    </navbar>
    <tab class="app_tab"></tab>
    <transition name="slide">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player></player>
    <slide-left ref='slideLeft'></slide-left>
    <loading :show="isLoading"></loading>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'
import Navbar from 'components/navbar/navbar'
import SlideLeft from 'components/slide-left/slide-left'
import Tab from 'components/tab/tab'
import SearchBox from 'base/search-box/search-box'
import Player from 'components/player/player'

export default {
  data () {
    return {
      transition: 'slide'
    }
  },
  methods: {
    toSearch () {
      this.$router.push({
        path: `/search/`
      })
    },
    trigger(){
      this.$refs.slideLeft.show()
    }
  },
  components: {
    Loading,
    Navbar,
    Tab,
    SearchBox,
    Player,
    SlideLeft
  },
  computed: {
    title () {
      return this.$route.name
    },
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="less" scoped>
.app_navbar {
   position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    margin: auto;
    max-width: 640px;
}
.app_tab {
   margin-top: 0.7rem;
}
</style>
