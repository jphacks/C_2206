<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="email" label="email"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="password" label="password" type="password"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" elevation="2" @click="login">sign in</v-btn>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SignIn",
  data: () => ({
    email: "",
    password: "",
    uid: "",
  }),
  methods: {
    login() {
      // TODO: バリデーションかける
      this.$store.dispatch("user/signIn", { email: this.email, password: this.password });
      console.log(this.$store.user);
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
