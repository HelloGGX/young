<template>
  <div>
    <navbar :title="title">
      <template v-slot:left>
        <img src="./common/images/align-left.png" alt="">
      </template>
      <template v-slot:middle>
        <search-box></search-box>
      </template>
      <template v-slot:right>
        <img src="./common/images/user.png" alt="">
      </template>
    </navbar>
    <tab class="app_tab"></tab>
    <transition name="transition">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <player></player>
    <loading :show="isLoading"></loading>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'
import Navbar from 'components/navbar/navbar'
import Tab from 'components/tab/tab'
import SearchBox from 'base/search-box/search-box'
import Player from 'components/player/player'

export default {
  data () {
    return {
      transition: 'fade'
    }
  },
  components: {
    Loading,
    Navbar,
    Tab,
    SearchBox,
    Player
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
.app_tab {
   margin-top: 0.7rem;
}
</style>
