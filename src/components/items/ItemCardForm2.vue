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
          :src="findThumbnail()"
          style="width: 500px"
          alt=""
        />
      </div>
      <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" @click="itemDetail">{{
          item.name
        }}</a>
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
          <button class="btn btn-dark mx-1" type="button" @click="addToCart">
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
      return this.item.itemImageList.filter(img => img.thumbnail == true)[0]
        .imageUrl;
    },
    async itemDetail() {
      let itemId = this.$props.item.id;

      await this.$store.dispatch('items/detailAction', itemId);
      await this.$router.push('/items/' + itemId);
    },
    async addToCart() {
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
        if (
          confirm(
            item.name +
              ' (이)가 장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?',
          )
        ) {
          this.$router.push('/carts');
        }
      } catch (e) {
        alert('장바구니 등록에 실패했습니다.');
      }
    },
  },
};
</script>
