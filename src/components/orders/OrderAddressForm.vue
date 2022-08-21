<template>
  <div class="container">
    <div class="layout-login">
      <table class="table">
        <div>배송지 정보</div>
        <tbody>
          <tr>
            <th>도시</th>
            <td>
              <em> {{ address.city }}</em>
            </td>
          </tr>

          <tr>
            <th>상세 주소</th>
            <td>
              <em> {{ address.street }}</em>
            </td>
          </tr>

          <tr>
            <th>우편 번호</th>
            <td>
              <em> {{ address.zipCode }}</em>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: {
        city: this.$store.getters['accounts/readCity'],
        street: this.$store.getters['accounts/readStreet'],
        zipCode: this.$store.getters['accounts/readZipCode'],
      },
    };
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
