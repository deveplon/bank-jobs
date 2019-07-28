<template>
  <transition name="slide-side">
    <div v-if="toggle" class="sidenav">
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
}
</style>
