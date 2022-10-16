<template>
  <v-container>
    <p class="text-h2 text-center">PlanPlant</p>
    <v-card width="400px" class="mx-auto my-auto">
      <v-container fluid fill-height>
        <h2 class="mt-3 mx-auto">アカウントの作成</h2>
        <v-row class="mt-1" align-content="center">
          <v-col cols="12" md="4">
            <v-text-field prepend-icon="mdi-account-circle" v-model="name" label="ユーザー名"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field prepend-icon="mdi-email" v-model="email" label="メールアドレス"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-bind:type="showPassword_1 ? 'text' : 'password'"
              @click:append="showPassword_1 = !showPassword_1"
              prepend-icon="mdi-lock"
              v-bind:append-icon="showPassword_1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="password"
              label="パスワード"
            ></v-text-field>
          </v-col>
          <v-col cols="15" md="4">
            <v-text-field
              v-bind:type="showPassword_2 ? 'text' : 'password'"
              @click:append="showPassword_2 = !showPassword_2"
              prepend-icon="mdi-lock"
              v-bind:append-icon="showPassword_2 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="re_password"
              label="パスワード(確認)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="primary" elevation="2" class="mx-auto mb-5 mt-5" @click="signup">アカウントを作成</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SignUpForm",
  data: () => ({
    name: "",
    email: "",
    password: "",
    re_password: "",
    showPassword_1: false,
    showPassword_2: false,
    uid: "",
    matchpassword: false,
  }),
  methods: {
    signup() {
      this.checkpassword();
      // TODO: バリデーションかける
      if (this.matchpassword) {
        this.$store.dispatch("user/signUp", { email: this.email, password: this.password });
      }
    },
    checkpassword() {
      if (this.re_password == this.password) {
        this.matchpassword = true;
      } else {
        this.matchpassword = false;
      }
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
