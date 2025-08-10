<template>
  <div id="app">
    <el-container>
      <el-header style="background-color: #409eff; color: white; padding: 0;">
        <div style="display: flex; align-items: center; height: 100%; padding: 0 20px;">
          <h2 style="margin: 0;">会议管理系统</h2>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
</script>

<style>
#app {
  height: 100vh;
}

.el-header {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card-container {
  margin-bottom: 20px;
}

.section-title {
  border-left: 4px solid #409eff;
  padding-left: 10px;
  margin-bottom: 15px;
  color: #303133;
}

.mb-20 {
  margin-bottom: 20px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
