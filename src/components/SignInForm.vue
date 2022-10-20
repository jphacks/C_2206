<template>
  <v-container>
    <div v-if="user.user">logined: {{ user.user.uid }}</div>
    <ErrorMsg />
    <v-form>
      <v-container>
        <h2>sign in</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="email" filled label="email"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="password" filled label="password" type="password"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn color="primary" elevation="2" @click="signin">sign in</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ErrorMsg from "./ErrorMsg.vue";
export default {
  name: "SignInForm",
  components: { ErrorMsg },
  data: () => ({
    email: "",
    password: "",
    uid: "",
  }),
  methods: {
    signin() {
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
