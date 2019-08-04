<template>
  <header>
    <div>
      <a href="#" @click.prevent="toogleSideNav">
        <font-awesome-icon icon="bars" />
      </a>
    </div>
    <div>
      <b-dropdown right variant="outline-secondary">
        <template slot="button-content">
          <font-awesome-icon icon="user" />
        </template>
        <NLink to="/auth/change-pass" role="menu-item" class="dropdown-item">Change Password</NLink>
        <NLink to="/auth/sign-up" role="menu-item" class="dropdown-item">Register New User</NLink>
        <a href="#" role="menu-item" class="dropdown-item" @click="logout">Log Out</a>
      </b-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toogleSideNav() {
      this.$store.dispatch('sidenav/toggle')
    },
    logout(e) {
      e.preventDefault()
      this.$store.dispatch('auth/logout')
      window.location = '/auth/sign-in'
    }
  }
}
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 50px;
  background-color: var(--bg-grey-light);
  border-bottom: 1px solid var(--border-and-shadow);
  box-shadow: 0 2px 4px var(--border-and-shadow);
}
</style>
