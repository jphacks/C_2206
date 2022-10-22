<template>
  <v-row class="mt-3" justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn absolute right large class="goal orange lighten-5 brown--text text--darken-6"    v-bind="attrs" v-on="on" style="align-items: center">
          <p style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">せっていした<br />もくひょう</p>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="#009A5B" dark class="mx-auto text-h5"> もくひょういちらん </v-toolbar>
        <v-card-text>
          <v-container>
            <template>
              <v-data-table :headers="headers" :items="goalList" :items-per-page="5" class="elevation-1">
                <template v-slot:[`item.id`]="{ item }">
                  <v-simple-checkbox elevation="2" rounded small :value="item.id==currentGoalId" @click="onChooseGoal(item.id)"></v-simple-checkbox>
                </template>
              </v-data-table>
            </template>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#009A5B" text @click="closeDialog"> とじる </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "realGoalList",
  props: {
    goalList: Array,
  },
  data: () => ({
    dialog: false,

    //表
    headers: [
      {
        text: "",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: " がんばること", value: "title" },
      { text: "ないよう", value: "sub_title" },
      { text: "いつから", value: "start" },
      { text: "いつまで", value: "goal" },
      { text: "えらぶ", value: "id" },
    ],
    goals: [
      {
        title: "べんきょう",
        sub_title: "フランス語",
        start: `YYYY/MM/DD`,
        goal: `YYYY/MM/DD`,
      },
    ],
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    onChooseGoal(goalid) {
      this.$store.commit("user/setCurrentGoalId", goalid);
    },
  },
  computed: {
    currentGoalId() {
      return this.$store.getters["user/getCurrentGoalId"];
    },
  },
};
</script>

<style>
.goal{
  margin-top: 8vh;
  margin-right: -3vw;
}
</style>