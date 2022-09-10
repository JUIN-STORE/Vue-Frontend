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
      <h4 class="card-title2" @click="productDetail(product.id)">
        {{ product.productName }}
      </h4>
      <h5>\ {{ product.price }}</h5>
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
import { getAuthFromCookie, getEmailFromCookie } from '@/utils/cookies';

export default {
  props: ['product'],
  data() {
    return {
      id: 0,
      productName: '',
      price: 0,
      img: '',
    };
  },
  methods: {
    async productDetail() {
      let productId = this.$props.product.id;
      console.log('product.id = ' + productId);

      await this.$store.dispatch('products/detailAction', productId);
      await this.$router.push('/products/' + productId);
    },
    async addToCart() {
      if (getAuthFromCookie() === '') {
        alert('로그인을 해야 추가할 수 있습니다. 로그인 페이지로 이동합니다.');
        await this.$router.push('/accounts/login');
        return;
      }
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
.card-title2:hover {
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
</style>
