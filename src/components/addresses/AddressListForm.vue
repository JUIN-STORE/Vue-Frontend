<template>
  <div>
    <div v-for="address in addressList" v-bind:key="address">
      <div v-if="address[0]">{{ address[1] }} ===> 기본 배송지</div>
      <div v-else>{{ address[1] }}</div>
    </div>
  </div>
</template>

<script>
import { allCall } from '@/api/addresses';

export default {
  created() {
    this.getAddressList();
  },

  data() {
    return {
      addressList: [],
      addressMap: new Map(),
    };
  },

  methods: {
    async getAddressList() {
      const { data } = await allCall();
      let length = data.data.length;
      let address;

      for (let i = 0; i < length; i++) {
        address = data.data[i].city + ' ' + data.data[i].street;
        this.addressMap.set(address, data.data[i].defaultAddress);
        this.addressList.push([data.data[i].defaultAddress, address]);
        console.log(this.addressMap);
      }
    },
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
