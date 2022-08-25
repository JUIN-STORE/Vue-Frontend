<template>
  <div class="layout">
    <div class="section2">
      <div class="item3" v-for="product in productList" v-bind:key="product.id">
        <search-product-form :product="product"></search-product-form>
      </div>
    </div>
    <div class="page">
      <ul
        class="pagination modal2"
        style="justify-content: center; align-items: center"
      >
        <li>
          <a href="#" class="first" @click.prevent="searchPage(0)"
            >처음 페이지</a
          >
        </li>
        <li>
          <a
            href="#"
            class="arrow left"
            @click.prevent="searchPage(selectedPage - 1)"
            >이전</a
          >
        </li>
        <li>
          <a
            v-for="(page, idx) in pages"
            :key="idx"
            href="#"
            class="num"
            :class="{ active: page - 1 === selectedPage }"
            @click.prevent="searchPage(page - 1)"
          >
            {{ page }}
          </a>
        </li>
        <li>
          <a
            href="#"
            class="arrow right"
            @click.prevent="searchPage(selectedPage + 1)"
            >다음</a
          >
        </li>
        <li>
          <a href="#" class="last" @click.prevent="searchPage(pages.length - 1)"
            >마지막 페이지</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { searchCountCall } from '@/api/products';
import AllProductForm from '@/components/products/ProductCardForm';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SearchProductForm: AllProductForm,
  },
  data() {
    return {
      // 데이터
      totalData: '',
      productList: [],
      //페이지네이션
      size: 10,
      selectedPage: 1,
      componentKey: 0,
    };
  },
  computed: {
    /**
     * [1,2,3...pages] 배열을 생성하는 메서드
     */
    pages() {
      // 페이지 계산
      const pages = Math.ceil(this.totalData / this.size);

      // 페이지가 1보다 크면 [1,,,pages] 배열을, 작으면 [1] 반환
      return pages > 1 ? Array.from({ length: pages }, (_, i) => i + 1) : [1];
    },
  },
  async renderTriggered() {
    await this.searchCount();
    await this.searchPage(this.selectedPage - 1);
    console.log(this.totalData);
  },
  methods: {
    async searchCount() {
      let searchTitle = this.$store.getters['products/getSearchTitle'];
      const { data } = await searchCountCall(searchTitle);
      this.totalData = data;
    },
    /**
     * 페이지 클릭시 호출
     * @param {Number} page [1,2,3...]
     */
    async searchPage(page) {
      if (0 > page || this.pages.length - 1 < page) return;
      this.selectedPage = page;

      console.log('productList = ' + this.productList.length);

      const payload = {
        p: page,
        s: this.size,
        st: this.$store.getters['products/getSearchTitle'],
      };

      this.productList = await this.$store.dispatch(
        'products/searchAction',
        payload,
      );
      // const { data } = await searchCall(page, this.size, this.searchTitle);
      // this.productList = data.data;
      // console.log(this.productList);
    },
  },
};
</script>

<style>
.layout2 {
  display: grid;
  gap: 1.5rem;
  grid-template-areas: 'section1 section2';
  grid-template-columns: 1fr 5fr;
}

.section2 {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}
.card {
  flex: 0 0 30%;
  margin: 10px;
}

.sidebar-title {
  text-align: center;
  font-size: 20px;
  margin-top: 25px;
  font-weight: bold;
}

.section1 > ul {
  list-style-type: none;
  text-align: center;
}

.section1 > ul:hover {
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
}
.section1 > ul {
  border: 1px solid rgb(168, 165, 165);
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
}
.page {
  text-align: center;
}
.pagination {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin-top: 20px;
}
.pagination li {
  display: inline;
  text-align: center;
}
.pagination a {
  float: left;
  display: block;
  font-size: 14px;
  text-decoration: none;
  padding: 5px 12px;
  color: #96a0ad;
  line-height: 1.5;
}
.first {
  margin-right: 15px;
}
.last {
  margin-left: 15px;
}
.first:hover,
.last:hover,
.left:hover,
.right:hover {
  color: #2e9cdf;
}
.pagination a.active {
  cursor: default;
  color: #ffffff;
}
.pagination a:active {
  outline: none;
}
.modal2 .num {
  margin-left: 3px;
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
}
.modal2 .num:hover {
  background-color: #2e9cdf;
  color: #ffffff;
}
.modal2 .num.active,
.modal2 .num:active {
  background-color: #2e9cdf;
  cursor: pointer;
}
.arrow-left {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid blue;
}

.item3 {
  flex: 0 0 20%;
}
</style>
