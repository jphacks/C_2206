<template>
  <div class="home">
    <v-container>
      <PopUps />
    </v-container>
  </div>
</template>

<script>
import PopUps from "@/components/PopUps.vue";
export default {
  data() {
    return {
      dialog: false,
    }
  },

  name: "HomeView",
  components: {
    PopUps,
  },
  methods: {

  },
};
</script>
