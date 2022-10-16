<template>
  <v-row class="mt-3" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          たねをまく
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">どのようにがんばろう？</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" class="pt-7 pl-14">
                <p class="text-h5">なにを</p>
              </v-col>
              <v-col cols="12" sm="6">

                <!-- 「なにを」 -->
                <v-select :items="['べんきょう', 'うんどう', 'おてつだい', 'どくしょ']" filled label="かならずえらんでね" dense required
                  v-model="what"></v-select>
              </v-col>

              <!-- 「べんきょう」, 「うんどう」-->
              <v-col cols="12" sm="6" class="pt-7 pl-14">
                <div v-if="howMuchTime">
                  <p class="text-h5">いくら（じかん）</p>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div v-if="howMuchTime">
                  <vue-timepicker v-model="howMuch"></vue-timepicker>
                </div>
              </v-col>

              <!-- 「おてつだい」 -->
              <v-col cols="12" sm="6" class="pt-7 pl-14">
                <div v-if="howManyTimes">
                  <p class="text-h5">いくら（なんかい）</p>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div v-if="howManyTimes">
                  <v-text-field v-model.number="howMuch" filled suffix="かい" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「どくしょ」 -->
              <v-col cols="12" sm="6" class="pt-7 pl-14">
                <div v-if="howManyBooks">
                  <p class="text-h5">いくら（なんさつ）</p>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div v-if="howManyBooks">
                  <v-text-field v-model.number="howMuch" filled suffix="さつ" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「カレンダー」 -->

              <v-col cols="12" sm="12" class="pt-4 pl-10">
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
                                v-bind="attrs" @blur="date = parseDate(date)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                            transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="dateFormatted" label="いつまで" persistent-hint
                                prepend-icon="mdi-calendar" v-bind="attrs"
                                @blur="dateFormatted = parseDate(dateFormatted)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="dateFormatted" no-title @input="menu2 = false"></v-date-picker>
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
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
import { mapState } from "vuex";
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
export default {
  name: "LoginForm",
  data: () => (
    {

      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      howMuch: undefined,
      uid: "",
      what: '',
    }),

  methods: {
    //初期の表示設定

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    openPopUp() {
      this.howMuchTime = false,
      this.howManyBooks = false,
      this.tillWhenToWhen = false
    }
  },
  computed: {
    ...mapState(["user"]),

    computedDateFormatted() {
      return this.formatDate(this.date)
    },


    //表示・非表示
    howMuchTime() {
      return this.what === 'べんきょう' || this.what === 'うんどう' 
    },
    howManyTimes() {
      return this.what === 'おてつだい'
    },
    howManyBooks() {
      return this.what === 'どくしょ'
    },
    tillWhenToWhen() {
      return this.howMuch != undefined
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  components: {
    'vue-timepicker': VueTimepicker,
  },
};

</script>
