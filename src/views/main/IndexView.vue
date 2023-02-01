<script lang="ts" setup>
import { useUserStore } from '@/stores'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import * as icons from '@ant-design/icons-vue'

import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { Service } from '@/client'
import type { MenuProps } from 'ant-design-vue'

const userStore = useUserStore()
const router = useRouter()
const collapsed = ref<boolean>(false)

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

// 切换角色modal 状态
const changeRoleModalShow = ref(false)

// 切换角色modal 确定 回调
const changeRoleHandleOk = async () => {
  console.log('modal ok!')
  console.log(selectRole.value, '选中的角色id')
  // 请求接口
  const res = await Service.changeRoleUserRoleIdPatch(selectRole.value)
  if (res.code == 200) {
    console.log(res)
    // 已更新，重新加载
    userStore.loadMenuWithRouterByRoleId(selectRole.value)
    changeRoleModalShow.value = false
  }
}

// 切换角色 select 选中的value
const selectRole = ref()
const selectRoleOption = () => {
  // 过滤掉当前角色
  return userStore.info?.roles
    .filter((item) => item.status != 5)
    .map((role) => ({ value: role.rid, label: role.name }))
}

/**
 * 点击右侧菜单列表处理
 * @param param0
 */
const dropdownClick: MenuProps['onClick'] = ({ key }) => {
  console.log('key', key)
  if (key == '1') {
    // todo 切换角色
    changeRoleModalShow.value = true
  } else {
    // 退出
    localStorage.clear()
    router.replace('/login')
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
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            👋：{{ userStore.info?.nickname }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="dropdownClick">
              <a-menu-item key="1"> 切换角色 </a-menu-item>
              <a-menu-item key="2">退出登录 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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

  <!-- 切换角色modal -->
  <a-modal
    v-model:visible="changeRoleModalShow"
    title="切换角色"
    @ok="changeRoleHandleOk"
  >
    <a-select
      v-model:value="selectRole"
      style="width: 100%"
      :options="selectRoleOption()"
    ></a-select>
  </a-modal>
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
.ant-dropdown-link {
  padding: 0 24px;
}
</style>
