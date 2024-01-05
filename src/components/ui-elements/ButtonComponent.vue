<template>
    <div>
        <button>{{ title }}</button>
    </div> 
</template>

<script>
export default {
    props:['title']
}
</script>

<style scoped>
button {
  background-color: transparent;
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  color: #f391e3;
  font-weight: bold;
  border-color: #f391e3;
}
</style>