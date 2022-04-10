<template>
  <v-card max-width="250" class="p-2 items-center">
    <v-img class="self-center" height="220" width="220" :src="imgUrl"></v-img>

    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>{{ price }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CourseCard",
  props: ["imgUrl", "title", "price"],
};
</script>
