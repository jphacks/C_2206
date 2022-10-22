<template>
  <v-container>
    <!--結果報告ポップアップ-->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <div v-if="ippon_Move">
          <v-btn class="pickup" color="primary" dark v-bind="attrs" v-on="on">ひっこぬく</v-btn>
        </div>
      </template>
      <v-card>
        <v-container class="grass">
          <div v-if="getup_IPPON">
            <v-img class="img" src="@/assets/IPPON/getUpIppon.gif"></v-img>
          </div>
          <div v-if="art_IPPON">
            <v-img class="img" src="@/assets/IPPON/artIppon.gif"></v-img>
          </div>
          <div v-if="language_IPPON">
            <v-img class="img" src="@/assets/IPPON/languageIppon.gif"></v-img>
          </div>
          <div v-if="music_IPPON">
            <v-img class="img" src="@/assets/IPPON/musicIppon.gif"></v-img>
          </div>
          <div v-if="reading_IPPON">
            <v-img class="img" src="@/assets/IPPON/readingIppon.gif"></v-img>
          </div>
          <div v-if="sports_IPPON">
            <v-img class="img" src="@/assets/IPPON/sportsIppon.gif"></v-img>
          </div>
          <div v-if="study_IPPON">
            <v-img class="img" src="@/assets/IPPON/studyIppon.gif"></v-img>
          </div>

          <div>
            <v-btn icon absolute right justify-content="space-between" class="close" @click="closeDialog_InameReset">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ipponMovement",
  props: ["rawIpponName"],
  data: (props) => {
    return {
      dialog: false,
      ipponName: props.rawIpponName,
    };
  },

  methods: {
    closeDialog_InameReset() {
      this.dialog = false;
      this.ipponName = undefined;
    },
    sleep(waitMsec) {
      var startMsec = new Date();

      // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
      while (new Date() - startMsec < waitMsec);
      this.dialog = false;
    },
  },

  computed: {
    ...mapState(["user"]),

    ippon_Move() {
      return this.ipponName !== undefined;
    },

    getup_IPPON() {
      return this.ipponName === "getup";
    },

    art_IPPON() {
      return this.ipponName === "art";
    },

    language_IPPON() {
      return this.ipponName === "language";
    },

    music_IPPON() {
      return this.ipponName === "music";
    },

    reading_IPPON() {
      return this.ipponName === "reading";
    },

    sports_IPPON() {
      return this.ipponName === "sports";
    },

    study_IPPON() {
      return this.ipponName === "study";
    },
  },
};
</script>

<style>
.grass {
  background-color: #80a491;
}

.close {
  margin-top: -92vh;
  margin-left: 0px;
}

.img {
  margin-top: 0px;
  min-height: 600px;
  min-width: 300px;
}
.pickup{
  margin-left: 28vw;
  margin-top: 2vh;
}

</style>
