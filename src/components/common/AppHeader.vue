<template>
  <div>
    <div class="container-fluid header-setting2">
      <div class="row bg-secondary2 py-1 px-xl-5">
        <div class="col-lg-6 d-none d-lg-block"></div>
        <div class="col-lg-6 text-lg-right">
          <div class="d-inline-flex align-items-center">
            <a
              class="px-1 ml-2 text-dark"
              v-if="!checkSignIn"
              @click="signUp"
              style="cursor: pointer"
            >
              <i class="fas fa-user-plus"> Sign Up</i>
            </a>
            <a
              class="px-1 ml-2 text-dark"
              v-if="!checkSignIn"
              @click="signIn"
              style="cursor: pointer"
            >
              <i class="fas fa-sign-in-alt"> Sign In</i>
            </a>
            <a
              class="px-1 ml-2 text-dark"
              v-if="checkSignIn"
              style="cursor: pointer"
            >
              <router-link to="/accounts/profile">
                <i class="fas fa-user text-dark"> My Page</i>
              </router-link>
            </a>
            <a
              class="px-1 ml-2 text-dark"
              v-if="checkSignIn"
              @click="logout"
              style="cursor: pointer"
            >
              <i class="fas fa-sign-out-alt"> Log Out</i>
            </a>
          </div>
          <div
            class="d-inline-flex align-items-center d-block d-lg-none"
            style="float: right"
          >
            <router-link to="/carts" class="pl-2">
              <i class="fas fa-solid fa-shopping-cart text-dark px-1"></i>
              <span
                class="badge text-dark border border-dark rounded-circle"
                style="padding-bottom: 2px"
                >{{ this.cartCount }}</span
              >
            </router-link>
            <router-link to="/orders/info" class="pl-2">
              <i class="fas fa-solid fa-file-invoice-dollar text-dark px-1"></i>
              <span
                class="badge text-dark border border-dark rounded-circle"
                style="padding-bottom: 2px"
                >0</span
              >
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex"
      >
        <div class="col-lg-3">
          <a
            onclick="location.href = '/'"
            class="text-decoration-none"
            style="cursor: pointer"
          >
            <span class="h1 text-uppercase text-primary bg-dark px-2"
              >JUIN</span
            >
            <span class="h1 text-uppercase text-dark bg-primary px-2"
              >STORE</span
            >
          </a>
        </div>
        <div class="col-lg-6">
          <div class="input-group">
            <input
              id="searchTitle"
              v-on:keyup.enter="searchItemByName"
              type="text"
              class="form-control"
              placeholder="Search for items"
              style="font-weight: bold"
            />
            <div
              class="input-group-append bg-primary"
              @click="searchItemByName"
            >
              <span class="input-group-text bg-transparent">
                <i class="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid bg-dark mb-30">
      <div class="row px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
          <a
            class="btn d-flex align-items-center justify-content-between bg-primary w-100"
            data-bs-toggle="collapse"
            href="#navbar-vertical"
            style="height: 65px; padding: 0 30px"
          >
            <h6 class="text-dark m-0">
              <i class="fa fa-bars mr-2"></i>Categories
            </h6>
            <i class="fa fa-angle-down text-dark"></i>
          </a>
          <nav
            class="collapse position-absolute navbar-vertical navbar-light p-0 bg-light"
            id="navbar-vertical"
            style="width: calc(100% - 30px); z-index: 999"
          >
            <div class="w-100">
              <div
                v-for="category in categories"
                :key="category"
                class="dropend"
              >
                <a
                  class="nav-link"
                  data-bs-toggle="dropdown"
                  @click="searchItemByCategoryId(category.id)"
                  style="cursor: pointer"
                  >{{ category.categoryName }}
                  <i class="fa fa-angle-right float-right"></i
                ></a>
                <div class="child-menu rounded-0 border-0 m-0 w-100">
                  <div
                    v-for="first_child in category.childList"
                    :key="first_child"
                    class="dropend"
                  >
                    <a
                      class="nav-link"
                      @click="searchItemByCategoryId(first_child.id)"
                      style="cursor: pointer"
                      >{{ first_child.categoryName }}
                      <i
                        v-if="first_child.childList.length > 0"
                        class="fa fa-angle-right float-right"
                      ></i
                    ></a>
                    <div class="child-menu rounded-0 border-0 m-0 w-100">
                      <div
                        v-for="second_child in first_child.childList"
                        :key="second_child"
                        class="dropend"
                      >
                        <a
                          class="nav-link"
                          @click="searchItemByCategoryId(second_child.id)"
                          style="cursor: pointer"
                          >{{ second_child.categoryName }}</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="col-lg-9">
          <nav
            class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0"
          >
            <a href="" class="text-decoration-none d-block d-lg-none">
              <span class="h1 text-uppercase text-dark bg-light px-2"
                >JUIN</span
              >
              <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1"
                >STORE</span
              >
            </a>
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div class="navbar-nav mr-auto py-0">
                <a href="http://pc.juin.store" class="nav-item nav-link active"
                  >내 퍼스널 컬러는?</a
                >
              </div>
              <div
                class="navbar-nav ml-auto py-0 d-lg-block d-none"
                style="margin-top: 12px"
              >
                <router-link to="/carts" class="pl-2">
                  <i
                    class="fas fa-solid fa-shopping-cart text-primary px-1"
                  ></i>
                  <span
                    class="badge text-secondary border border-secondary rounded-circle"
                    >{{ this.cartCount }}</span
                  >
                </router-link>
                <router-link to="/orders/info" class="pl-2">
                  <i
                    class="fas fa-solid fa-file-invoice-dollar text-primary px-1"
                  ></i>
                  <span
                    class="badge text-secondary border border-secondary rounded-circle"
                    >0</span
                  >
                </router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
~
<script>
import { categoriesCall } from '@/api/categories';
import { logoutCall } from '@/api/accounts';

export default {
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    await this.getAllCategories();
    await this.$store.dispatch('carts/updateCartCountAction');
  },
  computed: {
    checkSignIn() {
      return this.$store.getters['accounts/isSignIn'];
    },
    cartCount() {
      return this.$store.getters['carts/getCount'];
    },
  },
  watch: {
    // 현재 페이지 추적
    '$route.path': {
      immediate: true,
      handler(path) {
        if (path.includes('/items')) {
          // 현재 페이지가 검색 페이지라면 쿼리 파라미터는 검색 조건입니다
          const query = this.$route.query;

          if (query.personalColor != undefined) {
            this.$store.commit('items/SET_CATEGORY_ID', null);
            this.$store.commit('items/SET_SEARCH_TITLE', null);
            this.$store.commit('items/SET_PERSONAL_COLOR', query.personalColor);
          } else {
            if (
              document.getElementById('searchTitle').value !== query.name &&
              query.name
            ) {
              // 만약 다르다면 업데이트 합니다
              document.getElementById('searchTitle').value = query.name;
            }
          }
          // 검색도 합니다.
          this.searchForm();
        }
      },
    },
  },
  methods: {
    signIn() {
      this.$router.push('/accounts/sign-in');
    },
    signUp() {
      this.$router.push('/accounts/sign-up');
    },
    async logout() {
      await logoutCall();
      this.$store.commit('accounts/CLEAR_COOKIE');
      alert('로그아웃되었습니다');
      this.signIn();
    },
    async getAllCategories() {
      const { data } = await categoriesCall();
      this.categories = data.data;
    },
    async searchItemByCategoryId(ci) {
      // 카테고리 클릭했을 때는 특정 카테고리의 상품만 나오도록 한다.
      this.$store.commit('items/SET_CATEGORY_ID', ci);
      this.$store.commit('items/SET_SEARCH_TITLE', null);
      this.$store.commit('items/SET_PERSONAL_COLOR', null);
      document.getElementById('searchTitle').value = null;

      const byCategoryConditions = { categoryId: ci };

      if (!this.$route.path.startsWith('/items?')) {
        await this.$router.push({
          path: '/items',
          query: byCategoryConditions,
        });
      } else {
        const query = new URLSearchParams(byCategoryConditions).toString();
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
    async searchItemByName() {
      let searchTitle = document.getElementById('searchTitle').value;
      this.$store.commit('items/SET_PERSONAL_COLOR', null);
      this.$store.commit('items/SET_SEARCH_TITLE', searchTitle);

      const searchConditions = {};
      const categoryId = this.$store.getters['items/getCategoryId'];

      searchConditions.name = searchTitle;
      if (categoryId) searchConditions.categoryId = categoryId;

      // 검색페이지가 아닐때만 이동함
      if (!this.$route.path.startsWith('/items')) {
        // 검색 페이지에 있는 않은 경우 - 페이지 이동
        await this.$router.push({
          path: '/items',
          query: searchConditions,
        });
      } else {
        // 검색 페이지에 있는 경우 - 쿼리 파라미터만 수정
        const query = new URLSearchParams(searchConditions).toString();
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
    async searchForm() {
      // 검색조건은 프로덕트 이름만 사용됩니다
      const searchConditions = {};

      const name = this.$store.getters['items/getSearchTitle'];
      const categoryId = this.$store.getters['items/getCategoryId'];
      const personalColor = this.$store.getters['items/getPersonalColor'];

      if (name) searchConditions.name = name;
      if (categoryId) searchConditions.categoryId = categoryId;
      if (personalColor) searchConditions.personalColor = personalColor;

      // 검색페이지가 아닐때만 이동함
      if (!this.$route.path.startsWith('/items')) {
        // 검색 페이지에 있는 않은 경우 - 페이지 이동
        await this.$router.push({
          path: '/items',
          query: searchConditions,
        });
      } else {
        // 검색 페이지에 있는 경우 - 쿼리 파라미터만 수정
        const query = new URLSearchParams(searchConditions).toString();
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
  },
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css';

/* ============ desktop view ============ */
@media all and (min-width: 992px) {
  .dropend .child-menu {
    display: none;
    position: absolute;
    left: 100%;
    top: 0px;
    background-color: white;
  }

  .dropend:hover > .child-menu {
    display: block;
  }

  .dropend:hover {
    background-color: #f5f5f5;
  }
}
</style>
