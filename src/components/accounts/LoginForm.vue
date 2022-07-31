<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Login</div>

        <v-form @submit.prevent="loginRequest" class="form">
          <label for="email">EMAIL</label>
          <div class="card-text">
            <input
              type="email"
              id="email"
              placeholder="ex) js-shop@gmail.com"
              v-model="email"
              required
            />
          </div>

          <label for="password">PASSWORD</label>
          <div class="card-text">
            <input type="password" id="password" v-model="password" required />
          </div>

          <button type="submit" class="btn btn-primary" style="float: right">
            Sign In
          </button>
        </v-form>

        <div class="link">
          <p></p>
          <router-link to="/signup">Don't have an account? Signup</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      email: '',
      password: '',
    };
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    },
  },
  methods: {
    async loginRequest() {
      try {
        const payload = {
          email: this.email,
          passwordHash: this.password,
        };
        await this.$store.dispatch('LOGIN', payload);
        await this.$router.push('/');
      } catch (error) {
        alert('EMAIL/PASSWORD가 일치하지 않습니다');
        console.log(error.response.data);
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.card-title {
  margin: 8px;
}
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-login {
  margin: auto;
  margin-top: 125px;
}
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
</style>
