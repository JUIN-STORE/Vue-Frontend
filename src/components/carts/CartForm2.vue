<template>
  <div class="row px-xl-5">
    <div class="col-lg-8 table-responsive mb-5">
      <h5 class="section-title position-relative text-uppercase mb-3">
        <span class="bg-secondary pr-3">Cart </span>
      </h5>
      <table
        class="table table-light table-borderless table-hover text-center mb-0"
      >
        <thead class="thead-dark">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="(item, idx) in this.cart_list" :key="item.itemId">
            <td class="align-middle">
              <router-link :to="`/items/${item.itemId}`" class="text-dark">
                <img :src="makeThumbnail(item)" style="width: 15%" />
                {{ item.itemName }}
              </router-link>
            </td>

            <td class="align-middle">
              <div class="input-group quantity mx-auto" style="width: 100px">
                <div class="input-group-btn">
                  <button
                    class="btn btn-primary btn-minus"
                    @click="minusCount(item.itemId, idx)"
                    style="width: 30px"
                  >
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  readonly
                  class="form-control form-control-sm bg-secondary border-0 text-center"
                  v-model="cartItemList[idx].count"
                />
                <div class="input-group-btn">
                  <button
                    class="btn btn-primary btn-plus"
                    @click="plusCount(item.itemId, idx)"
                    style="width: 30px"
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </td>
            <td class="align-middle">{{ item.price.toLocaleString() }}</td>
            <td class="align-middle">
              {{ (item.count * item.price).toLocaleString() }}
            </td>
            <td class="align-middle" align="center">
              <button
                class="btn btn-sm btn-danger"
                @click="deleteItem(item.itemId)"
              >
                <i class="fa fa-times"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-lg-4">
      <form class="mb-30">
        <div class="mb-30" style="float: right">
          <h5>
            <span class="d-flex mb-3 mt-2">
              <router-link to="/"
                ><i class="fas fa-arrow-left"></i> Back To Shopping
              </router-link>
            </span>
          </h5>
        </div>
      </form>
      <h5 class="section-title position-relative text-uppercase mb-3">
        <span class="bg-secondary pr-3">Cart Summary</span>
      </h5>
      <div class="bg-light p-30 mb-5">
        <div class="pt-2">
          <div class="d-flex justify-content-between mt-2">
            <h5>Total Quantity</h5>
            <h5>{{ totalQuantity.toLocaleString() }}</h5>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <h5>Total Price</h5>
            <h5>{{ totalPrice.toLocaleString() }}</h5>
          </div>
          <router-link to="/carts/buy">
            <button
              class="btn btn-block btn-primary font-weight-bold my-3 py-3"
              @click="buy"
            >
              Buy Now
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { readCall } from '@/api/carts';

export default {
  data() {
    return {
      cartItemList: [],
    };
  },
  created() {
    this.loadCart();
  },

  computed: {
    ...mapState('carts', ['cart_list']),

    computedPrice(count, price) {
      return count * price;
    },

    totalQuantity() {
      let sum = 0;
      this.cart_list.forEach(each => {
        sum = sum + Number(each.count);
      });

      return sum;
    },

    totalPrice() {
      let sum = 0;
      this.cart_list.forEach(each => {
        sum = sum + each.price * each.count;
      });
      return sum;
    },
  },
  methods: {
    ...mapMutations('carts', ['SET_QUANTITY']),
    ...mapMutations('carts', ['DEL_ITEM']),
    ...mapMutations('orders', ['SET_COUNT']),
    ...mapMutations('orders', ['SET_GRAND_TOTAL']),
    ...mapMutations('orders', ['SET_ITEM_ID_LIST']),

    makeThumbnail(item) {
      switch (process.env.NODE_ENV) {
        case 'local':
          return require(`../../assets/items/${item.itemImageName}`);
        case 'production':
          return item.imageUrl;
        default:
          return item.imageUrl;
      }
    },

    async minusCount(itemId, idx) {
      await this.updateCount(itemId, idx, -1);
    },

    async plusCount(itemId, idx) {
      await this.updateCount(itemId, idx, 1);
    },

    async updateCount(itemId, idx, plusValue) {
      let count = this.cartItemList[idx].count + Number(plusValue);

      if (count <= 0 || 100 < count) {
        alert('수량은 1개 ');
        return;
      }

      this.cartItemList[idx].count = count;

      const payload = {
        itemId: itemId,
        count: count,
      };

      await this.$store.dispatch('carts/updateQuantityAction', payload);
    },

    async deleteItem(itemId) {
      if (confirm('해당 상품을 삭제하시겠습니까?')) {
        const payload = {
          itemId: itemId,
        };

        try {
          this.DEL_ITEM(itemId);
          this.cartItemList = this.cart_list;
          this.$store.commit('carts/DEL_ITEM');
          await this.$store.dispatch('carts/clearCartAction', payload);
        } catch (e) {
          console.log(e);
        }
      }
    },

    async buy() {
      let itemList = '';
      this.cartItemList.forEach(each => {
        itemList += each.itemId + ',';
      });

      await this.$store.dispatch('carts/readBuyInfoCartAction', itemList);

      this.setCreateOrderState();
    },

    async loadCart() {
      const { data } = await readCall();
      this.cartItemList = data.data;

      this.$store.commit('carts/SET_CART_LIST', this.cartItemList);
    },

    setCreateOrderState() {
      this.SET_COUNT(this.totalQuantity);
      this.SET_GRAND_TOTAL(this.totalPrice);

      let itemIdList = [];
      this.cartItemList.forEach(each => {
        itemIdList.push(each.itemId);
      });
      this.SET_ITEM_ID_LIST(itemIdList);
    },
  },
};
</script>

<style scoped>
table {
  text-align: center;
}
.card {
  border: none;
}
.cart img {
  width: 70px;
  height: 70px;
}

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
  transform: translate(0, -1px);
}
.card-body {
  margin-top: 0px;
}
.desc {
  max-block-size: 40px;
  overflow: hidden;
}

input {
  border: 1px solid grey;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 4px;
}
tr {
  vertical-align: middle;
}
.no-item {
  margin: auto;
  font-size: 45px;
  text-decoration: none;
}
</style>
