<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>

    <loading  :show="isLoading" ></loading>

  </div>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'

export default {
  components: {
    Loading
  },

  computed: {
    ...mapGetters(['isLoading'])
  }
}
</script>

<style lang="less">

</style>
