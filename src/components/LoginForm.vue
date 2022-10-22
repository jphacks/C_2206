<template>
  <v-form>
    <v-container fluid fill-height>
      <div class="logo">
        <img src="../assets/logo_with_ippon.png" />
      </div>
      <v-row class="mx-14 mt-6" align-content="center">
        <v-text-field background-color="#e5e5e5" clearable filled prepend-icon="mdi-account-circle" label="メールアドレス" v-model="email" />
      </v-row>
      <v-row class="mx-14 mt-2" align-content="center">
        <v-text-field
          filled
          background-color="#e5e5e5"
          border-color="black"
          clearable
          v-bind:type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="パスワード"
          @click:append="showPassword = !showPassword"
          v-model="password"
        />
      </v-row>
      <v-row class="mx-10" align-content="center">
        <v-card-actions class="mx-auto mt-5">
          <v-btn class="px-16 py-6 text-body-1" color="primary" @click="login">ログイン</v-btn>
        </v-card-actions>
        <ErrorMsg />
      </v-row>
      <v-row align-content="center">
        <router-link to="signup" class="mx-auto mt-4">アカウントを作成</router-link>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import ErrorMsg from "./ErrorMsg.vue";
export default {
  name: "LoginForm",
  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    uid: "",
  }),
  methods: {
    login() {
      this.$store
        .dispatch("user/login", { email: this.email, password: this.password })
        .then(() => {
          this.$store.commit("error/delErrorMsg");
          this.$router.push({ name: "home" });
        })
        .catch((e) => {
          this.$store.commit("error/setErrorMsg", e.message);
        });
    },
  },

  computed: {
    ...mapState(["user"]),
  },
  components: { ErrorMsg },
};
</script>

<style>
.logo {
  text-align: center;
}

.logo img {
  width: 70%;
  height: auto;
}
</style>
