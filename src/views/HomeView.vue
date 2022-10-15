<template>
  <div class="top">
    <p>いっぽんくんのページ</p>
    <ErrorMsg />
  </div>
</template>

<script>
import ErrorMsg from "@/components/ErrorMsg.vue";
export default {
  name: "TopView",
  components: { ErrorMsg },
};
</script>
