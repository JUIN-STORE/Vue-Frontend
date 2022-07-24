<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submit" class="form">
        <div>
          <label for="productName">productName</label>
          <input id="productName" type="text" v-model="productName" required />
        </div>
        <div>
          <label for="price">PRICE</label>
          <input id="price" type="text" v-model="price" />
        </div>
        <div>
          <label for="quantity">quantity</label>
          <input id="quantity" type="text" v-model="quantity" />
        </div>
        <div>
          <label for="description">description</label>
          <input id="description" type="text" v-model="description" />
        </div>
        <button @click="submit()" type="submit" class="btn">상품등록</button>
      </form>
      <input
        class="input"
        type="file"
        counter
        show-size
        label="이미지 제출(여러개 가능)"
        outlined
        dense
        multiple
        prepend-icon="mdi-camera"
        style="width: 400px; margin-left: 100px"
        @change="onImageChange($event)"
      />
      <!--      <v-img v-for="(item, i) in fileList" :key="i" :src="item.url" />-->
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validation';
import axios from 'axios';
import { getAuthFromCookie } from '@/utils/cookies';

let formData;
let files;

export default {
  data() {
    return {
      fileList: '',
      productName: '1',
      price: '1',
      quantity: '1',
      description: '1',
    };
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    },
  },
  methods: {
    onImageChange(e) {
      const fileList = e?.target?.files; // FileList Type
      files = Array.from(fileList); // File Array Type
      // v-file-input 변경시
      if (!files) {
        return;
      }
      console.log('files', files);
      formData = new FormData(); // 파일을 전송할때는 FormData 형식으로 전송
      this.uploadimageurl = []; // uploadimageurl은 미리보기용으로 사용
      files.forEach(item => {
        formData.append('fileList', item); // formData의 key: 'filelist', value: 이미지
        const reader = new FileReader();
        reader.onload = e => {
          this.uploadimageurl.push({ url: e.target.result });
          // e.target.result를 통해 이미지 url을 가져와서 uploadimageurl에 저장
        };
        reader.readAsDataURL(item);
      });
    },
    async submit() {
      const payload = {
        productName: this.productName,
        price: this.price,
        quantity: this.quantity,
        description: this.description,
      };

      // https://velog.io/@hhhminme/Axios%EC%97%90%EC%84%9C-Post-%EC%8B%9C-Contenttypeapplicationoctet-streamnotsupported-%ED%95%B8%EB%93%A4%EB%A7%81415-%EC%97%90%EB%9F%AC
      const json = JSON.stringify(payload);
      const res = new Blob([json], { type: 'application/json' });
      formData.append('request', res);

      await axios({
        url: 'http://localhost:12345/api/products/admin/register', // 이미지 저장을 위해 back서버와 통신
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data;',
          Authorization: getAuthFromCookie(),
        }, // 이걸 써줘야 formdata 형식 전송가능
        data: formData,
      })
        .then(res => {
          console.log(res.data.message);
          this.imagecnt = files.length; // 이미지 개수 저장
        })
        .catch(err => {
          console.log(err);
        });
    },
    initRequest() {
      this.file = '';
      this.productName = '';
      this.price = '';
      this.quantity = '';
      this.description = '';
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
