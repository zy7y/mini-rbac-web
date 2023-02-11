<script setup lang="ts">
import { useUserStore } from '@/stores'
import * as icons from '@ant-design/icons-vue'

import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()
const openKeys = ref<string[]>(userStore.firstMenu.openKey)

const selectedKeys = ref<string[]>(userStore.firstMenu.selectKey)

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
</template>

<style scoped></style>
