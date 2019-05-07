<template>
  <div class="VueStar">
    <div class="VueStar__ground">
      <div class="VueStar__icon" @click.stop="toggle" :class="animateClass" :style="{color: colorValue}">
        <slot name="icon"></slot>
      </div>
      <div class="VueStar__decoration" :class="{ 'VueStar__decoration--active': active }"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { isColors } from 'utils/colorRE'

export default {
  name: 'star',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: Boolean,
    animate: String,
    color: String
  },

  data () {
    return {
      active: this.value,
      toggleAnimate: false,
      toggleColor: false
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (this.active === newVal) return
      this.active = newVal
      this.toggleAnimate = !this.toggleAnimate
      this.toggleColor = !this.toggleColor
    }
  },
  computed: {
    animateClass () {
      return this.toggleAnimate ? this.animate : ''
    },
    colorValue () {
      return this.toggleColor ? `${this.color}` : ``
    }
  },
  methods: {
    toggle () {
      this.toggleAnimate = !this.toggleAnimate
      this.toggleColor = !this.toggleColor
      this.active = !this.active
      this.$emit('input', this.active)
      this.$emit('change', this)
    }
  },
  mounted () {
    if (this.color && !isColors(this.color)) {
      console.error('this color prop must be hex or rgb pattern  ---VueStarPlus')
    }
  }
}
</script>

<style lang="less" scoped>
@import './CoreBase64.less';
.VueStar{
  position: absolute;
}
.VueStar__ground {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.VueStar__icon {
  z-index: 2; /*❤今年888大发*/
}
.VueStar__decoration {
  width: 100px;
  height: 100px;

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .base64();
  background-position: 0 0;
  transition: background-position 1s steps(25);
  transition-duration: 0s;
  &--active {
    transition-duration: 1s;
    background-position: -2500px 0;
  }
}
</style>
