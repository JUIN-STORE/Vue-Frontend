<template>
  <div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <span class="breadcrumb-item active p-1 my-2 ml-2">주문 조회</span>
          </nav>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="py-3">
          <div class="btn-group">
            <select
              id="orderStatus"
              class="form-select mr-2"
              v-model="orderStatus"
            >
              <option value selected disabled="">주문 상태</option>
              <option value="ALL">All</option>
              <option value="READY">Ready</option>
              <option value="ORDER">Order</option>
              <option value="CANCEL">Cancel</option>
            </select>
          </div>
          <input
            type="date"
            id="startDate"
            class="text-dark"
            v-model="startDate"
          />
          ~
          <input type="date" id="endDate" class="text-dark" v-model="endDate" />
          <button class="btn btn-primary px-3 ml-2" @click="manageOrderList">
            Search
          </button>
        </div>
        <div class="table-responsive mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Date</th>
                <th>Products</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr v-for="order in orderList" v-bind:key="order">
                <td class="align-middle">{{ order.orderDate }}</td>
                <td class="align-middle">
                  <img
                    src="../../assets/products/1_cat.jpg"
                    alt=""
                    style="width: 50px"
                  />
                  {{ order.productName }}
                </td>

                <td class="align-middle">{{ order.orderCount }}</td>
                <td class="align-middle">{{ order.price }}</td>
                <td class="align-middle">{{ order.orderStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-12">
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li class="page-item" v-for="n in totalPages" v-bind:key="n">
            <a
              class="page-link text-primary2"
              @click.prevent="loadPage(n)"
              style="cursor: pointer"
              >{{ n }}</a
            >
          </li>
          <li class="page-item">
            <a class="page-link text-primary2" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/orders';

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      orderStatus: '',
      page: 1,
      size: 10,
      orderList: [],
      totalPages: 0,
    };
  },
  updated() {},
  watch: {
    // 현재 페이지 추적
    '$route.path': {
      immediate: true,
      handler(path) {
        // 현재 쿼리를 추출합니다.
        const query = this.$route.query;
        // 현재 페이지를 검사합니다.
        if (path.includes('/orders/info') && Object.keys(query).length) {
          this.startDate = query.startDate;
          this.endDate = query.endDate;
          this.orderStatus = query.orderStatus;
          this.page = query.page;
        }
        this.manageOrderList();
      },
    },
  },
  methods: {
    async loadPage(page) {
      this.page = page;
      this.manageOrderList();
    },
    async manageOrderList() {
      const orderInfoConditions = {
        startDate: this.startDate,
        endDate: this.endDate,
        orderStatus: this.orderStatus,
        page: this.page,
      };

      if (!this.$route.path.startsWith('/orders/info')) {
        await this.$router.push({
          path: '/orders/info',
          query: orderInfoConditions,
        });
      } else {
        const query = new URLSearchParams(orderInfoConditions).toString();
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
      this.getOrderList();

      document.querySelector('startDate').value = this.startDate;
    },
    async getOrderList() {
      const { data } = await getOrderList(
        this.startDate,
        this.endDate,
        this.orderStatus == 'ALL' ? '' : this.orderStatus,
        this.size,
        this.page,
      );

      this.orderList = data.data.content;
      this.totalPages = data.data.totalPages;
    },
  },
};
</script>
<style></style>
