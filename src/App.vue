<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div id="app">
      <router-view />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
// theme
// darkTheme 暗色主题
// import { darkTheme } from 'naive-ui';

// locale
import { zhCN, dateZhCN } from 'naive-ui';
</script>
