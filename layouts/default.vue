<script lang="ts" setup></script>

<template>
  <v-app>
    <v-layout>
      <v-main>
        <CommonLoadingOverlay />
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped></style>
