<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label>ROLE</label>
          <select id="accountRole" v-model="accountRole">
            <option value="USER" selected>USER</option>
            <option value="SELLER">SELLER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <br />

        <div>
          <label for="email">* EMAIL</label>
          <input id="email" type="email" v-model="email" required />
        </div>

        <div>
          <label for="password">* PASSWORD</label>
          <input id="password" type="password" v-model="password" required />
        </div>

        <div>
          <label for="name">* NAME</label>
          <input id="name" type="text" v-model="name" required />
        </div>

        <div>
          <br />ADDRESS
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

        <button type="submit" class="btn">회원 가입</button>
        <router-link to="/main" type="submit" class="btn">취소</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { signup } from '@/api/accounts';
import { makePasswordHash } from '@/utils/make-password-hash';

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
    // return
    async submitForm() {
      const payload = {
        accountRole: this.accountRole,
        email: this.email,
        passwordHash: makePasswordHash(this.password),
        name: this.name,
        address: {
          city: this.address.city,
          street: this.address.street,
          zipCode: this.address.zipCode,
        },
      };
      await signup(payload);
      this.initForm();
    },
    initForm() {
      this.accountRole = 'USER';
      this.email = '';
      this.password = '';
      this.name = '';
      this.address.defaultAddress = true;
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
