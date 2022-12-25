<template>
  <div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <a class="breadcrumb-item text-dark" href="#">Home</a>
            <a class="breadcrumb-item text-dark" href="#">Shop</a>
            <span class="breadcrumb-item active">Shop List</span>
          </nav>
        </div>
      </div>
    </div>
    <div class="container-fluid col-10">
      <div class="item3" v-for="item in itemList" v-bind:key="item.id">
        <search-item-form :item="item"></search-item-form>
      </div>
    </div>
    <div class="page" style="clear: both">
      <ul
        class="pagination modal2"
        style="justify-content: center; align-items: center"
      >
        <li>
          <a href="#" class="first" @click.prevent="searchPage(1)"
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
            :class="{ active: page == selectedPage }"
            @click.prevent="searchPage(page)"
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
          <a href="#" class="last" @click.prevent="searchPage(totalPages)"
            >마지막 페이지</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AllItemForm from '@/components/items/ItemCardForm2';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SearchItemForm: AllItemForm,
  },
  data() {
    return {
      // 전체 페이지 개수
      totalPages: 0,
      // 하단에 보여질 페이지 최대 개수
      pageSet: 10,
      itemList: [],
      // 아이템 개수
      size: 10,
      // 프론트 화면 상 페이지 숫자
      selectedPage: 1,
    };
  },
  computed: {
    /**
     * [1,2,3...pages] 배열을 생성하는 메서드
     */
    pages() {
      // 페이지 계산
      // 시작 페이지
      const start =
        this.selectedPage - ((this.selectedPage - 1) % this.pageSet);
      const length =
        start + this.pageSet <= this.totalPages
          ? this.pageSet
          : this.totalPages - start + 1;

      const pages = [...Array(length).keys()].map(key => key + start);

      // 페이지가 1보다 크면 [1,,,pages] 배열을, 작으면 [1] 반환
      return pages.length > 0 ? pages : [1];
    },
  },
  watch: {
    // 현재 페이지 추적
    '$route.path': {
      immediate: true,
      handler(path) {
        // 현재 쿼리를 추출합니다.
        const query = this.$route.query;

        // 현재 페이지를 검사합니다.
        if (path.includes('/items/search')) {
          // 현재 페이지가 검색 페이지라면 쿼리 파라미터는 검색 조건입니다
          if (query.page > 0) {
            this.searchPage(query.page);
          }
        }
      },
    },
  },
  methods: {
    /**
     * 페이지 클릭시 호출
     * @param {Number} page [1,2,3...]
     */
    async searchPage(page) {
      if (1 > page) return;
      this.selectedPage = page;
      const searchTitle = this.$store.getters['items/getSearchTitle'];

      const payload = {
        p: this.selectedPage - 1,
        s: this.size,
        st: searchTitle,
      };

      const data = await this.$store.dispatch('items/searchAction', payload);
      this.itemList = data.content;
      this.totalPages = data.totalPages;

      const searchConditions = {
        name: searchTitle,
        page: this.selectedPage,
      };

      if (!this.$route.path.startsWith('/items/search')) {
        await this.$router.push({
          path: '/items/search',
          query: searchConditions,
        });
      } else {
        const query = new URLSearchParams(searchConditions).toString();
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
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
