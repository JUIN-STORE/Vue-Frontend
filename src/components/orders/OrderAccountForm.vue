<template>
  <div class="container">
    <div class="layout-login">
      <table class="table">
        <div>구매자 정보</div>
        <tbody>
          <tr>
            <th>이름</th>
            <td>
              <em> {{ name }}</em>
            </td>
          </tr>

          <tr>
            <th>연락처 수정해야 됨</th>
            <td>
              <em> {{ name }}</em>
            </td>
          </tr>

          <tr>
            <th>EMAIL</th>
            <td>
              <em> {{ email }}</em>
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
      email: this.$store.getters['accounts/readEmail'],
      name: this.$store.getters['accounts/readName'],
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
