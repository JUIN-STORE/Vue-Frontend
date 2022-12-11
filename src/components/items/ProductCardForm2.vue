<template>
  <div class="col-lg-4 col-md-6 col-sm-6 pb-1" style="float: left">
    <div class="item-item bg-light mb-4">
      <div
        class="item-img position-relative overflow-hidden"
        style="cursor: pointer"
        @click="itemDetail"
      >
        <img
          class="img-fluid w-100"
          :src="require('@/assets/items/' + findThumbnail())"
          style="width: 500px"
          alt=""
        />
      </div>
      <div class="text-center py-4">
        <a
          class="h6 text-decoration-none text-truncate"
          @click="itemDetail"
          >{{ item.itemName }}</a
        >
        <div class="d-flex align-items-center justify-content-center mt-2">
          <h5>{{ item.price }}</h5>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-3">
          <small class="fa fa-star text-primary mr-1"></small>
          <small class="fa fa-star text-primary mr-1"></small>
          <small class="fa fa-star text-primary mr-1"></small>
          <small class="fa fa-star text-primary mr-1"></small>
          <small class="fa fa-star text-primary mr-1"></small>
          <small>(0)</small>
        </div>
        <div class="btn-group">
          <button class="btn btn-dark mx-1" type="button" @click="addToCart()">
            Add to Cart
            <i class="fa fa-shopping-cart mr-1"></i>
          </button>
          <button class="btn btn-primary mx-1" type="button">
            Buy Now
            <i class="fa fa-dollar-sign mr-1"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthFromCookie, getEmailFromCookie } from '@/utils/cookies';

export default {
  props: ['item'],
  data() {
    return {
      id: 0,
      itemName: '',
      price: 0,
      img: '',
    };
  },
  methods: {
    findThumbnail() {
      console.log(
        this.item.itemImageList.filter(img => img.thumbnail == true)[0]
          .imageName,
      );

      return this.item.itemImageList.filter(
        img => img.thumbnail == true,
      )[0].imageName;
      // 프로젝트 외 이미지를 가져올 때 활성화
      // return require(process.env.VUE_APP_TEST + name);
    },
    async itemDetail() {
      let itemId = this.$props.item.id;
      console.log('item.id = ' + itemId);

      await this.$store.dispatch('items/detailAction', itemId);
      await this.$router.push('/items/' + itemId);
    },
    async addToCart() {
      if (getAuthFromCookie() === '') {
        alert('로그인을 해야 추가할 수 있습니다. 로그인 페이지로 이동합니다.');
        await this.$router.push('/accounts/login');
        return;
      }
      const item = {
        id: this.item.id,
        itemName: this.item.itemName,
        price: this.item.price,
        img: require('@/assets/items/' +
          this.item.itemImageList[0].imageName),
      };
      const payload = {
        itemId: this.item.id,
        count: 1,
      };
      try {
        this.$store.commit('carts/SET_ITEM', item);
        await this.$store.dispatch('carts/addCartAction', payload);
        alert(this.item.itemName + ' is Added to cart!!');
      } catch (e) {
        await this.$router.push('/accounts/login');
      }
    },
  },
};
</script>
