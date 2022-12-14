<template>
  <div>
    <div class="container">
      <div class="container-fluid">
        <div class="layout-login">
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

        <div class="layout-login">
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
                    class="nav-link active"
                    aria-current="page"
                    data-bs-toggle="pill"
                    @click="setDeliveryAddressToDefault"
                    >기본 배송지</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    aria-current="page"
                    data-bs-toggle="pill"
                    @click="showApi"
                    >신규 배송지</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" data-bs-toggle="pill"
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
          <!-- <h5>주문 상품 확인</h5>
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
          </button> -->
        </div>
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
      defaultAddressInfo: {
        city: null,
        street: null,
        zipCode: null,
      },
    };
  },
  methods: {
    // return
    async getProfile() {
      try {
        const { data } = await profileCall();
        console.log('난 주소다');
        console.log(data);
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
      } catch (error) {
        console.log(error);
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
