<template>
  <v-form>
    <v-container>
      <h2>login</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" label="email"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="password" label="password" type="password"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" elevation="2" @click="login">login</v-btn>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoginForm",
  data: () => ({
    email: "",
    password: "",
    uid: "",
  }),
  methods: {
    login() {
      this.$store.dispatch("user/login", { email: this.email, password: this.password });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
