<script setup>
import {ref} from 'vue'
import {basic_info, dash_info} from "../../utils/request/index.js";

const basic = ref([
  {
    'label': 'docker版本',
    'value': null
  },
  {
    'label': '操作系统名称',
    'value': null
  },
  {
    'label': '内存大小(BG)',
    'value': null
  },
  {
    'label': 'cpu核数',
    'value': null
  },
  {
    'label': '磁盘空间(BG)',
    'value': null
  },
])
const dash = ref({
  "cpu": "0%",
  "mem": "0%",
  "disk": "0%",
  "network": {
    "bytes_sent_speed": 0,
    "bytes_recv_speed": 0
  }
})
const get_info = async () => {
  basic.value = await basic_info()
  dash.value = await dash_info()
}

get_info()
</script>

<template>
  <div class="container">
    <div class="dashboard_container">
      <div class="Basicinformation">
        <a-descriptions style="margin: 20px" :data="basic" size="large" title="基础信息" :column="1"/>
      </div>
      <div class="source_container">
        <div class="source">
          <img class="cpu-icon" src="../../assets/images/cpu.png"></img>
          <div class="cpu-info">
            <a-typography-title :heading="4">
              CPU
            </a-typography-title>
            <a-typography-title>
              {{ dash.cpu }}
            </a-typography-title>
          </div>
        </div>
        <div class="source">
          <img class="cpu-icon" src="../../assets/images/Memory.png"></img>
          <div class="cpu-info">
            <a-typography-title :heading="4">
              Memory
            </a-typography-title>
            <a-typography-title>
              {{ dash.mem }}
            </a-typography-title>
          </div>
        </div>
        <div class="source">
          <img class="cpu-icon" src="../../assets/images/Disk.png"></img>
          <div class="cpu-info">
            <a-typography-title :heading="4">
              Disk
            </a-typography-title>
            <a-typography-title>
              {{ dash.disk }}
            </a-typography-title>
          </div>
        </div>
        <div class="source">
          <img class="cpu-icon" src="../../assets/images/Network.png"></img>
          <div class="cpu-info">
            <a-typography-title :heading="4">
              Network
            </a-typography-title>
            <a-typography-title style="font-size: 25px">
              {{ dash.network.bytes_sent_speed }} / {{ dash.network.bytes_recv_speed }}
            </a-typography-title>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .dashboard_container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 20px;

    .Basicinformation {
      width: 100%;
      min-height: 120px;
      border-radius: 5px;
      border: 1px solid #d9d9d9;
    }

    .source_container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 20px;

      .source {
        //background-color: #FFA500; /* 橙色背景 */
        display: grid;
        grid-template-columns: 150px 1fr;
        margin: 0;
        border-radius: 5px;
        border: 1px solid #d9d9d9;

        .cpu-icon {
          height: 45px;
          margin: auto;
        }

        .cpu-info {
          margin: auto auto auto 0;
        }

        h1, h2, h3, h4, h5 {
          margin: 0;
        }
      }
    }
  }
}
</style>
