<template>
  <div>
    <el-dialog v-model="isVisible" width="420" :before-close="handleloginIn">
      <el-form :model="form" ref="ruleFormRef" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="form.account" autocomplete="off" placeholder="用户名" size="large" class="login-input" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" size="large" />
        </el-form-item>
        <el-form-item>
          <div class="dialog-footer">
            <div type="primary" @click="loginIn(ruleFormRef)">登录</div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { reactive } from "vue";
import { loginApi } from "@/api/modules/user";
import { useMessage } from "@/hooks";
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { HOME_URL } from "@/config";
const router = useRouter();
const userStore = useUserStore();
const { success, warning } = useMessage();
interface PropsType {
  loginvisible: boolean;
}
interface EmitType {
  (e: "loginIn", params: boolean): void;
}
interface RuleForm {
  account: string;
  password: string;
}
const props = withDefaults(defineProps<PropsType>(), {
  loginvisible: false // 默认值
});
const emit = defineEmits<EmitType>();

const isVisible = computed(() => {
  return props.loginvisible;
});
// 表单校验
const ruleFormRef = ref<FormInstance>();
const form = reactive<RuleForm>({
  account: "",
  password: ""
});
const rules = reactive<FormRules<RuleForm>>({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loginIn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const { data } = await loginApi(form);
        // console.log(data);
        if (data.status === 0) {
          userStore.setToken(data.token);
          userStore.setUserInfo({ name: form.account, imgUrl: data.results.image_url, id: data.results.id });
          await initDynamicRouter();
          success("登录成功");
          setTimeout(() => {
            router.push(HOME_URL);
          }, 10);
        } else {
          warning(data.msg);
        }
        const logiVal = false;
        emit("loginIn", logiVal);
      } catch (err) {
        console.error(err);
      } finally {
        //loading 关闭
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const handleloginIn = () => {
  const logiVal = false;
  emit("loginIn", logiVal);
};
</script>
<style scoped lang="scss">
/* stylelint-disable-next-line import-notation */
/* stylelint-disable-next-line scss/at-import-partial-extension */
/* stylelint-disable-next-line import-notation */
@import "./LoginDialog.scss";
</style>
