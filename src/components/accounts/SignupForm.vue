<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Register</div>
        <p></p>

        <form @submit.prevent="submitForm" class="form">
          <div>
            <label>ROLE</label>
            <select class="form-select" id="accountRole" v-model="accountRole">
              <option value="USER" selected>USER</option>
              <option value="SELLER">SELLER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <br />

          <label for="email">* EMAIL</label>
          <div class="card-text">
            <input type="email" id="email" v-model="email" required />
          </div>

          <label for="password">* PASSWORD</label>
          <div class="card-text">
            <input id="password" type="password" v-model="password" required />
          </div>

          <label for="name">* NAME</label>
          <div class="card-text">
            <input id="name" type="text" v-model="name" required />
          </div>

          <div class="card-text">
            <br />ADDRESS
            <p></p>

            <label for="address.city">* CITY</label>
            <input
              id="address.city"
              type="text"
              v-model="address.city"
              required
            />

            <label for="address.street">* STREET</label>
            <input
              id="address.street"
              type="text"
              v-model="address.street"
              required
            />

            <label for="address.zipCode">* ZIPCODE</label>
            <input
              id="address.zipCode"
              type="number"
              v-model="address.zipCode"
              required
            />
          </div>

          <router-link
            to="/"
            type="submit"
            class="btn btn-primary"
            style="float: right"
          >
            CANCEL
          </router-link>

          <button type="submit" class="btn btn-primary" style="float: right">
            REGISTER
          </button>
        </form>

        <div class="link">
          <p></p>
          <router-link to="/login">Already have an account? Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signup } from '@/api/accounts';

export default {
  data() {
    return {
      accountRole: 'USER',
      email: '',
      password: '',
      name: '',
      address: {
        defaultAddress: true,
        city: '',
        street: '',
        zipCode: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          accountRole: this.accountRole,
          email: this.email,
          passwordHash: this.password,
          name: this.name,
          address: {
            city: this.address.city,
            street: this.address.street,
            zipCode: this.address.zipCode,
          },
        };

        await signup(payload);
        alert(this.email + ' 가입되었습니다');
        await this.$router.push('/login');
      } catch (error) {
        alert(error.response.data.message);
        this.initForm();
      }
    },
    initForm() {
      this.email = '';
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
