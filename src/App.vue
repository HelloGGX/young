<template>
  <div id="app">
    <m-header :title="title"></m-header>
    <transition name="transition">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tab></tab>
    <loading  :show="isLoading" ></loading>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'
import Tab from 'components/tab/tab'
import MHeader from 'components/m-header/m-header'

export default {
  data () {
    return {
      transition: 'fade'
    }
  },
  components: {
    Loading,
    Tab,
    MHeader
  },
  computed: {
    title () {
      return this.$route.name
    },
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="less">
  @import 'common/less/transition.less';

</style>
