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
        <AppHeaderDropdownAccnt style="margin-top: 3px" />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderDropdownAccnt,
  },
  data() {
    return {}
  },
  computed: {
    // totalQuantity() {
    //   return this.$store.getters.getTotalQuantity
    // },
  },
  mounted() {},
}
</script>
