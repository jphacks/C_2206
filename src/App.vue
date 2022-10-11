<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      sample app
    </v-app-bar>

    <v-main>
      <SignIn />
    </v-main>
  </v-app>
</template>

<script>
import SignIn from './components/SignIn';

export default {
  name: 'App',

  components: {
    SignIn,
  },

  data: () => ({
    //
  }),
};
</script>


