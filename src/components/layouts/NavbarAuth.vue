<template>
  <div class="navBarAuth">
    <div class="navBarContent" style="margin-top: 20px">
      <!-- <router-link style="border-color: transparent;" to="/employees"> -->
      <h4>Online Shop: Logo</h4>
      <!-- </router-link> -->

      <div>
        <!-- <button type="submit" class="button">Sign Up</button> -->

        <router-link to="login" v-if="type == 'register'">
          <auth-button>Sign In</auth-button>
          <!-- <button type="submit">Sign In</button> -->
        </router-link>

        <router-link to="register" v-else-if="type == 'login'">
          <auth-button>Register</auth-button>
          <!-- <button type="submit">Register</button> -->
        </router-link>

        <div v-else>
          <router-link to="login">
            <auth-button>Sign In</auth-button>
            <!-- <button type="submit">Sign In</button> -->
          </router-link>

          <router-link to="register">
            <auth-button>Register</auth-button>
            <!-- <button type="submit">Register</button> -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthButton from '@/components/ui-elements/AuthButton.vue'
export default {
  props: ['buttonTitle', 'type'],
  components: {
    AuthButton,
  },
}
</script>

<style scoped>
.navBarAuth {
  background-color: #22283d;
  background-color: #172455;

  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
}
.navBarContent {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 15px;
}

.navBarContent a {
  /* removing underlines on links
        background-color: #3d008d;
        background-color: #40aadb;
        background-color: #172455;
        */
  text-decoration: none;
  color: white;
  display: inline-block;

  border: 1px solid transparent;
  border: none;
  cursor: pointer;

  /* creating space between buttons and removing hovering effects */
  margin: 0 0.5rem;
}

h4 {
  color: aliceblue;
}
</style>
