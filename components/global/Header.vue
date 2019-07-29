<template>
  <header>
    <div>
      <b-dropdown right variant="outline-secondary">
        <template slot="button-content">
          <font-awesome-icon icon="user" />
        </template>
        <NLink to="/auth/change-pass" role="menu-item" class="dropdown-item">
          Change Password
        </NLink>
        <NLink to="/auth/sign-up" role="menu-item" class="dropdown-item">
          Register New User
        </NLink>
        <NLink to="/auth/logout" role="menu-item" class="dropdown-item">
          Log Out
        </NLink>
      </b-dropdown>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 50px;
  background-color: var(--bg-grey-light);
  border-bottom: 1px solid var(--border-and-shadow);
  box-shadow: 0 2px 4px var(--border-and-shadow);
}
</style>
