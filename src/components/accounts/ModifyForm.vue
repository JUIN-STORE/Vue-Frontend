<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="modifyForm" class="form">
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
          <button type="submit" class="btn">수정 완료</button>
          <button type="submit" class="btn">주소 변경하기</button>
        </div>
        <p></p>
        <router-link to="/main" type="submit" class="btn">취소</router-link>
      </form>

      <form @submit.prevent="deleteForm" class="form">
        <button type="submit" class="btn">회원 탈퇴하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { modify, remove } from '@/api/accounts';
import { makePasswordHash } from '@/utils/make-password-hash';

export default {
  // 화면에 표시됨
  data() {
    return {
      accountRole: 'USER',
      email: this.$store.getters.readEmail,
      password: '',
      name: this.$store.getters.readName,
    };
  },
  methods: {
    async modifyForm() {
      const payload = {
        accountRole: this.accountRole,
        passwordHash: makePasswordHash(this.password),
        name: this.name,
      };
      let newVar = await modify(payload);
      console.log('test' + newVar);
    },

    async deleteForm() {
      await remove();
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
