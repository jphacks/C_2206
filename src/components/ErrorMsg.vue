<template>
  <v-card v-if="errorMessage" color="red-lighten-3">
    <v-card-text>
      <div>Error</div>
      <p>{{ errorMessage }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "ErrorMsg",
  computed: mapState({
    errorMessage: state => state.error.errorMessage
  }),
};
</script>
