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
              <img class="w-100 h-100" :src="findThumbnail()" alt="Image" />
            </div>
            <div class="carousel-item">
              <img class="w-100 h-100" :src="findThumbnail()" alt="Image" />
            </div>
            <div class="carousel-item">
              <img class="w-100 h-100" :src="findThumbnail()" alt="Image" />
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
              <!-- TODO: 나중에 리뷰 추가되면 수정하기 -->
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
              <a
                class="nav-item nav-link text-dark active"
                data-bs-toggle="tab"
                href="#tab-pane-1"
                >Tab1</a
              >
              <a
                class="nav-item nav-link text-dark"
                data-bs-toggle="tab"
                href="#tab-pane-2"
                >Tab2</a
              >
              <a
                class="nav-item nav-link text-dark"
                data-bs-toggle="tab"
                href="#tab-pane-3"
                >Reviews (0)</a
              >
            </div>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="tab-pane-1">
                <h4 class="mb-3">Item Description</h4>
                <p></p>
                <p></p>
              </div>
              <div class="tab-pane fade" id="tab-pane-2">
                <h4 class="mb-3">Additional Information</h4>
                <p></p>
                <div class="row">
                  <div class="col-md-6">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item px-0"></li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item px-0"></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab-pane-3">
                <div class="row">
                  <div class="col-md-6">
                    <h4 class="mb-4">1 review for "Item Name"</h4>
                    <div class="media mb-4">
                      <img
                        alt="Image"
                        class="img-fluid mr-3 mt-1"
                        style="width: 45px"
                      />

                      <div class="media-body">
                        <h6>
                          jduckling_1024<small> - <i>01 Jan 2045</i></small>
                        </h6>
                        <div class="text-primary mb-2">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                          <i class="far fa-star"></i>
                        </div>
                        <p>Good.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <h4 class="mb-4">Leave a review</h4>
                    <small
                      >Your email address will not be published. Required fields
                      are marked *</small
                    >
                    <div class="d-flex my-3">
                      <p class="mb-0 mr-2">Your Rating * :</p>
                      <div class="text-primary">
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                      </div>
                    </div>
                    <form>
                      <div class="form-group">
                        <label for="message">Your Review *</label>
                        <textarea
                          id="message"
                          cols="30"
                          rows="5"
                          class="form-control"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label for="name">Your Name *</label>
                        <input type="text" class="form-control" id="name" />
                      </div>
                      <div class="form-group">
                        <label for="email">Your Email *</label>
                        <input type="email" class="form-control" id="email" />
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
    </div>
  </div>
</template>

<script>
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
    };
  },
  computed: {
    formatPrice() {
      return this.price.toLocaleString();
    },
    formatQuantity() {
      return this.quantity.toLocaleString();
    },
  },
  methods: {
    findThumbnail() {
      const thumbnail = this.imageList.filter(img => img.thumbnail == true)[0];

      switch (process.env.NODE_ENV) {
        case 'local':
          return require(`../../assets/items/${thumbnail.imageName}`);
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

        if (
          confirm(
            this.name +
              ' (이)가 장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?',
          )
        ) {
          this.$router.push('/carts');
        }
      } catch (e) {
        alert('Login is required.');
        await this.$router.push('/accounts/login');
      }
    },
  },
};
</script>

<style></style>
