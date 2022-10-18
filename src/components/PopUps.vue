<template>
  <v-row class="mt-3" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> たねをまく </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">どのようにがんばろう？</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- 「なにを」 -->
              <v-col cols="12" sm="6" class="pt-7 pl-14">
                <p class="text-h5">なにを</p>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select :items="['べんきょう', 'うんどう', 'おてつだい', 'どくしょ']" filled label="かならずえらんでね" dense required
                  v-model="what"></v-select>
              </v-col>

              <!-- 「いくら」 -->

              <v-col cols="12" sm="6" class="pl-14">
                <div v-if="inits">
                  <p class="text-h5">いくら</p>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div v-if="inits">
                  <v-select :items="['かい', 'さつ', 'じかん', 'こ']" filled label="かならずえらんでね" dense required v-model="init">
                  </v-select>
                </div>
              </v-col>

              <!-- 「かい」 -->
              <v-col cols="12" sm="12">
                <div v-if="howManyTimes">
                  <v-text-field v-model.number="howMuch" filled suffix="かい" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「さつ」 -->
              <v-col cols="12" sm="12">
                <div v-if="howManyBooks">
                  <v-text-field v-model.number="howMuch" filled suffix="さつ" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「じかん」-->
              <v-col cols="12" sm="12">
                <div v-if="howMuchTime">
                  <vue-timepicker v-model="howLong"></vue-timepicker>
                </div>
              </v-col>

              <!-- 「こ」 -->
              <v-col cols="12" sm="12">
                <div v-if="howManyThings">
                  <v-text-field v-model.number="howMuch" filled suffix="こ" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「カレンダー」 -->

              <v-col cols="12" sm="12" class="pl-10">
                <div v-if="tillWhenToWhen">
                  <p class="text-h6">いつから・いつまで</p>
                </div>
              </v-col>
              <v-col cols="12">
                <div v-if="tillWhenToWhen">
                  <template>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="date" label="いつから" persistent-hint prepend-icon="mdi-calendar"
                                v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="date2" label="いつまで" persistent-hint prepend-icon="mdi-calendar"
                                v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="makeGoal"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import { v4 as uuid } from "uuid";

export default {
  name: "LoginForm",
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    howMuch: undefined,
    howLong: undefined,
    init: "",
    uid: "",
    what: undefined,
    dialog: false,
  }),

  methods: {
    //初期の表示設定

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    openPopUp() {
      (this.howMuchTime = false), (this.howManyBooks = false), (this.howMuchTimes = false), (this.tillWhenToWhen = false), (this.init = false);
    },
    closeDialog() {
      this.dialog = false;
    },
    makeGoal() {
      const value = undefined
      const type = undefined
      const dayGoalDefine = () => {
        if (this.howMuch != undefined) {
          type = "count"
          value = this.howMuch
        }
        else if (this.howLong != undefined) {
          type = "timestamp"
          value = this.howLong
        }
      }
      dayGoalDefine();
      const data = {
        id: uuid(),
        title: this.what,
        startDate: this.date,
        endDate: this.date,
        dayGoal: {
          type: type,
          value: value
        },
      }
      this.$store.dispatch("firebase/addGoal", data)
      this.dialog = false;
    }
  },
  computed: {
    ...mapState(["user"]),

    computedDateFormatted() {
      return this.formatDate(this.date);
    },

    //表示・非表示
    inits() {
      return this.what != undefined;
    },
    howMuchTime() {
      return this.init === "じかん";
    },
    howManyTimes() {
      return this.init === "かい";
    },
    howManyBooks() {
      return this.init === "さつ";
    },
    howManyThings() {
      return this.init === "こ";
    },
    tillWhenToWhen() {
      return this.howMuch != undefined;
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  components: {
    "vue-timepicker": VueTimepicker,
  },

};
//dataプロパティが更新されたらcomputedが更新されるようにする
</script>
