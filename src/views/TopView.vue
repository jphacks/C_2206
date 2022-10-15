<template>
  <div class="home">
    <router-link to="home" />
    <SignInForm />
    <LoginForm />
    <div>{{ userInfo }}</div>
    <ErrorMsg />
    <v-btn @click="goal">goal</v-btn>
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import ErrorMsg from "@/components/ErrorMsg.vue";
import { mapState } from "vuex";
import { v4 as uuidv4 } from "uuid";

const setTime = (hour, minute) => {
  return new Date(hour, minute);
};
export default {
  name: "HomeView",
  components: {
    SignInForm,
    LoginForm,
    ErrorMsg,
  },
  methods: {
    goal() {
      this.$store.dispatch("firebase/addGoal", {
        id: uuidv4(),
        title: "sample title",
        dayGoal: {
          type: "timestamp",
          value: setTime(1, 20),
        },
      });
    },
  },
  computed: mapState({
    userInfo: (state) => state.firebase.userInfo,
  }),
};
</script>
