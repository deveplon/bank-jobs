<template>
  <div class="sidenav-menu">
    <div v-for="(link, i) in links" :key="i" class="menu-group-link">
      <component :is="link.component" :params="link.params" />
    </div>
  </div>
</template>

<script>
import Link from './Link'
import Tree from './Tree'

export default {
  components: {
    Link,
    Tree
  },
  data() {
    return {
      links: [
        {
          component: 'Link',
          params: {
            to: '/',
            text: 'dashboard',
            icon: 'tachometer-alt'
          }
        },
        {
          component: 'Tree',
          params: {
            text: 'jobs',
            icon: 'list-alt',
            links: [
              { to: '/jobs/list', text: 'List' },
              { to: '/jobs/create', text: 'Create' }
            ]
          }
        },
        {
          component: 'Link',
          params: {
            to: '/contact/list',
            text: 'contacts',
            icon: 'envelope'
          }
        }
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
</style>
