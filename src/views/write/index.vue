<template>
  <div class="write">
    <div class="write-title"><el-input v-model="title" placeholder="请输入标题" size="large" /></div>
    <Tag @onags="onags"></Tag>
    <div class="upimage">
      <div>上传封面</div>
      <el-upload class="avatar-uploader" action="/api/file/uploadImage" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div class="write-editor" style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
      <Editor
        style="height: calc(100% - 41px); overflow-y: hidden"
        v-model="valueHtml"
        :default-config="editorConfig"
        :mode="mode"
        @on-created="handleCreated"
        @on-blur="handleBlur"
      />
    </div>
    <div class="write-public">
      <el-button size="large" type="primary" @click="publish"> 发布文章 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts" name="write">
import Tag from "./components/Tag/index.vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { uploadVideo } from "@/api/modules/upload";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig } from "@wangeditor/editor";
import { Plus } from "@element-plus/icons-vue";
import { createArticle } from "@/api/modules/article";
import { useMessage } from "@/hooks";
import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore();
const { success, warning } = useMessage();
import type { UploadProps } from "element-plus";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = ref("default");
const title = ref("");
const tags = ref<string[]>([]);
const imageUrl = ref("");
const image_url = ref<any>([]);
// 内容 HTML
const valueHtml = ref("");
// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "";
  }, 1500);
});
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: []
};
const editorConfig = { placeholder: "请输入内容描述...", MENU_CONF: {} };
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
// 上传图片
editorConfig.MENU_CONF["uploadImage"] = {
  fieldName: "file",
  server: "/api/file/uploadImage",
  onSuccess(file: File, res: any) {
    console.log(res);
    image_url.value.push(res.data.url);
    console.log(`${file.name} 上传成功`, res, image_url.value);
  }
};
//上传视频
type InsertFnTypeVideo = (url: string, poster?: string) => void;
editorConfig.MENU_CONF["uploadVideo"] = {
  async customUpload(file: File, insertFn: InsertFnTypeVideo) {
    if (!uploadVideoValidate(file)) return;
    let formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await uploadVideo(formData);
      insertFn(data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  }
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = response.data.url;
};
// 视频上传前判断
const uploadVideoValidate = (file: File): boolean => {
  console.log(file);
  return true;
};

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleBlur = () => {
  console.log("触发失去焦点");
};
const onags = async (params: string[]) => {
  // console.log(params);
  tags.value = params;
};
const publish = async () => {
  const obj = {
    account: userStore.userInfo.name,
    title: title.value,
    tags: tags.value,
    content: valueHtml.value,
    image_url: image_url.value,
    cover: imageUrl.value
  };
  console.log(obj);
  try {
    const { data } = await createArticle(obj);
    // console.log(data);
    if (data.status === 0) {
      success(data.message);
    } else {
      warning(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};
</script>
<style scoped lang="scss">
/* stylelint-disable-next-line scss/at-import-partial-extension */
/* stylelint-disable-next-line import-notation */
@import "./index.scss";
</style>
