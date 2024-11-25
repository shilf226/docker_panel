<script setup>
import {ref} from "vue";
import {IconDelete} from "@arco-design/web-vue/es/icon/index.js";

const form = ref({
  // 容器名称
  hostname: '',
  restart: 'always',
  image: false,
  environment: [{
    key: "MINIO_ROOT_USER",
    value: "minio"
  }, {
    key: "MINIO_ROOT_PASSWORD",
    value: "minio123456"
  }],
  volumes: [{
    host_path: "/data/minio",
    container_path: "/data"
  }],
  ports: [{
    host_ports: "9000",
    container_ports: "9000"
  }, {
    host_ports: "9001",
    container_ports: "9001"
  }]
})

</script>

<template>
  <a-space direction="vertical" size="large" :style="{width: '700px'}">
    <a-form :model="form" layout="horizontal">
      <a-form-item field="name" label="容器名称">
        <a-input v-model="form.hostname" placeholder="容器名称"/>
      </a-form-item>
      <a-form-item field="restart" label="重启策略">
        <a-radio-group v-model="form.restart">
          <a-radio value="always">always</a-radio>
          <a-radio value="no">no</a-radio>
          <a-radio value="on-failure">on-failure</a-radio>
          <a-radio value="on-failure:3">on-failure:3</a-radio>
          <a-radio value="unless-stopped">unless-stopped</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="image" label="镜像">
        <a-input v-model="form.image" placeholder="容器镜像"/>
      </a-form-item>
      <a-form-item field="environment" label="环境变量">
        <div class="environment">
          <div class="menu">
            <a-button class="but" type="outline" @click="form.environment.push({key:'',value: ''})">新增</a-button>
          </div>
          <div class="title">
            <p>名称</p>
            <p></p>
            <p>值</p>
          </div>
          <div class="view" v-for="(item,index) in form.environment" :key="index">
            <a-input v-model="item.key" placeholder="Key"/>
            <p>=</p>
            <a-input v-model="item.value" placeholder="Value"/>
            <a-tooltip content="删除">
              <div class="butt">
                <icon-delete/>
              </div>
            </a-tooltip>
          </div>

        </div>
      </a-form-item>
      <a-form-item field="volumes" label="挂载卷">
        <div class="environment">
          <div class="menu">
            <a-button class="but" type="outline" @click="form.volumes.push({host_path:'',container_path: ''})">新增
            </a-button>
          </div>
          <div class="title">
            <p>主机路径</p>
            <p></p>
            <p>容器路径</p>
          </div>
          <div class="view" v-for="(item,index) in form.volumes" :key="index">
            <a-input v-model="item.host_path" placeholder="主机路径"/>
            <p>:</p>
            <a-input v-model="item.container_path" placeholder="容器路径"/>
            <a-tooltip content="删除">
              <div class="butt">
                <icon-delete/>
              </div>
            </a-tooltip>
          </div>
        </div>
      </a-form-item>
      <a-form-item field="ports" label="端口">
        <div class="environment">
          <div class="menu">
            <a-button class="but" type="outline" @click="form.ports.push({host_ports:number,container_ports: number})">新增
            </a-button>
          </div>
          <div class="title">
            <p>主机端口</p>
            <p></p>
            <p>容器端口</p>
          </div>
          <div class="view" v-for="(item,index) in form.ports" :key="index">
            <a-input v-model="item.host_ports" placeholder="主机端口"/>
            <p>:</p>
            <a-input v-model="item.container_ports" placeholder="容器端口"/>
            <a-tooltip content="删除">
              <div class="butt">
                <icon-delete/>
              </div>
            </a-tooltip>
          </div>
        </div>
      </a-form-item>
    </a-form>
    <div>
      {{ form }}
    </div>
  </a-space>
</template>

<style scoped lang="less">
.environment {
  width: 100%;
  display: flex;
  flex-direction: column;

  .menu {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;

    .but {
      margin-left: auto;
    }
  }

  .title {
    display: grid;
    grid-template-columns: 1fr 5px 1fr 30px;
    grid-template-rows: 1fr;
    gap: 10px;

    p {
      font-family: siyuan-normal;
    }
  }

  .view {
    display: grid;
    grid-template-columns: 1fr 5px 1fr 30px;
    grid-template-rows: 1fr;
    gap: 10px;
    margin-bottom: 10px;

    .butt {
      margin: auto;
      color: #ea8f8f;
    }

    p {
      font-family: siyuan-normal;
      margin: auto;
    }
  }
}
</style>