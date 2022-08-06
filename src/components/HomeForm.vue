<template>
  <div class="layout">
    <div class="section2">
      <div class="item3" v-for="product in productList" v-bind:key="product.id">
        <item-card :product="product"></item-card>
      </div>
    </div>
    <div class="page">
      <ul
        class="pagination modal2"
        style="justify-content: center; align-items: center"
      >
        <li>
          <a href="#" class="first" @click.prevent="loadPage(1)">처음 페이지</a>
        </li>
        <li>
          <a
            href="#"
            class="arrow left"
            @click.prevent="loadPage(selectedPage - 1)"
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
            @click.prevent="loadPage(page)"
          >
            {{ page }}
          </a>
        </li>
        <li>
          <a
            href="#"
            class="arrow right"
            @click.prevent="loadPage(selectedPage + 1)"
            >다음</a
          >
        </li>
        <li>
          <a href="#" class="last" @click.prevent="loadPage(pages.length)"
            >마지막 페이지</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { readAllProduct, readCount } from '@/api/products';
import ItemCard from '@/components/products/ItemCard';

export default {
  components: {
    ItemCard,
  },
  data() {
    return {
      // 데이터
      totalData: '',
      productList: [],
      //페이지네이션
      size: 10,
      selectedPage: 1,
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
  async mounted() {
    await this.loadPage(this.selectedPage);
  },
  methods: {
    async count() {
      const { data } = await readCount();
      this.totalData = data;
    },
    /**
     * 페이지 클릭시 호출
     * @param {Number} page [1,2,3...]
     */
    async loadPage(page) {
      this.selectedPage = page;
      const { data } = await readAllProduct(page, this.size);
      this.productList = data.data;
    },
  },
  created() {
    this.count();
    this.loadPage(this.selectedPage - 1);
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
  flex: 0 0 33%;
}
</style>
