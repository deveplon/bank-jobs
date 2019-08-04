<template>
  <div class="sidenav-header">
    <NLink class="sidenav-logo" to="/">
      <span class="company">bankjobs</span>
      <span class="admin">admin</span>
    </NLink>
  </div>
</template>

<style scoped>
.sidenav-header {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: var(--bg-grey-light);
  border-right: 1px solid var(--border-and-shadow);
  border-bottom: 1px solid var(--border-and-shadow);
  box-shadow: 0 2px 4px var(--border-and-shadow);
}
.sidenav-logo {
  flex-grow: 0;
  flex-shrink: 0;
}
.sidenav-logo:hover {
  text-decoration: none;
}
.sidenav-logo .company,
.sidenav-logo .admin {
  font-size: 1.3rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text);
}
.sidenav-logo .company {
  font-weight: 700;
}
</style>
