<!--<template>-->
<!--  <div class="contents">-->
<!--    <div class="form-wrapper form-wrapper-sm">-->
<!--      <v-form @submit.prevent="loginRequest" class="form">-->
<!--        <div>-->
<!--          <label for="email">EMAIL</label>-->
<!--          <input id="email" type="text" v-model="email" required />-->
<!--          <p class="validation-text">-->
<!--            <span class="warning" v-if="!isEmailValid && email">-->
<!--              Please enter an email address-->
<!--            </span>-->
<!--          </p>-->
<!--        </div>-->

<!--        <div>-->
<!--          <label for="password">PASSWORD</label>-->
<!--          <input id="password" type="text" v-model="password" />-->
<!--        </div>-->

<!--        <v-btn :disabled="!isEmailValid || !password" type="submit" class="btn">-->
<!--          로그인-->
<!--        </v-btn>-->
<!--      </v-form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Login</div>
        <v-form @submit.prevent="loginRequest" class="form">
          <label for="email">EMAIL</label>
          <div class="card-text">
            <input type="email" id="email" v-model="email" required />
          </div>

          <label for="password">PASSWORD</label>
          <div class="card-text">
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </v-form>
        <div class="link">
          <router-link to="/signup">Don't have an account? Signup</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validation';
import { makePasswordHash } from '@/utils/make-password-hash';

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
          passwordHash: makePasswordHash(this.password),
        };
        await this.$store.dispatch('LOGIN', payload);
        await this.$router.push('/main');
      } catch (error) {
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
.link a {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
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
</style>
