<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">ACCOUNT MODIFY</div>
        <p></p>
        <form @submit.prevent="modifyForm" class="form">
          <div>
            <label>ROLE</label>
            <select class="form-select" id="accountRole" v-model="accountRole">
              <option value="USER" selected>USER</option>
              <option value="SELLER">SELLER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <br />

          <label for="email">EMAIL</label>
          <div class="card-text">
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-control"
              disabled
            />
          </div>

          <label for="password">PASSWORD</label>
          <div class="card-text">
            <input id="password" type="password" v-model="password" />
          </div>

          <label for="name">NAME</label>
          <div class="card-text">
            <input id="name" type="text" v-model="name" />
          </div>

          <label for="name">* PHONE NUMBER</label>
          <div class="card-text">
            <input
              id="phoneNumber"
              type="text"
              v-model="phoneNumber"
              class="form-control"
            />
          </div>

          <router-link
            to="/"
            type="submit"
            class="btn btn-primary"
            style="float: right"
          >
            취소
          </router-link>
          <button type="submit" class="btn btn-primary" style="float: right">
            PROFILE 수정 완료
          </button>
        </form>

        <form @submit.prevent="deleteForm" class="form">
          <p></p>
          <button
            type="submit"
            class="btn btn-outline-danger"
            style="float: right"
          >
            회원 탈퇴하기
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { modifyCall, removeCall } from '@/api/accounts';

export default {
  // 화면에 표시됨
  data() {
    return {
      accountRole: 'USER',
      email: this.$store.getters['accounts/readEmail'],
      name: this.$store.getters['accounts/readName'],
      phoneNumber: this.$store.getters['accounts/readPhoneNumber'],
      password: '',
    };
  },
  methods: {
    async modifyForm() {
      const payload = {
        accountRole: this.accountRole,
        name: this.name,
        phoneNumber: this.phoneNumber,
        passwordHash: this.password,
      };
      await modifyCall(payload);
      alert('수정되었습니다.');
      await this.$router.push('/accounts/profile');
    },

    async deleteForm() {
      await removeCall();
      alert(this.email + '님, 탈퇴되었습니다.');
      this.$store.commit('accounts/setEmail', null);
      this.$store.commit('accounts/setToken', null);
      await this.$router.push('/');
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
