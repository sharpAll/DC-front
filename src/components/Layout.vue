<template>
  <vHeader />
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <transition name="move" mode="out-in">
        <component
          :is="Component"
          v-if="route.meta.isCached == false"
          :key="route.fullPath"
        />
        <keep-alive v-else>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import vHeader from "./Header.vue";
</script>
<style scoped lang="scss">
.content {
  margin: 5px 5px 8px;
  height: calc(100vh - 100px);
}
</style>
