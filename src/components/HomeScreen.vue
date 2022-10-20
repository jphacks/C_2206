<template>

  <v-container class="home-content">

    <!--ホーム画面のレイアウト-->
    <v-row justify="end">
      <v-btn text class="white--text" style="text-transform: none" @click="signout">log out</v-btn>
    </v-row>
    <v-row style="height:40px;"></v-row>
    <v-row justify="center" align-content="center" class="grey lighten-1 white--text mt-16 mx-16" style="height:70px;">
      <!--PopUp.vueで設定した期間から残りの時間を導いてuntilgoalに代入-->
      <div>しゅうかくまであと{{untilgoal}}にち</div>
    </v-row>
    <v-row style="height:150px;"></v-row>
    <v-row class="brown lighten-1 white--text mt-16" style="height:270px;">
    </v-row>

    <!--結果報告ポップアップ-->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> 水をやる </v-btn>
      </template>
      <v-card>



        <v-container class=" green darken-1 white--text">
          <v-row class="pl-3">
            <v-btn icon absolute right justify-content="space-between" class=" cursive close" @click="closeDialog">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
            <v-col class="text-h4 pt-5 pl-8">けっかほうこく</v-col>
          </v-row>
        </v-container>


        <v-col cols="12" sm="6">
          <p class="brown--text text--darken-4 text-h6 pl-16">じかん？かいすう？</p>
          <v-col>
            <v-select :items="['時間', '回数']" filled label="かならずえらんでね" dense required v-model="LongOrMany">
            </v-select>
            <!--時間を選んだ場合-->
            <div v-if="HowLong">
              <p class="brown--text text--darken-4 text-h6 pl-13">どのくらいやった？</p>

              <v-row>
                <v-col cols="3">
                  <v-text-field dense color="brown darken-4" v-model.number="hours" label="数字(半角)">
                  </v-text-field>
                </v-col>
                <v-col>
                  <div class="brown--text text--darken-4 pt-2">時間</div>
                </v-col>
                <v-col cols="3">
                  <v-text-field dense color="brown darken-4" v-model.number="minutes" label="数字(半角)">
                  </v-text-field>
                </v-col>
                <v-col>
                  <div class="brown--text text--darken-4 pt-2">分</div>
                </v-col>
              </v-row>

            </div>
            <!--回数を選んだ場合-->
            <div v-if="HowMany">
              <p class="text-h6">どのくらいやった？</p>
              <v-col>
                <v-row>
                  <v-col cols="4">
                    <v-text-field v-model.number="times" label="数字(半角)"></v-text-field>
                  </v-col>
                  <v-col>
                    <div dense class="pt-7">回</div>
                  </v-col>
                </v-row>
              </v-col>
            </div>
            <v-row v-if="saveError">
              <p class="red--text pl-5">入力してください</p>
            </v-row>
          </v-col>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-row align-content="center" class="mb-6">
            <v-btn x-large class="cursive white--text text-h4 pr-7" color="red accent-2" @click="makeGoal">OK!</v-btn>

          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>



<script>
import { mapState } from "vuex";
import { serverTimestamp, Timestamp } from "firebase/firestore";


export default {
  name: "HomeScreen",
  data: () => ({
    dialog: false,
    hours: undefined,
    minutes: undefined,
    times: undefined,
    did: undefined,
    LongOrMany: undefined,
    untilgoal: 3,
    saveError: false,
  }),
  methods: {
    signout() {
      this.$store.dispatch("user/signOut");
    },
    closeDialog() {
      this.dialog = false;
    },
    makeGoal() {
      let value = undefined;
      let type = undefined;

      if (this.LongOrMany === '時間') {
        type = "timestamp";
        value = Timestamp.fromDate(new Date((this.hours * 3600 + this.minutes * 60) * 1000));
      }
      else if (this.LongOrMany === '回数') {
        type = "count";
        value = this.times;
      }

      if ((this.hours !== undefined && this.minutes !== undefined) || this.times !== undefined) {
        const data = {
          //id: uuid(),
          //goalId: uuid,
          createdAt: serverTimestamp(),
          dayResult: {
            type: type,
            value: value
          },
        }
        this.saveError = false;
        this.$store.dispatch("firebase/addGoal", data);
        this.dialog = false;
      }
      else {
        this.saveError = true;
      }


    }

  },

  computed: {
    ...mapState(["user"]),

    HowLong() {
      return this.LongOrMany === '時間';
    },
    HowMany() {
      return this.LongOrMany === '回数';
    },
  }
};
</script>

<style>
.home-content {
  background-color: rgb(202, 225, 234);
  width: 100%;
  height: 100vh;
}

.close {
  margin-right: -15px;


}

.cursive {
  font-family: cursive;
}

.soil {
  background: rgb(166, 137, 113);
  height: 200px;
  width: 200px;
}

.ellipse {
  width: 200px;
  height: 100px;
  background: rgb(255, 255, 255);
  margin-top: 100px;
  margin-left: 110px;
  margin-right: 110px;
  -moz-border-radius: 100px / 50px;
  -webkit-border-radius: 100px / 50px;
  border-radius: 100px / 50px;
}

.watering {
  margin-left: 50px;
  margin-top: 25px;
  color: black;
  font-size: xx-large;
  font-weight: bold;
}
</style>