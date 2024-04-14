<template>
  <div class="log"></div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch('userLogout')
    },
  },
}
</script>

<style></style>
