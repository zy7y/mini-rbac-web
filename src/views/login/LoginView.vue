<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import type { Login } from '@/client'
import { useUserStore } from '@/stores'
const formState = reactive<Login>({
  username: 'admin',
  password: '123456'
})
const formRef = ref<FormInstance | null>()

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      min: 5,
      max: 12,
      trigger: 'change',
      message: '请输入账号'
    }
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 12,
      trigger: 'change',
      message: '请输入密码'
    }
  ]
}

const userStore = useUserStore()

const hadndleLogin = async () => {
  try {
    await formRef.value?.validateFields()
  } catch (error) {
    return
  }
  userStore.loginAction(formState)
}
</script>

<template>
  <div class="login">
    <div class="login-continer">
      <h2>Mini RBAC</h2>
      <a-form :model="formState" :rules="rules" ref="formRef">
        <a-form-item name="username">
          <a-input v-model:value.trim="formState.username" placeholder="账号">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input
            v-model:value.trim="formState.password"
            type="password"
            placeholder="密码"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            style="width: 100%"
            html-type="submit"
            :disabled="formState.username === '' || formState.password === ''"
            @click="hadndleLogin"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  width: 100wh;
  height: 100vh;
  /* 主轴居中 */
  justify-content: center;
  /* 交叉轴居中,需要有宽高 */
  align-items: center;

  background: url('http://49.232.203.244:1856/assets/background.d7103c44.svg');
}

.login-continer {
  /* 文本居中 */
  text-align: center;
  width: 300px;
  height: 300px;
  padding: 20px;
}
.login-continer:hover {
  border: 1px solid rgba(220, 220, 220, 0.1);
  border-radius: 2rem;
}
/* 最后一个item 元素 外边距 */
.ant-form-item:last-child {
  margin-bottom: 0px !important;
}
</style>
