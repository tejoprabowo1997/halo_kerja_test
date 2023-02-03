<script lang="ts" setup>
import { Ref } from 'vue'
const overlay: Ref<boolean> = useState<boolean>('loadingOverlay')
</script>

<template>
  <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
    <v-progress-circular color="primary" indeterminate size="64" />
  </v-overlay>
</template>

<style scoped></style>
