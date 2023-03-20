<template>
  <div class="container">
    <div class="layout-signIn" v-if="this.isLoaded">
      <div class="card">
        <div class="card-header">PROFILE</div>
        <p></p>

        <form @submit.prevent="getProfile" class="form">
          <div class="card-text">
            <div>INFO</div>
            <label for="email">ROLE</label>
            <input
              type="accountRole"
              id="accountRole"
              v-model="accountRole"
              class="form-control"
              disabled
            />

            <label for="email">ID</label>
            <input
              type="identification"
              id="identification"
              v-model="identification"
              class="form-control"
              disabled
            />

            <label for="email">EMAIL</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              disabled
            />

            <label for="name">NAME</label>
            <input
              id="name"
              type="text"
              v-model="name"
              class="form-control"
              disabled
            />

            <label for="name">PHONE NUMBER</label>
            <input
              id="phoneNumber"
              type="text"
              v-model="phoneNumber"
              class="form-control"
              disabled
            />
          </div>

          <div class="card-text">
            <div>ADDRESS</div>
            <label for="address.city">CITY</label>
            <input
              id="address.city"
              type="text"
              v-model="address.city"
              class="form-control"
              disabled
            />

            <label for="address.street">STREET</label>
            <input
              id="address.street"
              type="text"
              v-model="address.street"
              class="form-control"
              disabled
            />

            <label for="address.zipCode">ZIPCODE</label>
            <input
              id="address.zipCode"
              type="number"
              v-model="address.zipCode"
              class="form-control"
              disabled
            />
          </div>

          <router-link
            to="/accounts/update"
            type="submit"
            class="btn btn-primary"
            style="float: right"
            >GO TO PROFILE CHANGE
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { profileCall } from '@/api/accounts';

export default {
  data() {
    return {
      identification: '',
      accountRole: 'USER',
      email: '',
      name: '',
      phoneNumber: '',
      address: {
        defaultAddress: true,
        city: '',
        street: '',
        zipCode: '',
      },
      isLoaded: false,
    };
  },
  methods: {
    async getProfile() {
      try {
        const { data } = await profileCall();
        this.identification = data.data.identification;
        this.accountRole = data.data.accountRole;
        this.email = data.data.email;
        this.name = data.data.name;
        this.phoneNumber = data.data.phoneNumber;
        this.address.city = data.data.address.city;
        this.address.street = data.data.address.street;
        this.address.zipCode = data.data.address.zipCode;

        this.$store.commit('accounts/SET_IDENTIFICATION', this.identification);
        this.$store.commit('accounts/SET_ACCOUNT_ROLE', this.accountRole);
        this.$store.commit('accounts/SET_EMAIL', this.email);
        this.$store.commit('accounts/SET_NAME', this.name);
        this.$store.commit('accounts/SET_PHONE_NUMBER', this.phoneNumber);
        this.$store.commit('accounts/SET_CITY', this.address.city);
        this.$store.commit('accounts/SET_STREET', this.address.street);
        this.$store.commit('accounts/SET_ZIP_CODE', this.address.zipCode);

        this.isLoaded = true;
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
  margin-top: 3em;
  margin-bottom: 3em;
}
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}

.card-text > div {
  font-weight: bold;
}

.card-text > label {
  margin-top: 0.5em;
}
</style>
