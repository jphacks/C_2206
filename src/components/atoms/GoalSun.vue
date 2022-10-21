<template>
  <v-btn v-bind="attrs">
    <v-img src="@/assets/sun.png"></v-img>
  </v-btn>
</template>

<script>
export default {
  name: "GoalSun",
  props: {
    attrs: Object,
  },
};
</script>

<style></style>
