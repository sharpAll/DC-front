<template>
  <div class="w-full h-full component-content">
    <div class="bg-box">
      <div class="bg-home"></div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.bg-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-home {
  justify-items: center;
  width: 70%;
  height: 70%;
  background: url("/@/assets/img/Business.svg") center no-repeat;
  background-size: contain;
}
</style>
