<template>
  <div class="log"></div>
</template>

<script>
export default {
  created() {
    this.logout()
  },
  methods: {
    async logout() {
      await this.$store.dispatch('userLogout')
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style></style>
