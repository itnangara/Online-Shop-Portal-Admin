<template>
  <!-- <navbar-component v-if="showNav"></navbar-component>

  <nav>
    <router-link to="/departments">Departments</router-link> |
    <router-link to="/employees">Employees</router-link>
  </nav> -->
  <router-view/>
</template>

<script>
export default{
  data() {
    return {
      showNav: true
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
