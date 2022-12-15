<template>
  <div class="container">
    <div v-for="address in addressList" v-bind:key="address">
      <div v-if="address[0]">{{ address[1] }} ===> 기본 배송지</div>
      <div v-else>{{ address[1] }}</div>
    </div>

    <div class="row">
      <div class="table-responsive mb-5">
        <table
          class="table table-light table-borderless table-hover text-center mb-0"
        >
          <thead class="thead-dark">
            <tr>
              <th>City</th>
              <th>Street</th>
              <th>Zip Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="align-middle">
            <tr>
              <td>{{ defaultAddress.city }}</td>
              <td>{{ defaultAddress.street }}</td>
              <td>{{ defaultAddress.zipCode }}</td>
              <td>기본 배송지</td>
            </tr>
            <tr v-for="item in addressList" v-bind:key="item">
              <td class="align-middle">
                {{ item.city }}
              </td>

              <td class="align-middle">{{ item.street }}</td>
              <td class="align-middle">{{ item.zipCode }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
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
      defaultAddress: null,
      addressList: [],
      addressMap: new Map(),
    };
  },

  methods: {
    async getAddressList() {
      const { data } = await allCall();
      const result = data.data;

      result.forEach(address => {
        if (address.defaultAddress) {
          this.defaultAddress = address;
        } else {
          this.addressList.push(address);
        }
      });

      console.log(this.defaultAddress);
    },
  },
};
</script>

<style scoped></style>
