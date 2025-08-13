<template>
  <el-container style="height: 100vh;">
    <el-header style="background-color: #409eff; color: white; display: flex; align-items: center; justify-content: space-between;">
      <h2 style="margin: 0;">会议管理系统</h2>
      <el-button type="primary" @click="goToCreate">新建会议</el-button>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCreate = () => {
  router.push('/create');
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
}
</style>
