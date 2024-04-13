<template>
  <div>
    <navbar-auth type="login"></navbar-auth>

    <auth-card>
      <base-dialog
        :show="showLoadingErrorDialog"
        title="Error Occurred"
        @close="errorHandling"
      >
        <p class="error" v-if="loadingError">
          Failed loading due to: <strong>{{ loadingErrorMessage }}</strong>
        </p>
      </base-dialog>

      <base-spinner style="margin: auto" v-if="isLoading"></base-spinner>

      <form>
        <h5 class="auth-header">Sign In</h5>

        <div class="form-group">
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="text-field"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="text-field"
            placeholder="Password"
          />
        </div>

        <div class="form-group">
          <input
            v-model="remember"
            type="checkbox"
            id="remember"
            name="remember"
            class="custom-control-input"
            checked
          />
          <label class="form-check-label" for="remember"></label>
          <label for="remember">&nbsp; Remember me</label>
        </div>

        <auth-button class="button" @click.prevent="login">
          Sign In
        </auth-button>

        <!-- <button class="btn btn-dark btn-lg btn-block" @click.prevent="submitForm">Sign In</button>  -->
        <!-- <p class="forgot-password text-right">
              <router-link to="#">
              correct-link->: "/forgot-password" Forgot password ?</router-link>
          </p>-->

        <!-- <div class="social-icons">
                <ul>
                  <li><a href="#"><i class="fa fa-google"></i></a></li>
                  <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i class="fa fa-twitter"></i></a></li>
              </ul>
          </div> -->
      </form>

      <div class="form-footer">
        <a style="text-decoration: none" href="#">Terms and Conditions</a> |
        <router-link to="#" style="text-decoration: none"
        ><!-- correct-link->: "/forgot-password" -->Forgot password
          ?</router-link
        >
      </div>
    </auth-card>
  </div>
</template>

<script>
// import axios from 'axios';
import NavbarAuth from '../layouts/NavbarAuth.vue'
// import { getAPI } from '../../../axios-api';

export default {
  components: {
    NavbarAuth,
  },

  data() {
    return {
      email: '',
      password: '',
      remember: false,
      error: null,

      modalTitle: '',

      isLoading: true,
      loadingError: false,
      loadingErrorMessage: null,
      showLoadingErrorDialog: false,
    }
  },
  mounted() {
    this.isLoading = false
  },
  methods: {
    async login() {
      let data = {
        email: this.email,
        password: this.password,
      }
      try {
        this.isLoading = true
        await this.$store.dispatch('userLogin', data)
        this.isLoading = false
        // this.$router.push('/dataapitest');
        this.$router.push('/')
      } catch (error) {
        this.isLoading = false
        this.loadingError = true
        this.loadingErrorMessage = error.message
        this.showLoadingErrorDialog = true
      }
    },

    errorHandling() {
      this.showLoadingErrorDialog = false
      this.loadingErrorMessage = null
    },
  },
}
</script>

<style scoped>
textarea:focus,
input[type='text']:focus,
input[type='email']:focus,
input[type='password']:focus,
.uneditable-input:focus {
  border-color: #3d008d;
  box-shadow: 0 0px 0px #3d008d inset, 0 0 0px #3d008d;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);*/
  outline: 0 none;
}

.text-field {
  border: none;
  border-bottom: 1px solid gray;
  padding: 0.5em;
  width: 90%;
  margin-bottom: 10px;
}

.button {
  background-color: #40aadb;
  background-color: #172455;
  margin-top: 1rem;
}

.form-footer {
  margin-top: 20px;
}
</style>
