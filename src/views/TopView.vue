<template>
  <div class="home">

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
  methods: {

  },
};
</script>


<style>
.home {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/background.png")
}
</style>