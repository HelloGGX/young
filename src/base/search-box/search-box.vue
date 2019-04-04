<!-- 搜索框组件 -->
<template>
  <div class="search" @click="toSearch">
    <i class="search_icon icon-search"></i>
    <input type="text" class="search_input" ref="queryRef" v-model="query" :disabled="disabled" :placeholder="placeholder">
    <i class="search_clear  icon-dismiss" v-show="query" @click="clearQuery"></i>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toSearch () {
      this.$emit('toSearch')
    },
    blur () {
      this.$refs.queryRef.blur()
    },
    clearQuery () {
      this.query = ''
    }
  },
  created () {
    // 节流
    this.$watch('query', _.debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 300))
  }
}

</script>
<style lang='less' scoped>
@import "~@/common/less/variable.less";

.search {
  max-height: 0.5rem;
  height: 100%;
  padding: 0 0.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to right, @color-theme , @color-subtheme);
  border-radius: 1rem;
  font-size:  0.18rem;//18px
}
.search_icon {
  font-size: 1.5em;
}
.search_clear {
  font-size: 1em;
}
.search_input {
    width: 100%;
    margin: 0 5px;
    line-height: 2em;
    border: 0;
    outline: none;
    color: @color-text;
    background-color:rgba(255, 255, 255, 0);
    font-size: 0.78em;
    &::placeholder {
      color: @color-text-ll;
    }
}
</style>
