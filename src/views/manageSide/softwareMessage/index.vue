<template>
  <div class="user-message">
    <div class="user-message-top">
      <div class="left-wrapped">
        <div class="search-wrapped">
          <el-input
            v-model="account"
            class="w-200 m-2"
            size="small"
            placeholder="输入软件名称进行搜索"
            :prefix-icon="Search"
            @change="searchUserByName"
          />
        </div>
      </div>
      <div class="button-wrapped">
        <el-button plain type="primary" size="small" @click="handleAdd">上传文件</el-button>
        <el-button plain size="small" @click="handleALLDel" type="danger">删除</el-button>
      </div>
    </div>
    <div class="user-message-content">
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :type="item.type"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- <el-button size="small" type="warning" @click="handlDownload(scope.$index, scope.row)">下载文件</el-button> -->
            <el-button type="success" size="small">
              <template #default>
                <a :href="scope.row.file_url" @click="changeClick(scope.row.download_number, scope.row.id)">下载文件</a>
              </template>
            </el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-message-bottom"></div>
    <Dialog :visible="dialogVisible" @onreceivemsg="onReceiveMsg"></Dialog>
  </div>
</template>
<script setup lang="ts">
import { softwareList, deleteSoftware, updateDownload } from "@/api/modules/software.ts";
import Dialog from "./components/Dialog.vue";
// import EditDialog from "./components/EditDialog.vue";
import { useMessage } from "@/hooks";
const { success } = useMessage();
const account = ref("");
const dialogVisible = ref(false);
const msg = ref({});
const tableColumn = ref([
  {
    type: "selection"
  },
  {
    label: "软件名称",
    prop: "file_name"
  },
  {
    label: "上传人",
    prop: "upload_person"
  },
  {
    label: "类型",
    prop: "file_type"
  },
  {
    label: "上传时间",
    prop: "upload_time"
  }
]);
const multipleSelection = ref([]);
const tableData = ref<object[]>([]);
const changeClick = async (download_number: number, id: number) => {
  await updateDownload(download_number, id);
};
const handleAdd = () => {
  dialogVisible.value = true;
};
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const { data } = await softwareList();
  console.log(data);
  tableData.value = data;
};
const searchUserByName = async () => {
  console.log(account.value);

  // const obj = {
  //   account: account.value
  // };
  // const { data } = await searchUser(obj);
  // console.log(data.length, "data");
  // tableData.value = data;
};
const handleDelete = async (index: any, row: any) => {
  delteFuc(row.id + "");
};
const handleSelectionChange = val => {
  // multipleSelection.value = val;
  multipleSelection.value = val.map(item => {
    return item.id;
  });
  multipleSelection.value = multipleSelection.value.join();
};
const handleALLDel = () => {
  delteFuc(multipleSelection.value);
};
async function delteFuc(ids: any) {
  const obj = {
    ids: ids
  };
  const { data } = await deleteSoftware(obj);
  console.log(data);
  getTableData();
}
const onReceiveMsg = (params: boolean) => {
  dialogVisible.value = params;
  msg.value.dialogVisible = params;
  getTableData();
};
</script>
<style scoped lang="scss">
.user-message {
  &-top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: 20px;

    .button-wrapped {
      margin-right: 20px;
    }
  }

  &-content {
    flex: 1;
    margin: 20px 20px 0 0;
  }
}
</style>
