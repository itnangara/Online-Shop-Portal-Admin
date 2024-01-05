<template>
  <div>
    <aside class="cart-container">
      <div class="cart">
        <h1 class="cart-title spread">
          <span>
            Cart
            <i class="icofont-cart-alt icofont-1x"></i>
          </span>
          <button
            class="cart-close"
            @click="$store.commit('toggleCartSidebar')"
          >
            &times;
          </button>
        </h1>

        <div class="cart-body">
          <table class="cart-table">
            <thead>
              <tr>
                <th><span class="sr-only">Product Image</span></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quantity, name) in cartItems" :key="name">
                <td>
                  <i
                    :class="
                      'icofont-3x icofont-' + getProductDetails(name).icon
                    "
                  ></i>
                </td>
                <td>{{ name }}</td>
                <td>{{ getProductDetails(name).price }}</td>
                <td class="center">{{ quantity }}</td>
                <td>{{ calculateSubtotal(name, quantity) }}</td>
                <td class="center">
                  <button
                    class="btn btn-light cart-remove"
                    @click="removeFromCart(name)"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p v-if="Object.keys(cartItems).length === 0" class="center">
            <em>No names in cart</em>
          </p>

          <div class="spread" style="margin-top: 20px">
            <span>
              <strong>Total: </strong>
              ${{ calculateTotal(name, quantity) }}
            </span>

            <button class="btn btn-light" @click="checkout">Checkout</button>
          </div>
        </div>
        <!-- <div class="cart-body">
          <table class="cart-table">
            <thead>
              <tr>
                <th><span class="sr-only">Product Image</span></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quantity, name) in cartItems" :key="name">
                <td>
                  <i
                    :class="
                      'icofont-3x icofont-' + getProductDetails(name).icon
                    "
                  ></i>
                </td>
                <td>{{ name }}</td>
                <td>{{ getProductDetails(name).price }}</td>
                <td class="center">{{ quantity }}</td>
                <td>{{ calculateSubtotal(name, quantity) }}</td>
                <td class="center">
                  <button
                    class="btn btn-light cart-remove"
                    @click="removeFromCart(name)"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p v-if="Object.keys(cart).length === 0" class="center">
            <em>No items in cart</em>
          </p>

          <div class="spread" style="margin-top: 20px">
            <span>
              <strong>Total: </strong>
              ${{ calculateTotal(name, quantity) }}
            </span>

            <button class="btn btn-light" @click="checkout">Checkout</button>
          </div>
        </div> -->
      </div>
      <!-- <payment-view/> -->
    </aside>
  </div>
</template>

<script>
// import PaymentView from './views/PaymentView.vue';
// import PaymentView from '@/views/PaymentView.vue';
export default {
  props: ['remove'],
  data() {
    return {}
  },

  computed: {
    cartItems() {
      return this.$store.getters.getCartItems
    },
    inventory() {
      return this.$store.getters.getInventory
    },
  },
  created() {
    console.log('cart items length: ', Object.keys(this.cartItems).length)
    console.log('cartSideBar cartItems values ', this.cartItems)
    console.log('inventory: ', this.inventory)

    for (const key in this.cartItems) {
      console.log(`Looped Data: ${key} = ${this.cartItems[key]}`)
      console.log('name: ', key)
    }
  },

  methods: {
    getProduct(name) {
      return this.inventory.find((product) => product.name === name)
    },

    // following function is ran with additional eg .price/.name to access what you want from the returned object
    getProductDetails(name) {
      console.log('getProductDetails working: ', name)
      const product = this.getProduct(name)
      if (product) {
        return {
          icon: product.icon,
          name: product.name,
          price: product.price.USD,
        }
      } else {
        // Handle the case where the product is not found
        return {
          icon: '',
          name: '',
          price: '',
        }
      }
    },

    // the following is an alternative function that does not require adding a .name/.price
    // getPrice(name){
    //     const product = this.inventory.find((product)=>{
    //         return product.name === name
    //     })
    //     // const item = this.localInventory.find((product) => product.name === name);
    //     // return item ? item.price : 0;
    //     return product.price.USD
    // },

    calculateSubtotal(name, quantity) {
      const price = this.getProductDetails(name).price
      const subTotal = price * quantity

      return subTotal.toFixed(2)
    },

    calculateTotal() {
      const total = Object.entries(this.cartItems).reduce(
        (result, position) => {
          console.log('result', result)
          console.log('name: ', position[0], ', quantity: ', position[1])
          return (
            result + position[1] * this.getProductDetails(position[0]).price
          )
        },
        0,
      )

      return total.toFixed(2)
    },

    removeFromCart(name) {
      console.log('deleting: ', name)
      delete this.cartItems[name]
    },

    //CHECKOUT
    checkout() {
      // Validate if the cart is not empty
      if (this.cartItems.length === 0) {
        console.log('The cart is empty. Cannot proceed with checkout.')
        return
      }

      // Prepare the order object
      const order = {
        // user: this.user,
        items: this.cartItems,
        paymentMethod: 'Cash on Delivery', // Update with your preferred payment method
      }

      const items = [
        { name: 'Item 1', quantity: 2, price: 10 },
        { name: 'Item 2', quantity: 1, price: 20 },
      ]

      console.log('..1: ', items)
      const items2 = this.cartItems
      console.log('..2: ', items2)
      console.log('...............')

      this.$store
        .dispatch('submitOrder', order)
        .then((response) => {
          console.log('Order placed successfully!')
          console.log('Order details:', response)
        })
        .catch((error) => {
          console.error('Error placing the order:', error)
        })

      // Validate if the cart is not empty
      // if (this.cartItems.length === 0) {
      //   console.log('The cart is empty. Cannot proceed with checkout.');
      //   return;
      // }

      // Validate user information
      // if (!this.user || !this.user.name || !this.user.address) {
      //   console.log('Please provide user information before proceeding with checkout.');
      //   return;
      // }

      // Prepare the order object

      // const order = {
      //   // user: this.user,
      //   items: this.cartItems,
      //   paymentMethod: 'Cash on Delivery', // Update with your preferred payment method
      // };

      // Simulate submitting the order to the server or API
      //   this.submitOrder(order)

      //   .then(response => {
      //     console.log('Order placed successfully!');
      //     console.log('Order details:', response);
      //     // Clear the cart after successful checkout
      //     // this.cartItems = [];
      //   })
      //   .catch(error => {
      //     console.error('Error placing the order:', error);
      //   });
    },

    // submitOrder(order) {
    //   // Simulate submitting the order to the server or API
    //   console.log('order: ', order);

    //   return new Promise((resolve) => {
    //     // Simulate a delay to mimic an asynchronous request
    //     setTimeout(() => {
    //       const orderId = this.generateOrderId();
    //       const response = {
    //         orderId: orderId,
    //         timestamp: new Date().toISOString(),
    //         order: order,
    //       };
    //       resolve(response);

    //       console.log('generated orderID: ', orderId);

    //     }, 2000);
    //   });
    // },

    generateOrderId() {
      // Generate a unique order ID here
      // You can use a library or custom logic to generate the ID
      return 'ORDER_' + Date.now()
    },
  },
}
</script>

<style></style>
