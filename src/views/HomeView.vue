<template>
  <div class="home">
    <SignInForm />
    <LoginForm />
    <v-btn @click="signOut">sign out</v-btn>
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "HomeView",
  components: {
    SignInForm,
    LoginForm,
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut");
    },
  },
};
</script>
