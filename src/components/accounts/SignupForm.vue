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

          <label for="identification"
            >* ID
            <div
              v-if="this.checkedIdentification"
              style="display: inline-block; color: #ffd333; margin-left: 0.25em"
            >
              사용할 수 있는 아이디입니다.
            </div></label
          >
          <div class="card-text">
            <input
              type="text"
              id="identification"
              v-model="identification"
              required
              style="width: 70%"
            />
            <div style="display: inline-block; width: 30%; text-align: right">
              <button
                type="button"
                class="btn btn-primary"
                @click="checkDuplicatedIdentification"
              >
                아이디 중복 확인
              </button>
            </div>
          </div>

          <label for="password">* PASSWORD</label>
          <div class="card-text">
            <input id="password" type="password" v-model="password" required />
          </div>

          <label for="name">* NAME</label>
          <div class="card-text">
            <input id="name" type="text" v-model="name" required />
          </div>

          <label for="email">* EMAIL</label>
          <div class="card-text">
            <input type="email" id="email" v-model="email" required />
          </div>

          <label for="name">* PHONE NUMBER</label>
          <div class="card-text">
            <input
              id="phoneNumber"
              type="text"
              v-model="phoneNumber"
              required
            />
          </div>

          <div class="card-text">
            <br />ADDRESS

            <button type="button" class="btn btn-primary" @click="showApi()">
              우편번호 찾기</button
            ><br />

            <label>* ZIPCODE</label>
            <input
              type="text"
              id="zipCode"
              placeholder="우편번호"
              required
              disabled
            />

            <label>* CITY</label>
            <input
              type="text"
              id="city"
              placeholder="도로명 주소"
              required
              disabled
            />

            <label for="address.street">* STREET</label>
            <input
              id="address.street"
              type="text"
              v-model="address.street"
              placeholder="상세 주소"
              required
            />
          </div>

          <router-link
            to="/"
            type="button"
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
          <router-link to="/accounts/login"
            >Already have an account? Login</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signUpCall, checkDuplicatedIdentification } from '@/api/accounts';
import { getAddress } from '@/utils/address-api';

export default {
  data() {
    return {
      checkedIdentification: false,
      accountRole: 'USER',
      identification: '',
      password: '',
      name: '',
      email: '',
      phoneNumber: '',
      address: {
        city: '',
        street: '',
        zipCode: '',
        defaultAddress: true,
      },
    };
  },
  watch: {
    identification: {
      async handler() {
        if (this.checkedIdentification) this.checkedIdentification = false;
      },
    },
  },
  methods: {
    showApi() {
      getAddress(this.address);
    },
    async checkDuplicatedIdentification() {
      if (this.identification === '') {
        alert('아이디를 입력하세요.');
        return;
      }

      const response = await checkDuplicatedIdentification(this.identification);
      const status = response.status;

      if (status === 200) {
        this.checkedIdentification = true;
      } else if (status === 400) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        alert('처리 중 오류가 발생했습니다.');
      }
    },
    async submitForm() {
      if (!this.checkedIdentification) {
        alert('아이디 중복 확인이 필요합니다.');
        return;
      }

      try {
        const payload = {
          accountRole: this.accountRole,
          identification: this.identification,
          passwordHash: this.password,
          name: this.name,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address: {
            city: this.address.city,
            street: this.address.street,
            zipCode: this.address.zipCode,
            defaultAddress: this.address.defaultAddress,
          },
        };

        let data = await signUpCall(payload);

        if (data.data.apiStatus !== 200) {
          alert('회원가입에 실패했습니다.');
        } else {
          alert(
            this.identification +
              '님 가입되었습니다. 로그인 페이지로 이동합니다.',
          );
          await this.$router.push('/accounts/login');
        }
      } catch (e) {
        alert('회원가입 중 문제가 발생했습니다.');
        this.initForm();
      }
    },
    initForm() {
      this.email = '';
      this.phoneNumber = '';
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

input {
  height: 40px;
}
</style>
