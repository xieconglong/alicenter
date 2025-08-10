<template>
  <div class="page-container">
    <el-page-header @back="goBack">
      <template #content>
        <span>{{ isEdit ? '编辑会议' : '新建会议' }}</span>
      </template>
    </el-page-header>

    <el-card class="card-container">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="会议名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        
        <el-form-item label="发起人" prop="organizer">
          <el-input v-model="form.organizer" />
        </el-form-item>
        
        <el-form-item label="会议类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择会议类型">
            <el-option label="项目评审" value="项目评审" />
            <el-option label="需求讨论" value="需求讨论" />
            <el-option label="技术分享" value="技术分享" />
            <el-option label="周例会" value="周例会" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%;"
          />
        </el-form-item>
        
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%;"
          />
        </el-form-item>
        
        <el-form-item label="与会人员" prop="attendees">
          <el-select
            v-model="form.attendees"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择与会人员"
            style="width: 100%;"
          >
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
            <el-option label="赵六" value="赵六" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="会议概要" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入会议概要"
          />
        </el-form-item>
        
        <el-form-item label="会议内容分析" prop="contentAnalysis">
          <el-input
            v-model="form.contentAnalysis"
            type="textarea"
            :rows="3"
            placeholder="请输入会议内容分析"
          />
        </el-form-item>
        
        <el-form-item label="会议纪要" prop="minutes">
          <el-input
            v-model="form.minutes"
            type="textarea"
            :rows="3"
            placeholder="请输入会议纪要"
          />
        </el-form-item>
        
        <el-form-item label="会议录音URL" prop="recordingUrl">
          <el-input v-model="form.recordingUrl" placeholder="请输入录音文件URL" />
        </el-form-item>
        
        <el-form-item label="会议记录" prop="transcript">
          <el-input
            v-model="form.transcript"
            type="textarea"
            :rows="5"
            placeholder="请输入会议记录"
          />
        </el-form-item>
        
        <el-form-item label="待办事项">
          <el-button @click="addTodoItem">添加待办事项</el-button>
          <div v-for="(todo, index) in form.todo" :key="index" class="todo-item">
            <el-input
              v-model="todo.content"
              placeholder="事项内容"
              style="width: 40%; margin-right: 10px;"
            />
            <el-input
              v-model="todo.assignee"
              placeholder="负责人"
              style="width: 20%; margin-right: 10px;"
            />
            <el-date-picker
              v-model="todo.deadline"
              type="date"
              placeholder="截止日期"
              style="width: 20%; margin-right: 10px;"
            />
            <el-button @click="removeTodoItem(index)" type="danger" icon="Delete" circle />
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeetingStore } from '../stores/meetingStore';

const route = useRoute();
const router = useRouter();
const meetingStore = useMeetingStore();

const isEdit = ref(false);
const formRef = ref();

const form = reactive({
  name: '',
  organizer: '',
  type: '',
  startTime: '',
  endTime: '',
  attendees: [],
  summary: '',
  contentAnalysis: '',
  minutes: '',
  recordingUrl: '',
  transcript: '',
  todo: []
});

const rules = {
  name: [{ required: true, message: '请输入会议名称', trigger: 'blur' }],
  organizer: [{ required: true, message: '请输入发起人', trigger: 'blur' }],
  type: [{ required: true, message: '请选择会议类型', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }]
};

const fetchMeetingDetail = () => {
  if (route.params.id) {
    isEdit.value = true;
    const result = meetingStore.getMeetingById(route.params.id);
    if (result) {
      Object.assign(form, result);
    }
  }
};

const addTodoItem = () => {
  form.todo.push({
    content: '',
    assignee: '',
    deadline: ''
  });
};

const removeTodoItem = (index) => {
  form.todo.splice(index, 1);
};

const submitForm = async () => {
  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        meetingStore.updateMeeting({ ...form });
      } else {
        meetingStore.addMeeting({ ...form });
      }
      router.push('/');
    }
  });
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchMeetingDetail();
});
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>
