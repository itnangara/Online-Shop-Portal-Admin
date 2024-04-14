<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <div style="text-align: left; padding-left: 20px" class="logo">
      <a href="/products">
        <img
          src="@/assets/brand/logo-v1.png"
          style="width: 100px; height: 90px"
        />
      </a>
    </div>

    <AppSidebarNav />

    <div class="logout-container">
      <router-link to="" class="nav-link" @click="logout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Log Out</span>
      </router-link>
    </div>
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    />
  </CSidebar>
</template>

<script>
// import logo from '@/assets/brands/logo.png'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  data() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('userLogout')
    },
  },
}
</script>

<style scoped>
.logout-container {
  /*color: rgba(255, 255, 255, 0.6);*/
  color: var(--sideBarText);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--cui-sidebar-nav-link-padding-y)
    var(--cui-sidebar-nav-link-padding-x);
  margin: 10px;
  font-family: 'Font Awesome', sans-serif;
}

.logout-container i {
  margin-right: 5px; /* Add some spacing between the icon and text */
}
</style>
