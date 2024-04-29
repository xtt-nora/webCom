<template>
  <div class="user-message">
    <div class="user-message-top">
      <div class="left-wrapped">
        <div class="search-wrapped">
          <el-input
            v-model="account"
            class="w-200 m-2"
            size="small"
            placeholder="输入账号进行搜索"
            :prefix-icon="Search"
            @change="searchUserByAccount()"
          />
        </div>
      </div>
      <div class="button-wrapped">
        <el-button plain type="primary" size="small" @click="handleAdd()">新增</el-button>
        <el-button plain type="primary" size="small">导出</el-button>
      </div>
    </div>
    <div class="user-message-content">
      <el-table :data="tableData" border>
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
            <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <EditDialog :msg="msg" @onreceivemsg="onReceiveMsg"></EditDialog>
  </div>
</template>
<script setup lang="ts">
import { getAllList, searchUser, deleteUser } from "@/api/modules/user.ts";
import Dialog from "./components/Dialog.vue";
import EditDialog from "./components/EditDialog.vue";
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
    label: "姓名",
    prop: "name"
  },
  {
    label: "账号",
    prop: "account"
  },
  {
    label: "身份",
    prop: "identity"
  },
  {
    label: "创建时间",
    prop: "create_time"
  }
]);
const tableData = ref<object[]>([]);
const handleEdit = (index, row) => {
  msg.value = row;
  msg.value.dialogVisible = true;
};
const handleAdd = () => {
  dialogVisible.value = true;
};
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const { data } = await getAllList();
  // console.log(data);
  tableData.value = data.data;
};
const searchUserByAccount = async () => {
  console.log(account.value);

  const obj = {
    account: account.value
  };
  const { data } = await searchUser(obj);
  console.log(data.length, "data");
  tableData.value = data;
};
const handleDelete = async (index, row) => {
  console.log(row);
  const obj = {
    id: row.id,
    account: row.account
  };
  const { data } = await deleteUser(obj);
  // console.log(data);
  success(data.message);
  getTableData();
};
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
