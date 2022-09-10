<template>
  <div class="container">
    <div class="card shadow">
      <img :src="require('@/assets/products/' + img)" alt="Card image cap" />
      <h5 class="card-title">{{ productName }}</h5>
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
      productId: this.$store.getters['products/getProduct'].id,
      productName: this.$store.getters['products/getProduct'].productName,
      quantity: this.$store.getters['products/getProduct'].quantity,
      price: this.$store.getters['products/getProduct'].price,
      description: this.$store.getters['products/getProduct'].description,
      img: this.$store.getters['products/getProduct'].productImageList[0]
        .imageName,
    };
  },
  methods: {
    async addToCart() {
      alert(this.product.productName + ' is Added to cart!!');
      const product = {
        id: this.product.id,
        productName: this.product.productName,
        price: this.product.price,
        img: require('@/assets/products/' +
          this.product.productImageList[0].imageName),
      };
      const payload = {
        productId: this.product.id,
        count: 1,
      };
      try {
        this.$store.commit('carts/SET_ITEM', product);
        await this.$store.dispatch('carts/addCartAction', payload);
      } catch (e) {
        await this.$router.push('/accounts/login');
      }
    },
  },
};
</script>

<style></style>
