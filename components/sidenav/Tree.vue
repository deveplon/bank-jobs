<template>
  <div>
    <b-button
      v-b-toggle.collapse-1
      variant="white"
      class="tree-button menu-link"
    >
      <font-awesome-icon :icon="params.icon" />
      <span class="menu-link-text ml-2">
        {{ params.text }}
      </span>
    </b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <NLink
        v-for="(link, i) in params.links"
        :key="i"
        class="menu-link menu-link-tree"
        :to="link.to"
      >
        <span class="menu-link-text ml-2">
          {{ link.text }}
        </span>
      </NLink>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => ({
        icon: 'home',
        text: '',
        links: []
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
.menu-link-tree {
  padding: 10px 0;
  border-bottom: 1px solid var(--border-and-shadow);
}
.menu-link-tree:hover {
  border-bottom: 1px solid var(--primary);
}
</style>
