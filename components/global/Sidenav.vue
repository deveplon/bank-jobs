<template>
  <transition name="slide">
    <div v-show="toggle" class="sidenav">
      <top-menu />
      <links-menu />
    </div>
  </transition>
</template>

<script>
import TopMenu from '../sidenav/TopMenu.vue'
import LinksMenu from '../sidenav/LinksMenu.vue'

export default {
  components: {
    TopMenu,
    LinksMenu
  },
  computed: {
    toggle() {
      return this.$store.getters['sidenav/toggle']
    }
  },
  mounted() {
    if (window.innerWidth > 700 && !this.$store.getters['sidenav/toggle']) {
      this.$store.dispatch('sidenav/toggle')
    }
  }
}
</script>

<style scoped>
.sidenav {
  position: relative;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: var(--bg-light);
  overflow: hidden;
}
.slide-leave-active,
.slide-enter-active {
  transition: 0.6s;
}
.slide-enter,
.slide-leave-to {
  width: 0;
}
@media screen and (max-width: 700px) {
  .sidenav {
    position: fixed;
    top: 80px;
    width: 100%;
    z-index: 999;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate(-100%, 0);
  }
}
</style>
