<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="email">EMAIL</label>
          <input id="email" type="text" v-model="email" required />
          <p class="validation-text">
            <span class="warning" v-if="!isEmailValid && email">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">PASSWORD</label>
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
        const { data } = await loginUser(payload);
        console.log(data);
        this.$store.commit('setEmail', data.data.email);
        this.$store.commit('setToken', data.data.token);
        await this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error);
        // console.log(error.response.data);
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
