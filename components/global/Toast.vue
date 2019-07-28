<template>
  <b-alert class="app-toast" :variant="params.variant" :show="params.show">
    {{ params.message }}
  </b-alert>
</template>

<script>
export default {
  computed: {
    params() {
      return this.$store.getters['toast/params']
    }
  }
}
</script>

<style scoped>
.app-toast {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  text-align: center;
  z-index: 999;
}
</style>
