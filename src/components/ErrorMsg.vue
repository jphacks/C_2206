<script>
export default {
  name: "ErrorMsg",
  computed: {
    message: function () {
      if (this.$store.state.error.errorMsg.length > 0) {
        return this.$store.state.error.errorMsg;
      } else {
        return "no message";
      }
    },
  },
};
</script>

<template>
  <!-- <v-card color="red-lighten-3">
    <v-card-text>
      <div>Error</div>
      <p>{{ message }}</p>
    </v-card-text>
  </v-card> -->
  <div>
    error: {{ message }}
  </div>
</template>
