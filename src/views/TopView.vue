<template>
  <div class="top">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "TopView",
  components: {
    LoginForm,
  },
};
</script>

<style>
.home {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/background.png");
}
</style>
