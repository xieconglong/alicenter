<template>
  <div class="page-container">
    <el-page-header @back="goBack">
      <template #content>
        <span>会议详情</span>
      </template>
    </el-page-header>

    <el-card class="card-container">
      <template #header>
        <div class="flex-between">
          <span>基本信息</span>
          <el-button @click="handleEdit">编辑</el-button>
        </div>
      </template>
      
      <el-descriptions :column="2" border>
        <el-descriptions-item label="会议名称">{{ meeting.name }}</el-descriptions-item>
        <el-descriptions-item label="发起人">{{ meeting.organizer }}</el-descriptions-item>
        <el-descriptions-item label="会议类型">{{ meeting.type }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{ meeting.startTime }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{ meeting.endTime }}</el-descriptions-item>
        <el-descriptions-item label="与会人员">
          <el-tag v-for="attendee in meeting.attendees" :key="attendee" style="margin-right: 5px;">
            {{ attendee }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <span>会议记录</span>
        </div>
      </template>
      
      <div class="transcript-container">
        <p>{{ meeting.transcript }}</p>
      </div>
    </el-card>

    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <span>会议录音</span>
        </div>
      </template>
      
      <div class="recording-container">
        <audio :src="meeting.recordingUrl" controls style="width: 100%;">
          您的浏览器不支持音频播放。
        </audio>
      </div>
    </el-card>

    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <span>会议概要</span>
        </div>
      </template>
      
      <div class="summary-container">
        <p>{{ meeting.summary }}</p>
      </div>
    </el-card>

    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <span>待办事项</span>
        </div>
      </template>
      
      <el-table :data="meeting.todo" style="width: 100%">
        <el-table-column prop="content" label="事项内容" />
        <el-table-column prop="assignee" label="负责人" />
        <el-table-column prop="deadline" label="截止日期" />
      </el-table>
    </el-card>

    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <span>会议内容分析</span>
        </div>
      </template>
      
      <div class="analysis-container">
        <p>{{ meeting.contentAnalysis }}</p>
      </div>
    </el-card>

    <el-card class="card-container">
      <template #header>
        <div class="card-header">
          <span>会议纪要</span>
        </div>
      </template>
      
      <div class="minutes-container">
        <p>{{ meeting.minutes }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeetingStore } from '../stores/meetingStore';

const route = useRoute();
const router = useRouter();
const meetingStore = useMeetingStore();

const meeting = ref({});

const fetchMeetingDetail = () => {
  const result = meetingStore.getMeetingById(route.params.id);
  if (result) {
    meeting.value = result;
  } else {
    // 处理未找到会议的情况
    router.push('/');
  }
};

const goBack = () => {
  router.go(-1);
};

const handleEdit = () => {
  router.push(`/meeting/edit/${route.params.id}`);
};

onMounted(() => {
  fetchMeetingDetail();
});
</script>

<style scoped>
.card-header {
  font-weight: bold;
}

.transcript-container,
.summary-container,
.analysis-container,
.minutes-container {
  line-height: 1.6;
}
</style>
