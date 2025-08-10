import { createRouter, createWebHistory } from 'vue-router';
import MeetingList from '../views/MeetingList.vue';
import MeetingDetail from '../views/MeetingDetail.vue';
import MeetingForm from '../views/MeetingForm.vue';

const routes = [
  {
    path: '/',
    name: 'MeetingList',
    component: MeetingList
  },
  {
    path: '/meeting/:id',
    name: 'MeetingDetail',
    component: MeetingDetail,
    props: true
  },
  {
    path: '/meeting/new',
    name: 'NewMeeting',
    component: MeetingForm
  },
  {
    path: '/meeting/edit/:id',
    name: 'EditMeeting',
    component: MeetingForm,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
