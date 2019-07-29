<template>
  <div class="main-container">
    <sidenav />
    <div class="main-content">
      <header-component />
      <div class="content">
        <nuxt />
      </div>
      <footer-component />
    </div>
  </div>
</template>

<script>
import Sidenav from '~/components/global/Sidenav'
import HeaderComponent from '~/components/global/Header'
import FooterComponent from '~/components/global/Footer'

export default {
  components: {
    Sidenav,
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
:root {
  --text: #666666;
  --border-and-shadow: #d3d3d3;
  --bg-light: #fafafa;
  --bg-grey: #e5e5e5;
  --bg-grey-light: #f0f0f0;
}

*,
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  background-color: var(--bg-grey);
  color: var(--text);
}

a,
a:hover {
  color: var(--text);
  text-decoration: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.main-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.main-content {
  flex-basis: 100%;
  min-height: 100vh;
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 120px);
  padding: 20px 40px;
}
.complete-container {
  width: 100%;
}

/** Buttons Aux **/
.tree-button {
  padding: 0;
  color: var(--text);
  font-size: 1.4rem;
}
.tree-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
