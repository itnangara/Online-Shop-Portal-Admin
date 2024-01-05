<template>
  <div style="display: block">
    <!-- <div class="d-flex">
      <h4 id="traffic" class="card-title mb-3">Products</h4>
    </div> -->
    <div class="d-flex">
      <div class="small text-medium-emphasis me-3">Toys</div>
      <div class="small text-medium-emphasis me-3">Clothes</div>
      <div class="small text-medium-emphasis me-3">Accessories</div>
    </div>
    <main class="wrapper-2">
      <!-- <h1>Products</h1> -->
      <div class="recommended">
        <div v-for="product in localProducts" :key="product.id" class="card">
          <!-- <div class="card-title">
            {{ product.name }}
          </div> -->

          <div class="card-body">
            <i :class="'icofont-10x icofont-' + product.icon"></i>
            <form>
              <div class="row">
                <div class="cell">
                  <label>Name:</label>
                </div>
                <div class="cell">
                  <em>{{ product.name }}</em>
                </div>
              </div>
              <div class="row">
                <div class="cell">
                  <label>Category:</label>
                </div>
                <div class="cell">
                  <em>{{ product.type }}</em>
                </div>
              </div>
              <div class="row">
                <div class="cell">
                  <label>Price:</label>
                </div>
                <div class="cell">
                  {{ product.price.USD }}
                </div>
              </div>
              <div class="row">
                <div class="cell">
                  <label>Quantity:</label>
                </div>
                <div class="cell">
                  <input
                    v-model.number="quantities[product.name]"
                    type="number"
                    min="0"
                    @input="handleQuantityInput(product.name)"
                  />
                </div>
              </div>
            </form>
          </div>

          <div class="card-footer">
            <button
              class="btn btn-light"
              @click="
                addToCart(product, product.name, quantities[product.name])
              "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
    <CCardFooter
      style="background-color: #d17d7b; margin-bottom: 30px"
    ></CCardFooter>
  </div>
</template>

<script>
// import avatar from '@/assets/images/avatars/avatar.png'
import { mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      localProducts: {},
      quantities: {},
    }
  },
  mounted() {
    this.localProducts = this.$store.state.inventory

    console.log('inventory in dashboard from app: ', this.inventory)
  },

  methods: {
    ...mapActions({
      loadCoaches: 'loadCoaches',
    }),
    async addToCart(product, name, quantity) {
      // console.log('addToCart Function data: ', name + ' ' + quantity)
      await this.$store.dispatch('addToCart', { product, name, quantity })
      this.resetQuantityInput()
    },
    handleQuantityInput(name) {
      console.log('handleQuantityInput name: ', name)
      console.log('this.quantities[name] : ', this.quantities[name])
      console.log('quantities : ', this.quantities)
      const quantity = this.quantities[name]
      if (quantity < 0) {
        this.quantities[name] = null // Reset the value to zero
        // Alternatively, you can display an error message
      }
    },
    resetQuantityInput() {
      this.quantities = {}
    },
  },
}
</script>

<style scoped>
.recommended {
  display: block;
}
</style>
