<template>
  <div class="signup">
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
export default {
  name: "SignUpView",
  components: {
    SignUpForm,
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut");
    },
  },
};
</script>