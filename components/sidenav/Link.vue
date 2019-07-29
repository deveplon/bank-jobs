<template>
  <NLink class="menu-link" :to="params.to">
    <font-awesome-icon :icon="params.icon" />
    <span class="menu-link-text ml-2">
      {{ params.text }}
    </span>
  </NLink>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => ({
        to: '/',
        icon: 'home',
        text: ''
      })
    }
  }
}
</script>

<style scoped>
.menu-link {
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.6px;
}
.menu-link:hover {
  color: var(--primary);
}
.menu-link .menu-link-text {
  font-size: 1.05rem;
}
</style>
