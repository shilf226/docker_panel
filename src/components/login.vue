<script setup>
import { ref } from 'vue'

</script>

<template>
  <div class="container">
    <div class="left"></div>
    <div class="right"></div>

  </div>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto 500px;

  .left {
    background-image: url(../assets/images/backup.png);
    background-size: cover;
  }
  .right {
    background-image: url(../assets/images/form.png);
    background-size: cover;
  }
}
</style>
