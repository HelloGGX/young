<template>
  <div id="app">
    <tab></tab>
    <transition name="transition">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <loading  :show="isLoading" ></loading>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'
import Tab from 'components/tab/tab'

export default {
  data () {
    return {
      transition: 'fade'
    }
  },
  components: {
    Loading,
    Tab
  },

  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="less">
  @import 'common/less/transition.less';
</style>
