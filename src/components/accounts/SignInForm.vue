<template>
  <div class="container">
    <div class="layout-signIn">
      <div class="card">
        <div class="card-header">Sign In</div>

        <v-form @submit.prevent="signInRequest" class="form">
          <label for="identification">ID</label>
          <div class="card-text">
            <input
              type="identification"
              id="identification"
              v-model="identification"
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
          <router-link to="/accounts/sign-up" class="mr-2"
            >Don't have an account? Sign Up</router-link
          >
          |
          <router-link to="/accounts/password" class="text-dark ml-2">
            Forgot your password?</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // form values
      identification: '',
      password: '',
    };
  },
  methods: {
    async signInRequest() {
      try {
        const payload = {
          identification: this.identification,
          passwordHash: this.password,
        };
        await this.$store.dispatch('accounts/signInSetting', payload);
        await this.$router.push('/');
      } catch (error) {
        alert('ID/PASSWORD가 일치하지 않습니다');
        console.log(error.response.data);
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.identification = '';
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
.layout-signIn {
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
