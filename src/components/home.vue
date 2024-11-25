<script setup>
import { ref } from 'vue'
import {
  IconDashboard, IconStorage, IconApps, IconCloud, IconFolder
} from '@arco-design/web-vue/es/icon';
import router from '../utils/router/index';
</script>

<template>
  <div class="container_one">
    <div class="herder">
      <div class="header_view">
        <p class="logo">Docker_panel</p>
        <a-avatar shape="square" :size="32" class="avatar">A</a-avatar>
      </div>
    </div>
    <div class="menu">
      <div class="menu_view">
        <div class="menu_app" @click="router.push('/Dashboard')">
          <icon-dashboard class="icon" />
          <p>仪表盘</p>
        </div>
        <div class="menu_app" @click="router.push('/Apps')">
          <icon-cloud class="icon" />
          <p>服务</p>
        </div>
        <div class="menu_app" @click="router.push('/Images')">
          <icon-storage class="icon" />
          <p>镜像</p>
        </div>
        <div class="menu_app" @click="router.push('/Volumes')">
          <icon-folder class="icon" />
          <p>存储卷</p>
        </div>
        <div class="menu_app" @click="router.push('/Store')">
          <icon-apps class="icon" />
          <p>服务商店</p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.container_one {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 50px 60px auto;

  .herder {
    width: 100%;
    background-color: #303643;


    .header_view {
      height: 100%;
      display: flex;
      flex-direction: row;
      width: 1200px;
      margin: 0 auto;

      .logo {
        margin: auto auto auto 0;
        color: white;
        font-size: 24px;
        font-weight: 900;
        font-family: siyuan-bold;
      }

      .avatar {
        margin: auto 0 auto auto;
      }
    }

  }

  .menu {
    width: 100%;
    background-color: #f6f6f6;

    .menu_view {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      gap: 40px;
      flex-direction: row;

      .menu_app {
        margin: auto 0;
        display: flex;
        flex-direction: row;
        font-size: 16px;

        .icon {
          margin: auto 3px;
        }

        p {
          margin: auto 5px;
          font-family: siyuan-normal;
        }
      }

      .menu_app:hover {
        cursor: pointer;
        color: #7087ff;
      }
    }
  }
}
</style>