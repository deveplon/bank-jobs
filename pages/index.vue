<template>
  <div class="home-content">
    <toast />
    <b-card class="complete-container">Welcome to BankJobs dashboard</b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

export default {
  components: {
    Toast
  }
}
</script>

<style>
.home-content {
  width: 95%;
}
</style>
