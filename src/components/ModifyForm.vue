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
          <input id="email" type="email" v-model="email" disabled />
        </div>

        <div>
          <label for="password">PASSWORD</label>
          <input id="password" type="password" v-model="password" />
        </div>

        <div>
          <label for="name">NAME</label>
          <input id="name" type="text" v-model="name" />
        </div>

        <div>
          <!--          <br />ADDRESS-->
          <!--          <label for="address.defaultAddress">DEFAULT ADDRESS</label>-->
          <!--          <input-->
          <!--            id="address.defaultAddress"-->
          <!--            type="checkbox"-->
          <!--            v-model="address.defaultAddress"-->
          <!--            checked="true"-->
          <!--          />-->

          <label for="address.city">CITY</label>
          <input
            id="address.city"
            type="text"
            v-model="address.city"
            required
          />

          <label for="address.street">STREET</label>
          <input
            id="address.street"
            type="text"
            v-model="address.street"
            required
          />

          <label for="address.zipCode">ZIPCODE</label>
          <input
            id="address.zipCode"
            type="number"
            v-model="address.zipCode"
            required
          />
        </div>

        <button type="submit" class="btn">수정 완료</button>
        <router-link to="/main" type="submit" class="btn">취소</router-link>
      </form>
    </div>
  </div>
</template>

<script>
// import { modify } from '@/api/accounts';

export default {
  // 화면에 표시됨
  data() {
    return {
      accountRole: 'USER',
      email: this.$store.getters.readEmail,
      password: '',
      name: this.$store.getters.readName,
      address: {
        defaultAddress: '',
        city: this.$store.getters.readCity,
        street: this.$store.getters.readStreet,
        zipCode: this.$store.getters.readZipCode,
      },
    };
  },
  methods: {
    /*
     return
     async submitForm() {
       const payload = {
         accountRole: this.accountRole,
         email: this.email,
         passwordHash: makePasswordHash(this.password),
         name: this.name,
         address: {
           defaultAddress: this.address.defaultAddress,
           city: this.address.city,
           street: this.address.street,
           zipCode: this.address.zipCode,
         },
       };
       await modify(payload);
       this.initForm();
     },
    */
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
