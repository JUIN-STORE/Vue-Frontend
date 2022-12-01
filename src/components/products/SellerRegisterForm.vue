<template>
  <div class="contents card">
    <div class="card-header">상품 등록</div>
    <div class="form-wrapper form-wrapper-sm my-5">
      <form @submit.prevent="submit" class="form">
        <div>
          <label for="productName">CATEGORY</label>
          <select
            class="form-select"
            @change="selectCategory($event)"
            id="category"
            v-model="categoryId"
          >
            <option value="0" selected>Please Select Category</option>
            <option
              v-for="category in categoryList"
              :value="category.id"
              :key="category.id"
            >
              {{ category.categoryName }}
            </option>
          </select>
        </div>
        <br />

        <div>
          <label for="productName">PRODUCT NAME</label>
          <input id="productName" type="text" v-model="productName" required />
        </div>
        <div>
          <label for="price">PRICE</label>
          <input id="price" type="text" v-model="price" />
        </div>
        <div>
          <label for="quantity">QUANTITY</label>
          <input id="quantity" type="text" v-model="quantity" />
        </div>
        <div>
          <label for="description">DESCRIPTION</label>
          <input id="description" type="text" v-model="description" />
        </div>
        <button
          @click="submit()"
          type="button"
          class="btn btn-primary mt-4"
          style="float: right"
        >
          상품등록하기
        </button>
      </form>
      <input
        id="file"
        class="input mt-4"
        type="file"
        counter
        show-size
        label="이미지 제출(여러개 가능)"
        outlined
        dense
        multiple
        prepend-icon="mdi-camera"
        style="width: auto"
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
import { categoriesCall } from '@/api/categories';

let formData;
let files;

export default {
  created() {
    let accountRole = this.$store.getters['accounts/readAccountRole'];

    console.log(accountRole);
    if (accountRole === 'USER') {
      alert('일반 유저는 접근할 수 없습니다. 판매자만 접근 가능합니다.');
      this.$router.push('/');
    } else {
      this.readCategoryList();
    }
  },

  data() {
    return {
      // 셀렉트박스에서 사용하기 위한 API를 통해 받은 데이터
      categoryList: [],

      // 아래부터는 리퀘스트
      categoryId: 0,
      productName: '',
      price: '',
      quantity: '',
      description: '',
      fileList: '',
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

    async readCategoryList() {
      const { data } = await categoriesCall();
      this.categoryList = data.data;
    },

    async selectCategory(e) {
      this.category = Number(e.target.value);
      console.log('categoryId=' + this.category);
    },

    async submit() {
      const payload = {
        categoryId: this.categoryId,
        categoryList: this.categoryList,
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
        url: 'http://localhost:12345/api/products/seller/register', // 이미지 저장을 위해 back서버와 통신
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data;',
          Authorization: getAuthFromCookie(),
        }, // 이걸 써줘야 formdata 형식 전송가능
        data: formData,
      })
        .then(res => {
          alert('상품 등록에 완료하였습니다.');
          console.log(res.data.message);
          this.imagecnt = files.length; // 이미지 개수 저장
        })
        .catch(err => {
          alert('상품 등록에 실패하였습니다.');
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

<style scoped>
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
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

input[type='file']::file-selector-button {
  height: 30px;
  background-color: #ffd333;
  border: 1px solid #ffd333;
  cursor: pointer;
}
</style>
