<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑会议' : '新建会议' }}</span>
        </div>
      </template>
      
      <el-form 
        ref="formRef" 
        :model="meetingForm" 
        :rules="rules" 
        label-width="120px"
        style="max-width: 800px; margin: 0 auto;"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="会议名称" prop="meetingName">
              <el-input v-model="meetingForm.meetingName" placeholder="请输入会议名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起人" prop="organizer">
              <el-input v-model="meetingForm.organizer" placeholder="请输入发起人" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="会议类型" prop="meetingType">
              <el-select v-model="meetingForm.meetingType" placeholder="请选择会议类型" style="width: 100%;">
                <el-option label="项目会议" value="project" />
                <el-option label="部门会议" value="department" />
                <el-option label="全体会议" value="general" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="与会人员" prop="participants">
              <el-input v-model="meetingForm.participants" placeholder="请输入与会人员，用逗号分隔" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="meetingForm.startTime"
                type="datetime"
                placeholder="请选择开始时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="meetingForm.endTime"
                type="datetime"
                placeholder="请选择结束时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="会议概要" prop="summary">
          <el-input
            v-model="meetingForm.summary"
            type="textarea"
            :rows="4"
            placeholder="请输入会议概要"
          />
        </el-form-item>
        
        <el-form-item label="待办事项" prop="todos">
          <el-input
            v-model="meetingForm.todos"
            type="textarea"
            :rows="4"
            placeholder="请输入待办事项，每行一项"
          />
        </el-form-item>
        
        <el-form-item label="会议内容分析" prop="analysis">
          <el-input
            v-model="meetingForm.analysis"
            type="textarea"
            :rows="4"
            placeholder="请输入会议内容分析"
          />
        </el-form-item>
        
        <el-form-item label="会议纪要" prop="minutes">
          <el-input
            v-model="meetingForm.minutes"
            type="textarea"
            :rows="4"
            placeholder="请输入会议纪要"
          />
        </el-form-item>
        
        <el-form-item label="会议录音">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                请上传会议录音文件，支持 mp3, wav 格式
              </div>
            </template>
          </el-upload>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const formRef = ref();

// 判断是否为编辑模式
const isEdit = ref(false);
const meetingId = ref(null);

// 表单数据
const meetingForm = ref({
  meetingName: '',
  organizer: '',
  meetingType: '',
  participants: '',
  startTime: '',
  endTime: '',
  summary: '',
  todos: '',
  analysis: '',
  minutes: '',
  audioFile: null
});

// 表单验证规则
const rules = {
  meetingName: [
    { required: true, message: '请输入会议名称', trigger: 'blur' }
  ],
  organizer: [
    { required: true, message: '请输入发起人', trigger: 'blur' }
  ],
  meetingType: [
    { required: true, message: '请选择会议类型', trigger: 'change' }
  ],
  participants: [
    { required: true, message: '请输入与会人员', trigger: 'blur' }
  ],
  startTime: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  endTime: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ]
};

// 处理文件上传
const handleFileChange = (file) => {
  meetingForm.value.audioFile = file.raw;
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate((valid) => {
    if (valid) {
      // 模拟API调用
      if (isEdit.value) {
        ElMessage.success('会议信息更新成功');
      } else {
        ElMessage.success('会议创建成功');
      }
      router.push('/');
    } else {
      ElMessage.error('请填写必填项');
    }
  });
};

// 重置表单
const resetForm = () => {
  formRef.value.resetFields();
};

// 返回列表页
const goBack = () => {
  router.push('/');
};

// 初始化编辑数据
const initEditData = () => {
  // 模拟获取会议详情
  const mockData = {
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
    minutes: '会议记录详见附件'
  };
  
  meetingForm.value = { ...mockData };
};

// 组件挂载时初始化数据
onMounted(() => {
  if (route.params.id) {
    isEdit.value = true;
    meetingId.value = route.params.id;
    initEditData();
  }
});
</script>

<style scoped>
.card-header {
  font-size: 18px;
  font-weight: bold;
}
</style>
