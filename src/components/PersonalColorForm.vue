<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submit" class="form">
        <input
          class="input"
          type="file"
          name="file"
          id="file"
          prepend-icon="mdi-camera"
          style="width: 500px"
          @change="onImageChange($event)"
        />
        <button
          @click="submit()"
          type="button"
          class="btn btn-primary"
          style="float: right"
        >
          퍼스널 컬러 진단하기
        </button>

        <div v-if="fileName !== ''">
          <img :src="require('@/assets/face/' + 'face_' + this.fileName)" />
          {{ season }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getAuthFromCookie } from '@/utils/cookies';

let formData;
let photoFile;

export default {
  data() {
    return {
      fileName: '',
      season: '',
    };
  },
  methods: {
    onImageChange(e) {
      formData = new FormData();
      photoFile = document.getElementById('file');
      this.fileName = photoFile.files[0].name;
      formData.append('file', photoFile.files[0]);
    },

    async submit() {
      axios
        .post('http://localhost:12345/api/personal-color', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: getAuthFromCookie(),
          },
        })
        .then(response => {
          // 응답 처리
          this.season = response.data.data.season;
          alert(
            '당신의 퍼스널 컬러는 ' + response.data.data.season + '입니다.',
          );
        })
        .catch(error => {
          // 예외 처리
        });
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
