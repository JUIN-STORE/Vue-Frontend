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
          <th scope="col" class="w-10">Item ID</th>
          <th scope="col" class="w-50">Item</th>
          <th scope="col" class="w-10">Quantity</th>
          <th scope="col" class="w-10">Price</th>
          <th scope="col" class="w-20"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItemList" :key="item.itemId">
          <td>{{ item.itemId }}</td>
          <td class="d-flex">
            <img :src="require('@/assets/items/' + item.imageName)" />
            <span> {{ item.itemName }}</span>
          </td>
          <td>
            <input
              v-model="item.count"
              type="number"
              @change="onChange(item.itemId, $event)"
              size="4"
              min="1"
              max="100"
            />
          </td>
          <td>
            <span>\ {{ item.price }}</span>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteItem(item.itemId)">
              <span class="material-symbols-outlined"> DELETE </span>
            </button>
          </td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td>TOTAL Quantity: {{ totalQuantity }}</td>
          <td>TOTAL PRICE: &#8361;{{ totalPrice }}</td>
          <td>
            <router-link to="/carts/buy">
              <button class="btn btn-success" @click="buy()">Buy Now</button>
            </router-link>
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
      cartItemList: [],
    };
  },
  created() {
    this.loadCart();
    console.log('아니 왜', this.cart_list);
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
    ...mapMutations('orders', ['SET_COUNT']),
    ...mapMutations('orders', ['SET_GRAND_TOTAL']),
    ...mapMutations('orders', ['SET_ITEM_ID_LIST']),

    async onChange(itemId, e) {
      const value = e.target.value;

      const payload = {
        itemId: itemId,
        count: value,
      };

      if (value > 0 && value <= 100) {
        await this.$store.dispatch('carts/updateQuantityAction', payload);
      } else {
        alert('invalid input');
      }
    },

    async deleteItem(itemId) {
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
      for (let i = 0; i < data.data.length; i++) {
        this.cartItemList.push(data.data[i]);
      }
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
