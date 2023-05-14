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
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody v-if="this.orderList.length === 0">
              <tr>
                <td colspan="5">집사야 주문한 게 없는데...?</td>
              </tr>
            </tbody>
            <tbody v-else class="align-middle">
              <tr v-for="order in orderList" v-bind:key="order">
                <td class="align-middle">{{ order.orderDate }}</td>
                <td class="align-middle">
                  <img :src="processImage(order)" alt="" style="width: 50px" />
                  {{ order.name }}
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
    <div class="page" style="clear: both">
      <div class="col-12">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: isFirst }">
              <a
                class="page-link text-primary2"
                @click="updateSelectedPage(selectedPage - 1)"
                >Previous</a
              >
            </li>
            <li
              class="page-item"
              v-for="n in this.pageList"
              v-bind:key="n"
              :class="{ active: n === selectedPage }"
            >
              <a
                class="page-link text-primary2"
                @click.prevent="updateSelectedPage(n)"
                style="cursor: pointer; width: 3em"
                >{{ n }}</a
              >
            </li>
            <li class="page-item" :class="{ disabled: isLast }">
              <a
                class="page-link text-primary2"
                @click.prevent="updateSelectedPage(selectedPage + 1)"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/orders';

export default {
  data() {
    return {
      // 데이터
      orderList: [],

      // 페이지네이션
      isFirst: true,
      isLast: true,
      size: 3, // 한 번에 가져올 아이템 개수,
      selectedPage: 1, // 현재 선택된 페이지
      totalPages: 0, // 아이템 전체 페이지 수
      pageListSize: 10, // 아래 표시할 페이지 수

      // 디폴트는 최근 한 달로 설정
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate() + 1,
      )
        .toISOString()
        .substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),

      // 주문 상태
      orderStatus: '',
    };
  },
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
  computed: {
    /**
     * [1,2,3...pages] 배열을 생성하는 메서드
     */
    pageList() {
      // 전체 페이지 수가 정해진 페이지 사이즈보다 작거나 같은 경우
      if (this.totalPages <= this.pageListSize) {
        return Array(this.totalPages)
          .fill(1)
          .map((n, idx) => n + idx);
      }

      // 전체 페이지 수가 정해진 페이지 사이즈보다 큰 경우
      const sizeForCalculate =
        this.pageListSize % 2 == 0 ? this.pageListSize : this.pageListSize + 1;

      let startPage;
      let pageListSize;

      if (this.selectedPage - sizeForCalculate / 2 <= 0) {
        // 첫 부분에 가까울 때
        startPage = 1;
      } else if (
        // 끝쪽일 때
        this.totalPages - this.selectedPage <
        sizeForCalculate / 2
      ) {
        startPage = this.totalPages - this.pageListSize + 1;
      } else {
        // 중간일 때
        startPage = this.selectedPage - sizeForCalculate / 2 + 1;
      }

      // 끝 페이지로 갈수록 페이지 수가 줄어들도록 하기
      if (startPage + this.pageListSize > this.totalPages) {
        pageListSize = this.totalPages - startPage + 1;
      } else {
        pageListSize = this.pageListSize;
      }

      return Array(pageListSize)
        .fill(startPage)
        .map((n, idx) => n + idx);
    },
  },
  methods: {
    processImage(order) {
      switch (process.env.NODE_ENV) {
        case 'local':
          return require(`../../assets/items/thumbnail/${order.itemImageName}`);
        case 'production':
          return order.imageUrl;
        default:
          return order.imageUrl;
      }
    },
    /**
     * 페이지 클릭시 호출
     * @param {Number} page [1,2,3...]
     */
    async updateSelectedPage(inputPage) {
      this.selectedPage = inputPage;

      this.manageOrderList();
    },
    async manageOrderList() {
      const orderInfoConditions = {
        startDate: this.startDate,
        endDate: this.endDate,
        orderStatus: this.orderStatus,
        page: this.selectedPage,
      };

      console.log(orderInfoConditions);

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
        this.orderStatus === 'ALL' ? '' : this.orderStatus,
        this.size,
        this.selectedPage,
      );

      this.orderList = data.data.content;
      this.totalPages = data.data.totalPages;

      this.isFirst = data.data.first;
      this.isLast = data.data.last;
      this.size = data.data.size;
      this.totalPages = data.data.totalPages;
    },
  },
};
</script>
