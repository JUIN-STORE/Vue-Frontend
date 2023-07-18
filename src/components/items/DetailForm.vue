<template>
  <div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <router-link to="/" class="breadcrumb-item text-dark"
              >Home</router-link
            >
            <router-link to="/items" class="breadcrumb-item text-dark"
              >Shop</router-link
            >
            <span class="breadcrumb-item active">Shop Detail</span>
          </nav>
        </div>
      </div>
    </div>

    <div class="container-fluid pb-5">
      <div class="row px-xl-5">
        <div
          id="carouselExampleControls"
          class="carousel slide col-lg-5 mb-30"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner bg-light">
            <div class="carousel-item active">
              <img class="w-100 h-100" :src="findThumbnail()" />
            </div>
            <div
              class="carousel-item"
              v-for="image in processedImageList"
              v-bind:key="image.id"
            >
              <img class="w-100 h-100" :src="image" alt="Image" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="col-lg-7 h-auto mb-30">
          <div class="h-100 bg-light p-30">
            <h3>{{ name }}</h3>
            <div class="d-flex mb-3">
              <div class="text-primary mr-2">
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star"></small>
                <small class="fas fa-star-half-alt"></small>
                <small class="far fa-star"></small>
              </div>
              <small class="pt-1">(99 Reviews)</small>
            </div>
            <h3 class="font-weight-semi-bold mb-4">₩ {{ this.formatPrice }}</h3>
            <p class="mb-4" style="word-wrap: break-word">
              {{ description }}
            </p>
            <div class="d-flex mb-3"></div>
            <div class="d-flex mb-4">
              <strong class="text-dark mr-3">잔여 수량 :</strong>
              {{ this.formatQuantity }}
            </div>
            <div class="d-flex align-items-center mb-4 pt-2">
              <div class="input-group quantity mr-3" style="width: 130px">
                <div class="input-group-btn">
                  <button class="btn btn-primary btn-minus" @click="minusCount">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control bg-secondary border-0 text-center"
                  :value="count"
                />
                <div class="input-group-btn">
                  <button class="btn btn-primary btn-plus" @click="plusCount">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button class="btn btn-dark px-3 mr-2" @click="addToCart">
                <i class="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
              <button class="btn btn-primary px-3">
                <i class="fa fa-dollar-sign mr-1"></i> Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row px-xl-5">
        <div class="col">
          <div class="bg-light p-30">
            <div class="nav nav-tabs mb-4">
              <div class="nav-item text-dark">Reviews (0)</div>
            </div>
            <div class="tab-content">
              <div class id="tab-pane-3">
                <div class="row">
                  <div>
                    <div v-for="(review, idx) in this.reviewList" :key="review">
                      <div class="media">
                        <div class="media-body">
                          <div>
                            <div style="display: inline-block">
                              <h6>
                                {{ review.accountName
                                }}<small>
                                  - <i>{{ review.createdAt }}</i></small
                                >
                              </h6>
                            </div>
                            <div style="display: inline-block; float: right">
                              <i
                                style="cursor: pointer"
                                class="fas fa-edit mx-1"
                                @click="activateTextField(idx)"
                              ></i>
                              <i
                                style="cursor: pointer"
                                class="fas fa-trash-alt mx-1"
                                @click="removeReview(review.reviewId)"
                              ></i>
                            </div>
                          </div>
                          <div v-if="review.editing" class="mb-4">
                            <div class="text-primary mr-2">
                              <i
                                style="cursor: pointer"
                                v-for="idx in rateSize"
                                :key="idx"
                                @click="editingRating(idx)"
                                :class="[
                                  idx <= editingRate ? 'fas' : 'far',
                                  'fa-star',
                                ]"
                              ></i>
                            </div>
                            <div class="form-group">
                              <textarea
                                id="message"
                                v-model="editingContent"
                                class="form-control"
                              ></textarea>
                            </div>
                            <div class="form-group mb-0">
                              <input
                                @click="updateReview(review.reviewId)"
                                type="submit"
                                value="Edit Review"
                                class="btn btn-primary px-3"
                              />
                            </div>
                          </div>
                          <div v-else>
                            <div class="text-primary mr-2">
                              <i
                                v-for="idx in rateSize"
                                :key="idx"
                                :class="[
                                  idx <= review.rate ? 'fas' : 'far',
                                  'fa-star',
                                ]"
                              ></i>
                            </div>
                            <p>{{ review.content }}</p>
                          </div>
                        </div>
                      </div>
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
                            @click.prevent="
                              updateSelectedPage(selectedPage + 1)
                            "
                            >Next</a
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <h4 class="mb-4">Leave a review</h4>
                <div class="d-flex my-3">
                  <p class="mb-0 mr-2">Your Rating * :</p>
                  <div class="text-primary mr-2">
                    <i
                      style="cursor: pointer"
                      v-for="idx in rateSize"
                      :key="idx"
                      @click="rating(idx)"
                      :class="[idx <= rate ? 'fas' : 'far', 'fa-star']"
                    ></i>
                  </div>
                </div>
                <form @submit.prevent="createReview">
                  <div class="form-group">
                    <label for="message">Your Review *</label>
                    <textarea
                      id="message"
                      v-model="content"
                      cols="30"
                      rows="5"
                      class="form-control"
                    ></textarea>
                  </div>
                  <div class="form-group mb-0">
                    <input
                      type="submit"
                      value="Leave Your Review"
                      class="btn btn-primary px-3"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { readCall, createCall, modifyCall, removeCall } from '@/api/reviews';

export default {
  data() {
    return {
      itemId: this.$store.getters['items/getItem'].id,
      name: this.$store.getters['items/getItem'].name,
      quantity: this.$store.getters['items/getItem'].quantity,
      price: this.$store.getters['items/getItem'].price,
      description: this.$store.getters['items/getItem'].description,
      imageList: this.$store.getters['items/getItem'].itemImageList,
      count: 1,
      content: null,
      rateSize: 5,
      rate: 5,
      editingRate: 5,
      editingContent: null,
      reviewList: [],

      // 페이지네이션
      isFirst: true,
      isLast: true,
      size: 5, // 한 번에 가져올 아이템 개수,
      selectedPage: 1, // 현재 선택된 페이지
      totalPages: 0, // 아이템 전체 페이지 수
      pageListSize: 10, // 아래 표시할 페이지 수
    };
  },
  async created() {
    this.editingList = Array(this.size).fill(false);
    await this.resetReviewList();
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
    formatPrice() {
      return this.price.toLocaleString();
    },
    formatQuantity() {
      return this.quantity.toLocaleString();
    },
    processedImageList() {
      let processedImageList = [];
      switch (process.env.NODE_ENV) {
        case 'local':
          processedImageList = this.imageList
            .filter(img => img.thumbnail == true && img.representative == false)
            .map(img =>
              require(`../../assets/items/thumbnail/${img.imageName}`),
            );
          break;
        case 'production':
          processedImageList = this.imageList
            .filter(img => img.thumbnail == true && img.representative == false)
            .map(img => img.imageUrl);
          break;
        default:
          processedImageList = this.imageList
            .filter(img => img.thumbnail == true && img.representative == false)
            .map(img => img.imageUrl);
      }

      return processedImageList;
    },
  },
  methods: {
    /**
     * 페이지 클릭시 호출
     * @param {Number} inputPage [1,2,3...]
     */
    async updateSelectedPage(inputPage) {
      this.selectedPage = inputPage;

      await this.readReviewList(this.selectedPage - 1);
    },
    rating(idx) {
      this.rate = idx;
    },
    editingRating(idx) {
      this.editingRate = idx;
    },
    activateTextField(targetIdx) {
      this.reviewList.map(
        (review, idx) =>
          (review.editing = idx == targetIdx && !review.editing ? true : false),
      );

      if (this.reviewList[targetIdx]) {
        this.editingContent = this.reviewList[targetIdx].content;
        this.editingRate = this.reviewList[targetIdx].rate;
      } else {
        this.editingContent = null;
        this.editingRate = this.rateSize;
      }
    },
    async readReviewList(page) {
      const result = await readCall(this.itemId, page, this.size);
      const data = result.data.data;
      const contentList = data.content;

      this.isFirst = data.first;
      this.isLast = data.last;
      this.size = data.size;
      this.totalPages = data.totalPages;
      this.reviewList = contentList.map(c => {
        return {
          ...c,
          editing: false,
        };
      });
    },
    async resetReviewList() {
      await this.readReviewList(this.itemId, 0, this.size);
    },
    async createReview() {
      if (!this.content) {
        alert('내용을 입력하세요.');
        return;
      }

      const payload = {
        itemId: this.itemId,
        content: this.content,
        rate: this.rate,
      };
      const result = await createCall(payload);

      if (result.status == 200) {
        alert('리뷰 등록에 성공했습니다.');
        this.rate = this.rateSize;
        this.content = null;

        await this.resetReviewList();
      } else {
        alert('리뷰 등록에 실패했습니다.');
      }
    },
    async updateReview(reviewId) {
      if (!this.editingContent) {
        alert('내용을 입력하세요.');
        return;
      }

      const payload = {
        content: this.editingContent,
        rate: this.editingRate,
      };

      const result = await modifyCall(reviewId, payload);
      if (result.status == 200) {
        alert('리뷰 수정에 성공했습니다.');
        this.rate = this.rateSize;
        this.content = null;

        await this.resetReviewList();
      } else {
        alert('리뷰 수정에 실패했습니다.');
      }
    },
    async removeReview(reviewIdx) {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      const result = await removeCall(reviewIdx);

      if (result.status == 200) {
        alert('리뷰 삭제에 성공했습니다.');
        await this.resetReviewList();
      } else {
        alert('리뷰 삭제에 실패했습니다.');
      }
    },
    findThumbnail() {
      const thumbnail = this.imageList.filter(
        img => img.thumbnail == true && img.representative == true,
      )[0];

      switch (process.env.NODE_ENV) {
        case 'local':
          return require(`../../assets/items/thumbnail/${thumbnail.imageName}`);
        case 'production':
          return thumbnail.imageUrl;
        default:
          return thumbnail.imageUrl;
      }
    },
    plusCount() {
      this.count++;
    },
    minusCount() {
      if (this.count > 1) this.count--;
    },
    async addToCart() {
      const item = {
        id: this.itemId,
        name: this.name,
        price: this.price,
        img: this.findThumbnail(),
      };
      const payload = {
        itemId: this.itemId,
        count: this.count,
      };
      try {
        this.$store.commit('carts/SET_ITEM', item);
        const { data } = await this.$store.dispatch(
          'carts/addCartAction',
          payload,
        );
        await this.$store.dispatch('carts/updateCartCountAction');

        if (
          confirm(
            this.name +
              ' (이)가 장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?',
          )
        ) {
          this.$router.push('/carts');
        }
      } catch (e) {
        alert('Sign In is required.');
        await this.$router.push('/accounts/sign-in');
      }
    },
  },
};
</script>

<style></style>
