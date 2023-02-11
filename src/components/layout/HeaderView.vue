<script setup lang="ts">
import { Service } from '@/client'
import router from '@/router'
import { useUserStore } from '@/stores'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { ref } from 'vue'
const userStore = useUserStore()

// 父传子
defineProps<{
  collapsed: boolean
  foldIconClick: () => void
}>()

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
</script>

<template>
  <menu-unfold-outlined
    v-if="collapsed"
    class="trigger"
    @click="foldIconClick"
  />
  <menu-fold-outlined v-else class="trigger" @click="foldIconClick" />
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
  <!-- 切换角色modal -->
  <a-modal
    v-model:visible="changeRoleModalShow"
    title="切换角色"
    @ok="changeRoleHandleOk"
    :okButtonProps="{ disabled: selectRole == undefined ? true : false }"
    @cancel="() => (selectRole = undefined)"
  >
    <a-select
      v-model:value="selectRole"
      style="width: 100%"
      :options="selectRoleOption()"
    ></a-select>
  </a-modal>
</template>

<style scoped>
.ant-dropdown-link {
  padding: 0 24px;
}
</style>
