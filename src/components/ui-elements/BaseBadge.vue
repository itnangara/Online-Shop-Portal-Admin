<template>
  <div class="badge-layout" :class="mode">{{ skill }}</div>
</template>

<script>
export default {
  props: ['skill', 'mode'],
  mounted() {
    console.log('mode...', this.mode)
  },
}
</script>

<style scoped>
.badge-layout {
  /* padding: 0.75rem 1.5rem;
    background-color: #3a0061;
    border: 1px solid #3a0061;
    color: white;
    cursor: pointer;
    border-radius: 30px;
    display: inline-block; */

  color: aliceblue;
  background-color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
.frontend {
  background-color: rgb(2, 97, 65);
  border-color: rgb(2, 97, 65);
}

.backend {
  background-color: rgb(0, 0, 113);
  border-color: rgb(0, 0, 113);
}

.career {
  background-color: rgb(196, 167, 37);
  background-color: rgb(137, 7, 100);

  border-color: rgb(156, 181, 65);
}

.colors {
  background-color: #3d008d;
  background-color: #252525;
  background-color: #3d008d;
}
</style>
