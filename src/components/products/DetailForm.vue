<template>
  <div class="container">
    <div class="card shadow">
      <h5 class="card-title">{{ productName }}</h5>
      <img
        class="card-img-top card-image"
        :src="require('@/assets/products/' + img)"
        alt="Card image cap"
      />
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
};
</script>

<style></style>
