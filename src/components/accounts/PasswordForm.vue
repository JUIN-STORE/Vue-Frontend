<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Change Password</div>

        <form @submit.prevent="changePassword">
          <div>
            <br />
            AUTHORIZE

            <button
              type="button"
              class="btn btn-primary"
              style="float: right"
              @click="sendEmail()"
            >
              이메일 전송
            </button>
            <br />
            <br />
            <div class="mb-2">
              <label for="identification">* IDENTIFICATION</label>

              <input
                type="identification"
                id="identification"
                v-model="identification"
                required
                :disabled="!disabled"
              />

              <label for="email">* EMAIL</label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                :disabled="!disabled"
              />
            </div>
            <br />

            <div class="mt-2">
              <label for="authHash">AUTHENTICATION CODE </label>
              <div class="card-text">
                <input
                  type="text"
                  id="authHash"
                  v-model="authHash"
                  required
                  style="width: 70%"
                  :disabled="!disabled"
                />
                <div
                  style="display: inline-block; width: 30%; text-align: right"
                >
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="checkAuthHash()"
                  >
                    인증번호 확인
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="card-text my-5">
            <label for="passwordHash">NEW PASSWORD </label>
            <div class="card-text">
              <input
                type="password"
                id="passwordHash"
                v-model="passwordHash"
                :disabled="disabled"
              />
            </div>
            <label for="passwordHashToCheck">CONFIRM NEW PASSWORD </label>
            <div class="card-text">
              <input
                type="password"
                id="passwordHashToCheck"
                v-model="passwordHashToCheck"
                :disabled="disabled"
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary mr-2 mb-2"
            style="float: right"
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendPasswordEmail, changePassword } from '@/api/accounts';
import { checkAuthHash } from '@/api/authorize';

export default {
  data() {
    return {
      disabled: true,
      authHash: '',
      identification: '',
      email: '',
      passwordHash: '',
      passwordHashToCheck: '',
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
    async checkAuthHash() {
      const param = {
        email: this.email,
        hash: this.authHash,
      };

      const response = await checkAuthHash(param);

      if (response.data.apiStatus === 200) {
        alert('인증이 완료되었습니다.');
        this.disabled = false;
      } else {
        alert('인증에 실패했습니다.');
      }
    },
    async changePassword() {
      if (!this.passwordHash || !this.passwordHashToCheck) {
        alert('비밀번호를 입력하세요.');
        return;
      }

      if (this.passwordHash != this.passwordHashToCheck) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const param = {
        email: this.email,
        passwordHash: this.passwordHash,
      };

      const response = await changePassword(param);

      if (response.data.apiStatus === 200) {
        alert('비밀번호 변경이 완료되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    },
    async sendEmail() {
      if (!this.identification) {
        alert('아이디를 입력하세요.');
        return;
      }

      if (!this.email) {
        alert('이메일을 입력하세요.');
        return;
      }

      const param = {
        identification: this.identification,
        email: this.email,
      };

      const response = await sendPasswordEmail(param);
      const env = process.env.NODE_ENV;

      if (response.data.apiStatus === 200) {
        if (env == 'local') {
          alert(response.data.data.replace(/(<([^>]+)>|\n)/gi, ''));
        } else {
          alert('이메일 전송이 완료되었습니다.');
        }
      } else {
        alert('이메일 전송에 실패했습니다.');
      }
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
