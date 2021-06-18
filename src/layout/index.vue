<template>
  <div>
    <ul>
      <li>
        <router-link to="/welcome">welcome</router-link>
      </li>
      <li>
        <router-link to="/table">table</router-link>
      </li>
    </ul>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup></script>
