<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['mode'],
  mounted() {
    // this.showMode();
    console.log('mode here ', this.mode)
  },
  // methods: {
  //   showMode(){
  //     console.log('mode here ', this.mode);
  //   }
  // },
}
</script>

<style scoped>
button {
  background-color: var(--seperateTopNavColor);
  border: 1px solid var(--seperateTopNavColor);
  display: inline-block;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  color: white;
  border: 2px solid var(--seperateTopNavColor);
  cursor: pointer;
}

/* active button for requests */
.fill {
  background-color: var(--seperateTopNavColor);
}

/* buttons that are transparent like the contact button */
.outline {
  background-color: transparent;
  border-color: var(--seperateTopNavColor);
  color: var(--seperateTopNavColor);
}

/* buttons for requests which are faded */
.fade {
  color: white;
  background-color: #bda8cb;
  border-color: #c9b8d4;
}

button:hover,
button:active {
  background-color: green;
  border-color: green;
  color: white;
}
</style>
