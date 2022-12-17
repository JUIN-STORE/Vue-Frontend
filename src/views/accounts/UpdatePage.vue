<template>
  <div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <span class="breadcrumb-item active">회원 정보 수정</span>
          </nav>
        </div>
      </div>
    </div>
    <UpdateForm></UpdateForm>
  </div>
</template>

<script>
import UpdateForm from '@/components/accounts/UpdateForm.vue';

export default {
  components: {
    UpdateForm,
  },
};
</script>

<style></style>

<!--2번째-->
