<script lang="ts" setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import SiderMenu from '@/components/layout/SiderMenu.vue'
import HeaderView from '@/components/layout/HeaderView.vue'

const collapsed = ref<boolean>(false)
</script>
<template>
  <a-layout class="main">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <HeaderView
          :collapsed="collapsed"
          :foldIconClick="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.main {
  width: 100wh;
  height: 100vh;
}

/* 头部布局 */
.ant-layout-header {
  display: flex;
  justify-content: space-between;
}
</style>
