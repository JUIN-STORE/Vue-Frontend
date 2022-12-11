<template>
  <div class="container">
    <div class="card shadow">
      <img :src="require('@/assets/items/' + img)" alt="Card image cap" />
      <h5 class="card-title">{{ name }}</h5>
      <div class="card-body">
        <h5 class="card-title">\ {{ price }}</h5>
        <p class="card-text desc">{{ description }}</p>
        <div class="d-flex" style="justify-content: space-around">
          <button
            class="btn btn-warning btn-text"
            type="button"
            @click="addToCart()"
          >
            Add to Cart!
            <span class="material-symbols-outlined"> add_shopping_cart </span>
          </button>
          <button class="btn btn-primary" type="button">
            Buy Now!<span class="material-symbols-outlined">
              shopping_bag
            </span>
          </button>
        </div>
      </div>
    </div>
    <router-link to="/">
      <span class="material-symbols-outlined"> arrow_back </span> Back To
      Shopping
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: this.$store.getters['items/getItem'].id,
      name: this.$store.getters['items/getItem'].name,
      quantity: this.$store.getters['items/getItem'].quantity,
      price: this.$store.getters['items/getItem'].price,
      description: this.$store.getters['items/getItem'].description,
      img: this.$store.getters['items/getItem'].itemImageList[0].imageName,
    };
  },
  methods: {
    async addToCart() {
      alert(this.item.name + ' is Added to cart!!');
      const item = {
        id: this.item.id,
        name: this.item.name,
        price: this.item.price,
        img: require('@/assets/items/' + this.item.itemImageList[0].imageName),
      };
      const payload = {
        itemId: this.item.id,
        count: 1,
      };
      try {
        this.$store.commit('carts/SET_ITEM', item);
        await this.$store.dispatch('carts/addCartAction', payload);
      } catch (e) {
        await this.$router.push('/accounts/login');
      }
    },
  },
};
</script>

<style></style>
