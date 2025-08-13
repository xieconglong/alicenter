import { createRouter, createWebHistory } from 'vue-router';
import MeetingList from '../views/MeetingList.vue';
import MeetingDetail from '../views/MeetingDetail.vue';
import CreateMeeting from '../views/CreateMeeting.vue';

const routes = [
  { path: '/', component: MeetingList },
  { path: '/meeting/:id', component: MeetingDetail, props: true },
  { path: '/create', component: CreateMeeting },
  { path: '/edit/:id', component: CreateMeeting, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
