<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="email">email:</label>
          <input id="email" type="text" v-model="email" required />
          <p class="validation-text">
            <span class="warning" v-if="!isEmailValid && email">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">password:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isEmailValid || !password"
          type="submit"
          class="btn"
        >
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/api/accounts';
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
    async submitForm() {
      try {
        const payload = {
          email: this.email,
          passwordHash: makePasswordHash(this.password),
        };
        const { res } = loginUser(payload);
        console.log(res);
        // this.$store.commit('setEmail', data.user.username);
        await this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.initForm();
      } finally {
        // this.initForm();
      }
    },
    initForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
