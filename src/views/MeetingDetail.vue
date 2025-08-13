<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>会议详情</span>
          <div>
            <el-button @click="goBack">返回</el-button>
            <el-button type="primary" @click="editMeeting">编辑</el-button>
          </div>
        </div>
      </template>
      
      <el-tabs v-model="activeTab">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="basic">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="会议名称">{{ meetingDetail.meetingName }}</el-descriptions-item>
            <el-descriptions-item label="发起人">{{ meetingDetail.organizer }}</el-descriptions-item>
            <el-descriptions-item label="会议类型">
              <el-tag :type="getMeetingTypeTag(meetingDetail.meetingType)">
                {{ getMeetingTypeName(meetingDetail.meetingType) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="与会人员">{{ meetingDetail.participants }}</el-descriptions-item>
            <el-descriptions-item label="开始时间">{{ formatDate(meetingDetail.startTime) }}</el-descriptions-item>
            <el-descriptions-item label="结束时间">{{ formatDate(meetingDetail.endTime) }}</el-descriptions-item>
            <el-descriptions-item label="会议概要" :span="2">{{ meetingDetail.summary }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        
        <!-- 会议记录 -->
        <el-tab-pane label="会议记录" name="records">
          <el-card class="record-card" v-for="(record, index) in meetingRecords" :key="index" style="margin-bottom: 15px;">
            <div class="record-header">
              <span class="record-time">{{ record.time }}</span>
              <span class="record-speaker">{{ record.speaker }}</span>
            </div>
            <div class="record-content">
              {{ record.content }}
            </div>
          </el-card>
          
          <div class="record-input">
            <el-input
              v-model="newRecordContent"
              type="textarea"
              :rows="3"
              placeholder="请输入会议记录内容"
              style="margin-bottom: 10px;"
            />
            <el-button type="primary" @click="addRecord">添加记录</el-button>
          </div>
        </el-tab-pane>
        
        <!-- 会议录音 -->
        <el-tab-pane label="会议录音" name="audio">
          <div class="audio-section">
            <el-empty v-if="!meetingDetail.audioFile" description="暂无录音文件" />
            <div v-else>
              <audio controls style="width: 100%;">
                <source :src="meetingDetail.audioFile" type="audio/mpeg">
                您的浏览器不支持音频播放。
              </audio>
              <div style="margin-top: 15px;">
                <el-button type="primary">下载录音</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        
        <!-- 会议分析 -->
        <el-tab-pane label="会议分析" name="analysis">
          <el-card class="analysis-card">
            <h3>待办事项</h3>
            <el-input
              v-model="meetingDetail.todos"
              type="textarea"
              :rows="4"
              readonly
            />
          </el-card>
          
          <el-card class="analysis-card">
            <h3>会议内容分析</h3>
            <el-input
              v-model="meetingDetail.analysis"
              type="textarea"
              :rows="4"
              readonly
            />
          </el-card>
          
          <el-card class="analysis-card">
            <h3>会议纪要</h3>
            <el-input
              v-model="meetingDetail.minutes"
              type="textarea"
              :rows="4"
              readonly
            />
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const activeTab = ref('basic');

// 会议详情
const meetingDetail = ref({
  id: 1,
  meetingName: '项目启动会议',
  organizer: '张三',
  meetingType: 'project',
  participants: '张三, 李四, 王五',
  startTime: '2023-05-15T09:00:00',
  endTime: '2023-05-15T11:00:00',
  summary: '本次会议主要讨论了新项目的启动计划和分工安排',
  todos: '1. 确定项目负责人\n2. 制定项目时间表\n3. 分配各成员任务',
  analysis: '会议讨论热烈，各成员对项目目标达成一致意见',
  minutes: '会议记录详见附件',
  audioFile: ''
});

// 会议记录
const meetingRecords = ref([
  {
    time: '09:05',
    speaker: '张三',
    content: '欢迎大家参加今天的项目启动会议。本次会议的主要目的是确定新项目的启动计划和分工安排。'
  },
  {
    time: '09:15',
    speaker: '李四',
    content: '关于项目时间表，我建议我们采用敏捷开发模式，每两周进行一次迭代。'
  },
  {
    time: '09:30',
    speaker: '王五',
    content: '我同意李四的建议。另外，我们需要确定项目的技术栈。'
  }
]);

// 新记录内容
const newRecordContent = ref('');

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

// 添加会议记录
const addRecord = () => {
  if (!newRecordContent.value.trim()) {
    ElMessage.warning('请输入会议记录内容');
    return;
  }

  const now = new Date();
  const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  meetingRecords.value.push({
    time: timeString,
    speaker: '当前用户',
    content: newRecordContent.value
  });

  newRecordContent.value = '';
  ElMessage.success('记录添加成功');
};

// 返回列表页
const goBack = () => {
  router.push('/');
};

// 编辑会议
const editMeeting = () => {
  router.push(`/edit/${route.params.id}`);
};

// 初始化数据
const initData = () => {
  // 模拟获取会议详情
  // 这里可以根据 route.params.id 获取具体会议信息
};

// 组件挂载时初始化数据
onMounted(() => {
  initData();
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-card {
  background-color: #f5f7fa;
}

.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.record-time {
  font-weight: bold;
  color: #409eff;
}

.record-speaker {
  color: #909399;
}

.record-content {
  line-height: 1.6;
}

.record-input {
  margin-top: 20px;
}

.audio-section {
  text-align: center;
  padding: 20px 0;
}

.analysis-card {
  margin-bottom: 20px;
}

.analysis-card h3 {
  margin-top: 0;
}
</style>
