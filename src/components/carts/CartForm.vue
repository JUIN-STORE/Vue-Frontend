<template>
  <div class="container">
    <span class="d-flex mb-3 mt-2">
      <router-link to="/">
        <span class="material-symbols-outlined"> arrow_back </span>
        Back To Shopping
      </router-link>
    </span>
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
            <img :src="product.img" />
            <span> {{ product.productName }}</span>
          </td>
          <td>
            <input
              type="number"
              name=""
              id=""
              @change="onChange(product.productId, $event)"
              :value="product.count"
              size="4"
              min="1"
              max="10"
            />
          </td>
          <td>
            <span>\ {{ product.price }}</span>
          </td>
          <td>
            <button
              class="btn btn-danger"
              @click="deleteItem(product.productId)"
            >
              <span class="material-symbols-outlined"> DELETE </span>
            </button>
          </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>TOTAL Quantity: {{ totalCount }}</td>
          <td>TOTAL PRICE: \{{ totalPrice }}</td>
          <td>
            <button class="btn btn-success">Buy Now</button>
          </td>
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
    // this.cartProductList = this.cart;
  },
  computed: {
    ...mapState('cart', ['cart_list']),

    totalCount() {
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
    ...mapMutations('cart', ['SET_QUANTITY']),
    ...mapMutations('cart', ['DEL_ITEM']),

    onChange(productId, e) {
      const count = e.target.value;
      const payload = {
        productId: productId,
        count: count,
      };

      if (count > 0 && count <= 10) {
        const arr = [productId, count];
        this.SET_QUANTITY(arr);
        console.log('completed');

        this.$store.dispatch('cart/updateQuantity', payload);
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
        this.$store.commit('cart/RESET_STATE');
        await this.$store.dispatch('cart/clearCartAction', payload);
      } catch (e) {
        console.log(e);
      }
    },

    async loadCart() {
      const { data } = await readCall();
      for (let i = 0; i < data.data.length; i++) {
        this.cartProductList.push(data.data[i]);
      }
      return data.data;
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
