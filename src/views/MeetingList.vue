<template>
  <div class="page-container">
    <div class="flex-between mb-20">
      <h2>会议列表</h2>
      <el-button type="primary" @click="handleCreate">
        <el-icon><Plus /></el-icon>
        新建会议
      </el-button>
    </div>

    <el-card class="card-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input v-model="searchForm.keyword" placeholder="会议名称/发起人/类型" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="card-container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="会议名称" />
        <el-table-column prop="organizer" label="发起人" />
        <el-table-column prop="type" label="会议类型" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column label="与会人员">
          <template #default="scope">
            {{ scope.row.attendees.join(', ') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMeetingStore } from '../stores/meetingStore';
import { Plus } from '@element-plus/icons-vue';

const router = useRouter();
const meetingStore = useMeetingStore();

const tableData = ref([]);
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

const searchForm = reactive({
  keyword: ''
});

const fetchData = () => {
  const result = meetingStore.getMeetings(
    pagination.currentPage,
    pagination.pageSize,
    searchForm.keyword
  );
  tableData.value = result.data;
  pagination.total = result.total;
};

const handleCreate = () => {
  router.push('/meeting/new');
};

const handleView = (row) => {
  router.push(`/meeting/${row.id}`);
};

const handleEdit = (row) => {
  router.push(`/meeting/edit/${row.id}`);
};

const handleSearch = () => {
  pagination.currentPage = 1;
  fetchData();
};

const resetSearch = () => {
  searchForm.keyword = '';
  pagination.currentPage = 1;
  fetchData();
};

const handleSizeChange = (val) => {
  pagination.pageSize = val;
  fetchData();
};

const handleCurrentChange = (val) => {
  pagination.currentPage = val;
  fetchData();
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
