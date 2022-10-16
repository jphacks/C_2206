<template>
  <div class="home">
    <p>this is home</p>
    <v-btn @click="signOut">sign out</v-btn>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut").then(() => {
        this.$router.push({ name: "top" });
      });
    },
  },
};
</script>
