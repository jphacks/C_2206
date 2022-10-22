<template>
  <div class="container">
    <img class="leaves" :src="filename" />
    <img class="planter" src="@/assets/planter.png" />
    <div class="title">{{ goalTitle }}</div>
  </div>
</template>

<script>
import genki_L from "@/assets/leaves/genki_L.png";
import genki_M from "@/assets/leaves/genki_M.png";
import genki_S from "@/assets/leaves/genki_S.png";
import kare_L from "@/assets/leaves/kare_L.png";
import kare_M from "@/assets/leaves/kare_M.png";
import kare_S from "@/assets/leaves/kare_S.png";
import shinashina_L from "@/assets/leaves/shinashina_L.png";
import shinashina_M from "@/assets/leaves/shinashina_M.png";
import shinashina_S from "@/assets/leaves/shinashina_S.png";

const datas = {
  genki_L: genki_L,
  genki_M: genki_M,
  genki_S: genki_S,
  kare_L: kare_L,
  kare_M: kare_M,
  kare_S: kare_S,
  shinashina_L: shinashina_L,
  shinashina_M: shinashina_M,
  shinashina_S: shinashina_S,
};
export default {
  name: "PlantPlanter",
  props: {
    goalTitle: String,
    achevement: Number,
    dayRate: Number,
  },

  computed: {
    filename() {
      let filename = "";
      if (this.achevement >= 100) {
        filename += "genki";
      } else if (this.achevement > 200 / 3) {
        filename += "shinashina";
      } else {
        filename += "kare";
      }
      filename += "_";
      if (this.dayRate >= 1) {
        filename += "L";
      } else if (this.dayRate > 2 / 3) {
        filename += "M";
      } else {
        filename += "S";
      }
      return datas[filename];
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: max-content;
  width: 100%;
}
.container > .leaves {
  position: absolute;
  max-width: 100vw;
  bottom: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  margin: 0 auto;
}
.container > .planter {
  max-width: 80vw;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  margin: 0 auto;
}
.container > .title {
  position: absolute;
  width: fit-content;
  bottom: calc(80vw * 0.15);
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
