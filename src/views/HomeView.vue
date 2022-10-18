<template>
  <div class="home">
    <v-container>
      <PopUps />
    </v-container>
    <v-btn @click="signOut">sign out</v-btn>
  </div>
</template>

<script>
import PopUps from "@/components/PopUps.vue";
export default {
  data() {},
  name: "HomeView",
  components: {
    PopUps,
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut").then(() => {
        this.$router.push({ name: "top" });
      });
    },
  },
};
</script>
