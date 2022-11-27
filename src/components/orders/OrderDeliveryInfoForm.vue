<template>
  <div class="container">
    <div class="layout-login">
      <table class="table">
        <div>구매자 정보</div>
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

    <div class="container">
      <div class="layout-login">
        <button class="btn btn-outline-dark">기본 배송지</button>
        <button class="btn btn-outline-dark" @click="showApi()">
          신규 배송지
        </button>
        <button
          onclick="window.open('/addresses/all', 'window_name', 'width=700, height=700, top=300, left=15iot00, status=no, scrollbars=yes');"
          type="submit"
          class="btn btn-outline-dark"
        >
          배송지 목록 보기
        </button>
      </div>

      <div class="card-text">
        <br />ADDRESS
        <p></p>
        <label>* 우편번호</label>
        <input
          type="text"
          id="zipCode"
          v-model="deliveryAddress.zipCode"
          placeholder="우편번호"
          required
          disabled
        />

        <label>* 도시</label>
        <input
          type="text"
          id="city"
          v-model="deliveryAddress.city"
          placeholder="도로명 주소"
          required
          disabled
        />

        <label for="address.street">* 상세 주소</label>
        <input
          id="address.street"
          type="text"
          v-model="deliveryAddress.street"
          placeholder="상세 주소"
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
import { profileCall } from '@/api/accounts';
import { getAddress } from '@/utils/address-api';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      id: 0,
      accountRole: 'USER',
      deliveryReceiver: {
        receiverName: this.$store.getters['accounts/readName'],
        receiverPhoneNumber: this.$store.getters['accounts/readPhoneNumber'],
        receiverEmail: this.$store.getters['accounts/readEmail'],
      },
      deliveryAddress: {
        city: this.$store.getters['accounts/readCity'],
        street: this.$store.getters['accounts/readStreet'],
        zipCode: this.$store.getters['accounts/readZipCode'],
        defaultAddress: true,
      },
    };
  },
  methods: {
    // return
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

        this.$store.commit('accounts/SET_ID', this.id);
        this.$store.commit(
          'orders/SET_DELIVERY_RECEIVER',
          this.deliveryReceiver,
        );
        this.$store.commit('orders/SET_DELIVERY_ADDRESS', this.deliveryAddress);
      } catch (error) {
        console.log(error);
      }
    },
    showApi() {
      this.deliveryAddress.defaultAddress = false;
      getAddress(this.deliveryAddress);
      this.$store.commit('orders/SET_DELIVERY_ADDRESS', this.deliveryAddress);
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.card-title {
  margin: 8px;
}
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-login {
  margin: auto;
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
