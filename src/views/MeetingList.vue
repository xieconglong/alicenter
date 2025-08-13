<template>
  <div>
    <el-card class="search-card">
      <el-form :model="searchForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="会议名称">
              <el-input v-model="searchForm.meetingName" placeholder="请输入会议名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发起人">
              <el-input v-model="searchForm.organizer" placeholder="请输入发起人" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议类型">
              <el-select v-model="searchForm.meetingType" placeholder="请选择会议类型" clearable style="width: 100%;">
                <el-option label="项目会议" value="project" />
                <el-option label="部门会议" value="department" />
                <el-option label="全体会议" value="general" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="searchForm.startTime"
                type="datetime"
                placeholder="请选择开始时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="searchForm.endTime"
                type="datetime"
                placeholder="请选择结束时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="searchMeetings">查询</el-button>
              <el-button @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px;">
      <el-table :data="meetings" border style="width: 100%">
        <el-table-column prop="meetingName" label="会议名称" />
        <el-table-column prop="organizer" label="发起人" />
        <el-table-column prop="meetingType" label="会议类型">
          <template #default="scope">
            <el-tag :type="getMeetingTypeTag(scope.row.meetingType)">
              {{ getMeetingTypeName(scope.row.meetingType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间">
          <template #default="scope">
            {{ formatDate(scope.row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
          <template #default="scope">
            {{ formatDate(scope.row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="participants" label="与会人员" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="viewMeeting(scope.row.id)">查看</el-button>
            <el-button size="small" @click="editMeeting(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteMeeting(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 20px; text-align: right;"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

// 搜索表单
const searchForm = ref({
  meetingName: '',
  organizer: '',
  meetingType: '',
  startTime: '',
  endTime: ''
});

// 分页信息
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// 会议数据
const meetings = ref([]);

// 会议类型映射
const meetingTypeMap = {
  project: '项目会议',
  department: '部门会议',
  general: '全体会议'
};

// 获取会议类型标签类型
const getMeetingTypeTag = (type) => {
  const tagMap = {
    project: 'primary',
    department: 'success',
    general: 'warning'
  };
  return tagMap[type] || 'info';
};

// 获取会议类型名称
const getMeetingTypeName = (type) => {
  return meetingTypeMap[type] || '未知类型';
};

// 格式化日期
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// 查询会议
const searchMeetings = () => {
  // 模拟API调用
  const mockData = [
    {
      id: 1,
      meetingName: '项目启动会议',
      organizer: '张三',
      meetingType: 'project',
      startTime: '2023-05-15T09:00:00',
      endTime: '2023-05-15T11:00:00',
      participants: '张三, 李四, 王五'
    },
    {
      id: 2,
      meetingName: '部门月度总结',
      organizer: '李四',
      meetingType: 'department',
      startTime: '2023-05-16T14:00:00',
      endTime: '2023-05-16T16:00:00',
      participants: '李四, 赵六, 孙七'
    },
    {
      id: 3,
      meetingName: '公司年中规划',
      organizer: '王总',
      meetingType: 'general',
      startTime: '2023-05-17T10:00:00',
      endTime: '2023-05-17T12:00:00',
      participants: '王总, 张三, 李四, 王五, 赵六'
    }
  ];

  meetings.value = mockData;
  pagination.value.total = mockData.length;
};

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    meetingName: '',
    organizer: '',
    meetingType: '',
    startTime: '',
    endTime: ''
  };
  searchMeetings();
};

// 查看会议详情
const viewMeeting = (id) => {
  router.push(`/meeting/${id}`);
};

// 编辑会议
const editMeeting = (id) => {
  router.push(`/edit/${id}`);
};

// 删除会议
const deleteMeeting = (id) => {
  ElMessageBox.confirm('确定要删除这个会议吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 模拟API调用
    ElMessage.success('删除成功');
    searchMeetings();
  }).catch(() => {
    // 用户取消删除
  });
};

// 分页相关方法
const handleSizeChange = (val) => {
  pagination.value.pageSize = val;
  searchMeetings();
};

const handleCurrentChange = (val) => {
  pagination.value.currentPage = val;
  searchMeetings();
};

// 组件挂载时查询数据
onMounted(() => {
  searchMeetings();
});
</script>

<style scoped>
.search-card {
  margin-bottom: 20px;
}
</style>
