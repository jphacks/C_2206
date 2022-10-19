<template>
  <v-card v-if="errorMessage" class="mx-auto my-4" color="red lighten-3">
    <v-card-title>Error</v-card-title>
    <v-card-text>
      <p>{{ errorMessage }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ErrorMsg",
  computed: mapState({
    errorMessage: (state) => state.error.errorMessage,
  }),
};
</script>
