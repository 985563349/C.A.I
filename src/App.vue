<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <div id="app">
      <router-view />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
// theme
import { createTheme, buttonDark } from 'naive-ui';
// locale
import { zhCN, dateZhCN } from 'naive-ui';

const darkTheme = createTheme([buttonDark]);
</script>
