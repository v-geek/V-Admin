<template>
  <div>
    {{ 'menuTest' + id }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.path.replace('/menu/menuTest', '')
</script>
