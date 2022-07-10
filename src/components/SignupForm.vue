<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="email">email: </label>
          <input id="email" type="email" v-model="email" />
        </div>
        <div>
          <label for="password">password: </label>
          <input id="password" type="text" v-model="passwordHash" />
        </div>
        <div>
          <label for="name">name</label>
          <input id="name" type="text" v-model="name" />
        </div>

        <form>
          <div>
            <label>role: {{ accountRole }}</label>
            <select id="accountRole" v-model="accountRole">
              <option value="USER" selected>USER</option>
              <option value="SELLER">SELLER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </form>

        <div>
          주소
          <label for="address.city">city</label>
          <input id="address.city" type="text" v-model="address.city" />

          <label for="address.street">street</label>
          <input id="address.street" type="text" v-model="address.street" />

          <label for="address.zipCode">zipCode</label>
          <input id="address.zipCode" type="number" v-model="address.zipCode" />
        </div>
        <button type="submit" class="btn">회원 가입</button>
        <router-link to="/main" type="submit" class="btn">취소</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/index';

export default {
  data() {
    return {
      email: '',
      passwordHash: '',
      name: '',
      accountRole: 'USER',
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
      const userData = {
        email: this.email,
        passwordHash: this.passwordHash,
        name: this.name,
        accountRole: this.accountRole,
        city: this.city,
        address: {
          city: this.address.city,
          street: this.address.street,
          zipCode: this.address.zipCode,
        },
      };
      const { data } = await registerUser(userData);
      console.log(data.email);
      this.initForm();
    },
    initForm() {
      this.email = '';
      this.passwordHash = '';
      this.name = '';
      this.accountRole = '';
      this.address.city = '';
      this.address.street = '';
      this.address.zipCode = '';
    },
  },
};
</script>

<style>
select {
  width: 200px;
  padding: 0.8em 0.5em;
  border: 1px solid #999;
  font-family: inherit;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
select::-ms-expand {
  display: none;
}
</style>
