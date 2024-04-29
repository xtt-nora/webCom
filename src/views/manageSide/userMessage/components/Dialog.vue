<template>
  <div class="diolag">
    <el-dialog v-model="props.visible" title="新建" width="500" :before-close="cancel">
      <el-form ref="ruleFormRef" :model="formDataInfo" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formDataInfo.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formDataInfo.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formDataInfo.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formDataInfo.sex" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formDataInfo.email" />
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="formDataInfo.identity" placeholder="请选择身份">
            <el-option label="用户" value="用户" />
            <el-option label="管理员" value="管理员" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { createAdmin } from "@/api/modules/user.ts";
import { useMessage } from "@/hooks";
const { success } = useMessage();
interface PropsType {
  visible: {
    type: boolean;
  };
}
interface EmitType {
  (e: "onreceivemsg", params: boolean): void;
}
interface FormData {
  account: number | null;
  password: string;
  name: string;
  sex: string;
  email: string;
  department: string;
}

const props = defineProps<PropsType>();
const emit = defineEmits<EmitType>();
const dialogVisible = ref(false);
const formDataInfo: FormData = ref({
  account: null,
  password: "",
  name: "",
  sex: "",
  email: "",
  department: "软件部门",
  identity: ""
});
const rules = reactive({
  account: [{ required: true, message: "请输入的注册账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入的注册密码", trigger: "blur" }],
  name: [{ required: true, message: "请输入名字", trigger: "blur" }],
  sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  identity: [{ required: true, message: "请输入身份", trigger: "blur" }]
});
const cancel = () => {
  emit("onreceivemsg", dialogVisible.value);
};
const confirm = async () => {
  const res = await createAdmin(formDataInfo.value);

  if (res.data.status == 0) {
    success(res.data.message);
    emit("onreceivemsg", dialogVisible.value);
    formDataInfo.value = {
      account: null,
      password: "",
      name: "",
      sex: "",
      email: "",
      department: "软件部门",
      identity: ""
    };
  } else {
    emit("onreceivemsg", dialogVisible.value);
    formDataInfo.value = {
      account: null,
      password: "",
      name: "",
      sex: "",
      email: "",
      department: "软件部门",
      identity: ""
    };
  }
};
</script>
