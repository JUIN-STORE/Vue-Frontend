<template>
  <div class="layout">
    <div class="section2">
      <div class="item2" v-for="product in productList" v-bind:key="product.id">
        <item-card :product="product"></item-card>
      </div>
    </div>
  </div>
</template>

<script>
import { readAllProduct } from '@/api/products';
import ItemCard from '@/components/products/ItemCard';

export default {
  components: {
    ItemCard,
  },
  data() {
    return {
      productList: [],
    };
  },

  methods: {
    async fill() {
      const { data } = await readAllProduct();

      for (var i = 0; i < data.data.length; i++) {
        this.productList.push(data.data[i]);
      }
      console.log(data.data.length);
    },
  },
  created() {
    this.fill();
  },
};
</script>

<style>
.layout {
  display: grid;
  gap: 1.5rem;
  grid-template-areas: 'section1 section2';
  grid-template-columns: 1fr 5fr;
}

.section2 {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}
.card {
  flex: 0 0 30%;
  margin: 10px;
}

.sidebar-title {
  text-align: center;
  font-size: 20px;
  margin-top: 25px;
  font-weight: bold;
}

.section1 > ul {
  list-style-type: none;
  text-align: center;
}

.section1 > ul:hover {
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
}
.section1 > ul {
  border: 1px solid rgb(168, 165, 165);
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
}
</style>
