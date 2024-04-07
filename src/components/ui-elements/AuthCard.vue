<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.card {
  border-radius: 12px;
  padding: 1rem;
  margin: 2rem auto;
  width: 30rem;
  text-align: center;
  /* display: flex; */
}
</style>
