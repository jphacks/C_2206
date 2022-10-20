<template>
  <div class="home">
    <HomeScreen />
  </div>
</template>

<script>
import HomeScreen from "@/components/HomeScreen.vue";
export default {
  name: "HomeView",
  components: {
    HomeScreen
},
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut");
    },
  },
};
</script>