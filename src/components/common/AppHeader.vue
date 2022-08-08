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
        <input type="text" />
        <i class="material-icons search-icon"> search </i>
      </div>
    </div>

    <div class="item">
      <div class="group">
        <router-link to="/carts">
          <i class="material-icons" v-if="checkLogin"> shopping_cart </i>
        </router-link>

        <div class="detail">
          <button class="action-btn" v-if="!checkLogin" @click="login()">
            LON-IN
          </button>
        </div>
        <router-link to="/profile">
          <i class="material-icons action-btn" v-if="checkLogin">
            account_circle
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
  methods: {
    login() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.commit('accounts/clearCookie');
      deleteCookie('email');
      deleteCookie('jwt');
      this.login();
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
  border: 2px solid grey;
  overflow: hidden;
  background: white;

  border-color: white;
  color: var(--theme-color);
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
