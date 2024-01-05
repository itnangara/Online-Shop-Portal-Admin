<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props:['mode'],
  mounted() {
    // this.showMode();
    console.log('mode here ', this.mode);
  },
  // methods: {
  //   showMode(){
  //     console.log('mode here ', this.mode);
  //   }
  // },
}
</script>

<style scoped>
button{
    background-color: #3a0061;
    border: 1px solid #3a0061;
    display: inline-block;
    border-radius: 1rem;
    padding: 0.3rem 1rem;
    color: white;
    border: 2px solid #270041;
    cursor: pointer;
}

/* active button for requests */
.fill {
  background-color: #270041;
}

/* buttons that are transparent like the contact button */
.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

/* buttons for requests which are faded */
.fade {
  color: white;
  background-color: #bda8cb;
  border-color: #c9b8d4;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
  color: white;
}
</style>