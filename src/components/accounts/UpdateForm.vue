<template>
  <div>
    <div class="container">
      <div class="layout-login">
        <div class="card">
          <div class="card-header">EDIT ACCOUNT</div>
          <p></p>
          <form @submit.prevent="modifyForm" class="form">
            <div>
              <label>ROLE</label>
              <select
                class="form-select"
                id="accountRole"
                v-model="accountRole"
              >
                <option value="USER" selected>USER</option>
                <option value="SELLER">SELLER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <br />

            <div class="card-text">
              <label for="identification">ID</label>
              <input
                id="email"
                type="email"
                v-model="identification"
                class="form-control"
                disabled
              />
              <label for="email">EMAIL</label>
              <input
                id="email"
                type="email"
                v-model="email"
                class="form-control"
                disabled
              />

              <label for="password">PASSWORD</label>
              <input
                id="password"
                :type="visible ? 'text' : 'password'"
                v-model="password"
                required
                style="width: 90%"
              />
              <div
                @click="showPassword()"
                style="
                  display: inline-block;
                  width: 10%;
                  text-align: center;
                  cursor: pointer;
                "
              >
                <i
                  class="fas"
                  v-bind:class="visible ? 'fa-eye' : 'fa-eye-slash'"
                ></i>
              </div>

              <label for="name">NAME</label>
              <input id="name" type="text" v-model="name" />

              <label for="name">* PHONE NUMBER</label>
              <input
                id="phoneNumber"
                type="text"
                v-model="phoneNumber"
                class="form-control"
              />
            </div>

            <div>
              <router-link
                to="/"
                type="submit"
                class="btn btn-dark"
                style="float: right"
              >
                취소
              </router-link>
              <button
                type="submit"
                class="btn btn-primary mr-1"
                style="float: right"
              >
                PROFILE 수정 완료
              </button>
            </div>
          </form>

          <form @submit.prevent="deleteForm" class="form mt-4">
            <button type="submit" class="btn btn-danger" style="float: right">
              회원 탈퇴하기
            </button>
          </form>
        </div>
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
      visible: false,
      accountRole: 'USER',
      identification: this.$store.getters['accounts/getIdentification'],
      email: this.$store.getters['accounts/getEmail'],
      name: this.$store.getters['accounts/getName'],
      phoneNumber: this.$store.getters['accounts/getPhoneNumber'],
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

      const hasEmptyValue = Object.values(payload).some(
        p => p == null || p === '',
      );

      if (hasEmptyValue) {
        alert('입력하지 않은 항목이 있습니다.');
        return;
      }

      await modifyCall(payload);
      alert('수정되었습니다.');
      await this.$router.push('/accounts/profile');
    },

    async deleteForm() {
      if (!confirm('모든 정보가 삭제됩니다. 정말 탈퇴하시겠습니까?')) return;

      let accountId = this.$store.getters['accounts/getId'];
      await removeCall(accountId);
      alert(this.email + '님, 탈퇴되었습니다.');
      this.$store.commit('accounts/CLEAR_COOKIE');
      await this.$router.push('/');
    },

    showPassword() {
      this.visible = !this.visible;
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
  margin: 5em 0 5em 0;
}
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}

.card-text > label {
  margin-top: 0.5em;
}
</style>
