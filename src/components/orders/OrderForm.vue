<template>
  <div class="container" v-if="this.isCartLoaded && this.isProfileLoaded">
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
                  {{ item.name }}
                </td>

                <td class="align-middle">{{ item.count }}</td>
                <td class="align-middle">{{ item.price.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="layout-signIn">
        <table class="table">
          <h5>구매자 정보</h5>
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input type="text" v-model="deliveryReceiver.receiverName" />
              </td>
            </tr>

            <tr>
              <th>연락처</th>
              <td>
                <input
                  type="text"
                  v-model="deliveryReceiver.receiverPhoneNumber"
                />
              </td>
            </tr>

            <tr>
              <th>EMAIL</th>
              <td>
                <input type="text" v-model="deliveryReceiver.receiverEmail" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="layout-signIn">
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a
                  class="nav-link active text-dark"
                  aria-current="page"
                  data-bs-toggle="pill"
                  @click="setDeliveryAddressToDefault"
                  >기본 배송지</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-dark"
                  aria-current="page"
                  data-bs-toggle="pill"
                  @click="showApi"
                  >신규 배송지</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-dark"
                  aria-current="page"
                  data-bs-toggle="pill"
                  onclick="window.open('/addresses/all', 'window_name', 'width=700, height=700, top=300, left=15iot00, status=no, scrollbars=yes');"
                  >배송지 목록 보기</a
                >
              </li>
            </ul>
            <div>
              <table class="table">
                <tbody>
                  <tr>
                    <th>우편번호</th>
                    <td>
                      <input
                        type="text"
                        id="zipCode"
                        v-model="deliveryAddress.zipCode"
                        placeholder="우편번호"
                        required
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>도시</th>
                    <td>
                      <input
                        type="text"
                        id="city"
                        v-model="deliveryAddress.city"
                        placeholder="도로명 주소"
                        required
                        disabled
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>상세 주소</th>
                    <td>
                      <input
                        id="address.street"
                        type="text"
                        v-model="deliveryAddress.street"
                        placeholder="상세 주소"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 100px">
      <form @submit.prevent="createOrder" class="form">
        <button type="submit" class="btn btn-primary" style="float: right">
          주문하기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { readCall } from '@/api/carts';
import { profileCall } from '@/api/accounts';
import { getAddress } from '@/utils/address-api';

export default {
  data() {
    return {
      // 카트 정보
      isCartLoaded: false,
      cartItemList: [],

      // 배송지 정보
      isProfileLoaded: false,
      id: 0,
      accountRole: 'USER',
      deliveryReceiver: {
        receiverName: this.$store.getters['accounts/getName'],
        receiverPhoneNumber: this.$store.getters['accounts/getPhoneNumber'],
        receiverEmail: this.$store.getters['accounts/getEmail'],
      },
      deliveryAddress: {
        city: this.$store.getters['accounts/getCity'],
        street: this.$store.getters['accounts/getStreet'],
        zipCode: this.$store.getters['accounts/getZipCode'],
        defaultAddress: true,
      },
      defaultAddressInfo: {
        city: null,
        street: null,
        zipCode: null,
      },
    };
  },
  created() {
    this.loadCart();
    this.getProfile();
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

    async getProfile() {
      try {
        const { data } = await profileCall();
        this.id = data.data.id;
        this.deliveryReceiver.receiverName = data.data.name;
        this.deliveryReceiver.receiverPhoneNumber = data.data.phoneNumber;
        this.deliveryReceiver.receiverEmail = data.data.email;

        this.deliveryAddress.city = data.data.address.city;
        this.deliveryAddress.street = data.data.address.street;
        this.deliveryAddress.zipCode = data.data.address.zipCode;

        // 기본 배송지 설정
        this.defaultAddressInfo.city = this.deliveryAddress.city;
        this.defaultAddressInfo.street = this.deliveryAddress.street;
        this.defaultAddressInfo.zipCode = this.deliveryAddress.zipCode;

        this.$store.commit('accounts/SET_ID', this.id);
        this.$store.commit(
          'orders/SET_DELIVERY_RECEIVER',
          this.deliveryReceiver,
        );
        this.$store.commit('orders/SET_DELIVERY_ADDRESS', this.deliveryAddress);
        this.isProfileLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    async createOrder() {
      if (!confirm('주문하시겠습니까?')) return;

      const payload = {
        count: this.$store.getters['orders/getCount'],
        orderStatus: 'READY',
        itemIdList: this.$store.getters['orders/getItemList'].map(
          item => item.id,
        ),
        deliveryReceiver: this.$store.getters['orders/getDeliveryReceiver'],
        deliveryAddress: this.$store.getters['orders/getDeliveryAddress'],
      };

      try {
        await this.$store.dispatch('orders/createOrderAction', payload);
        alert('주문이 완료되었습니다.');
        await this.$router.push('/');
      } catch (e) {
        alert('주문에 실패하였습니다.');
      }
    },
    showApi() {
      // 신규 배송지 클릭하면서 API 호출하고 defaultAddress는 false가 된다.
      this.deliveryAddress.defaultAddress = false;
      getAddress(this.deliveryAddress);
      this.$store.commit('orders/SET_DELIVERY_ADDRESS', this.deliveryAddress);
    },
    setDeliveryAddressToDefault() {
      this.deliveryAddress.defaultAddress = true;
      this.deliveryAddress.city = this.defaultAddressInfo.city;
      this.deliveryAddress.street = this.defaultAddressInfo.street;
      this.deliveryAddress.zipCode = this.defaultAddressInfo.zipCode;

      this.$store.commit('orders/SET_DELIVERY_ADDRESS', this.deliveryAddress);
    },
    openPop() {
      window.open('/address/all', '_blank');
    },
    makeThumbnail(item) {
      switch (process.env.NODE_ENV) {
        case 'local':
          return require(`../../assets/items/thumbnail/${item.imageName}`);
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
      this.cartItemList = this.$store.getters['orders/getItemList'];
      this.isCartLoaded = true;
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
  max-width: 500px;
  padding: 10px;
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
  width: 100%;
}

tr {
  vertical-align: middle;
}
.no-item {
  margin: auto;
  font-size: 45px;
  text-decoration: none;
}

.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-signIn {
  margin-top: 125px;
}
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
</style>
