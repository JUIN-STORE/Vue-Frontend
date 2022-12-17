<template>
  <div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <span class="breadcrumb-item active">내 정보</span>
          </nav>
        </div>
      </div>
    </div>
    <ProfileForm></ProfileForm>
  </div>
</template>

<script>
import ProfileForm from '@/components/accounts/ProfileForm.vue';

export default {
  components: {
    ProfileForm,
  },
};
</script>

<style></style>
