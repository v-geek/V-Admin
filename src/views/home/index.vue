<template>
  <div>
    <div class="chart">
      <charts :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getConfig } from '@/config'
import charts from '@/components/Charts/index.vue'
import { options } from './config'

const option = reactive(options)

// console.log('getConfig', getConfig())

// console.log('111-888-xxx', import.meta.env)
</script>

<style lang="less" scoped>
.chart {
  width: 800px;
  height: 400px;
}
</style>
