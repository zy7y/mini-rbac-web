<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import * as icons from '@ant-design/icons-vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const collapsed = ref<boolean>(false)
console.log('first', router.currentRoute.value)

const selectedKeys = ref<string[]>(userStore.firstMenu.selectKey)
const openKeys = ref<string[]>(userStore.firstMenu.openKey)

const loadIcon = (name: string) => {
  // https://www.jianshu.com/p/a52262f85808
  return icons[name]
}
const menuClick = (path: string) => {
  router.push(path)
}

const handleOpenChange = (items: string[]) => {
  if (items.length > 1) {
    openKeys.value = items.slice(1)
  }
}
</script>
<template>
  <a-layout class="main">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        v-model:openKeys="openKeys"
        @openChange="handleOpenChange"
      >
        <!-- 渲染菜单 -->
        <template v-for="menu in userStore.menus" :key="menu.id">
          <template v-if="menu.type == 0">
            <!-- 目录 -->
            <a-sub-menu :title="menu.name" :key="`${menu.id}`">
              <template #icon>
                <component :is="loadIcon(menu.icon as string)" />
              </template>
              <!-- 二级菜单 -->
              <template v-for="item in menu.children" :key="`${item.id}`">
                <a-menu-item @click="menuClick(item.path as string)">
                  <template #icon>
                    <component :is="loadIcon(item.icon as string)" />
                  </template>
                  <span>{{ item.name }}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
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
</style>
