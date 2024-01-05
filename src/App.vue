<template>
  <!-- <router-view /> -->
  <!-- <div>
    <div class="new">
      <div style="color: black">App.vue file: one line testing</div>
      <div class="top-bar-cart-link" @click="toggleSideBar">
        <i class="icofont-cart-alt icofont-1x"></i>
        <span>Cart ({{ totalQuantity }})</span>
      </div>
    </div> 
  </div>-->
  <router-view :inventory="inventory" :add-to-cart="addToCart" />
</template>

<script>
// import SideBar from './components/SideBar.vue'
import food from './food.json'
export default {
  components: {
    // SideBar,
  },
  data() {
    return {
      showSideBar: false,
      inventory: food,
      cart: {},
      totalAmountInCart: 0,
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    },

    cartTotal() {
      let total = 0

      for (const itemName in this.cart) {
        if (Object.prototype.hasOwnProperty.call(this.cart, itemName)) {
          const quantity = this.cart[itemName]
          const item = this.inventory.find(
            (product) => product.name === itemName,
          )

          if (item === true) {
            const price = item.price.USD // Assuming you want to use USD price
            const subtotal = quantity * price
            total += subtotal
          }
        }
      }
      return total
    },
  },
  mounted() {
    console.log('app.vue triggered')
  },
  created() {
    this.$store.dispatch('loadProducts', this.inventory)
    console.log('app.vue created, triggered food: ', this.inventory)
  },

  methods: {
    addToCart(name, quantity) {
      console.log('name: ', name)
      console.log('quantity: ', quantity)
      if (quantity && quantity > 0) {
        console.log('quantity value', quantity)
        console.log('name value', name)
        console.log('current total in cart')

        if (!this.cart[name]) {
          this.cart[name] = 0
        }

        if (isNaN(this.cart[name])) {
          this.cart[name] = 0
        }

        this.cart[name] = this.cart[name] + quantity // 0 + 5
        // this.quantity = 0

        console.log('cart name value', this.cart[name])
        console.log('cart value', this.cart)

        const cartTotal = this.cartTotal

        // Log the cart total
        console.log('Cart Total:', cartTotal)

        // this.inventory[index].quantity = 0

        this.totalAmountInCart = 0
      }
    },

    toggleSideBar() {
      this.showSideBar = !this.showSideBar
    },
    removeItem(name) {
      delete this.cart[name]
    },
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
<style>
.new {
  text-align: right;
  margin: 20px 40px;
}
.sidebar {
  --cui-sidebar-bg: var(--sideBarColor);
}
.sidebar .nav-link:hover {
  color: var(--sideBarText);
}
.sidebar-nav .nav-link.active {
  color: var(--sideBarText);
  background: var(--cui-sidebar-nav-link-active-bg);
}
.sidebar-nav .nav-title {
  font-size: 80%;
  font-weight: 700;
  color: var(--sideBarText);
}
.sidebar-nav .nav-link {
  color: var(--sideBarText);
}
.sidebar-nav .nav-icon {
  color: var(--sideBarIconColor);
}
.sidebar .nav-link .nav-icon:hover {
  color: var(--sideBarLinkHoverColor);
}
.sidebar-nav .nav-icon:hover {
  color: var(--sideBarIconColor);
  font-weight: bold;
}
.fas,
.fa-solid {
  font-weight: 900;
  color: var(--sideBarIconColor);
}
.fas,
.fa-solid:hover {
  color: var(--sideBarText);
}
.sidebar-nav .nav-group.show .nav-group-toggle {
  color: var(--sideBarIconColor);
}
.nav-link:hover {
  color: var(--sideBarIconColor);
}
.nav-link:focus {
  color: var(--sideBarIconColor);
}
/*new*/
.header > .container,
.header > .container-fluid,
.header > .container-sm,
.header > .container-md,
.header > .container-lg,
.header > .container-xl,
.header > .container-xxl,
.header .navbar > .container,
.header .navbar > .container-fluid,
.header .navbar > .container-sm,
.header .navbar > .container-md,
.header .navbar > .container-lg,
.header .navbar > .container-xl,
.header .navbar > .container-xxl {
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
  background-color: var(--seperateTopNavColor);
}
.header.header-sticky {
  position: sticky;
  top: 0;
  z-index: 1029;
  background-color: #2c3e50;
  background-color: var(--seperateTopNavColor);
}
.icon:not(.icon-c-s):not(.icon-custom-size).icon-lg {
  width: 1.25rem;
  height: 1.25rem;
  font-size: 1.25rem;
  color: white;
}
.avatar-sm {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.6rem;
  background-color: white;
}

.sidebar-nav {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0;
  margin: 0 20px 0 20px;
  margin-bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  list-style: none;
}
.footer {
  background-color: var(--dashboardFooterBackground);
}
</style>
