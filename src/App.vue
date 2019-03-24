<template>
  <div id="app">
    <navbar :title="title"></navbar>
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
import Navbar from 'components/navbar/navbar'

export default {
  data () {
    return {
      transition: 'fade'
    }
  },
  components: {
    Loading,
    Navbar
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
  @import 'common/less/transition.less';

</style>
