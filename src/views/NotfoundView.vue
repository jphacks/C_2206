<template>
  <div class="bg">
    <v-container>
      <div class="error">
        <img src="../assets/404.png" />
      </div>
      <v-row class=" mt-6" align-content="center" justify="center">
        <h3 text-align="center">ページがみつかりません。。。</h3>
      </v-row>
      <v-row class=" mt-6" align-content="center" justify="center">
        <h3 text-align="center">ログインからやりなおしてください。</h3>
      </v-row>
      <v-row class=" mt-6" align-content="center" justify="center">
        <h3 text-align="center">ごめんね。</h3>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.bg {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/background.png");
}

.error {
  text-align: center;
}

.error img {
  width: 40%;
  height: auto;
}
</style>