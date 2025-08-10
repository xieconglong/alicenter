import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMeetingStore = defineStore('meeting', () => {
  const meetings = ref([
    {
      id: 1,
      organizer: '张三',
      type: '项目评审',
      name: 'Q2项目评审会议',
      startTime: '2023-06-15 09:00',
      endTime: '2023-06-15 11:00',
      attendees: ['张三', '李四', '王五'],
      summary: '本次会议主要评审了Q2项目的进展情况，确定了下一步的开发计划',
      todo: [
        { id: 1, content: '完成前端页面设计', assignee: '李四', deadline: '2023-06-20' },
        { id: 2, content: '完成后端接口开发', assignee: '王五', deadline: '2023-06-25' }
      ],
      contentAnalysis: '会议中讨论了项目的技术难点和解决方案，明确了各成员的职责分工',
      minutes: '会议纪要已整理并发送给所有参会人员',
      recordingUrl: 'https://example.com/recording1.mp3',
      transcript: '张三：欢迎大家参加今天的项目评审会议。首先请李四介绍一下项目进展情况。李四：目前前端页面已完成80%，后端接口开发已完成70%。王五：测试环境已搭建完成，可以随时进行联调测试。'
    },
    {
      id: 2,
      organizer: '李四',
      type: '需求讨论',
      name: '新功能需求讨论会',
      startTime: '2023-06-16 14:00',
      endTime: '2023-06-16 15:30',
      attendees: ['张三', '李四', '王五', '赵六'],
      summary: '讨论了新功能的需求细节，确定了功能优先级',
      todo: [
        { id: 3, content: '撰写详细需求文档', assignee: '赵六', deadline: '2023-06-18' }
      ],
      contentAnalysis: '会议重点讨论了用户画像和使用场景，明确了功能的核心价值',
      minutes: '会议纪要包含需求列表和优先级排序',
      recordingUrl: 'https://example.com/recording2.mp3',
      transcript: '李四：今天我们讨论新功能的需求。赵六：根据用户调研，这个功能的需求很强烈。张三：我们需要考虑技术实现的复杂度。'
    }
  ]);

  const currentMeeting = ref(null);

  const addMeeting = (meeting) => {
    const newId = Math.max(...meetings.value.map(m => m.id)) + 1;
    meetings.value.push({
      ...meeting,
      id: newId
    });
  };

  const updateMeeting = (updatedMeeting) => {
    const index = meetings.value.findIndex(m => m.id === updatedMeeting.id);
    if (index !== -1) {
      meetings.value[index] = updatedMeeting;
    }
  };

  const getMeetingById = (id) => {
    return meetings.value.find(m => m.id === parseInt(id));
  };

  const getMeetings = (page = 1, pageSize = 10, search = '') => {
    let filtered = meetings.value;
    if (search) {
      filtered = filtered.filter(m => 
        m.name.includes(search) || 
        m.organizer.includes(search) ||
        m.type.includes(search)
      );
    }
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: filtered.slice(start, end),
      total: filtered.length
    };
  };

  return {
    meetings,
    currentMeeting,
    addMeeting,
    updateMeeting,
    getMeetingById,
    getMeetings
  };
});
