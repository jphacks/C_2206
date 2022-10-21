<template>
  <div>
    <v-img src="@/assets/planter.png" style="align-items: center">
      <p style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">{{ goalTitle }}</p>
    </v-img>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "PlantPlanter",
  props: {
    goalTitle: String,
  },

  computed: {},
};
</script>

<style>

</style>
