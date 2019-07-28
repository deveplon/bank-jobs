<template>
  <div class="sidenav-menu">
    <div v-for="(link, i) in links" :key="i" class="menu-group-link">
      <NLink class="menu-link" :to="link.to">
        <font-awesome-icon :icon="link.icon" />
        <span class="menu-link-text ml-2">
          {{ link.text }}
        </span>
      </NLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: '/', text: 'dashboard', icon: 'tachometer-alt' },
        { to: '/jobs/create', text: 'create job', icon: 'newspaper' }
      ]
    }
  }
}
</script>

<style scoped>
.sidenav-menu {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 20px 50px;
  border-right: 1px solid var(--border-and-shadow);
  box-shadow: 2px 0 4px var(--border-and-shadow);
}
.menu-group-link {
  margin: 40px 0;
}
.menu-link {
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.6px;
}
.menu-link .menu-link-text {
  font-size: 1.05rem;
}
</style>
