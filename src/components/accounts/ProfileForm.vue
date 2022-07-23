<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="info" class="form">
        <div>
          <label for="email">* EMAIL</label>
          <input id="email" type="email" v-model="email" disabled />
        </div>

        <div>
          <label for="name">* NAME</label>
          <input id="name" type="text" v-model="name" disabled />
        </div>

        <div>
          <br />ADDRESS
          <label for="address.city">* CITY</label>
          <input
            id="address.city"
            type="text"
            v-model="address.city"
            disabled
          />

          <label for="address.street">* STREET</label>
          <input
            id="address.street"
            type="text"
            v-model="address.street"
            disabled
          />

          <label for="address.zipCode">* ZIPCODE</label>
          <input
            id="address.zipCode"
            type="number"
            v-model="address.zipCode"
            disabled
          />
        </div>
        <router-link to="/modify" type="submit" class="btn"
          >회원 정보 변경하기</router-link
        >
        <router-link to="/main" type="submit" class="btn">취소</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { profile } from '@/api/accounts';

export default {
  data() {
    return {
      accountRole: 'USER',
      email: '',
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
    async getProfile() {
      try {
        const { data } = await profile();
        this.accountRole = data.data.accountRole;
        this.email = data.data.email;
        this.name = data.data.name;
        this.address.city = data.data.address.city;
        this.address.street = data.data.address.street;
        this.address.zipCode = data.data.address.zipCode;

        this.$store.commit('setName', this.name);
        this.$store.commit('setCity', this.address.city);
        this.$store.commit('setStreet', this.address.street);
        this.$store.commit('setZipCode', this.address.zipCode);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProfile();
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
