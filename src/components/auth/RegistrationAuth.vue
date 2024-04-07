<template>
  <div>
    <navbar-auth type="register"></navbar-auth>

    <auth-card>
      <div class="form-class">
        <form>
          <h5 class="auth-header">Create Account</h5>

          <!--<p style="margin-left:30px; text-align:left; color:red;">Passwords do not match</p> -->
          <p v-if="error !== null" style="color: red">Passwords do not match</p>

          <div class="form-group">
            <input
              v-model="fullName"
              type="text"
              name="fullName"
              id="fullName"
              class="text-field"
              placeholder="Full Name"
            />
          </div>

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
              v-model="companyName"
              type="text"
              name="companyName"
              id="companyName"
              class="text-field"
              placeholder="Company Name"
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
              v-model="confirmPassword"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="text-field"
              placeholder="Repeat Password"
            />
          </div>

          <auth-button class="button" @click.prevent="registerUser">
            Sign Up
          </auth-button>

          <p style="margin-top: 10px">
            Already registered?
            <router-link :to="{ name: 'login' }">sign in</router-link>
          </p>
        </form>
      </div>
    </auth-card>
  </div>
</template>

<script>
import NavbarAuth from '../layouts/NavbarAuth.vue'
export default {
  components: { NavbarAuth },
  data() {
    return {
      fullName: '',
      companyName: '',
      email: '',
      password: '',

      confirmPassword: '',

      error: null,
      isLoading: false,
    }
  },
  methods: {
    async registerUser() {
      console.log('reg user view')
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match'
        // console.log('passwords do not match');
        return
      }

      // this.isLoading = true;
      // this.error = null;

      {
        // let fullName = this.fullName;
        // let companyName = this.companyName;
        // let email = this.email;
        // let password = this.password;
        // console.log('results: ', fullName, '', companyName, '', email, '', password);
      }

      let data = {
        full_name: this.fullName,
        company_name: this.companyName,
        email: this.email,
        password: this.password,
      }

      await this.$store.dispatch('userRegistration', data)

      this.$router.push('/auth/login')

      // try {
      //     let response = await axios.post('http://localhost:8000/api/register/', data);
      //     console.log(response.data);
      // }
      // catch (error) {
      //   this.error = error.response.data.error;
      // }
      // finally {
      //   this.isLoading = false;
      // }
    },
  },
}
</script>

<!-- <template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <!- {% csrf_token %} --
      <input type="hidden" name="csrfmiddlewaretoken" value="...">
      <label for="username">Username:</label>
      <input type="text" name="username" v-model="username" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" required>
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template> -->

<!-- <script>
import axios from 'axios';

export default {
  // name: 'RegistrationAuth',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    registerUser() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      // const csrftoken = this.getCsrfToken();

      // axios.post('http://localhost:8000/api/register/', data, {
      //   headers: {
      //     'X-CSRFToken': csrftoken
      //   }
      // })
      axios.post('http://localhost:8000/api/register/', data)
      .then(response => {
        console.log(response.data);
        // handle success
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
    },
    // getCsrfToken() {
    //   const csrfField = document.getElementsByName('csrfmiddlewaretoken')[0];
    //   return csrfField.value;
    // }
  }
}
</script> -->

<style scoped>
body {
  <--background-image: url('@/assets/images/vue.jpg');
  background-size: cover;
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
</style>
