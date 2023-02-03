<script lang="ts" setup>
const tab = ref<number>(1)
</script>

<template>
  <v-container>
    <v-tabs v-model="tab" fixed-tabs bg-color="primary" color="secondary">
      <v-tab :value="1">Data Account</v-tab>
      <v-tab :value="2">Data Customer</v-tab>
      <v-tab :value="3">Data Transaction</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item :value="1">
        <HomeAccount />
      </v-window-item>
      <v-window-item :value="2">
        <HomeCustomer />
      </v-window-item>
      <v-window-item :value="3">
        <HomeTransaction />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped></style>
