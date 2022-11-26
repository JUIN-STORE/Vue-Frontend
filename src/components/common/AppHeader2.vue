<template>
  <div>
    <div class="container-fluid header-setting2">
      <div class="row bg-secondary2 py-1 px-xl-5">
        <div class="col-lg-6 d-none d-lg-block">
          <div class="d-inline-flex align-items-center h-100">
            <a class="text-body mr-3" href="">About</a>
            <a class="text-body mr-3" href="">Contact</a>
            <a class="text-body mr-3" href="">Help</a>
            <a class="text-body mr-3" href="">FAQs</a>
          </div>
        </div>
        <div class="col-lg-6 text-lg-right">
          <div class="d-inline-flex align-items-center">
            <a
              class="px-1 ml-2 text-dark"
              v-if="!checkLogin"
              @click="signUp"
              style="cursor: pointer"
            >
              <i class="fas fa-user-plus"> Sign Up</i>
            </a>
            <a
              class="px-1 ml-2 text-dark"
              v-if="!checkLogin"
              @click="login"
              style="cursor: pointer"
            >
              <i class="fas fa-sign-in-alt"> Login</i>
            </a>
            <a
              class="px-1 ml-2 text-dark"
              v-if="checkLogin"
              style="cursor: pointer"
            >
              <i class="fas fa-user"> My Page</i>
            </a>
            <a
              class="px-1 ml-2 text-dark"
              v-if="checkLogin"
              @click="logout"
              style="cursor: pointer"
            >
              <i class="fas fa-sign-out-alt"> Log Out</i>
            </a>
          </div>
          <div class="d-inline-flex align-items-center d-block d-lg-none">
            <a href="" class="btn px-0 ml-2">
              <i class="fas fa-heart text-dark"></i>
              <span
                class="badge text-dark border border-dark rounded-circle"
                style="padding-bottom: 2px"
                >0</span
              >
            </a>
            <a href="" class="btn px-0 ml-2">
              <i class="fas fa-shopping-cart text-dark"></i>
              <span
                class="badge text-dark border border-dark rounded-circle"
                style="padding-bottom: 2px"
                >0</span
              >
            </a>
          </div>
        </div>
      </div>
      <div
        class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex"
      >
        <div class="col-lg-4">
          <a
            onclick="location.href = '/'"
            class="text-decoration-none"
            style="cursor: pointer"
          >
            <span class="h1 text-uppercase text-primary2 bg-dark px-2">JS</span>
            <span class="h1 text-uppercase text-dark bg-primary2 px-2 ml-n1"
              >Shop</span
            >
          </a>
        </div>
        <div class="col-lg-4 col-6 text-left">
          <div class="input-group">
            <input
              id="searchTitle"
              v-on:keyup.enter="searchForm"
              type="text"
              class="form-control"
              placeholder="Search for products"
            />
            <div class="input-group-append" @click="searchForm">
              <span class="input-group-text bg-transparent text-primary2">
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
            class="btn d-flex align-items-center justify-content-between bg-primary2 w-100"
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
            class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
            id="navbar-vertical"
            style="width: calc(100% - 30px); z-index: 999"
          >
            <div class="navbar-nav w-100">
              <div
                v-for="category in categories"
                :key="category"
                class="nav-item dropdown dropend"
              >
                <a
                  class="nav-link"
                  data-bs-toggle="dropdown"
                  @click="searchProductByCategoryId(category.id)"
                  >{{ category.categoryName }}
                  <i class="fa fa-angle-right float-right mt-1"></i
                ></a>
                <div
                  class="inner-category dropdown-menu rounded-0 border-0 m-0"
                >
                  <div
                    v-for="first_child in category.childList"
                    :key="first_child"
                  >
                    <a
                      class="dropdown-item"
                      @click="searchProductByCategoryId(first_child.id)"
                      >{{ first_child.categoryName }}</a
                    >
                    <div
                      v-for="second_child in first_child.childList"
                      :key="second_child"
                      class="submenu dropdown-menu rounded-0 border-0 m-0"
                    >
                      <a
                        class="dropdown-item"
                        @click="searchProductByCategoryId(second_child.id)"
                        >{{ second_child.categoryName }}</a
                      >
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
              <span class="h1 text-uppercase text-dark bg-light px-2">JS</span>
              <span class="h1 text-uppercase text-light bg-primary2 px-2 ml-n1"
                >Shop</span
              >
            </a>
            <button
              type="button"
              class="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div class="navbar-nav mr-auto py-0">
                <a href="index.html" class="nav-item nav-link active">Home</a>
                <a href="shop.html" class="nav-item nav-link">Shop</a>
                <a href="detail.html" class="nav-item nav-link">Shop Detail</a>
                <div class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    >Pages <i class="fa fa-angle-down mt-1"></i
                  ></a>
                  <div class="dropdown-menu bg-primary2 rounded-0 border-0 m-0">
                    <a href="cart.html" class="dropdown-item">Shopping Cart</a>
                    <a href="checkout.html" class="dropdown-item">Checkout</a>
                  </div>
                </div>
                <a href="contact.html" class="nav-item nav-link">Contact</a>
              </div>
              <div class="navbar-nav ml-auto py-0 d-none d-lg-block">
                <a href="" class="btn px-0">
                  <i class="fas fa-heart text-primary2"></i>
                  <span
                    class="badge text-secondary border border-secondary rounded-circle"
                    style="padding-bottom: 2px"
                    >0</span
                  >
                </a>
                <a href="" class="btn px-0 ml-3">
                  <i class="fas fa-shopping-cart text-primary2"></i>
                  <span
                    class="badge text-secondary border border-secondary rounded-circle"
                    style="padding-bottom: 2px"
                    >0</span
                  >
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';
import { categoriesCall } from '@/api/categories';
import { readAllProduct } from '@/api/products';
import $ from 'jquery';

export default {
  data() {
    return {
      categories: [],
    };
  },
  async mounted() {
    await this.getAllCategories();
  },
  computed: {
    checkLogin() {
      return this.$store.getters['accounts/isLogin'];
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
        if (path.includes('/search')) {
          // 현재 페이지가 검색 페이지라면 쿼리 파라미터는 검색 조건입니다
          const searchConditions = query;
          if (Object.keys(searchConditions).length) {
            // 만약 검색조건이 하나라도 존재한다면 해당 값이 현재 검색어와 일치하는지 확인합니다
            if (
              document.getElementById('searchTitle').value !== query.productName
            ) {
              // 만약 다르다면 업데이트 합니다
              document.getElementById('searchTitle').value = query.productName;
              // 검색도 합니다
              this.searchForm();
            }
          }
        }
      },
    },
  },
  updated() {
    $(document).ready(function () {
      function toggleNavbarMethod() {
        if ($(window).width() > 992) {
          // $('.dropdown-toggle').on('click', function () {
          //   alert('hi');
          // });

          $('.navbar .dropend')
            .on('mouseover', function () {
              $('.inner-category', this).show();
            })
            .on('mouseout', function () {
              $('.inner-category', this).hide();
            });
        } else {
          $('.navbar .dropend').off('mouseover').off('mouseout');
        }
      }
      toggleNavbarMethod();
      $(window).resize(toggleNavbarMethod);
    });
  },
  methods: {
    login() {
      this.$router.push('/accounts/login');
    },
    signUp() {
      this.$router.push('/accounts/sign-up');
    },
    logout() {
      this.$store.commit('accounts/CLEAR_COOKIE');
      deleteCookie('email');
      deleteCookie('jwt');
      this.login();
    },
    async searchProductByCategoryId(categoryId) {
      const data = await readAllProduct(categoryId);
      console.log(data.data);
    },
    async getAllCategories() {
      const { data } = await categoriesCall();
      this.categories = data.data;
    },
    async searchForm() {
      let searchTitle = document.getElementById('searchTitle').value;
      console.log('searchForm = ', searchTitle);
      this.$store.commit('products/SET_SEARCH_TITLE', searchTitle);

      // 검색조건은 프로덕트 이름만 사용됩니다
      const searchConditions = { productName: searchTitle };

      // 검색페이지가 아닐때만 이동함
      if (!this.$route.path.startsWith('/products/search')) {
        // 검색 페이지에 있는 않은 경우 - 페이지 이동
        await this.$router.push({
          path: '/products/search',
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

document.addEventListener('DOMContentLoaded', function () {
  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {
    // close all inner dropdowns when parent is closed
    document
      .querySelectorAll('.navbar .dropdown')
      .forEach(function (everydropdown) {
        everydropdown.addEventListener('hidden.bs.dropdown', function () {
          // after dropdown is hidden, then find all submenus
          this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
            // hide every submenu as well
            everysubmenu.style.display = 'none';
          });
        });
      });

    document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
      element.addEventListener('click', function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains('submenu')) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault();
          if (nextEl.style.display == 'block') {
            nextEl.style.display = 'none';
          } else {
            nextEl.style.display = 'block';
          }
        }
      });
    });
  }
  // end if innerWidth
});
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css';

/* ============ desktop view ============ */
@media all and (min-width: 992px) {
  .dropdown-menu li {
    position: relative;
  }
  .nav-item .submenu {
    display: none;
    position: absolute;
    left: 100%;
    top: 0px;
  }
  .nav-item .submenu-left {
    right: 100%;
    left: auto;
  }
  .dropdown-menu > li:hover {
    background-color: #f1f1f1;
  }
  .dropdown-menu > div:hover > .submenu {
    display: block;
  }
}
/* ============ desktop view .end// ============ */

/* ============ small devices ============ */
@media (max-width: 991px) {
  .dropdown-menu .dropdown-menu {
    margin-left: 0.7rem;
    margin-right: 0.7rem;
    margin-bottom: 0.5rem;
  }
}
</style>
