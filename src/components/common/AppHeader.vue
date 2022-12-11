<template>
  <nav class="navbar">
    <i class="material-icons menu-icon">MENU</i>
    <div class="logo">
      <div class="text" onclick="location.href='/'" style="cursor: pointer">
        JS-SHOP
      </div>
    </div>
    <div class="item search right" tabindex="0">
      <div class="search-group">
        <input
          v-on:keyup.enter="searchForm()"
          id="searchTitle"
          type="text"
          class="input-group-text"
          placeholder="상품을 검색하세요."
        />
      </div>
    </div>

    <div class="item">
      <div class="group">
        <router-link to="/carts">
          <i class="material-icons" v-if="checkLogin"> shopping_cart </i>
        </router-link>

        <div class="detail">
          <button class="action-btn" v-if="!checkLogin" @click="login()">
            LOG-IN
          </button>
        </div>
        <router-link to="/accounts/profile">
          <i class="material-icons action-btn" v-if="checkLogin">
            account_circle
          </i>
        </router-link>
        <router-link to="/">
          <!-- 주문정보조회용 -->
          <i class="material-icons action-btn" v-if="checkLogin">
            delivery_dining_sharp
          </i>
        </router-link>
      </div>
    </div>

    <button class="action-btn" v-if="checkLogin" @click="logout()">
      LOG-OUT
    </button>
  </nav>
</template>

<script>
import { deleteCookie } from '@/utils/cookies';

export default {
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
              document.getElementById('searchTitle').value !== query.itemName
            ) {
              // 만약 다르다면 업데이트 합니다
              document.getElementById('searchTitle').value = query.itemName;
              // 검색도 합니다
              this.searchForm();
            }
          }
        }
      },
    },
  },
  methods: {
    login() {
      this.$router.push('/accounts/login');
    },
    logout() {
      this.$store.commit('accounts/CLEAR_COOKIE');
      deleteCookie('email');
      deleteCookie('jwt');
      this.login();
    },
    async searchForm() {
      let searchTitle = document.getElementById('searchTitle').value;
      console.log('searchForm = ', searchTitle);
      this.$store.commit('items/SET_SEARCH_TITLE', searchTitle);

      // 검색조건은 프로덕트 이름만 사용됩니다
      const searchConditions = { itemName: searchTitle };

      // 검색페이지가 아닐때만 이동함
      if (!this.$route.path.startsWith('/items/search')) {
        // 검색 페이지에 있는 않은 경우 - 페이지 이동
        await this.$router.push({
          path: '/items/search',
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
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
:root {
  --theme-bg-color: #9ab9f3;
  --theme-color: rgb(0, 0, 0);
}
* {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  box-shadow: 0 0 2px 0 grey;
  align-items: center;
  font-size: 1em;

  background-color: #3761af;
  background-color: var(--theme-bg-color);

  color: white;
  color: var(--theme-color);
}

.item {
  padding: 10px;
  text-decoration: none;
  color: white;
  color: var(--theme-color);
}

.item.right {
  margin: 0 0 0 auto;
}

.navbar .logo {
  font-size: 1.2em;
  align-items: center;
  display: flex;
}

.logo img {
  max-width: 40px;
}
.logo .text {
  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
}
.item.search {
  transition: 0.2s linear;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.item.search .search-icon {
  border-left: 1px solid grey;
  margin: 2px;
  padding-left: 10px;
  cursor: pointer;
  color: grey;
}
.item.search .search-icon:hover {
  color: black;
}

.item.search input {
  width: 100%;
  padding: 6px;
  outline: none;
  border: 2px solid grey;
  max-width: 100%;
  border: 0;
}

.item .search-group {
  display: flex;
  width: 100%;
  max-width: 700px;
  border-radius: 20px;
  overflow: hidden;
}
.item .search-group select {
  border: 0;
  margin: 2px;
  border-right: 1px solid grey;
  max-width: 5em;
  outline: none;
  color: grey;
}

.item .group {
  display: flex;
  align-items: center;
  font-size: 1em;
}

.item .group .sub {
  font-size: 0.8em;
}

.material-icons {
  font-size: 1.8rem;
}

.menu-icon {
  display: none;
}

@media (max-width: 700px) {
  .item.search input {
    display: none;
  }
  .menu-icon {
    display: block;
  }
  .detail,
  .logo .text {
    display: none;
  }
}

.action-btn {
  background-color: transparent;
  border: none;
}
</style>
