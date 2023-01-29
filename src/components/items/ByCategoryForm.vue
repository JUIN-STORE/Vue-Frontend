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
      <div class="col-12">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: isFirst }">
              <a
                class="page-link text-primary2"
                @click="updateSelectedPage(selectedPage - 1)"
                >Previous</a
              >
            </li>
            <li
              class="page-item"
              v-for="n in this.pageList"
              v-bind:key="n"
              :class="{ active: n === selectedPage }"
            >
              <a
                class="page-link text-primary2"
                @click.prevent="updateSelectedPage(n)"
                style="cursor: pointer; width: 3em"
                >{{ n }}</a
              >
            </li>
            <li class="page-item" :class="{ disabled: isLast }">
              <a
                class="page-link text-primary2"
                @click.prevent="updateSelectedPage(selectedPage + 1)"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
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
      // 데이터
      itemList: [],
      // 페이지네이션
      isFirst: true,
      isLast: true,
      size: 1, // 한 번에 가져올 아이템 개수,
      selectedPage: 1, // 현재 선택된 페이지
      totalPages: 0, // 아이템 전체 페이지 수
      pageListSize: 10, // 아래 표시할 페이지 수
    };
  },
  computed: {
    /**
     * [1,2,3...pages] 배열을 생성하는 메서드
     */
    pageList() {
      // 전체 페이지 수가 정해진 페이지 사이즈보다 작거나 같은 경우
      if (this.totalPages <= this.pageListSize) {
        return Array(this.totalPages)
          .fill(1)
          .map((n, idx) => n + idx);
      }

      // 전체 페이지 수가 정해진 페이지 사이즈보다 큰 경우
      const sizeForCalculate =
        this.pageListSize % 2 == 0 ? this.pageListSize : this.pageListSize + 1;

      let startPage;
      let pageListSize;

      if (this.selectedPage - sizeForCalculate / 2 <= 0) {
        // 첫 부분에 가까울 때
        startPage = 1;
      } else if (
        // 끝쪽일 때
        this.totalPages - this.selectedPage <
        sizeForCalculate / 2
      ) {
        startPage = this.totalPages - this.pageListSize + 1;
      } else {
        // 중간일 때
        startPage = this.selectedPage - sizeForCalculate / 2 + 1;
      }

      // 끝 페이지로 갈수록 페이지 수가 줄어들도록 하기
      if (startPage + this.pageListSize > this.totalPages) {
        pageListSize = this.totalPages - startPage + 1;
      } else {
        pageListSize = this.pageListSize;
      }

      return Array(pageListSize)
        .fill(startPage)
        .map((n, idx) => n + idx);
    },

    searchConditions() {
      const categoryId = this.$store.getters['items/getCategoryId'];
      const page = this.selectedPage;
      return { categoryId, page };
    },
  },
  watch: {
    searchConditions: {
      immediate: true,
      deep: true, // searchConditions 는 객체이므로
      handler() {
        const query = this.$route.query;

        if (
          query.page !== undefined &&
          query.page > 0 &&
          this.selectedPage !== Number(query.page)
        ) {
          this.selectedPage = Number(query.page);
          this.searchConditions.page = this.selectedPage;
        }
        this.searchPage(this.selectedPage - 1);
      },
    },
  },
  methods: {
    /**
     * 페이지 클릭시 호출
     * @param {Number} page [1,2,3...]
     */
    async updateSelectedPage(inputPage) {
      this.selectedPage = inputPage;

      if (inputPage > 0) {
        const page = this.selectedPage;
        const categoryId = this.searchConditions.categoryId;

        this.searchConditions = {
          page: page,
          categoryId: categoryId,
        };

        await this.$router.push({
          query: this.searchConditions,
        });
      }
    },

    async searchPage(inputPage) {
      const payload = {
        p: inputPage,
        s: this.size,
        ci: this.$store.getters['items/getCategoryId'],
      };

      const data = await this.$store.dispatch(
        'items/byCategoryAction',
        payload,
      );

      this.itemList = data.content;

      this.itemList = data.content;
      this.isFirst = data.first;
      this.isLast = data.last;
      this.size = data.size;
      this.totalPages = data.totalPages;
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
