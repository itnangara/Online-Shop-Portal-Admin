<template>
  <CHeader position="sticky" class="mb-4 btn-danger">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>

      <!-- <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="/dashboard"> Home </CNavLink>
        </CNavItem>
      </CHeaderNav> -->
      <!-- logo -->
      <div
        style="text-align: left; padding-left: 20px"
        class="d-none d-md-flex me-auto llogo"
      >
        <a v-show="!$store.state.sidebarVisible" href="/products">
          <img
            src="@/assets/brand/logo-v1.png"
            style="width: 100px; height: 90px"
          />
        </a>
      </div>
      <CHeaderNav>
        <!-- <div style="color: black">AppHeader.vue file: one line testing</div> -->
        <div
          class="top-bar-cart-link"
          style="margin: 3px 10px 0px 0px; color: var(--sideBarText)"
          @click="$store.commit('toggleCartSidebar')"
        >
          <i class="icofont-cart-alt icofont-1x" style="margin-right: 0px"></i>
          Cart ({{ totalQuantity }})
        </div>

        <CartSideBar v-if="$store.state.cartSidebarVisible" />

        <AppHeaderDropdownAccnt
          v-if="!$store.state.cartSidebarVisible"
          style="margin-top: 3px"
        />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import CartSideBar from '@/components/CartSideBar.vue'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderDropdownAccnt,
    CartSideBar,
  },
  data() {
    return {}
  },
  computed: {
    totalQuantity() {
      return this.$store.getters.getTotalQuantity
    },
  },
  mounted() {},
}
</script>
