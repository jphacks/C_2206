<template>
  <v-row class="mt-3" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-img v-bind="attrs" v-on="on" src="@/assets/sun.png" max-height="200" max-width="200" style="align-items: center">
          <p style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">いままでの<br />きろくを<br />みる</p>
        </v-img>
      </template>
      <v-card>
        <v-toolbar color="#009A5B" dark class="mx-auto text-h5"> いままでのきろく </v-toolbar>
        <v-card-text>
          <v-container>
            <template>
              <v-data-table :headers="headers" :items="recordList" :items-per-page="5" class="elevation-1"></v-data-table>
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
  name: "RecordList",
  props: {
    recordList: Array,
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
      { text: "いつ", value: "date" },
      { text: "どのくらい", value: "value" },
    ],
    records: [
      {
        date: "2022/10/21",
        value: "あたい",
      },
    ],
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
  computed: {},
};
</script>
