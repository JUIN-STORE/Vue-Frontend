<template>
  <div class="container">
    <div class="layout-signIn">
      <div class="card">
        <div class="card-header">카테고리 추가</div>

        <form @submit.prevent="submitForm" class="form">
          <div>
            <label>CATEGORY</label>
            <select
              class="form-select"
              @change="selectCategory($event)"
              id="category"
              v-model="parentId"
            >
              <option value="0" selected>최상위에 추가</option>
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

          <label for="categoryName">* CATEGORY NAME</label>
          <div class="card-text">
            <input
              type="categoryName"
              id="categoryName"
              v-model="categoryName"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary" style="float: right">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { categoriesCall, createCategoryCall } from '@/api/categories';

export default {
  data() {
    return {
      // 셀렉트박스에서 사용하기 위한 API를 통해 받은 데이터
      categoryList: [],

      categoryName: '',
      parentId: 0,
    };
  },

  created() {
    let accountRole = this.$store.getters['accounts/getAccountRole'];

    if (accountRole !== 'ADMIN') {
      alert('관리자만 접근 가능합니다.');
      this.$router.push('/');
    } else {
      this.readCategoryList();
    }
    this.readCategoryList();
  },

  methods: {
    async readCategoryList() {
      const { data } = await categoriesCall();
      this.categoryList = data.data;
    },

    async selectCategory(e) {
      this.parentId = Number(e.target.value);
      console.log('categoryId=' + this.category);
    },

    async submitForm() {
      try {
        const payload = {
          categoryName: this.categoryName,
          parentId: this.parentId,
        };

        await createCategoryCall(payload);
        alert(this.categoryName + '추가 됐습니다.');
      } catch (error) {
        alert(error.response.data.message);
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
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-signIn {
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
