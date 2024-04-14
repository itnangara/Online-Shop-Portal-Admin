import { getAPI } from "../../axios-api";
import { createStore } from 'vuex';
import router from '@/router/index'; 

// Router plugin
const routerPlugin = (router) => (store) => {
  store.$router = router;
};

export default createStore({
  state: {
    sidebarVisible: '',
    modalVisibility: '',
    cartSidebarVisible: '',
    sidebarUnfoldable: false,
    inventory: {},
    cartItems: {},
    // Auth
    accessToken: null,
    refreshToken: null,
  },
  getters: {
    isLoggedIn(state){
      return state.accessToken != null
    },
    getCartItems(state) {
      return state.cartItems
    },
    getInventory(state) {
      return state.inventory
    },
    getTotalQuantity(state) {
      return Object.values(state.cartItems).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    },
  },
  mutations: {
    updateStorage(state, { access, refresh }){
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
    },
    destroyToken() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleCartSidebar(state) {
      console.log('cartSidebarVisible: ', state.cartSidebarVisible)
      state.cartSidebarVisible = !state.cartSidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    loadProducts(state, inventory) {
      // state.inventory.push(inventory)
      state.inventory = inventory
    },
    addToCart(state, data) {
      let name = data.name
      let quantity = data.quantity
      let product = data.product

      console.log('addToCart mutation activated')
      console.log('name: ', name, ' qua: ', quantity, ' prod: ', product)

      if (quantity && quantity > 0) {
        console.log('name: ' + name + ' quantity: ' + quantity)
        console.log('current total in cart')

        //state.cartItems.push(product)
        // console.log('current total in cart', this.cartItems)
        if (!state.cartItems[name] || isNaN(state.cartItems[name])) {
          state.cartItems[name] = 0
        }

        // everytime the button is clicked cartItems[name] is undefined
        // cartItems[name] is then Initialized to 0
        // cartItems[name] creates a key in cart e.g key of 'Raddishes'
        // assigning something a key gives a value to the key
        state.cartItems[name] = state.cartItems[name] + quantity // 0 + quantity entered e.g. 2
        // result is a {key: value} pair e.g Raddishes: 3

        console.log('cart name key value', state.cartItems[name])
        console.log('cart items', state.cartItems)
      }
    },
    calculateTotal(state) {
      console.log('hhhhhhhhey there: calculateTotal')
      return Object.values(state.cartItems).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    },
  },
  actions: {
    async userLogin(context, data){
        // console.log('userLogin Action: ', data.email, data.password);

        let response = await getAPI.post('/api/login/', data);
        console.log('Login action res: ', response.data);

        context.commit('updateStorage', {
          access: response.data.access,
          refresh: response.data.refresh
        })
    },

    async userRegistration(context, data){
      console.log('user Reg Action');
      try {
        // let response = await getAPI.post('/api/register/', data);
        let response = await getAPI.post('/api/register/', data);
        console.log('Login action response: ', response.data);        
        context.commit('updateStorage', {
          access: response.data.access,
          refresh: response.data.refresh
        })
      } catch (error) {
        console.log('Login action response: ', error.message);
        alert("Login Error has Occurred")  
      }
    },
    async userLogout(context){
        context.commit('destroyToken');
        this.$router.push({ name: 'login' })
    },
    loadProducts({ commit }, inventory) {
      console.log('loadProducts mutation: ', inventory)
      commit('loadProducts', inventory)
    },
    addToCart({ commit }, data) {
      console.log('addToCart action activated')
      console.log('addToCart localName name: ', data)
      commit('addToCart', data)
    },
    calculateTotal({ commit }) {
      commit('calculateTotal')
    },
  },
  modules: {},
  plugins: [routerPlugin(router)] 
})
