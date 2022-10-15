<template>
  <div class="container">
    <div class="layout-login">
      <table class="table">
        <div>구매자 정보</div>
        <tbody>
          <tr>
            <th>이름</th>
            <td>
              <em> {{ name }}</em>
            </td>
          </tr>

          <tr>
            <th>연락처</th>
            <td>
              <em> {{ phoneNumber }}</em>
            </td>
          </tr>

          <tr>
            <th>EMAIL</th>
            <td>
              <em> {{ email }}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { profileCall } from '@/api/accounts';

export default {
  data() {
    return {
      id: 0,
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
    };
  },
  methods: {
    // return
    async getProfile() {
      try {
        const { data } = await profileCall();
        this.id = data.data.id;
        this.accountRole = data.data.accountRole;
        this.email = data.data.email;
        this.name = data.data.name;
        this.phoneNumber = data.data.phoneNumber;
        this.address.city = data.data.address.city;
        this.address.street = data.data.address.street;
        this.address.zipCode = data.data.address.zipCode;

        this.$store.commit('accounts/SET_ID', this.id);
        this.$store.commit('accounts/SET_ACCOUNT_ROLE', this.accountRole);
        this.$store.commit('accounts/SET_EMAIL', this.email);
        this.$store.commit('accounts/SET_NAME', this.name);
        this.$store.commit('accounts/SET_PHONE_NUMBER', this.phoneNumber);
        this.$store.commit('accounts/SET_CITY', this.address.city);
        this.$store.commit('accounts/SET_STREET', this.address.street);
        this.$store.commit('accounts/SET_ZIP_CODE', this.address.zipCode);
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
