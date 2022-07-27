<template>
  <div class="card shadow-sm">
    <img
      class="card-img-top card-image"
      v-if="product.productImageList.length > 0"
      :src="
        require('@/assets/products/' + product.productImageList[0].imageName)
      "
      alt="Card image cap"
    />
    <div class="card-body">
      {{ product.productName }}
      <h5 class="card-title">Rs. &#8377; {{ product.price * 70 }}</h5>
      <p class="card-text desc">{{ product.description }}</p>
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
          Buy Now!<span class="material-symbols-outlined"> shopping_bag </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {};
  },
  methods: {
    addToCart() {
      alert(`${this.product.title} is Added to cart!!`);
      const product = {
        id: this.product.id,
        title: this.product.title,
        img: this.product.image,
        price: this.product.price,
      };
      this.$store.commit('cart/SET_ITEM', product);
      this.$store
        .dispatch('cart/updateCart')
        .then(() => console.log('dispatched methosd'));
    },
  },
};
</script>

<style>
.card-image {
  max-height: 200px;
  padding: 25px;
}
.card-text {
  font-size: 13px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  max-block-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
button {
  display: flex !important;
  justify-content: center;
}
.card:hover {
  transform: translate(0, -5px);
  border: 1px solid black;
}
.card-body {
  margin-top: 0px;
}
.desc {
  max-block-size: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item2 {
  flex: 0 0 33%;
}
</style>
