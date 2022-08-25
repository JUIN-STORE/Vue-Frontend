<!--주문 상품 확인-->

<template>
  <div class="container">
    <span class="d-flex mb-3 mt-2" />
    <div class="hc vc">주문 상품 확인</div>
    <table class="table cart">
      <thead>
        <tr>
          <th scope="col" class="w-10">Product ID</th>
          <th scope="col" class="w-50">Product</th>
          <th scope="col" class="w-10">Quantity</th>
          <th scope="col" class="w-10">Price</th>
          <th scope="col" class="w-20"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cartProductList" :key="product.productId">
          <td>{{ product.productId }}</td>
          <td class="d-flex">
            <img
              :src="
                require('@/assets/products/' +
                  product.productImageList[0].imageName)
              "
            />
            <span> {{ product.productName }}</span>
          </td>
          <td>
            <input
              v-model="product.count"
              type="number"
              @change="onChange(product.productId, $event)"
              size="4"
              min="1"
              max="100"
            />
          </td>
          <td>
            <span>\ {{ product.price }}</span>
          </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>TOTAL Quantity: {{ totalQuantity }}</td>
          <td>TOTAL PRICE: &#8361;{{ totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { readCall } from '@/api/carts';

export default {
  data() {
    return {
      cartProductList: [],
    };
  },
  created() {
    this.loadCart();
  },

  computed: {
    ...mapState('carts', ['cart_list']),

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

    async onChange(productId, e) {
      const value = e.target.value;

      const payload = {
        productId: productId,
        count: value,
      };

      if (value > 0 && value <= 100) {
        await this.$store.dispatch('carts/updateQuantityAction', payload);
      } else {
        alert('invalid input');
      }
    },

    async deleteItem(productId) {
      const payload = {
        productId: productId,
      };

      try {
        this.DEL_ITEM(productId);
        this.cartProductList = this.cart_list;
        this.$store.commit('cart/DEL_ITEM');
        await this.$store.dispatch('carts/clearCartAction', payload);
      } catch (e) {
        console.log(e);
      }
    },

    async buy() {
      let productList = '';
      this.cartProductList.forEach(each => {
        productList += each.productId + ',';
      });

      await this.$store.dispatch('carts/readBuyInfoCartAction', productList);
    },

    async loadCart() {
      const { data } = await readCall();
      for (let i = 0; i < data.data.length; i++) {
        this.cartProductList.push(data.data[i]);
      }
      let result = data.data;

      this.cartProductList = result;
      return result;
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

.hc {
  width: 200px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
} /* 가로 중앙 정렬 */
.vc {
  height: 40px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
} /* 세로 중앙 정렬 */
</style>
