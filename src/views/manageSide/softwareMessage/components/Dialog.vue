<template>
  <div class="diolag">
    <el-dialog v-model="props.visible" title="上传" width="500" :before-close="cancel">
      <el-form ref="ruleFormRef" :model="formDataInfo" :rules="rules">
        <el-form-item label="上传" prop="upload">
          <el-upload
            class="upload-demo"
            action="#"
            multiple
            :limit="1"
            :on-change="handleExceed"
            :show-file-list="true"
            :auto-upload="false"
          >
            <el-button type="primary">软件包</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="软件截图" prop="file_image">
          <el-upload action="#" v-model:file-list="fileList" list-type="picture-card" :limit="3" :auto-upload="false">
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="软件类型" prop="file_type">
          <el-select v-model="formDataInfo.file_type" placeholder="请选择类型">
            <el-option label="财务软件" value="财务软件" />
            <el-option label="it软件" value="it软件" />
            <el-option label="石油专业软件" value="石油专业软件" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传人员" prop="upload_person">
          <el-input v-model="formDataInfo.upload_person" />
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
import { useMessage } from "@/hooks";
const { success, warning } = useMessage();
import { createSoftware } from "@/api/modules/software.ts";
import { uploadImg } from "@/api/modules/upload.ts";
import { Plus } from "@element-plus/icons-vue";
import { UploadFile, UploadUserFile } from "element-plus";
const fileList = ref<UploadUserFile[]>([]);
interface PropsType {
  visible: {
    type: boolean;
  };
}
interface EmitType {
  (e: "onreceivemsg", params: boolean): void;
}
const props = defineProps<PropsType>();
const emit = defineEmits<EmitType>();
const dialogVisible = ref(false);
const formDataInfo = ref({
  file: null,
  upload: null,
  file_image: [],
  file_type: "",
  upload_person: ""
});
const rules = reactive({
  upload: [{ required: true, message: "请上传包", trigger: "blur" }],
  file_image: [{ required: true, message: "请上传三张截图", trigger: "blur" }],
  file_type: [{ required: true, message: "请输入软件类型", trigger: "change" }],
  upload_person: [{ required: true, message: "请输入上传人名字", trigger: "blur" }]
});

const handleExceed = (uploadFile: UploadFile) => {
  console.log(uploadFile);
  formDataInfo.value.file = uploadFile.raw;
};
// const handleChange = async (uploadFile: UploadFile) => {
//   console.log(fileList.value);
// };
// const handleRemove = (uploadFile: UploadFile) => {
//   console.log(uploadFile, "vv");
//   console.log(fileList.value);
// };
const cancel = () => {
  emit("onreceivemsg", dialogVisible.value); //
};
const confirm = async () => {
  formDataInfo.value.file_image = [];
  try {
    for (const item of fileList.value) {
      const formData = new FormData();
      formData.append("file", item.raw);
      const { data } = await uploadImg(formData);
      if (data.status === 0) {
        formDataInfo.value.file_image.push(data.data.url);
      }
    }
    setTimeout(async () => {
      const formData2 = new FormData();
      Object.entries(formDataInfo.value).forEach(([key, value]) => {
        formData2.append(key, value);
      });
      const res = await createSoftware(formData2);
      console.log(res);
      if (res.data.status === 0) {
        success("上传成功");
      } else {
        warning(res.data.message);
      }
      // console.log(res);
      emit("onreceivemsg", dialogVisible.value);
      formDataInfo.value = {
        file: null,
        upload: null,
        file_image: [],
        file_type: "",
        upload_person: ""
      };
    }, 0);
  } catch (err) {
    console.warn(err);
  }
};
</script>
