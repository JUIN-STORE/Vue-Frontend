<template>
  <div>
    <div class="container-fluid">
      <h5>주문 상품 확인</h5>
      <div class="row">
        <div class="table-responsive mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr v-for="item in cartItemList" v-bind:key="item">
                <td class="align-middle">
                  <img :src="makeThumbnail(item)" alt="" style="width: 50px" />
                  {{ item.itemName }}
                </td>

                <td class="align-middle">{{ item.count }}</td>
                <td class="align-middle">{{ item.price }}</td>
              </tr>
            </tbody>
          </table>
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
    },

    async loadCart() {
      const { data } = await readCall();
      this.cartItemList = data.data;

      return this.cartItemList;
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
