<template>
  <div class="page" style="clear: both">
    <div class="col-12">
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: isFirst }">
            <a
              class="page-link text-primary2"
              @click.prevent="updateSelectedPage(selectedPage - 1)"
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
</template>

<script>
export default {
  props: {
    pageInfo: Object,
    // isFirst: Boolean,
    // isLast: Boolean,
    // selectedPage: Number,
    // totalPages: Number,
    // pageListSize: Number,
    updateSelectedPage: Function,
  },
  computed: {
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
  methods: {},
};
</script>
